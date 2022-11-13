import React from 'react';
import 'twin.macro';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <footer
            tw='w-full bg-inherit border-t border-solid border-gray-500 dark:border-slate-500 py-2'
        >
            <div tw="text-sm text-black dark:text-slate-200 flex flex-col gap-2 items-center">
                <button tw="text-cyan-500" onClick={scrollToTop}>
                    <span tw="text-2xl">&uarr;</span>
                    Go to top
                </button>
                <p>Copyright © 2022 Suven Pandey</p>
            </div>
        </footer >
    );
}

export default Footer;
