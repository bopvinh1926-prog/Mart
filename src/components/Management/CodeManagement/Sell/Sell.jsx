import '../../CSSManagement/Sell.css'
import { useEffect, useRef, useState } from 'react'
import { PRODUCTS_SELL } from '../../../../data/PRODUCTS_SELL.JS';
import InforBill from './InforBill';
export default function Sell(){
    const [product,setProduct] =useState("");
    const [listBuy,setListBuy] = useState([])
    const [showWrapper,setShowWrapper] = useState(false) // tắt mở danh sách gợi ý hàng hóa
    const wrapper=useRef(null)    // trạng thái mở ô list bán hàng
    const [listSuggest,setListSuggest] = useState([])
   
   
    
    // nạp tất cả dữ liệu vào  listProduct vào localStorage 
    const [listProduct, setListProduct] = useState(() => { 
        const saved = localStorage.getItem("products");
        if (!saved || saved === "undefined") return PRODUCTS_SELL;
        return JSON.parse(saved);
    });
    
    useEffect(() => {
        if(listProduct !== null || listProduct !== undefined){
            localStorage.setItem('products', JSON.stringify(listProduct));
        }
    }, [listProduct]);
    
    
   
    
    // Hàm gợi ý danh sách sản phẩm, chỉ gợi ý sản phẩm chưa có trong listBuy
    const handleListSuggest = (product) => {
        if (!product) return [];
        const keyword = product.toLowerCase().trim();
        return PRODUCTS_SELL.filter(item => {
            const matchCode = item.code.toLowerCase().includes(keyword);
            const matchName = item.name.toLowerCase().includes(keyword);
            return (matchCode || matchName)
        });
    };

    // Khi thêm sản phẩm, thêm thuộc tính buyQuantity mặc định là ''
    const handleAddProduct = (product) => {
        const remaining = listProduct.find(p => p.code === product.code)?.quantity ?? 0
        if (remaining < 1) return

        const exists = listBuy.some(prev => prev.code === product.code);
        if (!exists) {
            setListBuy(prev => [...prev, { ...product, buyQuantity: '1' }]);
        } else {
            setListBuy(prev =>
                 prev.map(item =>
                     item.code === product.code
                         ? { ...item, buyQuantity: (parseInt(item.buyQuantity || "0", 10) + 1).toString() }
                         : item
                 )
            );
        }
        setListProduct(prev =>
            prev.map(p =>
                p.code === product.code
                    ? { ...p, quantity: p.quantity - 1 }
                    : p
            )
        );
    }
    
    const handleDeleteProduct = (product)=>{
        const buyQty = parseInt(product.buyQuantity || '0', 10)
        setListBuy(prev => prev.filter((item)=>item.code !== product.code))
        setListProduct(prev =>
            prev.map(p =>
                p.code === product.code
                    ? { ...p, quantity: p.quantity + buyQty }
                    : p
            )
        )
    }

    const total = listBuy.reduce((sum,curr)=>{
        const BuyQuantity = parseInt(curr.buyQuantity||'0',10)
        return sum+BuyQuantity * curr.price
    },0)

    const getRemainingStock = (code) => {
        const stockItem = listProduct.find(p => p.code === code)
        return stockItem?.quantity ?? 0
    }

    const handleChangeBuyQuantity = (e, index) => {
        const { value } = e.target
        if (value === '') {
            const current = parseInt(listBuy[index].buyQuantity || '0', 10)
            setListBuy(prev => {
                const updated = [...prev]
                updated[index] = { ...updated[index], buyQuantity: '' }
                return updated
            })
            setListProduct(prev =>
                prev.map(p =>
                    p.code === listBuy[index].code
                        ? { ...p, quantity: p.quantity + current }
                        : p
                )
            )
            return
        }
        const nextBuy = parseInt(value, 10)
        if (Number.isNaN(nextBuy) || nextBuy < 0) return

        const item = listBuy[index]
        const current = parseInt(item.buyQuantity || '0', 10)
        const remaining = getRemainingStock(item.code)
        const maxBuy = current + remaining
        const clamped = Math.min(nextBuy, maxBuy)
        const delta = clamped - current

        setListBuy(prev => {
            const updated = [...prev]
            updated[index] = { ...updated[index], buyQuantity: String(clamped) }
            return updated
        })
        if (delta !== 0) {
            setListProduct(prev =>
                prev.map(p =>
                    p.code === item.code
                        ? { ...p, quantity: p.quantity - delta }
                        : p
                )
            )
        }
    }

    const handleButtonQuantity = (index, delta) => {
        const item = listBuy[index]
        if (!item) return

        const current = parseInt(item.buyQuantity || '0', 10)
        const nextBuy = current + delta
        if (nextBuy < 0) return
        if (delta > 0 && getRemainingStock(item.code) < delta) return

        setListBuy(prev => {
            const updated = [...prev]
            updated[index] = { ...updated[index], buyQuantity: String(nextBuy) }
            return updated
        })
        setListProduct(prev =>
            prev.map(p =>
                p.code === item.code
                    ? { ...p, quantity: p.quantity - delta }
                    : p
            )
        )
    }
    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapper.current && !wrapper.current.contains(e.target)) {
                setShowWrapper(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // thông báo hiển thị thanh toán thành công
    const handlePay =()=>{
        alert("Bạn đã thanh toán đơn hàng")
        setListBuy([])
    }
    
    return(
        <div className="sell">
            <div className='sell-ctn' >
                <div className='input'>
                    <input
                        className="add-product"
                        type="text"
                        value={product}     
                        style={{marginTop: "20px"}}     
                        onChange={e => {
                            const value = e.target.value;
                            setShowWrapper(true);
                            setProduct(value);
                            setListSuggest(()=>handleListSuggest(value));
                        }}
                        placeholder="Nhập tên hoặc mã sản phẩm"
                    />
            
                    <ul className='suitable-list' ref={wrapper}>
                        {showWrapper && listSuggest.map(item => {
                        console.log(item)
                        return(
                            <li
                                className='product-item'
                                key={item.code}
                                
                                onClick={() => {
                                    handleAddProduct(item);
                                    setShowWrapper(false);  
                                    setProduct("")
                                }}
                            >
                                <p>{item.code}</p>
                                <p>{item.name}</p>
                            </li>
                    
                        )})}
                    </ul>
        
                </div>
                <div className='main-sell'>
                    <ul className="list-buy">
                        {listBuy.map((item,index)=>(
                            <li  className='product' key={index}>
                                <p>{index + 1}</p>
                                <button className='delete-product-button' onClick={() => handleDeleteProduct(item)}>🗑️</button>
                                <p className='item-code'>{item.code}</p>
                                <p className='item-name'>{item.name}</p>
                                <div className='quantity-control'>  
                                    <input
                                        className='quantity'
                                        type="number"
                                        value={item.buyQuantity}
                                        min={0}
                                        onChange={(e)=>handleChangeBuyQuantity(e,index)}
                                    />
                                    <button
                                        type="button"
                                        disabled={getRemainingStock(item.code) < 1}
                                        onClick={()=>handleButtonQuantity(index, 1)}
                                    >+</button>
                                    <button
                                        type="button"
                                        disabled={parseInt(item.buyQuantity || '0', 10) < 1}
                                        onClick={()=>handleButtonQuantity(index, -1)}
                                    >-</button>
                                </div>
                                
                                <p className='total-price'>Tổng:{(item.buyQuantity*item.price).toLocaleString('en-US')      }</p>
                
                        
                            </li>
                        ))}
                    </ul>
                    <InforBill totalSum={total} payed={handlePay}/>
                </div>

            </div>
        </div>
    )
}