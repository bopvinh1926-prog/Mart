import { useState } from "react";
import pic1 from '../../assets/nen-form.jpg';
import pic2 from '../../assets/nen-form2.jfif';
import pic3 from '../../assets/nen-form3.jpg';
import pic4 from '../../assets/nen-form4.jpg';
import './SlideShow.css'

export default function SlideShow() {
    const pictures = [
        pic1, pic2, pic3, pic4
    ];
    const [currPic,setCurrPic] = useState(0);
    const handleClick =(navigation)=>{
        const nextPic = currPic+navigation
        if(nextPic >=    pictures.length){
            setCurrPic(0);
        }
        else if(nextPic<0){
            setCurrPic(pictures.length-1)
        }
        else{
            setCurrPic(nextPic)
        }
    }
    console.log(currPic)
    return(
        <div className="slideShow">
            <img className="banner" src={pictures[currPic]}></img>
            <div className="overlay"></div>
            <div className="btn-group">
                <button onClick={()=>handleClick(-1)}>{"<"}</button>
                <button onClick={()=>handleClick(+1)}>{">"}</button>
            </div>
        </div>
   
    )
}