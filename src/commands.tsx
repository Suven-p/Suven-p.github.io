import React, { ReactNode } from 'react';

const files: { [key: string]: ReactNode; } = {
    "about": "Hi! I am Suven Pandey. I am a full-stack developer.\n",
    "contact": <>You can contact me at <a href="mailto:pandeysuven@gmail.com">pandeysuven@gmail.com.</a></>,
};

export default {
    help: () => {
        return (
            <>
                <div>Available commands:</div>
                <div>help</div>
                <div>cat</div>
                <div>clear</div>
                <div>echo</div>
                <div>date</div>
                <div>ls</div>
            </>
        );
    },
    echo: (args: string[]) => {
        return args.join(' ');
    },
    date: () => {
        return (new Date()).toString();
    },
    ls: () => {
        return Object.keys(files).join(' ');
    },
    cat: (args: string[]) => {
        if (args.length === 0) {
            return "cat: missing file operand";
        }
        const [file] = args;
        let result = '';
        if (args.filter(arg => (arg in files)).length !== args.length) {
            return `cat: ${args.filter(arg => !(arg in files)).join(' ')}: No such file or directory`;
        }
        return (
            <>
                {args.map((file, index) => {
                    return (
                        <>
                            {files[file]}
                            {index !== args.length - 1 && <br />}
                        </>
                    );
                })
                }
            </>
        );
    },
};
