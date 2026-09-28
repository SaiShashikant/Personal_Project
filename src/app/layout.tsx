import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Analytics} from "@vercel/analytics/next";
import "./globals.css";
import {ThemeProvider} from "@/app/provider";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Sai's Portfolio",
    description: "Modern & Minimalist JS Mastery Portfolio",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}><ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        <Analytics/>
        </body>
        </html>
    );
}
