import {execFileSync} from "node:child_process";
import {existsSync, readFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = pathToFileURL(path.join(root, "resume/Sai-Shashikant-Resume.html")).href;
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const outputs = [
    {url: source, file: "public/Sai-Shashikant-Resume.pdf"},
    {url: `${source}?nophoto`, file: "public/Sai-Shashikant-Resume-ATS.pdf"},
];

if (!existsSync(chrome)) {
    console.error(`Google Chrome not found at ${chrome}. Set CHROME_PATH to your Chrome binary.`);
    process.exit(1);
}

const {getDocument} = await import("pdfjs-dist/legacy/build/pdf.mjs");

for (const {url, file} of outputs) {
    const out = path.join(root, file);
    execFileSync(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--virtual-time-budget=8000",
        `--print-to-pdf=${out}`,
        url,
    ], {stdio: "ignore"});
    const pdf = await getDocument({data: new Uint8Array(readFileSync(out)), verbosity: 0}).promise;
    console.log(`${file}: ${pdf.numPages} page(s)`);
}
