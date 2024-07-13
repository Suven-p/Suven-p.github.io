import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import DefaultLayout from '../components/DefaultLayout';
import { pdfjs } from 'react-pdf';

const ResumeLazy = React.lazy(() => import('../components/ResumePage'));

const ResumePage = () => {
    const isSSR = typeof window === "undefined";
    return (
        <>
            {!isSSR && (
                <React.Suspense fallback={<div></div>}>
                    <ResumeLazy />
                </React.Suspense>
            )
            }
        </>
    );
};
export default ResumePage;

export const Head: HeadFC = () => <title>Suven Pandey: Resume</title>;
