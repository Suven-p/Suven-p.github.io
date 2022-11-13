import React from 'react';
import Header from './Navbar';
import 'twin.macro';

function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <div tw='bg-slate-100 h-[100vh] dark:(bg-zinc-900 text-white)'>
      <Header />
      <main
        tw="relative top-[5rem] bg-inherit"
        aria-label="Content">
        {children}
      </main>
    </div>
  );
}

export default DefaultLayout;
