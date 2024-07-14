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
        <div className='bg-slate-800 flex justify-center items-center gap-4 fixed top-[6rem] right-[3rem] border rounded-3xl py-3 px-6 z-50'>
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
                <img src='/icons/openExternal.svg' alt='Open' className='w-4 h-4' />
            </a>
        </div>
    );
}

export default Resume;
