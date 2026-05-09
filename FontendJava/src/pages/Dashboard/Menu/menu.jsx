import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";

import menu1 from "../../../assets/image/menu1.jpg";
import menu2 from "../../../assets/image/menu2.jpg";
import menu3 from "../../../assets/image/menu3.jpg";

import { GiShirt, GiDress, GiRunningShoe, GiLipstick } from "react-icons/gi";
import { FaMobileAlt, FaLaptop } from "react-icons/fa";
import { MdSportsSoccer, MdChair } from "react-icons/md";

const images = [menu1, menu2, menu3];

const categories = [
  {
    id: "men-clothes",
    label: "Quần Áo Nam",
    icon: <GiShirt />,
    path: "/dashboard/category/men-clothes",
  },
  {
    id: "woman-clothes",
    label: "Quần Áo Nữ",
    icon: <GiDress />,
    path: "/dashboard/category/woman-clothes",
  },
  {
    id: "mobile-phone",
    label: "Điện Thoại",
    icon: <FaMobileAlt />,
    path: "/dashboard/category/mobile-phone",
  },
  {
    id: "computer",
    label: "Máy Tính",
    icon: <FaLaptop />,
    path: "/dashboard/category/computer",
  },
  {
    id: "sport",
    label: "Thể Thao",
    icon: <MdSportsSoccer />,
    path: "/dashboard/category/sport",
  },
  {
    id: "beauty",
    label: "Làm Đẹp",
    icon: <GiLipstick />,
    path: "/dashboard/category/beauty",
  },
  {
    id: "shoes",
    label: "Giày Dép",
    icon: <GiRunningShoe />,
    path: "/dashboard/category/shoes",
  },
  {
    id: "furniture",
    label: "Nội Thất",
    icon: <MdChair />,
    path: "/dashboard/category/furniture",
  },
];

function Menu() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="menu">
      {/* ===== SLIDER ===== */}
      <div className="slider-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`slider-img ${index === currentIndex ? "active" : ""}`}
            alt="slide"
          />
        ))}
        <button className="prev" onClick={prevSlide}>
          ⬅
        </button>
        <button className="next" onClick={nextSlide}>
          ➡
        </button>
      </div>

      <div className="categories">
        {categories.map((cat) => (
          <div key={cat.id} className="item" onClick={() => navigate(cat.path)}>
            <div className="item-icon">{cat.icon}</div>
            <span className="item-label">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
