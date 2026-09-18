import { useState, useRef, useEffect } from "react";
import "../../CSSManagement/ProductsStyle/Products.css";
import GeneralInforProducts from "./GeneralInforProducts";
import History from "./History";


const initialProducts = [
    { id: "SP001", name: "Sữa tươi Vinamilk 100% (1L)", unit: "Hộp", quantity: 5, price: 32000, total: 160000 },
    { id: "SP002", name: "Mì Hảo Hảo Tôm Chua Cay", unit: "Thùng", quantity: 2, price: 115000, total: 230000 },
    { id: "SP003", name: "Dầu ăn Tường An (1L)", unit: "Chai", quantity: 10, price: 48000, total: 480000 },
    { id: "SP004", name: "Đường tinh luyện Biên Hòa (1kg)", unit: "Gói", quantity: 4, price: 26000, total: 104000 },
    { id: "SP005", name: "Nước tương Chinsu (250ml)", unit: "Chai", quantity: 6, price: 18000, total: 108000 },
    { id: "SP006", name: "Gạo thơm Jasmine (5kg)", unit: "Túi", quantity: 3, price: 125000, total: 375000 },
    { id: "SP007", name: "Nước mắm Nam Ngư 3-In-1 (750ml)", unit: "Chai", quantity: 8, price: 42000, total: 336000 },
    { id: "SP008", name: "Hạt nêm Knorr thịt thăn (900g)", unit: "Gói", quantity: 5, price: 82000, total: 410000 },
    { id: "SP009", name: "Muối I-ốt Vifon (500g)", unit: "Gói", quantity: 12, price: 8000, total: 96000 },
    { id: "SP010", name: "Bột ngọt Ajinomoto (450g)", unit: "Gói", quantity: 7, price: 45000, total: 315000 },
    { id: "SP011", name: "Tương ớt Cholimex (270g)", unit: "Chai", quantity: 15, price: 12000, total: 180000 },
    { id: "SP012", name: "Sữa đặc Ông Thọ nhãn đỏ (380g)", unit: "Hộp", quantity: 10, price: 24000, total: 240000 },
    { id: "SP013", name: "Sữa chua Vinamilk có đường (Lốc 4)", unit: "Lốc", quantity: 6, price: 28000, total: 168000 },
    { id: "SP014", name: "Bánh quy OREO vị Chocolate (133g)", unit: "Gói", quantity: 8, price: 18000, total: 144000 },
    { id: "SP015", name: "Bánh Chocopie Orion (Hộp 12 cái)", unit: "Hộp", quantity: 4, price: 58000, total: 232000 },
    { id: "SP016", name: "Snack Oishi tôm cay (40g)", unit: "Gói", quantity: 20, price: 6000, total: 120000 },
    { id: "SP017", name: "Kẹo Chupa Chups hỗn hợp (Xô 60 que)", unit: "Xô", quantity: 2, price: 95000, total: 190000 },
    { id: "SP018", name: "Cà phê hòa tan Trung Nguyên G7 (3in1)", unit: "Hộp", quantity: 5, price: 62000, total: 310000 },
    { id: "SP019", name: "Trà xanh Lipton Nhãn Vàng (Hộp 25 gói)", unit: "Hộp", quantity: 3, price: 45000, total: 135000 },
    { id: "SP020", name: "Nước ngọt Coca-Cola (Lốc 6 lon)", unit: "Lốc", quantity: 5, price: 58000, total: 290000 },
    { id: "SP021", name: "Nước ngọt Pepsi Không Calo (Lốc 6 lon)", unit: "Lốc", quantity: 4, price: 56000, total: 224000 },
    { id: "SP022", name: "Nước khoáng Aquafina (1.5L)", unit: "Chai", quantity: 12, price: 10000, total: 120000 },
    { id: "SP023", name: "Nước tăng lực Redbull (Lon 250ml)", unit: "Lon", quantity: 18, price: 14000, total: 252000 },
    { id: "SP024", name: "Bia Heineken Silver (Thùng 24 lon)", unit: "Thùng", quantity: 1, price: 450000, total: 450000 },
    { id: "SP025", name: "Bia Sài Gòn Special (Thùng 24 lon)", unit: "Thùng", quantity: 2, price: 330000, total: 660000 },
    { id: "SP026", name: "Dầu xả Pantene Chăm Sóc Hư Tổn (300ml)", unit: "Chai", quantity: 3, price: 78000, total: 234000 },
    { id: "SP027", name: "Dầu gội Clear Bạc Hà (630g)", unit: "Chai", quantity: 4, price: 145000, total: 580000 },
    { id: "SP028", name: "Sữa tắm Lifebuoy Bảo Vệ Vượt Trội (850g)", unit: "Chai", quantity: 3, price: 165000, total: 495000 },
    { id: "SP029", name: "Xà bông cục Camay hương nước hoa (125g)", unit: "Bánh", quantity: 10, price: 15000, total: 150000 },
    { id: "SP030", name: "Kem đánh răng P/S Bảo Vệ 123 (240g)", unit: "Tuýp", quantity: 8, price: 38000, total: 304000 },
    { id: "SP031", name: "Bàn chải đánh răng Colgate SlimSoft", unit: "Cây", quantity: 12, price: 32000, total: 384000 },
    { id: "SP032", name: "Nước rửa tay Lifebuoy Cho Tay Bẩn (500ml)", unit: "Chai", quantity: 5, price: 68000, total: 340000 },
    { id: "SP033", name: "Bột giặt OMO Matic Cửa Trên (4.1kg)", unit: "Túi", quantity: 2, price: 210000, total: 420000 },
    { id: "SP034", name: "Nước giặt Ariel Hương Downy (3.1kg)", unit: "Túi", quantity: 2, price: 235000, total: 470000 },
    { id: "SP035", name: "Nước xả vải Comfort Nắng Mai (3.8L)", unit: "Túi", quantity: 3, price: 195000, total: 585000 },
    { id: "SP036", name: "Nước rửa chén Sunlight Chanh (3.6kg)", unit: "Can", quantity: 2, price: 115000, total: 230000 },
    { id: "SP037", name: "Nước lau sàn Sunlight Hương Hoa Lily (3.8kg)", unit: "Can", quantity: 2, price: 92000, total: 184000 },
    { id: "SP038", name: "Nước tẩy bồn cầu Vim Đậm Đặc (880ml)", unit: "Chai", quantity: 6, price: 39000, total: 234000 },
    { id: "SP039", name: "Khăn giấy ăn Pulppy (Gói 100 tờ)", unit: "Gói", quantity: 15, price: 18000, total: 270000 },
    { id: "SP040", name: "Giấy vệ sinh An An (Lốc 10 cuộn)", unit: "Lốc", quantity: 5, price: 42000, total: 210000 },
    { id: "SP041", name: "Màng bọc thực phẩm Ringo 500m", unit: "Cuộn", quantity: 2, price: 135000, total: 270000 },
    { id: "SP042", name: "Túi đựng rác tự hủy sinh học Okitree", unit: "Cuộn", quantity: 8, price: 25000, total: 200000 },
    { id: "SP043", name: "Nước lau kính Cif Hương Biển (520ml)", unit: "Chai", quantity: 4, price: 28000, total: 112000 },
    { id: "SP044", name: "Bột mì đa dụng Meizan (1kg)", unit: "Gói", quantity: 6, price: 23000, total: 138000 },
    { id: "SP045", name: "Nấm mèo đen sấy khô (100g)", unit: "Gói", quantity: 10, price: 22000, total: 220000 },
    { id: "SP046", name: "Miến dong riềng Cao Bằng (500g)", unit: "Gói", quantity: 5, price: 45000, total: 225000 },
    { id: "SP047", name: "Bún tươi khô Cầu Đước (500g)", unit: "Gói", quantity: 8, price: 19000, total: 152000 },
    { id: "SP048", name: "Xúc xích tiệt trùng Vissan (Gói 5 cây)", unit: "Gói", quantity: 10, price: 21000, total: 210000 },
    { id: "SP049", name: "Cá hộp Ba Cô Gái xốt cà (155g)", unit: "Lon", quantity: 12, price: 19000, total: 228000 },
    { id: "SP050", name: "Thịt heo 2 lát Vissan (150g)", unit: "Lon", quantity: 6, price: 28000, total: 168000 },
    { id: "SP051", name: "Đậu hũ non Học Viện (Khay 300g)", unit: "Khay", quantity: 7, price: 12000, total: 84000 },
    { id: "SP052", name: "Trứng gà tươi Ba Huân (Hộp 10 quả)", unit: "Hộp", quantity: 5, price: 34000, total: 170000 },
    { id: "SP053", name: "Trứng vịt muối Ba Huân (Hộp 4 quả)", unit: "Hộp", quantity: 4, price: 26000, total: 104000 },
    { id: "SP054", name: "Bơ thực vật Tường An (200g)", unit: "Hộp", quantity: 6, price: 19000, total: 114000 },
    { id: "SP055", name: "Phô mai Con Bò Cười (Hộp 16 miếng)", unit: "Hộp", quantity: 3, price: 68000, total: 204000 },
    { id: "SP056", name: "Kem Merino ốc quế dâu (100ml)", unit: "Cây", quantity: 10, price: 15000, total: 150000 }
];

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
    const availableProducts = initialProducts.filter(item => {
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
                                    {initialProducts.filter(item => itemEdit[item.id] !== undefined).map((item) => (
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
