import React, { ReactNode, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Window from './Window';

// TODO: Add arrow command support
// TODO: Parse escaped quotation marks

interface Commands {
    [key: string]: (args: any[]) => ReactNode;
}
function Terminal({ initialPrompt, commands }: { initialPrompt: string, commands: Commands; }) {
    const [history, setHistory] = useState(['help'] as string[]);
    const [currentCommand, setCurrentCommand] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const inputPrompt = (
        <div id="inputPrompt" className='flex gap-2'>
            <label>
                {initialPrompt}
            </label>
            <input type='text' id="newCommand" autoComplete='off' ref={inputRef} className='bg-inherit grow focus-visible:outline-none' value={currentCommand} onChange={(e) => setCurrentCommand(e.target.value)} />
        </div>
    );
    const onCommandEnter: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (currentCommand === 'clear') {
            setHistory([]);
            setCurrentCommand('');
            return;
        }
        setHistory((currentHistory) => [...currentHistory, currentCommand]);
        setCurrentCommand('');
    };
    return (
        <Window title='Terminal' onClick={() => inputRef.current && inputRef.current.focus()}>
            {history.map((command, index) => {
                return (
                    <div key={index}>
                        <div>
                            <span className="mr-2"> {">"}</span>
                            <span className={`${Array.from(Object.keys(commands)).includes(command) ? "text-green-500" : "text-red-500"}`}>{command}</span>
                        </div>
                        {
                            getCommandExecutionResult(command, commands)
                        }
                    </div>
                );
            })}
            <form onSubmit={onCommandEnter} >
                {inputPrompt}
            </form>
        </Window>
    );
}

function getCommandExecutionResult(command: string, commands: Commands) {
    // Test with `apples bananas "apples and bananas" 'pears and strawberries' 'mangoes "and" apples' "apples 'and' mangoes" "apples and bananas and pears"`
    if (!command) {
        return null;
    }
    const [baseCommand, ...args] = command
        .match(/'([^']+)'|"([^"]+)"|([^\s]+)/g)!
        .map(st => st.replace(/(^['"])|['"]$/g, ""));
    if (baseCommand in commands) {
        return (
            <div>
                {commands[baseCommand](args)}
            </div>
        );
    }
    else {
        return (
            <div>
                {`${baseCommand}: command not found`}
            </div>
        );
    }
}

export default Terminal;
