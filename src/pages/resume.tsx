import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Header from '../components/Navbar';
import DefaultLayout from '../components/DefaultLayout';

const ResumePage: React.FC<PageProps> = ({ location }) => {
  return (
    <DefaultLayout location={location.pathname}>
      This is the resume page.
    </DefaultLayout>
  );

};

export default ResumePage;

export const Head: HeadFC = () => <title>Suven Pandey: Resume</title>;
