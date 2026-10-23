import { useRef, useEffect, useState} from "react";
import '../../CSSManagement/ProductsStyle/Modal.css'
export default function Modal({isOpen,onClose,handleCreateProducts}){
    const dialogRef = useRef(null);
    const [form,setForm] = useState(
        {id:"",name:"",unit:"",price:"",quantity:0}
    )
    const listProduct = (()=>{
        const dataProduct = localStorage.getItem('products');
        return dataProduct ? JSON.parse(dataProduct):[]; 
    })
    const handleChangeFormAddProduct = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }
    
    const onSubmitCreateProducts = () => {
        const autoID = form.id && form.id.trim()
            ? form.id.trim()
            : `SP${String(listProduct().length + 1).padStart(4, '0')}`.toLocaleString('en-US');
        // Kiểm tra logic 
        const isValid = !listProduct().some((item) => item.id === autoID);

   
        const productForm = {
            ...form,
            id: autoID
        };
        if (productForm.name && productForm.unit && productForm.price  && isValid) { // Không để trống 3 trường này
            handleCreateProducts(productForm);
            setForm({ id: "", name: "", unit: "", price: "", quantity: 0 });
            alert("Thêm hàng thành công");
            onClose();
        }
        else{
            alert("K thêm đơn hàng thành công")
        }
    }
    useEffect(()=>{
        const dialog = dialogRef.current;
        if(!dialog) return ;
        if(isOpen){
            if(!dialog.open){ // nếu state mở maf dialog chưa mở thì kích hoạt showModal
                dialog.showModal();
            }
        }
        else{
            if(dialog.open){
                dialog.close();
            }
        }
    },[isOpen]) // nếu isOpen bị thay đỏi thì useEffect  được chạy

    // bấm  ESC thì sẽ thoát ra khỏi Modal
    useEffect(()=>{
        const dialog = dialogRef.current;
        if(!dialog) return ; // nếu null là kết thúc luôn 
        const handleCancelModal =(e)=>{
            e.preventDefault();
            onClose();// tắt modal đi
        }
        dialog.addEventListener("cancel",handleCancelModal);
        return ()=>dialog.removeEventListener('cancel',handleCancelModal);
    },[onClose])

    // khi bấm ra ngoài thẻ dialog
    // vif ở ngoài là giống như ::affter vậy nhưng đây là ::backdrop 
    // mọi thứ ở ngoài dialog đều là backdrop   
    const handleBackDropClick = (e)=>{
        const dialog = dialogRef.current;
        if(e.target === dialog){ 
            onClose(); // tắt modal đi
        }
    }
    return (
        <dialog
          ref={dialogRef}
          onClick={handleBackDropClick}
          className="custom-modal"
        >
          
    
        <div className="modal-body">
            <form className="form-add-product">
                <div className="form-group">
                    <label htmlFor="productCode" className="form-label">Mã sản phẩm</label>
                    <input id="productCode" type="text" name="id"  value={form.id}
                        onChange={handleChangeFormAddProduct} placeholder="Ví dụ: SP001" className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="productName" className="form-label">Tên sản phẩm</label>
                    <input id="productName" type="text" name="name" value={form.name}
                        onChange={handleChangeFormAddProduct} placeholder="Nhập tên sản phẩm" className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="productUnit" className="form-label">Thuộc tính / Đơn tính</label>
                    <input id="productUnit" type="text" name="unit" value={form.unit}
                        onChange={handleChangeFormAddProduct} placeholder="Ví dụ: Cái, Hộp, Đỏ, L" className="form-input" />
                </div>
                <div className="form-group">
                    <label  htmlFor="productQuantity" className="form-label">Số lượng</label>
                    <input id="productQuantity" type="text" name="quantity" value={form.quantity}
                        onChange={handleChangeFormAddProduct} placeholder="Số lượng thêm" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice" className="form-label">Giá bán (Đồng)</label>
                    <input id="productPrice" type="number" value={form.price}
                         onChange={handleChangeFormAddProduct} name="price" placeholder="0" className="form-input" />
                </div>

                <div className="form-actions">
                    <button type="button"  className="btn-submit" onClick={onSubmitCreateProducts}>Thêm sản phẩm</button>
                </div>
            </form>


            
          </div>
        </dialog>
    );
}


