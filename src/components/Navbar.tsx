import React, { useContext, useState } from 'react';
import tw from 'twin.macro';
import { css } from "@emotion/react";
import styled from '@emotion/styled';
import 'twin.macro';
import { StaticImage } from "gatsby-plugin-image";
import { ThemeContext } from './ThemeProvider';
import sunImage from '../images/sun.png';
import moonImage from '../images/moon.png';
import { Link } from 'gatsby';

function MainLogo() {
    const style = css`
        height: 100%;
        & > * {
            height: 100%;
        }
    `;
    // Loads both light and dark images but conditional rendering breaks image for first visit
    return (
        <>
            <StaticImage src={`../images/icon_dark.svg`} alt="Suven Pandey" css={[style, tw`hidden dark:block`]} />
            <StaticImage src={`../images/icon_light.svg`} alt="Suven Pandey" css={[style, tw`block dark:hidden`]} />
        </>
    );
}

const ToggleButton = styled.div(({ toggleWidth, toggleHeight, toggleGap, checked }: { toggleWidth: string, toggleHeight: string; toggleGap: string; checked: boolean; }) => [
    `&:before {
        content: '';
        background: url(${sunImage});
        left: ${toggleGap};
        bottom: ${toggleGap};
        height: calc(${toggleHeight} - (${toggleGap} * 2));
        width: calc(${toggleHeight} - (${toggleGap} * 2));
        position: absolute;
        transition: .4s;
    }

    .dark &:before {
            transform: translateX(calc(${toggleWidth} - ${toggleHeight}));
            background: url(${moonImage});
        }
    `,
    tw`bg-slate-300 dark:bg-slate-600 absolute inset-0 rounded-3xl cursor-pointer`,
]);

function Links({ links }: { links: Array<Array<string>>; }) {
    return (
        <>
            {
                links.map(([title, path]) => {
                    return (
                        <Link to={path} key={title}
                            css={[tw`text-black dark:text-slate-300 visited:text-black`]}
                            activeStyle={tw`text-cyan-500 hover:text-cyan-500`}
                        >{title}</Link>
                    );
                })
            }
        </>
    );
}

function Navbar() {
    const [menuExpanded, setMenuExpanded] = useState(false);
    const toggleExpanded = () => {
        console.log('Setting expanded to ', !menuExpanded);
        setMenuExpanded((currentValue) => !currentValue);
    };
    const links = [
        ['Home', '/'],
        ['About', '/about/'],
        ['Projects', '/projects/'],
        ['Resume', '/resume/']
    ];
    return (
        <>
            <label tw="block cursor-pointer mx-4 sm:hidden" htmlFor="nav-trigger" >
                <input type="checkbox" checked={menuExpanded} id="nav-trigger" onChange={toggleExpanded} tw="hidden" />
                <span>
                    <svg viewBox="0 0 18 15" width="18px" height="15px" tw="fill-black dark:fill-white">
                        <path
                            d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.032C17.335,0,18,0.665,18,1.484L18,1.484z M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.032C17.335,6.031,18,6.696,18,7.516L18,7.516z M18,13.516C18,14.335,17.335,15,16.516,15H1.484 C0.665,15,0,14.335,0,13.516l0,0c0-0.82,0.665-1.483,1.484-1.483h15.032C17.335,12.031,18,12.695,18,13.516L18,13.516z" />
                    </svg>
                </span>
            </label>
            <div css={[tw`hidden`, menuExpanded && tw`flex flex-col gap-2 fixed top-[50px] right-[35px] bg-slate-300 dark:bg-slate-800 rounded-sm z-50 pl-2 pr-4`, tw`sm:(flex flex-row gap-4 static bg-transparent dark:bg-transparent rounded-none p-0)`,]}>
                <Links links={links} />
            </div>
        </>
    );
}

function Header() {
    const { contextTheme, setContextTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        setContextTheme((oldTheme) => {
            const newTheme = oldTheme === 'light' ? 'dark' : 'light';
            return newTheme;
        });
    };
    const isDarkMode = contextTheme === 'dark';
    const toggleWidth = '50px';
    const toggleHeight = '30px';
    const toggleGap = '3px';
    return (
        <header
            role="banner"
            tw="fixed top-0 w-full h-[5rem] z-50 bg-inherit flex justify-between items-center px-5 py-1 border-b border-solid border-gray-500 dark:border-slate-500 max-h-[50vh]"
        >
            <a rel="author" href="/" tw="h-full max-h-[50vh]">
                <MainLogo />
            </a>



            <nav tw="flex items-center gap-4">
                <Navbar />
                <label htmlFor="theme-toggle" css={[tw`relative w-[${toggleWidth}] h-[${toggleHeight}]`]} >
                    <input type="checkbox" checked={isDarkMode} id="theme-toggle" tw="hidden" onChange={toggleTheme} />
                    <ToggleButton toggleWidth={toggleWidth} toggleHeight={toggleHeight} toggleGap={toggleGap} checked={isDarkMode} />
                </label>
            </nav>
        </header>
    );
}

export default Header;
