import React, { FC } from "react";
import type { HeadFC, PageProps } from "gatsby";
import DefaultLayout from '../components/DefaultLayout';
import ProjectCard from '../components/ProjectCard';
import { motion } from "framer-motion";

const ProjectsPage: React.FC<PageProps> = () => {
  return (
    <DefaultLayout>
      <motion.section
        id="work"
        className="space-y-12 px-8 md:px-24"
        layout
      >
        <h1 className="text-white font-openSans text-center text-4xl font-bold mt-6 leading-tight tracking-tighter">
          My Work
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard title='title' techTitle='techtititle' description='description' repoLink='repolink' index={1} />
          <ProjectCard title='title2' techTitle='techtititle2' description='description2' repoLink='repolink2' index={2} />
        </div>
      </motion.section>
    </DefaultLayout >
  );

};

export default ProjectsPage;

export const Head: HeadFC = () => <title>Suven Pandey: Projects</title>;
