import React, { useState, useEffect, PropsWithChildren } from 'react';

export const ThemeContext = React.createContext({ contextTheme: 'dark', setContextTheme: (value: string) => { } });

export const ThemeProvider: React.FC = ({ children }: PropsWithChildren) => {
    let savedTheme = localStorage.getItem('theme');
    if (savedTheme !== 'dark' && savedTheme !== 'light') {
        // If matchMedia.matches returns empty string or other falsy value use dark mode
        savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches !== false ? 'dark' : 'light';
        localStorage.setItem('theme', savedTheme);
    }
    const [theme, rawSetTheme] = useState(savedTheme);
    useEffect(() => {
        saveTheme(theme);
    }, [theme]);
    const saveTheme = (newTheme: string) => {
        if (newTheme !== 'dark' && newTheme !== 'light') {
            console.warn('Invalid value of theme');
            newTheme = 'dark';
            rawSetTheme(newTheme);
            return;
        }
        if (newTheme === 'light') {
            window.document.documentElement.classList.remove('dark');
        }
        else {
            window.document.documentElement.classList.add('dark');
        }
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ contextTheme: theme, setContextTheme: rawSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
