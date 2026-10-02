import type {Metadata} from "next";
import Link from "next/link";
import {FaArrowLeft} from "react-icons/fa";
import {HiOutlineDownload} from "react-icons/hi";
import {MagicButton} from "@/components/ui/MagicButton";
import {ResumeViewer} from "@/components/ResumeViewer";
import {resumeFile} from "@/app/lib/AppConstants";

export const metadata: Metadata = {
    title: "Resume — Sai Shashikant",
    description: "Resume of D S N Shashikant, Full Stack + AI Engineer.",
};

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-black-100">
            <header className="sticky top-0 z-50 border-b border-white/[0.1] bg-black-100/90 backdrop-blur">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
                    <Link href="/" className="flex items-center gap-2 text-sm text-white-200 hover:text-white">
                        <FaArrowLeft/> Back to portfolio
                    </Link>
                    <a href={resumeFile.path} download={resumeFile.downloadName}>
                        <MagicButton
                            title="Download PDF"
                            icon={<HiOutlineDownload/>}
                            position="left"
                            className="!mt-0 !h-10 !w-auto"
                        />
                    </a>
                </div>
            </header>
            <section className="mx-auto max-w-4xl px-5 py-8">
                <ResumeViewer file={resumeFile.path}/>
            </section>
        </main>
    );
}
