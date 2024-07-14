import React, { FC } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Document, Page, pdfjs } from 'react-pdf';

const Resume: React.FC = () => {
    const [scale, setScale] = React.useState(150);
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    return (
        <DefaultLayout>
            <ZoomToolBar scale={scale} setScale={setScale} />
            <div className='flex justify-center align-middle my-8 px-4 w-full'>
                <Document file='/SuvenPandey.pdf' className='max-w-[95vw]'>
                    <Page pageNumber={1} scale={scale / 100} renderAnnotationLayer={false} renderTextLayer={false} className='!max-w-[100%] !min-w-[10%] overflow-auto'>
                    </Page>
                </Document>
            </div>

        </DefaultLayout>
    );
};

interface ZoomToolBarProps {
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
}

const ZoomToolBar: FC<ZoomToolBarProps> = ({ scale, setScale }) => {
    const minValue = 10, maxValue = 500;
    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + 10, maxValue));
    }
    const handleZoomOut = () => {
        setScale((prev) => Math.max(prev - 10, minValue));
    }
    return (
        <div className='bg-slate-200 dark:bg-slate-800 flex justify-center items-center gap-4 fixed top-[6rem] right-[3rem] border rounded-3xl py-3 px-6 z-50'>
            <button
                className='flex justify-center items-center dark:text-white text-3xl w-6 h-6 rounded-full disabled:opacity-50'
                onClick={handleZoomIn}
                disabled={scale >= maxValue}
            >+</button>
            <button className='dark:text-white '>{Math.trunc(scale)}%</button>
            <button
                className='flex justify-center items-center dark:text-white text-3xl w-6 h-6 rounded-full disabled:opacity-50'
                onClick={handleZoomOut}
                disabled={scale <= minValue}
            >-</button>
            <a
                href='/SuvenPandey.pdf'
                target='_blank'
                rel='noreferrer'
                className='text-black dark:text-slate-300 visited:text-black'
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 fill-black dark:fill-white'><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>

            </a>
        </div>
    );
}

export default Resume;
