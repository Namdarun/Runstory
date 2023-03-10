import React, {useState, useEffect} from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BetweenBodyFooter from '../common/BetweenBodyFooter';
import RecruitCrewPageMsg from './RecruitCrewPageMsg';
import ArticleForm from './ArticleForm';

function RecruitCrew() {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Header></Header>
        <RecruitCrewPageMsg></RecruitCrewPageMsg>
        <ArticleForm></ArticleForm>
        <BetweenBodyFooter></BetweenBodyFooter>
        <Footer></Footer>
      </div>
    </ChakraProvider>
  );
}

export default RecruitCrew;
