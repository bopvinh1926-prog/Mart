    import { useState,useEffect } from "react"
    import './Register.css'
    import Form from "../Form/Form"
    export default function Register({listUser,handleRegister}){
        
        const [registered,setRegistered] = useState(false)
        const [user, setUser] = useState(
            { name: "", password: "", confirm: "" }
        )
        // xay dựng locgic cho mk và password 
        /* Tài khoản: Độ dài kí tự từ 8-20  */
        /* mật khẩu : dài 8 kí tự trở lên,  có số  */

        const [errorMess,setErrorMess] =useState(
            {name:"",pass:""}
        )
        
        // ddungs k nhir bro
        const handeCheck = () => {
            let valid = true;
            let newError = { name: "", pass: "" };
            
            if (user.name.length < 8 || user.name.length > 20) {
                newError.name = "Tên tài khoản phải dài từ 8-20 ký tự";
                valid = false;
            } 
            if (user.password.length < 8 || !/\d/.test(user.password)) {
                newError.pass = "Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất 1 số";
                valid = false;
            }
            
            setErrorMess(newError);
            return valid;
        }


        
        const [showPass,setShowPass] = useState(false)
        const handleChange = (e)=>{
            const{name,value} =e.target;
            setUser((prev)=>({
                ...prev,[name]:value
            }))
            
            setErrorMess({name:"",pass:""})
        }
        // mỗi khi listUser thay đổi thì ghi đè lên
        useEffect(()=>{
            localStorage.setItem("listUser", JSON.stringify(listUser));
        },[listUser])

       
        // handleSubmit
        const handleSubmit = (e)=>{
            e.preventDefault();
            const valid = handeCheck();
            if(!valid){
                return;
            }
            const listUserRegistered = listUser.some(u => u.name === user.name);
            
            if(user.name !=="" && user.password!=="" && user.confirm === user.password
                && listUserRegistered === false 
            ){
                const newUSer ={name:user.name,password:user.password , confirm:user.password}
                handleRegister((prev)=>([...prev,newUSer]))
                setUser( { name: "", password: "", confirm: "" }) // reset các ô input 
                setRegistered(true) // cho trạng thái đã đăng nhập xong 
                alert("Đã đăng kí xong tài khoản");
                /// checkMat khau va tai khoan 

            }
            else{
                alert("Đăng kí thất bại mời bạn nhập lại thông tin ")
            }
        }

        
        // quay lại trang đăng nhập
        function handleReturn(){
            setRegistered(true)
        }

        // khi đăng kí thì quay về trang đăng nhập
        if(registered){
            return <Form/>
        }
        
        return (
            <div className="register-container">
                <form onSubmit={(e) => { handeCheck(e); handleSubmit(e); }}>
                    
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
                        {errorMess.name!=="" && <span  style={{color:"red"}}    >{errorMess.name}</span>}
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
                        {errorMess.name!=="" && <span style={{color:"red"}}>{errorMess.name}</span>}
                    </div>
                    <div className="password">
                        <label htmlFor="confirm">Xác nhận mật khẩu:</label>
                        <input
                            name="confirm"
                            id="confirm"
                            type={showPass ? "text" : "password"}
                            value={user.confirm}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)}>
                            {showPass ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <button type="submit">
                        Đăng ký
                    </button>
                    <button className="return" onClick={handleReturn} >Quay lại đăng nhập</button>
                </form>
            </div>
        )
    }