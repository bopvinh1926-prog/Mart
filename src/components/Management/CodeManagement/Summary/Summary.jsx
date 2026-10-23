import { useMemo, useState } from 'react';
import './Summary.css';

const sampleBills = [
  {
    id: 'HD003',
    seller: 'Lê Văn Cường',
    dateTime: `${new Date().toISOString().slice(0, 7)}-01T08:15:00`, 
    total: 120000,
    productArr: [
      { name: 'Trà sữa trân châu', quantity: 2, price: 45000 },
      { name: 'Bánh ngọt', quantity: 1, price: 30000 },
    ],
  },
  {
    id: 'HD004',
    seller: 'Phạm Thị Dung',
    dateTime: `${new Date().toISOString().slice(0, 7)}-02T10:20:00`,
    total: 115000,
    productArr: [
      { name: 'Sinh tố bơ', quantity: 1, price: 55000 },
      { name: 'Cà phê đen', quantity: 2, price: 30000 },
    ],
  },
  {
    id: 'HD005',
    seller: 'Nguyễn Văn An',
    dateTime: `${new Date().toISOString().slice(0, 7)}-03T11:45:00`,
    total: 120000,
    productArr: [
      { name: 'Nước ép cam', quantity: 3, price: 40000 },
    ],
  },
  {
    id: 'HD006',
    seller: 'Trần Thị Bình',
    dateTime: `${new Date().toISOString().slice(0, 7)}-05T13:10:00`,
    total: 140000,
    productArr: [
      { name: 'Trà đào', quantity: 2, price: 50000 },
      { name: 'Cà phê sữa', quantity: 1, price: 40000 },
    ],
  },
  {
    id: 'HD007',
    seller: 'Hoàng Văn Em',
    dateTime: `${new Date().toISOString().slice(0, 7)}-06T14:30:00`,
    total: 145000,
    productArr: [
      { name: 'Bánh mì', quantity: 2, price: 35000 },
      { name: 'Cà phê rang xay', quantity: 1, price: 75000 },
    ],
  },
  {
    id: 'HD008',
    seller: 'Đặng Thị Hoa',
    dateTime: `${new Date().toISOString().slice(0, 7)}-08T16:00:00`,
    total: 120000,
    productArr: [
      { name: 'Sinh tố dâu', quantity: 1, price: 60000 },
      { name: 'Bánh ngọt', quantity: 2, price: 30000 },
    ],
  },
  {
    id: 'HD009',
    seller: 'Lê Văn Cường',
    dateTime: `${new Date().toISOString().slice(0, 7)}-09T18:20:00`,
    total: 100000,
    productArr: [
      { name: 'Trà chanh', quantity: 4, price: 25000 },
    ],
  },
  {
    id: 'HD010',
    seller: 'Phạm Thị Dung',
    dateTime: `${new Date().toISOString().slice(0, 7)}-10T19:45:00`,
    total: 125000,
    productArr: [
      { name: 'Cà phê sữa', quantity: 2, price: 40000 },
      { name: 'Nước ép táo', quantity: 1, price: 45000 },
    ],
  },
  {
    id: 'HD011',
    seller: 'Nguyễn Văn An',
    dateTime: `${new Date().toISOString().slice(0, 7)}-11T07:30:00`,
    total: 130000,
    productArr: [
      { name: 'Trà đào', quantity: 1, price: 50000 },
      { name: 'Bánh mì', quantity: 1, price: 35000 },
      { name: 'Trà sữa trân châu', quantity: 1, price: 45000 },
    ],
  },
  {
    id: 'HD012',
    seller: 'Trần Thị Bình',
    dateTime: `${new Date().toISOString().slice(0, 7)}-15T09:15:00`,
    total: 110000,
    productArr: [
      { name: 'Sinh tố bơ', quantity: 2, price: 55000 },
    ],
  },
  {
    id: 'HD013',
    seller: 'Hoàng Văn Em',
    dateTime: `${new Date().toISOString().slice(0, 7)}-16T10:50:00`,
    total: 90000,
    productArr: [
      { name: 'Cà phê đen', quantity: 3, price: 30000 },
    ],
  },
  {
    id: 'HD014',
    seller: 'Đặng Thị Hoa',
    dateTime: `${new Date().toISOString().slice(0, 7)}-18T12:00:00`,
    total: 110000,
    productArr: [
      { name: 'Nước ép lựu', quantity: 1, price: 60000 },
      { name: 'Trà chanh', quantity: 2, price: 25000 },
    ],
  },
  {
    id: 'HD015',
    seller: 'Lê Văn Cường',
    dateTime: `${new Date().toISOString().slice(0, 7)}-20T14:10:00`,
    total: 150000,
    productArr: [
      { name: 'Bánh ngọt', quantity: 3, price: 30000 },
      { name: 'Sinh tố dâu', quantity: 1, price: 60000 },
    ],
  },
  {
    id: 'HD016',
    seller: 'Phạm Thị Dung',
    dateTime: `${new Date().toISOString().slice(0, 7)}-22T16:30:00`,
    total: 150000,
    productArr: [
      { name: 'Cà phê rang xay', quantity: 2, price: 75000 },
    ],
  },
  {
    id: 'HD017',
    seller: 'Nguyễn Văn An',
    dateTime: `${new Date().toISOString().slice(0, 7)}-25T20:00:00`,
    total: 205000,
    items: [
      { name: 'Trà sữa trân châu', quantity: 3, price: 45000 },
      { name: 'Bánh mì', quantity: 2, price: 35000 },
    ],
  },
];
const readBills=()=>{
	const stored = localStorage.getItem('dataBill');
	return stored?JSON.parse(stored):sampleBills; // khi đưa vào dự án thì thay thế  bằng null hoặc là mảng rỗng
}
// sau này chúng ta phải cập nhật theo dữ liệu nhân viên chứ kp lấy dữ liệu nơi Hóa đơn

