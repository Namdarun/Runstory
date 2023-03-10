import React, {useState, useEffect} from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Tabs, TabList, TabPanels, Tab, TabPanel
  } from '@chakra-ui/react';
import axios from '../common/axios';
import axioswithH from '../api/axios';
// import SearchResult from "./SearchResult";
import UserSearchResult from './UserSearchResult';
import FeedSearchResult from './FeedSearchResult';
import RunningCrewSearchResult from './RunningCrewSearchResult';

const SearchBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [tabIndex, setTabIndex] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState();
    const [realKeyword, setRealKeyword] = useState();
    const [userResult, setUserResult] = useState([]);
    const [feedResult, setFeedResult] = useState([]);
    const [runningCrewResult, setRunningCrewResult] = useState([]);

    const handleKeywordChange = ({ target: { value } }) => setSearchKeyword(value); // 검색어 가지고 있기

    const handleSubmit = (event) => { // 검색 버튼 클릭 시 이벤트 함수
        event.preventDefault();
        setRealKeyword(searchKeyword)
        onClose()
    };

    function search(keyword) {
        // console.log(keyword)
        setFeedResult(getFeedSearchResult(keyword));
        setRunningCrewResult(getRunningCrewSearchResult(keyword));
    }

    async function getFeedSearchResult(keyword) {
        
        const data = await axioswithH({
            url: '/search',
            method: "POST",
            data: {
                type: 1, keyword: keyword, lastId: 1000
            },
            header: {
                Authorization: localStorage.getItem('access-token')
            }
        });
        // console.log(data)
    }

    async function getRunningCrewSearchResult(keyword) {
        const data = await axioswithH({
            url: '/search',
            method: "POST",
            data: {
                type: 2, keyword: keyword, lastId: 1000
            },
            header: {
                Authorization: localStorage.getItem('access-token')
            }
        });
        
    }

    const [hashtags, setHashtags] = useState([]);
  
    useEffect(() => { // 해시태그 목록 가져오기
        (async () => {
            const res = await axios({url: '/feed/hashtag', method: "GET"});
            setHashtags(res.data.data);
          })();
    }, []);

    return (
    <div className="search-input">
        <Modal isOpen={isOpen} onClose={onClose} size='sm' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>검색창</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form className="search-input" onSubmit={handleSubmit}>
                            <Input width='50%' size='m' variant='flushed' placeholder='검색어를 입력해주세요' value={searchKeyword} textAlign='center' ms={3} onChange={handleKeywordChange} />
                            <button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                        </form>
                        <div className="hashtag-description" style={{textAlign: 'center', marginTop: '20px', marginBottom: '10px', fontSize: '13px'}}>피드 검색은 해시태그를 기반으로 이루어집니다. 해시태그 목록은 다음과 같습니다.</div>
                        {hashtags.map((item, idx) => {
                            return (
                            <div style={{display: 'inline-block'}}>
                                <button
                                value={item.hashtagId}
                                key={idx}
                                type='button'            
                                className="hashtag-selected"
                                >
                                # {item.hashtagName}
                                </button>
                            </div>
                            );
                        })}
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Input readOnly width='50%' size='m' variant='flushed' placeholder='검색하러가기' value={searchKeyword} textAlign='center' ms={3} onClick={onOpen} />
            <button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            {/* <SearchResult></SearchResult> */}
            <Tabs marginTop='15px' colorScheme="pink" isFitted='true' onChange={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab id="user">USER</Tab>
                    <Tab id="feed">FEED</Tab>
                    <Tab id="running">RUNNING CREW</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UserSearchResult keyword={realKeyword}></UserSearchResult>
                    </TabPanel>
                    <TabPanel>
                        <FeedSearchResult keyword={searchKeyword}></FeedSearchResult>
                    </TabPanel>
                    <TabPanel>
                        <RunningCrewSearchResult keyword={searchKeyword}></RunningCrewSearchResult>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </div>
    );
}

export default SearchBar;