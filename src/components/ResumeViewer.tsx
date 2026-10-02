"use client";

import dynamic from "next/dynamic";
import {ResumePlaceholder} from "@/components/ResumePlaceholder";

const ResumeDocument = dynamic(
    () => import("@/components/ResumeDocument").then((m) => m.ResumeDocument),
    {ssr: false, loading: () => <ResumePlaceholder/>},
);

export const ResumeViewer = ({file}: { file: string }) => <ResumeDocument file={file}/>;
