import '../../CSSManagement/ProductsStyle/History.css'    
/*
const listHistory = [
    {
        "id": 1,
        "name": "Công ty TNHH Thực Phẩm An Bình",
        "createdAt": "2026-03-09T08:30:00.000Z",
        "supplier": "An Bình Food",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP001",
                "productName": "Sữa tươi tiệt trùng 1L",
                "unit": "Hộp",
                "quantity": 100,
                "importPrice": 25000,
                "totalAmount": 2500000
            },
            {
                "code": "SP002",
                "productName": "Bánh quy bơ 200g",
                "unit": "Gói",
                "quantity": 50,
                "importPrice": 18000,
                "totalAmount": 900000
            }
        ]
    },
    {
        "id": 2,
        "name": "Công ty CP Nông Sản Việt",
        "createdAt": "2026-03-10T10:45:00.000Z",
        "supplier": "Việt Agri",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP003",
                "productName": "Gạo Tám Thái 5kg",
                "unit": "Bao",
                "quantity": 20,
                "importPrice": 120000,
                "totalAmount": 2400000
            }
        ]
    },
    {
        "id": 3,
        "name": "Công ty TNHH Nước Giải Khát Vfresh",
        "createdAt": "2026-03-11T09:20:00.000Z",
        "supplier": "Vfresh",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP004",
                "productName": "Nước ép cam 1L",
                "unit": "Chai",
                "quantity": 60,
                "importPrice": 30000,
                "totalAmount": 1800000
            }
        ]
    },
    {
        "id": 4,
        "name": "Công ty CP Thực Phẩm Sạch",
        "createdAt": "2026-03-12T14:05:00.000Z",
        "supplier": "Green Food",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP005",
                "productName": "Trứng gà 10 quả",
                "unit": "Vỉ",
                "quantity": 70,
                "importPrice": 25000,
                "totalAmount": 1750000
            }
        ]
    },
    {
        "id": 5,
        "name": "Công ty TNHH Rau Quả Sài Gòn",
        "createdAt": "2026-03-13T16:30:00.000Z",
        "supplier": "Saigon Veg",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP006",
                "productName": "Cà chua Đà Lạt 1kg",
                "unit": "Túi",
                "quantity": 40,
                "importPrice": 20000,
                "totalAmount": 800000
            }
        ]
    },
    {
        "id": 6,
        "name": "Công ty TNHH Sữa Việt",
        "createdAt": "2026-03-14T11:15:00.000Z",
        "supplier": "Milk Viet",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP007",
                "productName": "Sữa đặc có đường 380g",
                "unit": "Lon",
                "quantity": 33,
                "importPrice": 18000,
                "totalAmount": 594000
            }
        ]
    },
    {
        "id": 7,
        "name": "Công ty CP Đường Biên Hòa",
        "createdAt": "2026-03-15T13:50:00.000Z",
        "supplier": "Bien Hoa Sugar",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP008",
                "productName": "Đường trắng 1kg",
                "unit": "Túi",
                "quantity": 80,
                "importPrice": 17000,
                "totalAmount": 1360000
            }
        ]
    },
    {
        "id": 8,
        "name": "Công ty TNHH Thực Phẩm Khánh Hòa",
        "createdAt": "2026-03-16T08:10:00.000Z",
        "supplier": "Khanh Hoa Food",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP009",
                "productName": "Chả cá Nha Trang 500g",
                "unit": "Gói",
                "quantity": 45,
                "importPrice": 35000,
                "totalAmount": 1575000
            }
        ]
    },
    {
        "id": 9,
        "name": "Công ty TNHH Bánh Kẹo Lovely",
        "createdAt": "2026-03-17T15:25:00.000Z",
        "supplier": "Lovely Candy",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP010",
                "productName": "Kẹo dẻo trái cây 250g",
                "unit": "Gói",
                "quantity": 90,
                "importPrice": 15500,
                "totalAmount": 1395000
            }
        ]
    },
    {
        "id": 10,
        "name": "Công ty CP Nước Mắm Đảo Ngọc",
        "createdAt": "2026-03-18T17:40:00.000Z",
        "supplier": "Dao Ngoc Fish Sauce",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP011",
                "productName": "Nước mắm Phú Quốc 500ml",
                "unit": "Chai",
                "quantity": 57,
                "importPrice": 42000,
                "totalAmount": 2394000
            }
        ]
    },

    // Thêm 10 lịch sử tiếp theo
    {
        "id": 11,
        "name": "Công ty TNHH Phát Triển Hoa Việt",
        "createdAt": "2026-03-19T12:00:00.000Z",
        "supplier": "Hoa Viet Dev",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP012",
                "productName": "Hoa quả tươi nhập khẩu",
                "unit": "Thùng",
                "quantity": 25,
                "importPrice": 75000,
                "totalAmount": 1875000
            }
        ]
    },
    {
        "id": 12,
        "name": "Công ty CP Gạo Lúa Vàng",
        "createdAt": "2026-03-20T14:30:00.000Z",
        "supplier": "Lua Vang Rice",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP013",
                "productName": "Gạo ST24 10kg",
                "unit": "Bao",
                "quantity": 18,
                "importPrice": 230000,
                "totalAmount": 4140000
            }
        ]
    },
    {
        "id": 13,
        "name": "Công ty TNHH Thép Việt Nhật",
        "createdAt": "2026-03-21T16:45:00.000Z",
        "supplier": "Viet Nhat Steel",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP014",
                "productName": "Thép cây Φ12",
                "unit": "Cây",
                "quantity": 60,
                "importPrice": 340000,
                "totalAmount": 20400000
            }
        ]
    },
    {
        "id": 14,
        "name": "Công ty TNHH Bia Sài Gòn",
        "createdAt": "2026-03-22T09:10:00.000Z",
        "supplier": "Sai Gon Beer",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP015",
                "productName": "Bia lon 330ml",
                "unit": "Thùng",
                "quantity": 30,
                "importPrice": 310000,
                "totalAmount": 9300000
            }
        ]
    },
    {
        "id": 15,
        "name": "Công ty TNHH Đèn Led Việt",
        "createdAt": "2026-03-23T13:26:00.000Z",
        "supplier": "Viet Led",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP016",
                "productName": "Đèn led 12W",
                "unit": "Bóng",
                "quantity": 100,
                "importPrice": 29000,
                "totalAmount": 2900000
            }
        ]
    },
    {
        "id": 16,
        "name": "Công ty TNHH Thiết Bị Y Tế Lộc An",
        "createdAt": "2026-03-24T17:09:00.000Z",
        "supplier": "Loc An Medical",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP017",
                "productName": "Khẩu trang y tế hộp 50 cái",
                "unit": "Hộp",
                "quantity": 75,
                "importPrice": 32000,
                "totalAmount": 2400000
            }
        ]
    },
    {
        "id": 17,
        "name": "Công ty TNHH Bánh Ngọt Moonlight",
        "createdAt": "2026-03-25T08:53:00.000Z",
        "supplier": "Moonlight Bakery",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP018",
                "productName": "Bánh tiramisu mini",
                "unit": "Cái",
                "quantity": 120,
                "importPrice": 33000,
                "totalAmount": 3960000
            }
        ]
    },
    {
        "id": 18,
        "name": "Công ty CP Thực Phẩm DeliFresh",
        "createdAt": "2026-03-26T19:30:00.000Z",
        "supplier": "DeliFresh",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP019",
                "productName": "Nem chua rán 500g",
                "unit": "Gói",
                "quantity": 65,
                "importPrice": 58000,
                "totalAmount": 3770000
            }
        ]
    },
    {
        "id": 19,
        "name": "Công ty TNHH Hóa Mỹ Phẩm Sakura",
        "createdAt": "2026-03-27T15:55:00.000Z",
        "supplier": "Sakura Cosmetics",
        "isAvailable": true,
        "productHistory": [
            {
                "code": "SP020",
                "productName": "Sữa rửa mặt Sakura 120ml",
                "unit": "Tuýp",
                "quantity": 40,
                "importPrice": 175000,
                "totalAmount": 7000000
            }
        ]
    },
    {
        "id": 20,
        "name": "Công ty CP Boss Coffee Việt Nam",
        "createdAt": "2026-03-28T10:23:00.000Z",
        "supplier": "Boss Coffee",
        "isAvailable": false,
        "productHistory": [
            {
                "code": "SP021",
                "productName": "Cà phê sữa lon 250ml",
                "unit": "Thùng",
                "quantity": 54,
                "importPrice": 225000,
                "totalAmount": 12150000
            }
        ]
    }
];
*/
import { useState } from 'react';
export default function History({listHistory}) {
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
    
    // {listHistory.length>1? console.log( listHistory[0].employee+" "+listHistory[0].createdAt+" "+listHistory[0].isAvailable 
    //     +listHistory.arrayEditItem.productCode) : ""}
    console.log(listHistory[0])
    
    
    
   return (
    <div className="history">
        <div className="container-history">
            <div className="main-history">
                {/* Header History */}
                <div className="header-history">
                    <h1 className="header-history__title">Lịch sử nhập hàng</h1>
                    <button className="btn-import">Import File</button>
                </div>

                {/* Main History */}
                <div className="history-list">
                    <ul className="history-header">
                        <li className="col-staff">Nhân viên</li>
                        <li className="col-time">Thời gian</li>
                        <li className="col-supplier">Nhà cung cấp</li>
                        <li className="col-status">Trạng thái</li>
                    </ul>

                    <div className="item-history-list">
                        {/* Bọc details ở ngoài để mở rộng table */}
                        {listHistory.slice(9*currentPage-9 , 9*currentPage).map((item,index) => (
                            <details
                                className="history-details"
                                key={index}
                                open={index === currentExpandBox}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleExpandBoxHistory(index);
                                }}
                            >
                                <summary className="history-summary">
                                    <ul className="history-info-row">
                                        <li className="col-staff">{item.employee}</li>
                                        <li className="col-time">{item.createdAt}</li> {/* sử dụng day.jss */}
                                        <li className="col-supplier">{item.supplier}</li>
                                        <li className="col-status">
                                            <span className="badge badge-success">{item.isAvailable?"Đã xác nhận":"Chưa xác nhận"}</span>
                                        </li>
                                    </ul>
                                    <span className='expand-icon'>▼</span>
                                </summary>

                                {currentExpandBox === index &&(
                                    <div className="table-wrapper">
                                        <table className="item-table-history">
                                            <thead>
                                                <tr className="table-header-row">
                                                    <th className="table-th">Mã sản phẩm</th>
                                                    <th className="table-th">Tên sản phẩm</th>
                                                    <th className="table-th">Đơn vị (thuộc tính)</th>
                                                    <th className="table-th">Số lượng nhập</th>
                                                    <th className="table-th">Đơn giá nhập</th>
                                                    <th className="table-th">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(item.arrayItemEdit).map(([key, prd]) =>{   
                                                return(     
                                                    <tr className="table-row" key={key}>
                                                        <td className="table-td">{prd.productCode}</td>
                                                        <td className="table-td">{prd.productName}</td>
                                                        <td className="table-td">{prd.productUnit}</td>
                                                        <td className='table-td'>{prd.inputQuantity}</td>
                                                        <td className='table-td'>{prd.inputPrice.toLocaleString('en-US')}</td>
                                                        <td className='table-td'>{prd.total.toLocaleString('en-US')}</td>
                                                    </tr>
                                                )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </details>
                        ))}
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
  );
}
// cần phải làm đồng bộ khi expand cái box đấy
