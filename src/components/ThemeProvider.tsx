import React, { useState, useEffect, PropsWithChildren } from 'react';

export const ThemeContext = React.createContext({ contextTheme: 'dark', setContextTheme: (value: string | ((old: string) => string)) => { } });

export const ThemeProvider: React.FC = ({ children }: PropsWithChildren) => {
    let savedTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
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
