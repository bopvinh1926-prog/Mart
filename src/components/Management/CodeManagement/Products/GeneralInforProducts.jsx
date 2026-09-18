import { useState } from "react"
export default function GeneralInforProducts({handleSupplier}){
    const [formInfor,setFormInfor] = useState(
        {date:"",supplier:"",supplierAdd:"",node:""}
    )
    const [suppliers,setSuppliers] = useState([])
    const [openCreate,setOpenCreate] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInfor(prev => ({
            ...prev,
            [name]: value
        }));
        
    }
    const handleAddSuppliers = (value) => {
        setSuppliers(prev => [...prev, value]); 
        setFormInfor(prev => ({ ...prev, supplierAdd: "" }));   
        setOpenCreate(false )
    }
    const handleSelectedSupplier = (selectedSupplier)=>{
        const isValid = suppliers.filter((sp)=>sp === selectedSupplier);
        if(isValid){
            handleSupplier(selectedSupplier);
            setFormInfor(prev =>({...prev,formInfor:""})); 

        }
        else{
            alert("K tồn tại nhà cung cấp")
        }
        
    }
    console.log(suppliers)
    return(
        <div className="general-info-container">
            <h1 className="general-info-title">THÔNG TIN CHUNG</h1>

            <div className="form-row">
                {/* Ngày nhập */}
                <div className="form-field date-field">
                    <label htmlFor="date-input">Ngày nhập</label>
                    <input
                        id="date-input"
                        type="date"
                        name="date"
                        value={formInfor.date}
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                {/* Nhà cung cấp */}
                <div className="form-field supplier-field">
                    <label htmlFor="supplier-input">Nhà cung cấp</label>
                    <div className="supplier-wrapper">
                        <div className="input-with-button">
                            <input
                                id="supplier-input"
                                type="text"
                                name="supplier"
                                value={formInfor.supplier}
                                onChange={handleChange}
                                list="supplier-list"
                                placeholder="Chọn hoặc nhập NCC"
                            />
                            <datalist id="supplier-list">
                                {suppliers.map((value, index) => (
                                <option key={index} value={value} />
                                ))}
                            </datalist>
                            <button style={{
                                backgroundColor: '#f59e0b',
                                color: '#ffffff',
                                border: 'none',
                                padding: '10px 16px',
                                borderRadius: '5px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                                onClick={
                                    ()=>handleSelectedSupplier(formInfor.supplier)
                                }
                            >
                                +
                            </button>


                            <button
                                type="button"
                                className="btn-add-supplier"
                                onClick={() => setOpenCreate(true)}
                            >
                                Thêm nhà cung cấp
                            </button>
                        </div>

                        {/* Form nhỏ hiển thị khi bấm thêm NCC */}
                        {openCreate && (
                        <div className="add-supplier-popup">
                            <input
                                type="text"
                                name="supplierAdd"
                                value={formInfor.supplierAdd}
                                onChange={(e) => handleChange(e)}
                                placeholder="Nhập tên NCC mới..."
                            />
                            <div className="popup-actions">
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => setOpenCreate(false)}
                                >
                                    Hủy / Xóa
                                </button>
                                <button
                                    type="button"
                                    className="btn-submit"
                                    onClick={() => handleAddSuppliers(formInfor.supplierAdd)}
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>

                {/* Ghi chú */}
                <div className="form-field note-field">
                    <label htmlFor="note-input">Ghi chú (nếu cần thiết)</label>
                    <input
                        id="note-input"
                        type="text"
                        name="node"
                        value={formInfor.node}
                        onChange={(e) => handleChange(e)}
                        placeholder="Nhập ghi chú..."
                    />
                </div>
            </div>
        </div>
    )
}