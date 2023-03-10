import React from 'react';
import './ImgUpload.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";


const ImgUpload = (props) => {
    const fileInput = React.useRef(null);

    const handleButtonClick = e => {
        fileInput.current.click();
    };

    const deleteImg = (index) => {
      const imgArr = (props.image).filter((item, idx) => idx !== index)
      const imgNameArr = (props.preview).filter((item, idx) => idx !== index )
    
      props.setImage([...imgArr])
      props.setPreview([...imgNameArr])
    }

    const handleChange = e => {
      let reader = new FileReader()
      if(e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
        
        props.setImage([...(props.image), e.target.files[0]])
      }
      reader.onloadend = () => {
        const previewImgUrl = reader.result
    
        if(previewImgUrl) {
          props.setPreview([...(props.preview), previewImgUrl])
        }
      }
    }

  return (
    <React.Fragment>
      <div className='preview-box' id='preview-box' style={{display: 'none'}}></div>
      {props.preview!=undefined && props.preview.map((item, idx) => {
        return(<>
          <img className='preview-box' src={props.preview[idx]} />
          <div style={{borderRadius: '20px', backgroundColor: '#EEB6B6', textAlign: 'center', width: '10%', height: '20px', lineHeight: '20px',
        fontSize: '14px', margin: '0 auto', marginBottom: '20px', fontWeight: 'bold'}} onClick={() => deleteImg(idx)}>삭제</div>
          </>
        )
      })}
      <div className='upload-box' id='upload-box' onClick={handleButtonClick}><FontAwesomeIcon icon={faPlusCircle} /></div>
      <input type="file"
            accept="image/*"
            ref={fileInput}
            onChange={handleChange}
            style={{ display: "none" }} />
    </React.Fragment>
  )
}

export default ImgUpload;
