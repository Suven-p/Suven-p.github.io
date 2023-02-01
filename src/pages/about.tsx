import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import DefaultLayout from '../components/DefaultLayout';
import Skills from '../components/Skills';

const skills = [
    // Languages
    'C',
    ['C++', '/icons/cpp.svg'],
    'Javascript',
    'Typescript',
    'Python',
    'HTML',
    'CSS',
    'Go',
    'Rust',
    'Flutter',
    // Frameworks
    'PyTorch',
    'Express',
    'Nodejs',
    'React',
    'Nextjs',
    'Gatsby',
    ['Jekyll', '/icons/jekyll.svg'],
    ['Gulp', '/icons/gulp.svg'],
    'Webpack',
    // Developer Tools
    'Azure',
    'Netlify',
    'Docker',
    'Git',
    'Github',
    'Linux',
    'Bash',
    // Databases
    'MySQL',
    'MongoDB',
    'Firebase',
    // Design
    'Blender',
    'Figma',
    // CSS Frameworks
    'Bootstrap',
    'TailWindCSS',
    'MaterialUI',
    // Testing
    'Selenium',
    'Jest',
];

const AboutPage: React.FC<PageProps> = () => {
    return (
        <DefaultLayout>
            <div className='w-full flex p-8'>
                <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal grow'>
                    <div className='mb-8'>
                        <div className='text-gray-900 font-bold text-xl mb-2'>
                            About Me
                        </div>
                        <p className='text-gray-700 text-base'>
                            Hey, I'm Suven Pandey. I am a student from Nepal
                            currently pursuing undergraduate in Computer
                            Engineering. I'm currently exploring Reinforcement
                            Learning.
                        </p>
                    </div>
                </div>
                <div className='w-[20vw] min-h-full h-auto rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'>
                    <img
                        src='/workdesk.jpg'
                        alt='Stock image for workdesk'
                        className='w-full h-auto object-fill'
                    />
                </div>
            </div>
            <h1 className='font-bold text-xl mb-4 text-center'>My Skills</h1>
            <div className='m-8 bg-gray-800 p-4 rounded-lg'>
                <Skills skills={skills} />
            </div>
        </DefaultLayout>
    );
};

export default AboutPage;

export const Head: HeadFC = () => <title>Suven Pandey</title>;
