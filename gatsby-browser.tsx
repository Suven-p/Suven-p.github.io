import React from 'react';
import { ThemeProvider } from './src/components/ThemeProvider';
import './src/styles/global.css';

export const wrapRootElement = ({ element }: { element: React.ReactNode; }) => (
    <ThemeProvider>{element}</ThemeProvider>
);
