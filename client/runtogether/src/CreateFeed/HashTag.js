import React, {useState, useEffect} from 'react';
import './HashTag.css';
import axios from '../common/axios';

const HashTag = ({selectedHashtagsId, selectedHashtagsName}) => {
  const [hashtags, setHashtags] = useState([]);
  // const [selectedHashtags, setSelectedHashtags] = useState(new Set())
  useEffect(() => {
    (async () => {
      const res = await axios({url: '/feed/hashtag', method: "GET"});
      setHashtags(res.data.data);
    })();
  }, []);

    function clickHashtag(e) {
      if(e.target.classList.contains("hashtag-selected")) {
          e.target.classList.remove('hashtag-selected');
          e.target.classList.add('hashtag');
          selectedHashtagsId.delete(e.target.value)
          selectedHashtagsName.delete(e.target.id)
      }
      else {
          e.target.classList.remove('hashtag')
          e.target.classList.add('hashtag-selected')
          selectedHashtagsId.add(e.target.value)
          selectedHashtagsName.add(e.target.id)
      }
    }

  return (
    <div className="container">
      {hashtags.map((item, idx) => {
        return (
          <>
            <button
              value={item.hashtagId}
              key={idx}
              type='button'
              // hashtag: 회색, hashtag selected: 빨강
              onClick={clickHashtag}                
              className="hashtag"
              id={item.hashtagName}
            >
              # {item.hashtagName}
            </button>
          </>
        );
      })}
    </div>
  );
}

export default HashTag;