const getBillDate = (bill) => bill?.dateTime ?? '';

// giải thích tí về các lệnh dưới đây
// nếu bill khác null thì truy cập thuộc tính nếu bill là null thì trả về là rỗng
/*2. 
	• Nếu không có dấu ?, trong trường hợp bill bị null, chương trình sẽ báo lỗi ngay lập tức: 
  Cannot read properties of null (reading 'productArr').
  ==> có thể dùng cacash viết này return (bill && bill.productArr) ? bill.productArr : [];
*/
const getBillItems = (bill) => bill?.productArr ?? bill?.items ?? [];

const getBillRevenue = (bill) => {
  return bill && bill.total?bill.total:0
};

const getItemName = (item) => item?.name??""
 

const getItemQuantity = (item) =>
  Number(item?.buyQuantity) || 0;

const getItemPrice = (item) =>
  Number(item?.price) || 0;

// hàm này có thể k cần
const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

function App() {
  const today = new Date();
  /* 2020-09  == getDate là lấy ra số ngày trong tháng*/
  const todayDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
  const [dateStart, setDateStart] = useState(todayDate); // dùng state quản lí ngày bắt đầu và kết thúc mặc định ln là ca của
  const [dateEnd, setDateEnd] = useState(todayDate);
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [bills] = useState(readBills); // đây là đàng đọc bill
  // lấy danh sách các hoát đơn mà nhân  viên bán
  const employees = useMemo(
    () => [...new Set(bills.map((bill) => bill?.seller).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, 'vi')),
    [bills],
  );
  // hàm trả về hóa đơn cùng ngày nằm từ ngày bắt đầu tới ngày kết thúc
  const rangeBills = useMemo(
    // trên sampBills dateTime: `${new Date().toISOString().slice(0, 7)}-01T08:15:00`, chữ 01 chính là ngày và đoạn sau là thời gian
    () => bills.filter((bill) => {
      const date = String(getBillDate(bill).slice(0,10));
      
      return date && date >= dateStart && date <= dateEnd; 
    }),
    [bills, dateStart, dateEnd],
  );
  // lấy bill theo nhân viên 
  const selectedBills = useMemo(
    () => selectedEmployee === 'all'
      ? rangeBills
      : rangeBills.filter((bill) => bill?.seller === selectedEmployee),
    [rangeBills, selectedEmployee],
  );

  // lấy hóa đơn theo ngày và nhân viên đã chọn để tính tổng
  const total = useMemo(
    () => selectedBills.reduce((sum, bill) => sum + getBillRevenue(bill), 0),
    [selectedBills],
  );
  
  // danh sách những hàng hóa đã bán được
  const soldProducts = useMemo(() => {
    const productMap = new Map();

    selectedBills.map((bill) => {
      getBillItems(bill).map((item) => {
        const name = getItemName(item);
        const quantity = getItemQuantity(item);
        const price = getItemPrice(item);
        // tạo ra một đối tượng mảng nếu có r thì tiếp tục cập nhật
        //const current = productMap.get(name) ? { name, quantity: 0, revenue: 0 }:productMap.get(name);
        const current = productMap.get(name) ?productMap.get(name): { name, quantity: 0, revenue: 0 }; 
        // có thể sử dụng 2 cách gghi
        current.quantity += quantity;
        current.revenue += quantity * price;
        productMap.set(name, current); // set hàm map 
      });
    });

    return Array.from(productMap.values()).sort((a, b) => b.quantity - a.quantity); // chuyển đổi về mảng và sắp xếp
  }, [selectedBills]);
  console.log(selectedBills)
  return (
    <main className="summary-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">BÁO CÁO BÁN HÀNG</p>
          <h1>Summary</h1>
          <p className="page-description">Theo dõi doanh thu và hàng hóa đã bán theo thời gian.</p>
        </div>
        <div className="month-picker">
          <label className="month-control">
            <span>Từ ngày</span>
            <input
              type="date"
              value={dateStart}
              max={dateEnd}
              onChange={(event) => setDateStart(event.target.value)}
            />
          </label>
          <label className="month-control">
            <span>Đến ngày</span>
            <input
              type="date"
              value={dateEnd}
              min={dateStart}
              onChange={(event) => setDateEnd(event.target.value)}
            />
          </label>
        </div>
      </header>

      <section className="employee-filter" aria-label="Lọc theo nhân viên">
        <label htmlFor="employee-select">Nhân viên bán</label>
        <select
          id="employee-select"
          value={selectedEmployee}
          onChange={(event) => setSelectedEmployee(event.target.value)}
        >
          <option value="all">Hệ thống</option>
          {employees.map((employee) => (
            <option key={employee} value={employee}>{employee}</option>
          ))}
        </select>
      </section>

      <section className="summary-card" aria-label="Tổng doanh thu">
        <div className="revenue-icon" aria-hidden="true">₫</div>
        <div>
          <p className="card-label">Tổng doanh thu</p>
          <p className="revenue-total">{total.toLocaleString('en-US')}</p>
          <p className="card-note">Từ {dateStart} đến {dateEnd}</p>
        </div>
      </section>

      <section className="products-section">
        <div className="section-heading">
          <div>
            <h2>Hàng hóa đã bán</h2>
            <p>Tổng hợp số lượng và doanh thu theo từng sản phẩm</p>
          </div>
          <span className="product-count">{soldProducts.length} sản phẩm</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng bán</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {soldProducts.length > 0 ? (
                soldProducts.map((product) => (
                  <tr key={product.name}>
                    <td className="product-name">{product.name}</td>
                    <td>{product.quantity}</td>
                    <td className="product-revenue">{formatCurrency(product.revenue)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="empty-state" colSpan="3">
                    Chưa có hàng hóa được bán trong thời gian này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;
