import React, {useState, useRef} from 'react';
import { Avatar  } from '@chakra-ui/react';
import './SettingMyPagePhoto.css';
import imageCompression from 'browser-image-compression';
    
// 본인의 이미지 버튼 수정 ->
// 여기서 구현하고 마이페이지로 넘길 것
// 원래는 본인의 상태
// 이미지를 변경하는 버튼 구현  
// 버튼 클릭하면 이미지들 볼 수 있고,
// 입력하면 프로필에 이미지 등록

function SettingMyPagePhoto(){
  const [selectedImage, setSelectedImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const fileInput = useRef(null)

  const onChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setSelectedImage(file)
    }else{ //업로드 취소할 시
      setSelectedImage(selectedImage)
      return
    }

    //화면에 프로필 사진 표시
    const encodeFile = (file) => {
      reader.readAsDataURL(file);
    }
    
    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 100,
    }).then((compressedFile) => {
      const newFile = new File([compressedFile], file.name, {type: file.type});
      encodeFile(newFile);
      setSelectedImage(newFile);
    })
  
    const reader = new FileReader();
    return new Promise ((resolve) => {
      reader.onload = () => {
        if(reader.readyState === 2){
          setSelectedImage(reader.result)
          resolve();
    }}
    reader.readAsDataURL(e.target.files[0])
  })
    }
    
    return (
      <>
        <Avatar
            className='product-img'
            src={selectedImage} 
            style={{margin:'20px' ,width:'100px', height:'100px'}} 
            onClick={()=>{fileInput.current.click()}}/>
          <input 
            type='file' 
            style={{display:'none'}}
            accept='image/jpg,impge/png,image/jpeg'
            name='profile_img'
            onChange={onChange}
            ref={fileInput}/>
      {/* <div className="img-wrap img-upload">
        {selectedImage && (
          <img src={Imagefile} ref={fileInput}/>)} 
        </div> */}
    </>
  );
};

export default SettingMyPagePhoto;


