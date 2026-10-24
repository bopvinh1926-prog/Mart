import { useEffect, useState } from "react";
import pic1 from '../../assets/nen-form.jpg';
import pic2 from '../../assets/nen-form2.jfif';
import pic3 from '../../assets/nen-form3.jpg';
import pic4 from '../../assets/21847b9c-d882-47f0-b245-9b51117c75d0.jpg';
import './SlideShow.css'

export default function SlideShow() {
    const pictures = [
        pic1, pic2, pic3, pic4
    ];
    const [currPic,setCurrPic] = useState(0);
    const handleClick = (navigation) => {
        setCurrPic((prev) => (prev + navigation + pictures.length) % pictures.length);
      };
    
      // Tự động chuyển slide
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrPic((prev) => (prev + 1) % pictures.length);
        }, 9000);
    
        return () => clearInterval(timer);
    }, [currPic]); // Reset 4s khi currPic thay đổi
    return(
        <div className="slideShow">
            {pictures.map((pic, index) => (
                <img
                key={index}
                src={pic}
                alt={`slide-${index}`}
                className={index === currPic ? 'active' : ''}
                />
            ))}
            <div className="overlay"></div>
            <div className="btn-group">
                <button onClick={()=>handleClick(-1)}>{"<"}</button>
                <button onClick={()=>handleClick(+1)}>{">"}</button>
            </div>
        </div>
   
    )
}