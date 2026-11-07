import { useState, useRef, useEffect } from "react";
import Modal from "./Modal.jsx";
import "../../CSSManagement/ProductsStyle/Products.css";
import GeneralInforProducts from "./GeneralInforProducts";
import History from "./History";
import ManagementProducts from "../ManagementProducts/ManagementProducts.jsx";
import { PRODUCTS_SELL } from "../../../../data/PRODUCTS_SELL.JS";

export default function Products() {
    const [openModal,setOpenModal] = useState(false);
    const [selectedSupplier,setSelectedSupplier] = useState(); /// nhà cung cấp được chọn
    const [groupSupplier,setGroupSupplier]  = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState("editProducts"); // true là mở bên Hàng hóa False là mở bên nhập hàng
    const [itemEdit, setItemEdit] = useState([]); // sửa lại thành mảng
    //  cho thằng này thành localStorage 
    
    const [products,setProducts] = useState(()=>{
        const dataProduct = localStorage.getItem('products');
        return dataProduct ? JSON.parse(dataProduct):PRODUCTS_SELL ; 
    })
    // mỗi khi xóa hàng hóa trong ManagementProducts
    // useEffect(()=>{
    //     const handleStorageChange=(e)=>{
    //         if(e.key =='products'){
    //             const updProducts = JSON.parse(e.newValue || '[]');
    //             setProducts(updProducts);
    //         }
    //     }
    //     window.addEventListener('storage',handleStorageChange);
    //     return () => window.removeEventListener('storage', handleStorageChange);
    // },[])
    // 
    const handleCreateProductsList = (item)=>{
        setProducts((prev)=>{
            const newListProduct = [...prev,item];
            localStorage.setItem('products',JSON.stringify(newListProduct));
            return  newListProduct;
        })
    }
    // Khi thêm sản phẩm vào itemEdit => copy thuộc tính từ sản phẩm selected
    const handleAddProductEdit = (prd) => {
        console.log(prd+" prd")
        setItemEdit((prev)=>{
            return[
                ...prev,
                {
                    id:prd.id,
                    name:prd.name,
                    unit:prd.unit,
                    inputQuantity:1,
                    price:prd.price,
                    total: 1* prd.price
                }   

            ]
        })
    };
    

    // Khi thay đổi input nhập số lượng, giá
    const handleChangeInputItem = (e, id) => {
        const { name, value } = e.target;
        let finalValue;
        if (name === "price") {
            // Nếu là giá, cần cho phép nhập tiền, strip , nếu dán số đã có dấu phẩy
            const cleanValue = value.replace(/,/g, '');
            finalValue = cleanValue === "" ? "" : (isNaN(Number(cleanValue)) ? 0 : Number(cleanValue));
        } else if (name === "inputQuantity") {
            finalValue = value === "" ? "" : (isNaN(Number(value)) ? 0 : Number(value));
        }
        else {
            finalValue = value;
        }
        
        setItemEdit((prev) => {
            return prev.map((item) => {
                if (item.id !== id) {
                    return item;
                }
                const price = name === "price" ? Number(finalValue) || 0 : item.price;
                const quantity = name === "inputQuantity" ? Number(finalValue) || 0 : item.inputQuantity;
                
                return{
                    ...item,
                    price:price,
                    inputQuantity: quantity,
                    total: price * quantity,
                };
            });
        });
    };

    // Lịch sử nhập hàng: mỗi lần nhấn lưu thì chúng ta lưu lại mảng các sản phẩm nhập gần nhất
   // tạo thêm cái listHistory quản lí bằng localStorage 
    // Khởi tạo state lịch sử nhập hàng từ localStorage, 
    // nếu không có trong localStorage thì trả về mảng rỗng để tránh lỗi undefined.
    const [historyImportProducts, setHistoryImportProducts] = useState(() => {
        const dataHistory = localStorage.getItem('dataHistory');
        return dataHistory ? JSON.parse(dataHistory) : [];
    });


    const handleSaveHistoryImport = (itemEdit, createdAt) => {
        const newListHistory = {
            employee: "admin", // TODO: nếu có đăng nhập lấy tên user real
            createdAt,
            isAvailable: false,
            supplier:selectedSupplier,
            arrayItemEdit: itemEdit
        };
        // thêm bước cập nhật products 
       
        // Cập nhật lịch sử nhập hàng vào cả state và localStorage
        setHistoryImportProducts((prev) => {
            const updatedHistory = [...prev, newListHistory];
            localStorage.setItem('dataHistory', JSON.stringify(updatedHistory));
            return updatedHistory;
        });
        setItemEdit([]);
        setSelectedSupplier("");
    };
    console.log(itemEdit)
    // Logic hiện/ẩn list sản phẩm
    const [showList, setShowList] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const wrapper = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapper.current && !wrapper.current.contains(event.target)) {
                setShowList(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Hàm loại bỏ dấu tiếng Việt
    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .toLowerCase();
    };

    // Danh sách sản phẩm có thể thêm (không bị chọn rồi, và filter theo tìm kiếm)
    const availableProducts = products.filter(item => {
        const notDuplicated = !itemEdit.some((edit) => edit.id === item.id);
        const searchStr = searchValue.trim().toLowerCase();
        const searchInID = item.id.toLowerCase().includes(searchStr);
        const searchInNameVN = removeVietnameseTones(item.name).includes(searchStr);
        const searchInName = item.name.toLowerCase().includes(searchStr);
        return notDuplicated && (searchInID || searchInNameVN || searchInName || searchStr === "");
    });

    // Xóa 1 sản phẩm trong bảng nhập
    const handleDeleteTableProducts = (prdID) => {
        setItemEdit((prev)=>{
            const deleteProducts = prev.filter((item)=> item.id !== prdID);
            return deleteProducts;
        })
    };
    const handleDeleteProductList = (prd) => {
        const newProducts = products.filter((item) => item.id !== prd.id);
        setProducts(newProducts);
        handleDeleteTableProducts(prd.id);
        localStorage.setItem('products',JSON.stringify(newProducts));
    };
    console.log(itemEdit)
    return (
        <div className="products-container">
            <div className="sidebarMain">
                <button className={isSidebarOpen === "addProducts" ? "active" : ""} onClick={() => setIsSidebarOpen("addProducts")}>
                    Nhập hàng hóa
                </button>
                <button className={isSidebarOpen === "history" ? "active" : ""} onClick={() => setIsSidebarOpen("history")}>
                    Lịch sử nhập hàng
                </button>
                <button className={isSidebarOpen === "editProducts" ? "active" : ""} onClick={() => setIsSidebarOpen("editProducts")}>
                    Quản lí sản phẩm
                </button>
            </div>

            {isSidebarOpen === "history" && (
                <History listHistory={historyImportProducts} />
            )}
            {isSidebarOpen === "editProducts" && (
                    <ManagementProducts products={products} setProducts={setProducts}  />
            )   }
            

            {isSidebarOpen === "addProducts" && (
                <div className="main-products">
                    <GeneralInforProducts 
                        handleSupplier= {setSelectedSupplier} 
                        suppliers={groupSupplier} 
                        setSuppliers = {setGroupSupplier}
                    />
                    <div className="products-list">
                        <h1 className="title-products-list">DANH SÁCH & TỔNG CỘNG</h1>
                        <div className="about-list-products">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Tìm sản phẩm & Thêm vào đơn"
                                onChange={(e) => {
                                    setShowList(true);
                                    setSearchValue(e.target.value);
                                }}
                                value={searchValue}
                            />
                            <div className="add-products ">
                                <button  className="btn-add-prd open"
                                    onClick={()=>setOpenModal(true)} >Thêm sản phẩm
                                </button>
                                <Modal isOpen={openModal} handleCreateProducts={handleCreateProductsList} 
                                    onClose={()=>setOpenModal(false)} 
                                    title={"Hello World"}>
                                    <button className="btn-add-prd close"
                                        onClick={() => setOpenModal(false)}>X
                                    </button>
                                </Modal>
                            </div>
                            
                            <div className={showList ? "list-add-products" : ""} ref={wrapper}>
                                {showList &&
                                    availableProducts.slice(0, 5).map((item) => (
                                        <div key={item.id} className="product-item-list-edit">
                                            <div
                                                className="product-item-edit"
                                                onClick={() => {
                                                    handleAddProductEdit(item);
                                                    setShowList(false);
                                                    setSearchValue("");
                                                }}
                                            >
                                                <div className="product-item-code-edit">{item.id}</div>
                                                <div className="product-item-name-edit">{item.name}</div>
                                                <div className="product-item-price-edit">{item.price.toLocaleString('en-US')}</div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="table-wrapper">
                            <table className="product-table">
                                <thead>
                                    <tr className="table-header-row">
                                        <th className="table-th">Mã sản phẩm</th>
                                        <th className="table-th">Tên sản phẩm</th>
                                        <th className="table-th">Đơn vị(thuộc tính)</th>
                                        <th className="table-th">Số lượng nhập</th>
                                        <th className="table-th">Đơn giá nhập</th>
                                        <th className="table-th">Thành tiền</th>
                                        <th className="table-th">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { itemEdit.map((item)=> (
                                        <tr key={item.id}>
                                            <td className="table-th">{item.id}</td>
                                            <td className="table-th">{item.name}</td>
                                            <td className="table-th">{item.unit}</td>
                                            <td className="table-th">
                                                <input
                                                    type="number"
                                                    className="table-input input-quantity"
                                                    name="inputQuantity"
                                                    min={1}
                                                    value={item.inputQuantity}
                                                    onChange={(e) => handleChangeInputItem(e, item.id)}
                                                />
                                            </td>
                                            <td className="table-th">
                                                <input
                                                    type="text"
                                                    className="table-input input-price"
                                                    name="price"
                                                    value={item.price}
                                                    onChange={(e) => handleChangeInputItem(e, item.id)}
                                                />
                                            </td>
                                            <td className="table-th">
                                                <input
                                                    name="total"
                                                    type="text"
                                                    className="table-input input-total"
                                                    value={item.total.toLocaleString('en-US')}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="table-th">
                                                <button className="btn-delete" onClick={() => handleDeleteTableProducts(item.id)}>
                                                    Xóa
                                                </button>
                                                <button className="btn-delete" 
                                                    onClick={()=>handleDeleteProductList(item)}
                                                >
                                                    Xóa sản phẩm
                                                </button>
                                            </td>
                                            
                                        </tr>
                                    ))}
                                    {Object.keys(itemEdit).length === 0 && (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: "center", color: "#999" }}>
                                                Không có sản phẩm nào đang được chọn để nhập.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <button
                            className="btn-save"
                            onClick={() => {
                               
                                handleSaveHistoryImport(itemEdit,Date.now());
                            }}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
