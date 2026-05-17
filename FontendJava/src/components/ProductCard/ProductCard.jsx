import React, { useState } from "react";
import "./ProductCard.css";
import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";

import { useNavigate } from "react-router-dom";

function ProductCard({ id, image, name, price, originalPrice, discount, sold }) {
  const navigate = useNavigate();
  const [cartMsg, setCartMsg] = useState(false);
  const [buyMsg, setBuyMsg] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorite();

  const isLiked = isFavorite(id);

  const handleFavorite = () => {
    toggleFavorite({ id, image, name, price, originalPrice, discount, sold });
  };

  const handleCart = () => {
    addToCart({ id, name, price, image });
    setCartMsg(true);
    setTimeout(() => setCartMsg(false), 1500);
  };

  const handleBuy = () => {
    addToCart({ id, name, price, image });
    setBuyMsg(true);
    setTimeout(() => setBuyMsg(false), 1500);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/dashboard/product/${id}`)} style={{ cursor: "pointer" }}>
      {/* ===== ẢNH + OVERLAY ICONS ===== */}
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-img" />
        {discount && <span className="product-discount">-{discount}%</span>}

        <div className="product-actions">
          <button
            className={`action-btn favorite-btn ${isLiked ? "liked" : ""}`}
            onClick={(e) => { e.stopPropagation(); handleFavorite(); }}
            title="Yêu thích"
          >
            <FaHeart />
            <span className="action-tooltip">Yêu thích</span>
          </button>

          <button
            className={`action-btn cart-btn ${cartMsg ? "active-flash" : ""}`}
            onClick={(e) => { e.stopPropagation(); handleCart(); }}
            title="Thêm vào giỏ"
          >
            <FaShoppingCart />
            <span className="action-tooltip">Giỏ hàng</span>
          </button>

          <button
            className={`action-btn buy-btn ${buyMsg ? "active-flash" : ""}`}
            onClick={(e) => { e.stopPropagation(); handleBuy(); }}
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
