import React from 'react';
import Header from './Navbar';
import 'twin.macro';
import Footer from './Footer';

function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <div tw='bg-slate-100 h-[100vh] dark:(bg-zinc-900 text-white) flex flex-col'>
      <Header />
      <div tw='h-[5rem] invisible shrink-0'></div>
      <main
        tw="bg-inherit grow"
        aria-label="Content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
