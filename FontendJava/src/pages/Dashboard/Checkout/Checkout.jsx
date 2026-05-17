import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import orderService from "../../../services/orderService";

function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    shippingFullName: "",
    shippingPhone: "",
    province: "",
    district: "",
    ward: "",
    detailAddress: "",
    shippingNote: ""
  });

  if (cart.length === 0) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Giỏ hàng trống</h2>
        <button onClick={() => navigate("/dashboard/menu")} style={{ padding: "10px 20px", background: "#3498db", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }}>Tiếp tục mua sắm</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        paymentMethod: "COD",
        couponCode: null
      };
      await orderService.placeOrder(payload);
      alert("Đặt hàng thành công!");
      clearCart(); // Xóa giỏ hàng
      navigate("/dashboard/menu"); // Chuyển về trang chủ
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert("Đặt hàng thất bại. Vui lòng kiểm tra lại thông tin!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "30px", flexWrap: "wrap" }}>
      
      {/* Form địa chỉ */}
      <div style={{ flex: "1 1 600px", background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h2>Thông tin giao hàng</h2>
        <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          
          <input required name="shippingFullName" value={form.shippingFullName} onChange={handleChange} placeholder="Họ tên người nhận" style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input required name="shippingPhone" value={form.shippingPhone} onChange={handleChange} placeholder="Số điện thoại" pattern="^[0-9]{10,11}$" title="Số điện thoại gồm 10-11 số" style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
          
          <div style={{ display: "flex", gap: "15px" }}>
            <input required name="province" value={form.province} onChange={handleChange} placeholder="Tỉnh / Thành phố" style={{ flex: 1, padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
            <input required name="district" value={form.district} onChange={handleChange} placeholder="Quận / Huyện" style={{ flex: 1, padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
            <input required name="ward" value={form.ward} onChange={handleChange} placeholder="Phường / Xã" style={{ flex: 1, padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
          </div>

          <input required name="detailAddress" value={form.detailAddress} onChange={handleChange} placeholder="Địa chỉ chi tiết (Số nhà, Tên đường...)" style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px" }} />
          <textarea name="shippingNote" value={form.shippingNote} onChange={handleChange} placeholder="Ghi chú thêm (Tùy chọn)" style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "4px", minHeight: "80px" }} />

          <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
            <strong>Phương thức thanh toán:</strong>
            <div style={{ marginTop: "10px" }}>
              <input type="radio" checked readOnly /> Thanh toán khi nhận hàng (COD)
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ padding: "15px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Đang xử lý..." : "XÁC NHẬN ĐẶT HÀNG"}
          </button>
        </form>
      </div>

      {/* Tóm tắt đơn hàng */}
      <div style={{ flex: "1 1 400px", background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", height: "fit-content" }}>
        <h2>Tóm tắt đơn hàng</h2>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <img src={item.image} alt="img" width="50" style={{ borderRadius: "4px" }} />
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>{item.name}</div>
                  <div style={{ color: "#7f8c8d", fontSize: "12px" }}>Số lượng: {item.quantity}</div>
                </div>
              </div>
              <div style={{ fontWeight: "bold", color: "#e74c3c" }}>
                {(item.price * item.quantity).toLocaleString("vi-VN")}đ
              </div>
            </div>
          ))}
          
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}>
            <span>TỔNG CỘNG:</span>
            <span style={{ color: "#e74c3c" }}>{totalPrice.toLocaleString("vi-VN")}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
