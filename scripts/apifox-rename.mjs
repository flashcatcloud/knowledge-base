/**
 * Apifox Batch Rename Tool
 * Remove number prefixes from document and folder names
 *
 * Usage:
 *   node scripts/apifox-rename.mjs preview    # Preview changes (from local JSON)
 *   node scripts/apifox-rename.mjs apply      # Apply changes via API
 */

import fs from "fs";
import path from "path";

// ============= Configuration =============
const BASE_URL = "https://api.apifox.com/api/v1";
const LOCALE = "zh-CN";
const PROJECT_ID = "4386769";
const BRANCH_ID = "7462650";
const DEVICE_ID = "Uv5tN2bf-rsyr-0OCW-lbjc-yiTlJde6AdG3";

const COOKIE =
  process.env.APIFOX_COOKIE ||
  `Authorization=Bearer 5HIHiG8IaWh50zNt3xAz5m9qNFrOLOhY; Authorization.sig=ZxKH4K_i5dwy8gWfVBWdpem9oDg6LM8noRRrGk1QApk; acw_tc=0a03831f17685508381108248e29eeb6f7bbb05147f113381a3186dc954b68`;

const HEADERS = {
  "Content-Type": "application/json;charset=UTF-8",
  Accept: "application/json",
  Cookie: COOKIE,
  Origin: "https://app.apifox.com",
  Referer: "https://app.apifox.com/",
  "x-project-id": PROJECT_ID,
  "x-branch-id": BRANCH_ID,
  "x-device-id": DEVICE_ID,
  "x-client-mode": "web",
  "x-client-version": "2.8.2-alpha.2",
};

const DOCS_FILE = path.join(process.cwd(), "scripts", "docs-backup.json");
const PREVIEW_FILE = path.join(process.cwd(), "scripts", "rename-preview.json");

// ============= API Functions =============

async function updateDocName(docId, name) {
  // Note: API endpoint is /doc/ (singular), not /docs/
  const url = `${BASE_URL}/doc/${docId}?locale=${LOCALE}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} - ${text}`);
  }
  return response.json();
}

// ============= Helper Functions =============

function removeNumberPrefix(name) {
  // Match patterns like "1. ", "1.2 ", "1.2.3 ", etc.
  return name.replace(/^[\d.]+\s+/, "");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============= Commands =============

function preview() {
  if (!fs.existsSync(DOCS_FILE)) {
    console.error(`Docs file not found: ${DOCS_FILE}`);
    console.log("\nPlease save the docs JSON from API to this file first:");
    console.log("  GET https://api.apifox.com/api/v1/docs?locale=zh-CN");
    process.exit(1);
  }

  console.log(`Reading docs from ${DOCS_FILE}...\n`);
  const docsData = JSON.parse(fs.readFileSync(DOCS_FILE, "utf-8"));

  if (!docsData.success || !docsData.data) {
    console.error("Invalid docs data format");
    process.exit(1);
  }

  const itemsToRename = [];

  for (const doc of docsData.data) {
    const newName = removeNumberPrefix(doc.name);
    if (doc.name !== newName) {
      itemsToRename.push({
        id: doc.id,
        type: "doc",
        originalName: doc.name,
        newName,
      });
    }
  }

  if (itemsToRename.length === 0) {
    console.log("No documents found with number prefixes.");
    return;
  }

  console.log(
    `Found ${itemsToRename.length} documents with number prefixes:\n`
  );

  for (const item of itemsToRename) {
    console.log(`  "${item.originalName}" -> "${item.newName}"`);
  }

  fs.writeFileSync(PREVIEW_FILE, JSON.stringify(itemsToRename, null, 2));
  console.log(`\nPreview saved to ${PREVIEW_FILE}`);
  console.log(`\nTo apply changes, run: node scripts/apifox-rename.mjs apply`);
}

async function apply() {
  if (!fs.existsSync(PREVIEW_FILE)) {
    console.error("Preview file not found. Run 'preview' first.");
    process.exit(1);
  }

  const items = JSON.parse(fs.readFileSync(PREVIEW_FILE, "utf-8"));
  console.log(`Applying ${items.length} renames...\n`);

  let success = 0;
  let failed = 0;

  for (const item of items) {
    try {
      process.stdout.write(`"${item.originalName}" -> "${item.newName}" ... `);
      await updateDocName(item.id, item.newName);
      console.log("OK");
      success++;
      await sleep(300);
    } catch (error) {
      console.log(`FAILED: ${error.message}`);
      failed++;
    }
  }

  console.log(`\nCompleted: ${success} success, ${failed} failed`);
}

// ============= Main =============

const command = process.argv[2] || "help";

switch (command) {
  case "preview":
    preview();
    break;
  case "apply":
    apply().catch(console.error);
    break;
  default:
    console.log(`
Apifox Batch Rename Tool
Remove number prefixes from document names

Usage:
  node scripts/apifox-rename.mjs <command>

Commands:
  preview   Scan docs-backup.json and preview items to rename
  apply     Apply the rename changes via API

Setup:
  1. Save docs JSON to scripts/docs-backup.json:
     GET https://api.apifox.com/api/v1/docs?locale=zh-CN

  2. Run preview to see changes:
     node scripts/apifox-rename.mjs preview

  3. Apply changes:
     node scripts/apifox-rename.mjs apply

Examples:
  "1. Introduction" -> "Introduction"
  "2.1 Quick Start" -> "Quick Start"
`);
}
