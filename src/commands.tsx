export default {
    echo: (args: string[]) => {
        return args.join(' ');
    },
    date: () => {
        return (new Date()).toString();
    }
};
