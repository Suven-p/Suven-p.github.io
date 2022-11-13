import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import DefaultLayout from '../components/DefaultLayout';

const AboutPage: React.FC<PageProps> = () => {
  return (
    <DefaultLayout>
      This is the about page.
    </DefaultLayout>
  );

};

export default AboutPage;

export const Head: HeadFC = () => <title>Suven Pandey</title>;
