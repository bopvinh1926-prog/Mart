import Menu from './Menu'
import Sell from './Sell'
import Products from '../Products/Products'
import '../../CSSManagement/Management.css'

import '../../CSSManagement/Sell.css'
import '../../CSSManagement/InforBill.css'
import { useState } from 'react'

export default function Management(){
    const [menuActive,setMenuActive] =useState("products")
    console.log(menuActive)

    return(
        <main className='management'>
            <Menu menuActive ={menuActive} onClickMenu={setMenuActive}/>
            <div className='management-container' 
                
            >
                {menuActive ==='sell' &&(
                    <Sell/>
                )}
                {menuActive ==='products' &&(
                    <Products/>
                )}
                
            </div>
        </main>
        
    )
}