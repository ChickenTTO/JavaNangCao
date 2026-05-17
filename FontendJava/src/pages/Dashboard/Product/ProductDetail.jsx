import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../../services/productService";
import { useCart } from "../../../context/CartContext";
import "./product.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await productService.getById(id);
      setProduct(res);
    } catch (error) {
      console.error("Lỗi lấy chi tiết sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}>Đang tải dữ liệu...</div>;
  if (!product) return <div style={{ padding: "50px", textAlign: "center" }}>Sản phẩm không tồn tại.</div>;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.featuredImage });
    }
    alert("Đã thêm vào giỏ hàng thành công!");
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.featuredImage });
    }
    navigate("/dashboard/cart");
  };

  return (
    <div className="product-detail-container" style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        
        {/* Cột Trái: Ảnh */}
        <div style={{ flex: "1 1 400px" }}>
          <img 
            src={product.featuredImage || "https://via.placeholder.com/400"} 
            alt={product.name} 
            style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} 
          />
        </div>

        {/* Cột Phải: Thông tin */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ fontSize: "28px", color: "#2c3e50" }}>{product.name}</h1>
          <div style={{ fontSize: "24px", color: "#e74c3c", fontWeight: "bold" }}>
            {product.price?.toLocaleString("vi-VN")}đ
          </div>
          
          <div style={{ padding: "15px", background: "#f8f9fa", borderRadius: "8px", color: "#555" }}>
            <strong>Thương hiệu:</strong> {product.brand || "Đang cập nhật"}<br/><br/>
            <strong>Mô tả ngắn:</strong> {product.summary || "Chưa có mô tả"}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
            <span style={{ fontWeight: "bold" }}>Số lượng:</span>
            <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "4px", overflow: "hidden" }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: "10px 15px", background: "#eee", border: "none", cursor: "pointer" }}>-</button>
              <input type="text" value={quantity} readOnly style={{ width: "50px", textAlign: "center", border: "none" }} />
              <button onClick={() => setQuantity(quantity + 1)} style={{ padding: "10px 15px", background: "#eee", border: "none", cursor: "pointer" }}>+</button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: "15px", background: "#f39c12", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
              Thêm vào giỏ hàng
            </button>
            <button onClick={handleBuyNow} style={{ flex: 1, padding: "15px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "40px", background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h2>Chi tiết sản phẩm</h2>
        <div style={{ marginTop: "20px", lineHeight: "1.6", color: "#444" }}>
          {product.content || "Nội dung chi tiết đang được cập nhật."}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
