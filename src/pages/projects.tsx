import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import DefaultLayout from '../components/DefaultLayout';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const ProjectsPage: React.FC<PageProps> = () => {
    return (
        <DefaultLayout>
            <motion.section
                id='work'
                className='space-y-12 px-8 md:px-24'
                layout
            >
                <h1 className='text-white font-openSans text-center text-4xl font-bold mt-6 leading-tight tracking-tighter'>
                    My Work
                </h1>
                <div className='grid md:grid-cols-2 gap-6'>
                    <ProjectCard
                        title='Fitness Flow'
                        techTitle=''
                        description='Flow into fitness with fitness flow'
                        repoLink='https://github.com/Suven-p/treasurehacks'
                        index={1}
                    />
                    <ProjectCard
                        title='Collabworks'
                        techTitle=''
                        description='A platform for developers to collaborate on hackathons'
                        repoLink='https://github.com/Suven-p/collabworks'
                        index={2}
                    />
                    <ProjectCard
                        title='Orchid'
                        techTitle=''
                        description='Visualize your projects and designs with Orchid'
                        repoLink='https://github.com/polarvoid/orchid'
                        index={2}
                    />
                    <ProjectCard
                        title='Deia'
                        techTitle=''
                        description='Diversity, Equitable, Inclusive and Accessible internet for every'
                        repoLink='https://github.com/chalory/support-a-thon'
                        index={2}
                    />
                    <ProjectCard
                        title='Online Job Portal'
                        techTitle=''
                        description='Ontology based job recommendation system'
                        repoLink='https://github.com/Suven-p/online_job_portal'
                        index={2}
                    />
                    <ProjectCard
                        title='Pacman'
                        techTitle=''
                        description='A recreation of the classic game Pacman'
                        repoLink='https://github.com/Suven-p/Pacman_OpenGL'
                        index={2}
                    />
                </div>
            </motion.section>
        </DefaultLayout>
    );
};

export default ProjectsPage;

export const Head: HeadFC = () => <title>Suven Pandey: Projects</title>;
