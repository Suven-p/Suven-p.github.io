// Workaround for importing images: https://stackoverflow.com/a/51163365/10168590

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}
