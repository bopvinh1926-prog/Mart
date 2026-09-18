
import '../../CSSManagement/InforBill.css'
import qrCode from '../../../../assets/qr.jfif'
import { useState } from 'react'
export default function InforBill({totalSum,payed}){
    // cần phải quản lí riêng một cái totalSum sau khi đã giảm giá
    
    const [choicePay,setChoicePay] = useState("money");
    const [choiceDiscount,setChoiceDiscount] = useState(true) // true là đồng fall là phần trăm
    const [discount,setDiscount] = useState(
        {displayValue:'',rawValue:0}
    ); 
    // gợi ý số tiền phải trả
    const [selectedCashSug,setSelectedCashSug] = useState(null)
    const handleDiscountChange = (e) => {
        const value = e.target.value;
        const cleanNumber = value.replace(/[^0-9]/g,'');
        if(cleanNumber.length > 0){
            const numericValue = parseInt(cleanNumber, 10);
            const formattedValue = parseInt(cleanNumber).toLocaleString('en-US');
            console.log(typeof discount.rawValue , typeof totalSum,discount.rawValue > totalSum)
            if(
                ( numericValue  > totalSum && choiceDiscount == true) ||
                (numericValue > 100 && choiceDiscount == false))
            {
                setDiscount({displayValue:'',rawValue:0});
                return;
            }
            setDiscount({displayValue:formattedValue,rawValue:numericValue});
            
        }
        else{
            setDiscount({displayValue:'',rawValue:0});
        }
    }
    const handleExcessMoney = ()=>{
        if(totalSum > selectedCashSug){
            return '0';
        }
        else{
            return (selectedCashSug-totaSumlDiscount()).toLocaleString('en-US')
        }
    }
    const totaSumlDiscount = ()=>{
        
        return choiceDiscount?  totalSum - discount.rawValue : totalSum - (totalSum * discount.rawValue / 100)
    }
    

    // hàm thối tiền
    function getCashSuggestions(amount) {
        if(amount ===0){
            return []
        }
        const suggestions = new Set();
        // 1. Mốc chính xác
        suggestions.add(amount);
        // 2. Thối lẻ 1k (Chỉ áp dụng với đơn nhỏ < 50k)
        if (amount < 50000) {
          suggestions.add(amount + 1000);
        }
        // 3. Danh sách các mốc bước giá/mệnh giá tiền mặt
        const steps = [5000, 10000, 20000, 50000, 100000, 200000, 500000];
        steps.forEach(step => {
          // Với đơn lớn (>= 100k), chỉ cần làm tròn theo mốc 50k trở lên (50, 100, 200, 500)
          if (amount < 100000 || step >= 50000) {
            // Tìm bội số của 'step' gần nhất LỚN HƠN amount
            const nextRound =  parseInt( Math.ceil((amount + 1000) / step) * step);
            suggestions.add(nextRound);
          }
        });
      
        return [...suggestions].sort((a, b) => a - b);
    }
    
    

    const SuggestionCash = getCashSuggestions(Math.ceil( totaSumlDiscount())) 
    return(
        <div className="infor-bill">
            <div className="infor-bill-ctn">
                {/* thông tin thanh toán bọc vào 1 border */}
                <h1>Thông tin thanh toán</h1>
                {/* cho vào khối div */}
                <div className="total-bill">
                    <p>Tổng tiền hàng</p>
                    <p>{totalSum.toLocaleString('en-US')}</p>
                </div>
                <div className="discount">
                    <p>Giảm giá</p>
                    <input type="text" value={discount.displayValue} onChange={handleDiscountChange} disabled={totalSum<=0}/>
                    <div className='btn-discount'>
                        <button 
                            className={`btn-type ${!choiceDiscount ? 'active' : ''}`}
                            onClick={() =>  setChoiceDiscount(false)}
                        >
                            %
                        </button>
                        <button 
                            className={`btn-type ${choiceDiscount ? 'active' : ''}`}
                            onClick={() => setChoiceDiscount(true)}
                        >
                            Đồng
                        </button>
                    </div>  
                </div>
                <div className="total-pay">
                    <p>Số tiền khách trả</p>
                    <p>{totaSumlDiscount() ? totaSumlDiscount().toLocaleString('en-US') : '0'}</p>
                </div>
                {/* syntax này là đúng trong React JSX. Tuy nhiên, nên dùng comment trong JSX dạng {/* ... */}
                <select
                    name=""
                    id=""
                    value={choicePay}
                    onChange={(e) => setChoicePay(e.target.value)}
                >
                    <option value="money">Tiền mặt</option>
                    <option value="bank">Chuyển Khoản</option>
                </select>
           
                <div className='about-pay'>
                    {/* Chia ra 2 th thanh toán nếu ck thì đưa ảnh QR k thì đưa list số tiền */}
                    {choicePay==="money" &&(
                        <ul className='list-amount'>
                            {SuggestionCash.map((value,index)=>(
                                <li className={`amount-sug ${selectedCashSug === value ? 'active':''} `} 
                                    key={index} 
                                    onClick={()=>setSelectedCashSug(value)}
                                >
                                    {value.toLocaleString('en-US')}
                                </li>
                            ))}
                        </ul>
                    )}
                    {choicePay ==="bank" && (
                        <div className='qr-code'>
                            <img src={qrCode} alt="" />
                        </div>  
                    )}
                </div>
                <p>Tiền thừa trả khách {handleExcessMoney()} </p>
                <button className='payment' 
                    onClick={()=>{
                        payed();
                        setDiscount({ displayValue: '', rawValue: 0 });
                        setSelectedCashSug(null);
                   
                    } } 
                >Thanh toán</button>
            </div>
        </div>
    )
}