import { AwsClient } from "aws4fetch";

export const r2Enabled = () =>
  !!(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET);

/** A private Cloudflare R2 download link for the pack that expires after `seconds`. */
export async function r2SignedUrl(seconds = 3600): Promise<string> {
  const key = process.env.R2_OBJECT_KEY || "ugclibrary.zip";
  const url = new URL(`https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET}/${key.split("/").map(encodeURIComponent).join("/")}`);
  url.searchParams.set("X-Amz-Expires", String(seconds));
  url.searchParams.set("response-content-disposition", `attachment; filename="${key.split("/").pop()}"`);
  const client = new AwsClient({ accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!, service: "s3", region: "auto" });
  const signed = await client.sign(new Request(url, { method: "GET" }), { aws: { signQuery: true } });
  return signed.url;
}
