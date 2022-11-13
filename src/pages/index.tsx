import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import DefaultLayout from '../components/DefaultLayout';

const IndexPage: React.FC<PageProps> = ({ location }) => {
  return (
    <DefaultLayout>
      This is the index page.
    </DefaultLayout>
  );

};

export default IndexPage;

export const Head: HeadFC = () => <title>Suven Pandey</title>;
