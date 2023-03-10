import React, { useState } from "react";
import "./SignupHashtagList.css";
import {
  Button,
} from '@chakra-ui/react';

function SignupHashtagList() {
  const data = [{id:1, name: '산책'}, 
                {id:2, name: '조깅'}, 
                {id:3, name: '러닝'}, 
                {id:4, name: '조용히'}, 
                {id:5, name: '떠들면서'}, 
                {id:6, name: '혼자'}, 
                {id:7, name: '공원'},
                {id:8, name: '도로'},
                {id:9, name: '한강'},
                {id:10, name: ' 강아지'}];

  const [pick, setPick] = useState(data);
  const [select, setSelect] = useState([]);

  return pick.map((item) => (
    <>
    <div key={item.id}>
       <button 
         onClick={() => {
           !select.includes(item)
           ? setSelect((select) => [...select, item]) 
           : setSelect(select.filter((button) => button !== item));
          }}
          className={
            select.includes(item) ? "hashtag-list-btn table_btn_s" : "hashtag-list-btn table_btn_ns"
          }
          >
         {item.name}
       </button>
     </div>
    </>
   ));
}
   
   export default SignupHashtagList;