import React, {useState, useEffect} from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import SearchPageMsg from './SearchPageMsg';
import SearchBar from './SearchBar';
import {useNavigate} from 'react-router-dom'
// import SearchResultMsg from './SearchResultMsg';
// import FeedSearchResult from './FeedSearchResult'
// import UserSearchResult from './UserSearchResult'
// import SearchResult from './SearchResult'

function Search() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('access-token')===null) {
      window.location.replace("/user/login")
    }
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Header></Header>
        <SearchPageMsg></SearchPageMsg>
        <SearchBar></SearchBar>
        {/* <SearchResult></SearchResult> */}
        {/* <SearchResultMsg></SearchResultMsg> */}
        {/* <FeedSearchResult></FeedSearchResult> */}
        {/* <UserSearchResult></UserSearchResult> */}
        <Footer></Footer>
      </div>
    </ChakraProvider>
  );
}

export default Search;

