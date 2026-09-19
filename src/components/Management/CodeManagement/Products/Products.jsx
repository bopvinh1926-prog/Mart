import { useState, useRef, useEffect } from "react";
import "../../CSSManagement/ProductsStyle/Products.css";
import GeneralInforProducts from "./GeneralInforProducts";
import History from "./History";
import {PRODUCTS} from '../../../../data/PRODUCTS.js' ;

export default function Products() {
    const [selectedSupplier,setSelectedSupplier] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [itemEdit, setItemEdit] = useState({});

    // Khi thêm sản phẩm vào itemEdit => copy thuộc tính từ sản phẩm selected
    const handleAddProductEdit = (prd) => {
        setItemEdit((prev) => ({
            ...prev,
            [prd.id]: {
                inputQuantity: 1,
                inputPrice: prd.price,
                productCode:prd.id,
                productName:prd.name,
                productUnit:prd.unit,
                total:prd.price
                
                // Không nên dùng code:prd.code vì không có field code ở initialProducts
                // Có thể truyền các field khác nếu cần thiết về sau
            }
        }));
    };

    // Khi thay đổi input nhập số lượng, giá
    const handleChangeInputItem = (e, id) => {
        const { name, value } = e.target;
        let finalValue;
        if (name === "inputPrice") {
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
            const price = name ==='inputPrice'? value:prev[id].inputPrice;
            const quantity = name ==='inputQuantity' ? value : prev[id].inputQuantity;

            return  {
            ...prev,
            [id]: {
                ...prev[id],
                [name]: finalValue, total:price*quantity
            }
        }});
    };

    // Lịch sử nhập hàng: mỗi lần nhấn lưu thì chúng ta lưu lại mảng các sản phẩm nhập gần nhất
    const [historyImportProducts, setHistoryImportProducts] = useState([]);
    const handleAddHistoryImport = (historyImport) => {
        const newRecord = {
            employee: "admin", // TODO: nếu có đăng nhập lấy tên user real
            createdAt: Date.now(),
            isAvailable: false,
            supplier:selectedSupplier,
            arrayItemEdit: historyImport
        };
        setHistoryImportProducts((prev) => [...prev, newRecord]);
        setItemEdit({});
        setSelectedSupplier("");
    };

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
    const availableProducts = PRODUCTS.filter(item => {
        const notDuplicated = !itemEdit[item.id];
        const searchStr = searchValue.trim().toLowerCase();
        const searchInID = item.id.toLowerCase().includes(searchStr);
        const searchInNameVN = removeVietnameseTones(item.name).includes(searchStr);
        const searchInName = item.name.toLowerCase().includes(searchStr);
        return notDuplicated && (searchInID || searchInNameVN || searchInName || searchStr === "");
    });

    // Xóa 1 sản phẩm trong bảng nhập
    const handleDeleteTableProducts = (prdID) => {
        setItemEdit((prev) => {
            const updatedProducts = { ...prev };
            delete updatedProducts[prdID];
            return updatedProducts;
        });
    };

    return (
        <div className="products-container">
            <div className="sidebar">
                <button className={isSidebarOpen ? "active" : ""} onClick={() => setIsSidebarOpen(true)}>
                    Hàng hóa
                </button>
                <button className={!isSidebarOpen ? "active" : ""} onClick={() => setIsSidebarOpen(false)}>
                    Lịch sử nhập hàng
                </button>
            </div>

            {!isSidebarOpen && (
                <History listHistory={historyImportProducts} />
            )}

            {isSidebarOpen && (
                <div className="main-products">
                    <GeneralInforProducts handleSupplier= {setSelectedSupplier} />
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
                                    {PRODUCTS.filter(item => itemEdit[item.id] !== undefined).map((item) => (
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
                                                    value={typeof itemEdit[item.id].inputQuantity === "number"
                                                        ? itemEdit[item.id].inputQuantity
                                                        : 0}
                                                    onChange={(e) => handleChangeInputItem(e, item.id)}
                                                />
                                            </td>
                                            <td className="table-th">
                                                <input
                                                    type="text"
                                                    className="table-input input-price"
                                                    name="inputPrice"
                                                    value={
                                                        itemEdit[item.id].inputPrice === 0 || itemEdit[item.id].inputPrice === ""
                                                            ? item.price.toLocaleString('en-US')
                                                            : Number(itemEdit[item.id].inputPrice).toLocaleString('en-US')
                                                    }
                                                    onChange={(e) => handleChangeInputItem(e, item.id)}
                                                />
                                            </td>
                                            <td className="table-th">
                                                <input
                                                    name="total"
                                                    type="text"
                                                    className="table-input input-total"
                                                    value={ itemEdit[item.id].inputQuantity ===0 ?0:(
                                                        (itemEdit[item.id].inputPrice ? +itemEdit[item.id].inputPrice : item.price) *
                                                        (itemEdit[item.id].inputQuantity ? +itemEdit[item.id].inputQuantity : 1)
                                                    ).toLocaleString("en-US")}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="table-th">
                                                <button className="btn-delete" onClick={() => handleDeleteTableProducts(item.id)}>
                                                    Xóa
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
                        <button className="btn-save" onClick={() => handleAddHistoryImport(itemEdit)}>
                            Lưu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
