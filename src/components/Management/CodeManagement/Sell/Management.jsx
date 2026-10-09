import Menu from './Menu'
import Sell from './Sell'
import Bill from '../Bill/Bill'
import Products from '../Products/Products'
import '../../CSSManagement/Management.css'

import '../../CSSManagement/Sell.css'
import '../../CSSManagement/InforBill.css'
import { useState } from 'react'

export default function Management({onLogout}){
    const [menuActive,setMenuActive] =useState("products")
    console.log(menuActive)

    return(
        <main className='management'>
            <Menu menuActive ={menuActive} onClickMenu={setMenuActive} onLogout={onLogout}/>
            <div className='management-container' 
                
            >
                {menuActive ==='sell' &&(
                    <Sell/>
                )}
                {menuActive ==='products' &&(
                    <Products/>
                )}
                {menuActive ==='checkBill' &&(
                    <Bill/>
                )}
                
            </div>
        </main>
        
    )
}