import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {HStack, Box, Button, Spacer, Heading, Stack, StackDivider, Text, Image, Divider, ButtonGroup} from '@chakra-ui/react';
import axios from '../api/axios'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


function RunningDetail(props){
    var api = "https://i8a806.p.ssafy.io/runstory/running/" + props.imgFileName;
    return(
        <Card maxW='sm'>
        <CardBody style={{height:"30%", width:"50%"}}>
            <Image
            src= {api}
            alt='잘못된 정보입니다.'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading style={{fontSize:"13px"}}>{props.crewName}</Heading>
            <p style={{marginTop:"0px", fontSize:"10px"}}>시작 위치 : {props.startLocation}</p>
            <p style={{marginTop:"0px", fontSize:"10px"}}>시작 시간 : {props.startTime}</p>
            </Stack>
        </CardBody>
        </Card>
    )   
}

export default RunningDetail;
