import type {Metadata} from "next";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["vietnamese"]});

export const metadata: Metadata = {
    title: "Modding Tools | MSD TOOL",
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
        <main className={inter.className}>
            {children}
        </main>
    );
}
