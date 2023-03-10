import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import UserSearchResult from './UserSearchResult';
import FeedSearchResult from './FeedSearchResult';

const SearchResult = () => {
    return (
        <div>
            <Tabs marginTop='15px' colorScheme="pink" isFitted='true'>
                <TabList>
                    <Tab>USER</Tab>
                    <Tab>FEED</Tab>
                    <Tab>RUNNING CREW</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UserSearchResult></UserSearchResult>
                    </TabPanel>
                    <TabPanel>
                        <FeedSearchResult></FeedSearchResult>
                    </TabPanel>
                    <TabPanel>
                        <FeedSearchResult></FeedSearchResult>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}

export default SearchResult;