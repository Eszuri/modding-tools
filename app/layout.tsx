import type {Metadata} from "next";
import {Inter} from "next/font/google";
import './globals.css'
import {Providers} from "@/state/Provider";

const inter = Inter({subsets: ["vietnamese"]});

export const metadata: Metadata = {
    title: "Modding Tools",
    description: "Alat Mod Untuk Game PS2",
    keywords: ["mod god hand", "mod godhand", "godhand", "mod ps2", 're4', "Re4 mod"],
    icons: '/next.svg'
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <Providers>
                <body className={inter.className}>{children}</body>
            </Providers>
        </html>
    );
}
