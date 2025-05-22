"use client";
import Language from "@/components/layout/Language";
import Logo from "@/components/layout/Logo";
import Menu from "@/components/layout/Menu";
import { Noto_Sans_SC } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

const notoSansSC = Noto_Sans_SC({
  weight: "400",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <div className="grid h-screen grid-rows-[4rem_1fr]">
            <div className="bg-gray-20 flex h-16 w-full flex-row items-center justify-between border-b border-b-gray-200 px-5">
              <Logo />
              <Language />
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="bg-gray-20 bgre hidden w-56 flex-none md:block">
                <Menu />
              </div>
              <div className="bg-gray-20 flex-1 overflow-auto">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
