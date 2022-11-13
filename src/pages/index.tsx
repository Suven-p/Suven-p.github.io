import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import DefaultLayout from '../components/DefaultLayout';
import styled from '@emotion/styled';
import 'twin.macro';
import handwaving from '../images/hand_wave_animated.svg';
import Terminal from '../components/Terminal';

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 6fr 4fr;
  align-items: center;
  column-gap: .5rem;
  height: 100%;
`;

const IndexPage: React.FC<PageProps> = () => {
  return (
    <DefaultLayout>
      <MainDiv>
        <div tw="pl-20">
          <p tw="dark:text-cyan-500 text-7xl">
            <span>Hi</span>
            <img src={handwaving} alt="Hand waving GIF" tw="w-[4.5rem] inline relative bottom-2.5" />
          </p>
          <p tw="dark:text-cyan-500 text-5xl">
            <span>I am Suven Pandey.</span>
          </p>
        </div>
        <div className="pr-4 h-[80%]">
          <Terminal />
        </div>
      </MainDiv>
    </DefaultLayout>
  );

};

export default IndexPage;

export const Head: HeadFC = () => <title>Suven Pandey</title>;
