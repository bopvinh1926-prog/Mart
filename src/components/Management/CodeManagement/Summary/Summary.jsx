import { useState, useEffect, useMemo } from 'react';
import './Summary.css';

function ProductList({ productSummary }) {
  const keys = Object.keys(productSummary);
  if (keys.length === 0) {
    return (
      <div className="summary-no-products">
        Chưa có hàng hóa nào được bán ngày này.
      </div>
    );
  }
  return (
    <ul className="summary-product-list">
      {keys.map((key) => (
        <li key={key}>
          {productSummary[key].name}: <strong>{productSummary[key].quantity}</strong>
        </li>
      ))}
    </ul>
  );
}

export default function Summary() {
  // 1. State quản lý ngày được chọn (mặc định lấy ngày hiện tại YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Dạng "2026-10-08"
  });

  // 2. State quản lý danh sách hóa đơn lấy từ localStorage
  const [dataBill, setDataBill] = useState([]);

  // Thêm state để chọn màn (doanh thu hoặc sản phẩm đã bán)
  const [tab, setTab] = useState('revenue'); // 'revenue' hoặc 'products'

  // Hàm đọc dữ liệu từ localStorage
  const loadDataBill = () => {
    try {
      const stored = localStorage.getItem('dataBill');
      if (stored) {
        setDataBill(JSON.parse(stored));
      } else {
        setDataBill([]);
      }
    } catch (error) {
      console.error("Lỗi khi đọc dataBill từ localStorage:", error);
      setDataBill([]);
    }
  };

  // Đọc localStorage khi component được mount
  useEffect(() => {
    // Tránh gọi setState trực tiếp khi mount - chỉ gọi khi event fire hoặc qua nút bấm
    loadDataBill();

    const handleStorageChange = () => loadDataBill();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
    // eslint-disable-next-line
  }, []);

  // Chuyển đổi định dạng ngày từ YYYY-MM-DD sang DD/MM/YYYY để so sánh với dateTime
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return '';
    const [year, month, day] = selectedDate.split('-');
    return `${day}/${month}/${year}`; // Dạng "08/10/2026"
  }, [selectedDate]);

  // 3. Tính tổng tiền, số lượng đơn hàng và tổng số hàng hóa đã bán theo ngày được chọn
  const { totalRevenue, billCount, productSummary } = useMemo(() => {
    if (!formattedSelectedDate || !Array.isArray(dataBill)) {
      return { totalRevenue: 0, billCount: 0, productSummary: {} };
    }

    let sum = 0;
    let count = 0;
    // { [productNameOrId]: { name, quantity } }
    let productsMap = {};

    dataBill.forEach((bill) => {
      // dateTime có dạng "08/10/2026 16:44:56" -> lấy chuỗi ngày trước khoảng trắng
      const billDate = bill.dateTime ? bill.dateTime.split(' ')[0] : '';

      if (billDate === formattedSelectedDate) {
        sum += Number(bill.total) || 0;
        count += 1;

        // Gom thông tin sản phẩm đã bán
        if (Array.isArray(bill.cart)) {
          bill.cart.forEach(item => {
            const key = item.name || item.id;
            if (key) {
              if (!productsMap[key]) {
                productsMap[key] = {
                  name: item.name || `SP #${item.id}`,
                  quantity: Number(item.quantity) || 0
                };
              } else {
                productsMap[key].quantity += Number(item.quantity) || 0;
              }
            }
          });
        }
      }
    });

    return { totalRevenue: sum, billCount: count, productSummary: productsMap };
  }, [dataBill, formattedSelectedDate]);

  // Tạo giao diện menu nhỏ chọn giữa Doanh thu & Danh sách đã bán
  return (
    <div className="summary-main-bg">
      <div className="summary-container">
        <h2 className="summary-title">Thống Kê</h2>
        
        <div style={{display: 'flex', gap: 10, marginBottom: 18}}>
          <button
            className={tab === 'revenue' ? 'summary-menu-btn active' : 'summary-menu-btn'}
            onClick={() => setTab('revenue')}
            style={{
              flex: 1,
              background: tab === 'revenue' ? 'linear-gradient(90deg, #0284c7 55%, #38bdf8 100%)' : '#f0f9ff',
              color: tab === 'revenue' ? '#fff' : '#0284c7',
              border: 'none',
              borderRadius: '5px 0 0 5px',
              padding: '10px 0',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: 16,
              transition: "background 0.17s"
            }}
          >
            Doanh Thu
          </button>
          <button
            className={tab === 'products' ? 'summary-menu-btn active' : 'summary-menu-btn'}
            onClick={() => setTab('products')}
            style={{
              flex: 1,
              background: tab === 'products' ? 'linear-gradient(90deg, #0284c7 60%, #38bdf8 100%)' : '#f0f9ff',
              color: tab === 'products' ? '#fff' : '#0284c7',
              border: 'none',
              borderRadius: '0 5px 5px 0',
              padding: '10px 0',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: 16,
              transition: "background 0.17s"
            }}
          >
            Hàng hóa đã bán
          </button>
        </div>

        {/* Selector chọn ngày */}
        <div className="summary-date-selector">
          <label className="summary-label">Chọn ngày:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="summary-input"
          />
        </div>

        {tab === 'revenue' && (
          <>
            {/* Kết quả tổng tiền */}
            <div className="summary-result-box">
              <div className="summary-date">
                Ngày: <strong>{formattedSelectedDate}</strong>
              </div>
              <div className="summary-count">
                Số lượng đơn: <strong>{billCount} đơn</strong>
              </div>
              <hr className="summary-hr" />
              <div className="summary-total">
                Tổng tiền: <span className="summary-total-value">{totalRevenue.toLocaleString('vi-VN')} VNĐ</span>
              </div>
            </div>
            <button
              onClick={loadDataBill}
              className="summary-refresh-btn"
            >
              Làm mới dữ liệu từ LocalStorage
            </button>
          </>
        )}

        {tab === 'products' && (
          <div className="summary-products-container">
            <div className="summary-label summary-products-title" style={{marginBottom: 8}}>
              Liệt kê số lượng hàng hóa đã bán:
            </div>
            <ProductList productSummary={productSummary} />
            <button
              onClick={loadDataBill}
              className="summary-refresh-btn"
              style={{marginTop: 12}} // để refresh khi ở tab này luôn
            >
              Làm mới dữ liệu từ LocalStorage
            </button>
          </div>
        )}

      </div>
    </div>
  );
}