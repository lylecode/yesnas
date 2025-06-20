import Logo from '@/components/layout/Logo';
import Menu from '@/components/layout/Menu';
// import { Noto_Sans_SC } from "next/font/google";

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import { Providers } from './providers';

// const notoSansSC = Noto_Sans_SC({
//   weight: "400",
// });

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html suppressHydrationWarning lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <div className="grid h-screen grid-rows-[1fr]">
              {/* <div className="bg-gray-20 flex w-full flex-row items-center justify-between border-b border-b-gray-200 px-5">
              <Language />  
            </div> */}
              <div className="flex flex-1 overflow-hidden">
                <div className="hidden w-56 flex-none border-r border-gray-200 bg-white md:block">
                  <Logo />
                  <Menu />
                </div>
                <div className="bg-gray-20 flex-1 overflow-auto">{children}</div>
              </div>
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
