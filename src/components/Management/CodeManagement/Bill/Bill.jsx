import {useState} from 'react';

export default function Bill() {

    const listHistory = (() => {
        const storedList = localStorage.getItem('dataBill');
        return storedList ? JSON.parse(storedList) : [];
    })();
    
    const [currentPage,setCurrentPage] = useState(1)
    const [displayPage,setDisplayPage] = useState(1);
    const [currentExpandBox,setCurrentExpandBox] = useState(null);
   
    const handleClickOnPage =(x)=>{
        
        const newPage = currentPage+x;
        if(newPage>listHistory.length || newPage<1){
            return;
        }
        setCurrentPage(newPage)
        setDisplayPage(newPage)
    }
     const handleExpandBoxHistory = (cliked)=>{
        if(currentExpandBox === null){
            setCurrentExpandBox(cliked);
        }
        else{
            if(cliked === currentExpandBox){
                setCurrentExpandBox(null);
            }
            else{
                setCurrentExpandBox(cliked)
            }
        }
        
    }
    // const listHistory = [
    //     {
    //         id: "INV-2026-001",
    //         dateTime: "2026-10-07T08:30:00Z",
    //         seller: "Nguyễn Văn A",
    //         payment: "Tiền mặt",
    //         total: 350000,
    //         productsAr: [
    //             {
    //                 code: "P001",
    //                 name: "Cà phê sữa đá",
    //                 unit: "Ly",
    //                 quantity: 5,
    //                 price: 30000,
    //                 totalPrice: 150000
    //             },
    //             {
    //                 code: "P002",
    //                 name: "Bánh mì thịt",
    //                 unit: "Ổ",
    //                 quantity: 10,
    //                 price: 20000,
    //                 totalPrice: 200000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-002",
    //         dateTime: "2026-10-07T09:15:00Z",
    //         seller: "Trần Thị B",
    //         payment: "Chuyển khoản",
    //         total: 1200000,
    //         productsAr: [
    //             {
    //                 code: "P003",
    //                 name: "Áo thun nam",
    //                 unit: "Cái",
    //                 quantity: 4,
    //                 price: 300000,
    //                 totalPrice: 1200000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-003",
    //         dateTime: "2026-10-07T10:00:00Z",
    //         seller: "Lê Văn C",
    //         payment: "Momo",
    //         total: 450000,
    //         productsAr: [
    //             {
    //                 code: "P004",
    //                 name: "Trà sữa thái xanh",
    //                 unit: "Ly",
    //                 quantity: 10,
    //                 price: 35000,
    //                 totalPrice: 350000
    //             },
    //             {
    //                 code: "P005",
    //                 name: "Bánh ngọt Tiramisu",
    //                 unit: "Phần",
    //                 quantity: 2,
    //                 price: 50000,
    //                 totalPrice: 100000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-004",
    //         dateTime: "2026-10-07T11:20:00Z",
    //         seller: "Nguyễn Văn A",
    //         payment: "Thẻ tín dụng",
    //         total: 2500000,
    //         productsAr: [
    //             {
    //                 code: "P006",
    //                 name: "Tai nghe Bluetooth",
    //                 unit: "Cái",
    //                 quantity: 1,
    //                 price: 2500000,
    //                 totalPrice: 2500000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-005",
    //         dateTime: "2026-10-07T13:45:00Z",
    //         seller: "Phạm Thị D",
    //         payment: "Tiền mặt",
    //         total: 180000,
    //         productsAr: [
    //             {
    //                 code: "P007",
    //                 name: "Sổ tay A5",
    //                 unit: "Quyển",
    //                 quantity: 3,
    //                 price: 40000,
    //                 totalPrice: 120000
    //             },
    //             {
    //                 code: "P008",
    //                 name: "Bút gel xanh",
    //                 unit: "Cây",
    //                 quantity: 6,
    //                 price: 10000,
    //                 totalPrice: 60000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-006",
    //         dateTime: "2026-10-07T14:30:00Z",
    //         seller: "Trần Thị B",
    //         payment: "VNPay",
    //         total: 850000,
    //         productsAr: [
    //             {
    //                 code: "P009",
    //                 name: "Giày thể thao",
    //                 unit: "Đôi",
    //                 quantity: 1,
    //                 price: 850000,
    //                 totalPrice: 850000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-007",
    //         dateTime: "2026-10-07T15:10:00Z",
    //         seller: "Lê Văn C",
    //         payment: "Chuyển khoản",
    //         total: 300000,
    //         productsAr: [
    //             {
    //                 code: "P010",
    //                 name: "Bình giữ nhiệt",
    //                 unit: "Cái",
    //                 quantity: 2,
    //                 price: 150000,
    //                 totalPrice: 300000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-008",
    //         dateTime: "2026-10-07T16:00:00Z",
    //         seller: "Hoàng Văn E",
    //         payment: "Tiền mặt",
    //         total: 95000,
    //         productsAr: [
    //             {
    //                 code: "P011",
    //                 name: "Khăn giấy rút",
    //                 unit: "Gói",
    //                 quantity: 5,
    //                 price: 15000,
    //                 totalPrice: 75000
    //             },
    //             {
    //                 code: "P012",
    //                 name: "Khẩu trang y tế",
    //                 unit: "Hộp",
    //                 quantity: 1,
    //                 price: 20000,
    //                 totalPrice: 20000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-009",
    //         dateTime: "2026-10-07T17:25:00Z",
    //         seller: "Phạm Thị D",
    //         payment: "Momo",
    //         total: 540000,
    //         productsAr: [
    //             {
    //                 code: "P013",
    //                 name: "Sữa tươi vô trùng 1L",
    //                 unit: "Hộp",
    //                 quantity: 12,
    //                 price: 45000,
    //                 totalPrice: 540000
    //             }
    //         ]
    //     },
    //     {
    //         id: "INV-2026-010",
    //         dateTime: "2026-10-07T18:50:00Z",
    //         seller: "Hoàng Văn E",
    //         payment: "Thẻ tín dụng",
    //         total: 420000,
    //         productsAr: [
    //             {
    //                 code: "P014",
    //                 name: "Nước tẩy rửa đa năng",
    //                 unit: "Chai",
    //                 quantity: 2,
    //                 price: 60000,
    //                 totalPrice: 120000
    //             },
    //             {
    //                 code: "P015",
    //                 name: "Bột giặt 5kg",
    //                 unit: "Túi",
    //                 quantity: 1,
    //                 price: 300000,
    //                 totalPrice: 300000
    //             }
    //         ]
    //     }
    // ];
    
    return (
        <div className="history">
            <div className="container-history">
                <div className="main-history">
                    <div className="header-history">
                        <h1 className="header-history__title">Hóa đơn</h1>
                        <button className="btn-import">Import File</button> 
                    </div>
                    <div className="history-list">
                        <ul className="history-header bill-row">
                            <li className="col">Mã hóa đơn</li>
                            <li className="col">Thời gian</li>
                            <li className="col">Người bán</li>
                            <li className="col"> Thanh toán</li>
                            <li className="col">Tổng tiền</li>

                        </ul>
                        <div className="item-history-list">
                            {listHistory.slice(9*currentPage-9 , 9*currentPage).map((item,index)=>{
                                console.log(item        );
                                return <details className="history-details"
                                    key={index}
                                    open={index === currentExpandBox}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleExpandBoxHistory(index);
                                    }}    
                                >
                                    <summary className="history-summary">
                                        <ul className="history-info-row bill-row">
                                            <li className="col">{item.id}</li>
                                            <li className="col">{item.dateTime}</li>
                                            <li className="col">{item.seller}</li>
                                            <li className="col">{item.payment}</li>
                                            <li className="col">{item.total.toLocaleString('en-US')}</li>
                                        </ul>
                                        <span className='expand-icon'>▼</span>
                                    </summary>
                                    {currentExpandBox === index && (
                                        <div className="table-wrapper">
                                            <table className="item-table-history">
                                                <thead>
                                                    <tr className="table-header-row bill-row">
                                                        <th className="table-th">Mã sản phẩm</th>
                                                        <th className="table-th">Tên sản phẩm</th>
                                                        <th className="table-th">Đơn vị (thuộc tính)</th>
                                                        <th className="table-th">Số lượng bán</th>
                                                        <th className="table-th">Đơn giá bán</th>
                                                        <th className="table-th">Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/*
                                                    {Object.entries(item.productsAr).map(([key, prd]) =>{   
                                                        return(     
                                                            <tr className="table-row" key={key}>
                                                                <td className="table-td">{prd.code}</td>
                                                                <td className="table-td">{prd.name}</td>
                                                                <td className="table-td">{prd.unit}</td>
                                                                <td className='table-td'>{prd.quantity}</td>
                                                                <td className='table-td'>{prd.price.toLocaleString('en-US')}</td>
                                                                <td className='table-td'>{prd.totalPrice.toLocaleString('en-US')}</td>
                                                            </tr>
                                                        )
                                                    })}                 */}
                                                    
                                                    {item.productArr?.map((prd,key)=>(
                                                    <tr className="table-row" key={key}>
                                                        <td className="table-td">{prd.code}</td>
                                                        <td className="table-td">{prd.name}</td>
                                                        <td className="table-td">{"Cái"}</td>
                                                        <td className='table-td'>{prd.buyQuantity}</td>
                                                        <td className='table-td'>{prd.price.toLocaleString('en-US')}</td>
                                                        <td className='table-td'>{(prd.price*prd.buyQuantity).toLocaleString('en-US')}</td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                               
                                </details>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="list-pageNumber">
                <button
                    className="page-btn"
                    disabled={currentPage - 10 < 1}
                    onClick={() => handleClickOnPage(-10)}
                >
                    {"<<"}
                </button>
                <button
                    className="page-btn"
                    disabled={currentPage - 1 < 1}
                    onClick={() => handleClickOnPage(-1)}
                >
                    {"<"}
                </button>
                <input
                    className="page-input"
                    type="number"
                    value={displayPage}
                    onChange={(e) => {
                        const page = parseInt(e.target.value, 10);
                        setDisplayPage(page);
                    }}
                    onBlur={() => {
                        if (!isNaN(displayPage)) {
                            setCurrentPage(displayPage);
                        }
                        if (displayPage < 1 || displayPage > listHistory.length) {
                            setCurrentPage(currentPage);
                            setDisplayPage(currentPage);
                        }
                    }}
                />
                <button
                    className="page-btn"
                    disabled={9*(currentPage + 1)-9 > listHistory.length}
                    onClick={() => handleClickOnPage(+1)}
                >
                    {">"}
                </button>
                <button
                    className="page-btn"
                    disabled={9*(currentPage + 10)-9 > listHistory.length}
            
                    onClick={() => handleClickOnPage(+10)}
                >
                    {">>"}
                </button>
            </div>
        </div>
    )
}
