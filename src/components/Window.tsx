import styled from '@emotion/styled';
import { css } from '@emotion/react';
import React from 'react';
import tw from 'twin.macro';

const WindowButton = css`
    &::before, &:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 300ms ease-in-out;
    }
    &:hover:before, &:hover:after {
        top: 50%;
        opacity: 1;
    }
    ${tw`w-4 h-4 rounded-full relative overflow-hidden cursor-pointer`}
`;
const CloseButton = styled.div`
    ${WindowButton}
    background: #fd5e59;
    &:before, &:after {
        width: 1px;
        height: 70%;
        background: #460100;
    }
    &:before {
        transform: translate(-50%, -50%) rotate(45deg);
    }
    &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`;
const MinimizeButton = styled.div`
    ${WindowButton}
    background: #ffbb3b;
    &:before {
        width: 70%;
        height: 2px;
        background: #460100;
    }
`;
const MaximizeButton = styled.div`
    ${WindowButton}
    background: #34c748;
    &:before {
        width: 60%;
        height: 60%;
        background: #024D0F;
    }
    &:after {
        width: 2px;
        height: 100%;
        transform: translate(-50%, -50%) rotate(-45deg);
        background: #00CD4E;
    }
`;

function Window({ title, children }: { title: string, children: React.ReactNode; }) {
    return (
        <div tw="flex flex-col w-full h-full border border-solid border-black dark:border-white rounded-md">
            <div tw="h-[2rem] bg-[#3b3b3b] flex items-center rounded-t-md">
                <div tw="ml-2 flex gap-2">
                    <CloseButton role="button" />
                    <MinimizeButton role="button" />
                    <MaximizeButton role="button" />
                </div>
                <div className="mx-auto text-white">{title}</div>
            </div>
            <div tw="grow p-2 overflow-scroll">
                {children}
            </div>
        </div>
    );
}

export default Window;
