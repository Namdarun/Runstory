import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CreateFeedPageMsg from './CreateFeedPageMsg';
import BetweenBodyFooter from '../common/BetweenBodyFooter';
// import HashTag from './HashTag';
import ArticleForm from './ArticleForm';

function CreateFeed() {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Header></Header>
        <CreateFeedPageMsg></CreateFeedPageMsg>
        <ArticleForm></ArticleForm>
        <BetweenBodyFooter></BetweenBodyFooter>
        <Footer></Footer>
      </div>
    </ChakraProvider>
  );
}

export default CreateFeed;
