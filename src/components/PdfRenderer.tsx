import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';

const PDFRenderer: React.FC<{ file: string; }> = ({ file }) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy) {
        setNumPages(numPages);
    }
    return (
        <div>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
};

export default PDFRenderer;
