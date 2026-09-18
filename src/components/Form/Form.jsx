import { useState } from "react"
import './Form.css'
import SlideShow from "../SlideShow/SlideShow";
import Logo from '../../assets/logo-removebg-preview.png';
import Register from '../Register/Register'
import Management from '../Management/CodeManagement/Sell/Management.jsx'
export default function Form({onLogin,login,onLogout}){
    // chuyển hướng trang qua Register
    const[onRegister,setOnRegister] =useState(false)

    // Sử dụng LocalStorage để lưu danh sách user (listUser)
    const [listUser, setListUser] = useState(() => {
        // Lấy danh sách user từ localStorage, nếu không có trả về mảng rỗng
        const stored = localStorage.getItem("listUser");
        return stored && stored !== "undefined"? JSON.parse(stored) : [];
    });

    const [user,setUser] = useState(
        {name:"",password:""}
    )
    const [showPass,setShowPass] = useState(false);
    const handleChange = (e)=>{
        const{name,value} =e.target;
        setUser((prev)=>({
            ...prev,[name]:value
        }))
    }
    if(onRegister){
        return <Register handleRegister={setListUser} listUser={listUser}/>
    }
    if(login){
        return(
            <> 
                <Management/>
            </>
        )
    }
    function handleCheck(user) {
        return listUser.some(acc =>
            acc.name === user.name && acc.password === user.password
        );
    }
    
    return (
        !login && (
            <div className="form-container">
                <SlideShow/>
                
                <form>
                    <img src={Logo} style={{width:"300px"}}   ></img>
                    <div className="userName">
                        <label htmlFor="name">Tên đăng nhập:</label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            name="password"
                            id="password"
                            type={showPass ? "text" : "password"}
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)}>
                            {showPass ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <div className="btns">
                        <button type="submit" className="log-in" onClick={(e) => {
                            e.preventDefault();
                            const valid = handleCheck(user);
                            if(valid){
                                onLogin();
                                alert("Dang nhap thanh cong")
                                
                            }
                            else{
                                alert("Dang nhap that bai")
                            }
                        }}>
                            Đăng nhập
                        </button>
                        <button type="button" className="sign" onClick={()=>setOnRegister(true)}>Đăng ký </button>
                    </div>
                    
                </form>
                
            </div>
        )

    )
}