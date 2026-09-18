import {  useState } from "react"
import '../../CSSManagement/Menu.css'
import Logo from '../../../../assets/logo-removebg-preview.png';
export default function Menu({menuActive,onClickMenu}){
    
    const [isOpen,shetIsOpen] = useState(false);
    return(
        <nav className="nav-bar">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="hambuger" onClick={()=> shetIsOpen(!isOpen)}>
                {!isOpen?"☰":"✕"}  
            </div>
            <ul className={`menu ${isOpen ? "active" : ""}`}>
                <li
                    className={`sell ${menuActive === 'sell' ? 'item-active-menu' : ''}`}
                    onClick={() => onClickMenu('sell')}
                >
                    <a href="#">Bán hàng</a>
                </li>
                <li
                    className={`products ${menuActive === 'products' ? 'item-active-menu' : ''}`}
                    onClick={() => onClickMenu('products')}
                >
                    <a href="#">Hàng hóa</a>
                </li>
                <li
                    className={`checkBill ${menuActive === 'checkBill' ? 'item-active-menu' : ''}`}
                    onClick={() => onClickMenu('checkBill')}
                >
                    <a href="#">Kiểm tra hóa đơn</a>
                </li>
                <li
                    className={`summary ${menuActive === 'summary' ? 'item-active-menu' : ''}`}
                    onClick={() => onClickMenu('summary')}
                >
                    <a href="#">Tổng kết bán hàng</a>
                </li>
            </ul>
       
        </nav>
    )
}