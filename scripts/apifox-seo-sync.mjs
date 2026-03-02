/**
 * Apifox SEO Sync Tool
 * Sync SEO settings (title, url/path) from document frontmatter
 *
 * Usage:
 *   node scripts/apifox-seo-sync.mjs preview    # Preview changes
 *   node scripts/apifox-seo-sync.mjs apply      # Apply changes
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
const SEO_FILE = path.join(process.cwd(), "scripts", "seo-infos-backup.json");
const PREVIEW_FILE = path.join(
  process.cwd(),
  "scripts",
  "seo-sync-preview.json"
);

// ============= API Functions =============

async function updateSeoInfo(seoData) {
  const url = `${BASE_URL}/projects/${PROJECT_ID}/seo-infos?locale=${LOCALE}`;

  const body = {
    projectId: parseInt(PROJECT_ID),
    relatedType: "DOC",
    ...seoData,
  };

  const response = await fetch(url, {
    method: "POST", // POST for SEO updates, not PUT
    headers: HEADERS,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} - ${text}`);
  }

  return response.json();
}

// ============= Helper Functions =============

/**
 * Parse frontmatter from document content
 */
function parseFrontmatter(content) {
  if (!content) return null;

  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = match[1];
  const result = {};

  // Extract title - handle quoted strings
  const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
  if (titleMatch) {
    result.title = titleMatch[1].trim();
  }

  // Extract url - handle quoted strings and extract path
  const urlMatch = frontmatter.match(/url:\s*["'](.+?)["']/);
  if (urlMatch) {
    let url = urlMatch[1].trim();
    // Remove domain prefix and query params, keep path only
    url = url.replace(/^https?:\/\/[^\/]+/, "");
    url = url.split("?")[0]; // Remove query params like ?nav=xxx
    result.path = url;
  }

  // Extract description - handle quoted strings
  const descMatch = frontmatter.match(/description:\s*["'](.+?)["']/);
  if (descMatch) {
    result.description = descMatch[1].trim();
  }

  return Object.keys(result).length > 0 ? result : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============= Commands =============

function preview() {
  if (!fs.existsSync(DOCS_FILE)) {
    console.error(`Docs file not found: ${DOCS_FILE}`);
    process.exit(1);
  }

  if (!fs.existsSync(SEO_FILE)) {
    console.error(`SEO file not found: ${SEO_FILE}`);
    console.log("\nPlease export SEO infos first using the old script:");
    console.log("  node scripts/apifox-seo.mjs export");
    process.exit(1);
  }

  console.log("Reading docs and SEO data...\n");

  const docsData = JSON.parse(fs.readFileSync(DOCS_FILE, "utf-8"));
  const seoData = JSON.parse(fs.readFileSync(SEO_FILE, "utf-8"));

  if (!docsData.success || !docsData.data) {
    console.error("Invalid docs data format");
    process.exit(1);
  }

  // Build SEO lookup map by relatedId
  const seoMap = new Map();
  if (seoData.success && seoData.data) {
    for (const seo of seoData.data) {
      seoMap.set(seo.relatedId, seo);
    }
  }

  const updates = [];

  for (const doc of docsData.data) {
    const frontmatter = parseFrontmatter(doc.content);
    if (!frontmatter) continue;

    const currentSeo = seoMap.get(doc.id);
    const changes = {};
    let hasChanges = false;

    // Check title
    if (frontmatter.title && frontmatter.title !== currentSeo?.title) {
      changes.title = {
        from: currentSeo?.title || "(empty)",
        to: frontmatter.title,
      };
      hasChanges = true;
    }

    // Check path (url)
    if (frontmatter.path && frontmatter.path !== currentSeo?.path) {
      changes.path = {
        from: currentSeo?.path || "(empty)",
        to: frontmatter.path,
      };
      hasChanges = true;
    }

    if (hasChanges) {
      updates.push({
        docId: doc.id,
        docName: doc.name,
        seoId: currentSeo?.id,
        update: {
          relatedId: doc.id,
          ...(currentSeo?.id && { id: currentSeo.id }),
          ...(frontmatter.title && { title: frontmatter.title }),
          ...(frontmatter.path && { path: frontmatter.path }),
        },
        changes,
      });
    }
  }

  if (updates.length === 0) {
    console.log("No SEO updates needed. All documents are in sync.");
    return;
  }

  console.log(`Found ${updates.length} documents to update:\n`);

  for (const item of updates) {
    console.log(`📄 ${item.docName} (id: ${item.docId})`);
    for (const [field, change] of Object.entries(item.changes)) {
      const fromStr =
        change.from.length > 40
          ? change.from.substring(0, 40) + "..."
          : change.from;
      const toStr =
        change.to.length > 40 ? change.to.substring(0, 40) + "..." : change.to;
      console.log(`   ${field}: "${fromStr}" -> "${toStr}"`);
    }
    console.log();
  }

  fs.writeFileSync(PREVIEW_FILE, JSON.stringify(updates, null, 2));
  console.log(`Preview saved to ${PREVIEW_FILE}`);
  console.log(
    `\nTo apply changes, run: node scripts/apifox-seo-sync.mjs apply`
  );
}

async function apply() {
  if (!fs.existsSync(PREVIEW_FILE)) {
    console.error("Preview file not found. Run 'preview' first.");
    process.exit(1);
  }

  const updates = JSON.parse(fs.readFileSync(PREVIEW_FILE, "utf-8"));
  console.log(`Applying ${updates.length} SEO updates...\n`);

  let success = 0;
  let failed = 0;

  for (const item of updates) {
    try {
      process.stdout.write(`"${item.docName}" ... `);
      await updateSeoInfo(item.update);
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
Apifox SEO Sync Tool
Sync SEO settings (title, url) from document frontmatter

Usage:
  node scripts/apifox-seo-sync.mjs <command>

Commands:
  preview   Scan docs and preview SEO updates
  apply     Apply the SEO updates via API

Setup:
  1. Ensure docs-backup.json exists (from GET /api/v1/docs)
  2. Ensure seo-infos-backup.json exists (from apifox-seo.mjs export)
  3. Run preview to see changes
  4. Apply changes

How it works:
  1. Reads document content frontmatter (between --- markers)
  2. Extracts title and url (converts to path)
  3. Compares with current SEO settings
  4. Updates only changed fields
`);
}
