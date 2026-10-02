import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

// Changes whenever the resume PDF changes, so browsers never reuse a stale cached copy.
const resumeVersion = createHash("sha256")
    .update(readFileSync(path.join(root, "public/Sai-Shashikant-Resume.pdf")))
    .digest("hex")
    .slice(0, 10);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "export",
    env: {
        NEXT_PUBLIC_RESUME_VERSION: resumeVersion,
    },
    turbopack: {
        root,
    },
    images: {
        unoptimized: true,
        // domains: ['example.com'],
    },
};

export default nextConfig;
