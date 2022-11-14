import React, { ReactNode, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Window from './Window';

// TODO: Add arrow command support
// TODO: Parse escaped quotation marks

interface Commands {
    [key: string]: (args: any[]) => ReactNode;
}
function Terminal({ initialPrompt, commands }: { initialPrompt: string, commands: Commands; }) {
    const [history, setHistory] = useState(['echo', 'echo'] as string[]);
    const [currentCommand, setCurrentCommand] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const inputPrompt = (
        <div id="inputPrompt" className='flex gap-2'>
            <label>
                {initialPrompt}
            </label>
            <input type='text' id="newCommand" ref={inputRef} className='bg-inherit grow focus-visible:outline-none' value={currentCommand} onChange={(e) => setCurrentCommand(e.target.value)} />
        </div>
    );
    const onCommandEnter: React.FormEventHandler<HTMLFormElement> = (e) => {
        setHistory((currentHistory) => [...currentHistory, currentCommand]);
        setCurrentCommand('');
        e.preventDefault();
    };
    return (
        <Window title='Terminal' onClick={() => inputRef.current && inputRef.current.focus()}>
            {history.map((command, index) => {
                return (
                    <>
                        <div key={index} className="flex gap-2">
                            <span>{initialPrompt}</span>
                            <span className="grow">{command}</span>
                        </div>
                        {
                            getCommandExecutionResult(command, commands)
                        }
                    </>
                );
            })}
            <form onSubmit={onCommandEnter} >
                {inputPrompt}
            </form>
        </Window>
    );
}

Terminal.propTypes = {
    commands: {
        string: PropTypes.func
    }
};
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
