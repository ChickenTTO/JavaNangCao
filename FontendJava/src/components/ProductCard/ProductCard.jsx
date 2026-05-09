import React, { useState } from "react";
import "./ProductCard.css";
import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";

function ProductCard({ image, name, price, originalPrice, discount, sold }) {
  const [liked, setLiked] = useState(false);
  const [cartMsg, setCartMsg] = useState(false);
  const [buyMsg, setBuyMsg] = useState(false);

  const handleCart = () => {
    setCartMsg(true);
    setTimeout(() => setCartMsg(false), 1500);
  };

  const handleBuy = () => {
    setBuyMsg(true);
    setTimeout(() => setBuyMsg(false), 1500);
  };

  return (
    <div className="product-card">
      {/* ===== ẢNH + OVERLAY ICONS ===== */}
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-img" />
        {discount && <span className="product-discount">-{discount}%</span>}

        <div className="product-actions">
          <button
            className={`action-btn favorite-btn ${liked ? "liked" : ""}`}
            onClick={() => setLiked(!liked)}
            title="Yêu thích"
          >
            <FaHeart />
            <span className="action-tooltip">Yêu thích</span>
          </button>

          <button
            className={`action-btn cart-btn ${cartMsg ? "active-flash" : ""}`}
            onClick={handleCart}
            title="Thêm vào giỏ"
          >
            <FaShoppingCart />
            <span className="action-tooltip">Giỏ hàng</span>
          </button>

          <button
            className={`action-btn buy-btn ${buyMsg ? "active-flash" : ""}`}
            onClick={handleBuy}
            title="Mua ngay"
          >
            <FaBolt />
            <span className="action-tooltip">Mua ngay</span>
          </button>
        </div>

        {cartMsg && <div className="product-toast cart-toast">✓ Đã thêm vào giỏ!</div>}
        {buyMsg && <div className="product-toast buy-toast">⚡ Đang mua ngay...</div>}
      </div>

      {/* ===== THÔNG TIN SẢN PHẨM ===== */}
      <div className="product-info">
        <p className="product-name">{name}</p>
        <div className="product-pricing">
          <span className="product-price">{price.toLocaleString("vi-VN")}đ</span>
          {originalPrice && (
            <span className="product-original">
              {originalPrice.toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>
        <span className="product-sold">Đã bán {sold}</span>
      </div>
    </div>
  );
}

export default ProductCard;
