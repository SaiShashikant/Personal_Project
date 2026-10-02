"use client";

import {useEffect, useRef, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {ResumePlaceholder} from "@/components/ResumePlaceholder";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

const MAX_PAGE_WIDTH = 816;

export const ResumeDocument = ({file}: { file: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>();
    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) =>
            setWidth(Math.min(entry.contentRect.width, MAX_PAGE_WIDTH)),
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="w-full">
            <Document
                file={file}
                onLoadSuccess={({numPages}) => setNumPages(numPages)}
                loading={<ResumePlaceholder/>}
                error={<ResumePlaceholder message="Couldn't display the resume here. Use the Download PDF button above."/>}
                externalLinkTarget="_blank"
                className="flex flex-col items-center gap-6"
            >
                {width !== undefined &&
                    Array.from({length: numPages}, (_, i) => (
                        <Page
                            key={i}
                            pageNumber={i + 1}
                            width={width}
                            className="overflow-hidden rounded-lg shadow-2xl"
                        />
                    ))}
            </Document>
        </div>
    );
};
