import OSS from "ali-oss";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import CDN from "@alicloud/cdn20180510";
import OpenApi from "@alicloud/openapi-client";

dotenv.config();

const localDir = "./dist/iife"; // 本地文件夹路径
const ossDir = "/test/docs"; // 上传到oss的文件路径

const client = new OSS({
  region: process.env.CDN_REGION,
  accessKeyId: process.env.CDN_ACCESS_KEY,
  accessKeySecret: process.env.CDN_SECRET_KEY,
  bucket: process.env.CDN_BUCKET,
});

// ... existing code ...

async function uploadFiles() {
  try {
    // 递归读取文件夹中的所有文件
    async function uploadDir(localPath, ossPath) {
      const files = fs.readdirSync(localPath);

      for (const file of files) {
        const localFilePath = path.join(localPath, file);
        const ossFilePath = path.join(ossPath, file).replace(/\\/g, "/");

        if (fs.statSync(localFilePath).isDirectory()) {
          // 如果是文件夹，递归上传
          await uploadDir(localFilePath, ossFilePath);
        } else {
          // 如果是文件，直接上传
          const result = await client.put(ossFilePath, localFilePath);
          // 构建完整的 URL
          await refreshCdnCache(
            result.url.replace(process.env.CDN_ENDPOINT, process.env.CDN_URL)
          );
        }
      }
    }

    await uploadDir(localDir, ossDir);
  } catch (err) {
    console.error("Error uploading files:", err);
  }
}

async function refreshCdnCache(ossFilePath) {
  let config = new OpenApi.Config({
    accessKeyId: process.env.CDN_ACCESS_KEY,
    accessKeySecret: process.env.CDN_SECRET_KEY,
    endpoint: "cdn.aliyuncs.com",
    regionId: "cn-beijing",
  });
  let cacheClient = new CDN.default(config);
  try {
    console.log("ossFilePath", ossFilePath);
    // 创建一个新的请求实例
    const refreshRequest = new CDN.RefreshObjectCachesRequest({});
    refreshRequest.objectPath = ossFilePath;
    refreshRequest.objectType = "File";
    // 刷新cdn
    await cacheClient.refreshObjectCaches(refreshRequest);
    console.log("CDN cache refreshed for:", ossFilePath);
  } catch (error) {
    console.error("Error refreshing CDN cache:", error);
  }
}

uploadFiles();
