import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import DefaultLayout from '../components/DefaultLayout';

const ProjectsPage: React.FC<PageProps> = ({ location }) => {
  return (
    <DefaultLayout>
      This is the projects page.
    </DefaultLayout>
  );

};

export default ProjectsPage;

export const Head: HeadFC = () => <title>Suven Pandey: Projects</title>;
