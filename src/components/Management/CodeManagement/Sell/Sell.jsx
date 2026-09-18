import '../../CSSManagement/Sell.css'
import { useEffect, useRef, useState } from 'react'
const PRODUCTS = [
    { code: 'SP001', name: 'Thịt gà chay', price: 25000, quantity: 10, buyQuantity: '' },
    { code: 'SP002', name: 'Đậu hũ', price: 15000, quantity: 20, buyQuantity: '' },
    { code: 'SP003', name: 'Nấm kim châm', price: 18000, quantity: 15, buyQuantity: '' },
    { code: 'SP004', name: 'Nấm bào ngư', price: 22000, quantity: 12, buyQuantity: '' },
    { code: 'SP005', name: 'Rau cải xanh', price: 12000, quantity: 30, buyQuantity: '' },
    { code: 'SP006', name: 'Cà rốt', price: 10000, quantity: 25, buyQuantity: '' },
    { code: 'SP007', name: 'Khoai tây', price: 18000, quantity: 18, buyQuantity: '' },
    { code: 'SP008', name: 'Bắp cải', price: 16000, quantity: 14, buyQuantity: '' },
    { code: 'SP009', name: 'Cà chua', price: 20000, quantity: 22, buyQuantity: '' },
    { code: 'SP010', name: 'Dưa leo', price: 12000, quantity: 28, buyQuantity: '' },
    { code: 'SP011', name: 'Đậu que', price: 17000, quantity: 16, buyQuantity: '' },
    { code: 'SP012', name: 'Bí đỏ', price: 19000, quantity: 11, buyQuantity: '' },
    { code: 'SP013', name: 'Rau muống', price: 10000, quantity: 35, buyQuantity: '' },
    { code: 'SP014', name: 'Bông cải xanh', price: 30000, quantity: 13, buyQuantity: '' },
    { code: 'SP015', name: 'Hành tây', price: 15000, quantity: 24, buyQuantity: '' },
    { code: 'SP016', name: 'Tỏi', price: 35000, quantity: 17, buyQuantity: '' },
    { code: 'SP017', name: 'Ớt chuông', price: 28000, quantity: 19, buyQuantity: '' },
    { code: 'SP018', name: 'Đậu bắp', price: 16000, quantity: 21, buyQuantity: '' },
    { code: 'SP019', name: 'Rau xà lách', price: 14000, quantity: 26, buyQuantity: '' },
    { code: 'SP020', name: 'Bắp ngọt', price: 18000, quantity: 20, buyQuantity: '' }
];
import InforBill from './InforBill';
export default function Sell(){
    const [product,setProduct] =useState("");
    const [listBuy,setListBuy] = useState([])
    const [showWrapper,setShowWrapper] = useState(false)
    const wrapper=useRef(null)    
    const [listSuggest,setListSuggest] = useState([])
   
   
    
    
    const [listProduct, setListProduct] = useState(() => {
        const saved = localStorage.getItem("products");
        if (!saved || saved === "undefined") return PRODUCTS;
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
        return PRODUCTS.filter(item => {
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
                        {showWrapper && listSuggest.slice(0,5).map(item => (
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
                    
                        ))}
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