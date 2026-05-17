import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../../../services/productService";
import categoryService from "../../../services/categoryService";
import ProductCard from "../../../components/ProductCard/ProductCard";

function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoryAndProducts();
  }, [slug]);

  const loadCategoryAndProducts = async () => {
    setLoading(true);
    try {
      // Đầu tiên, lấy danh sách tất cả các danh mục để tìm ID của danh mục này dựa trên slug
      const catRes = await categoryService.getAll();
      const categories = catRes || [];
      const currentCat = categories.find(c => c.slug === slug);

      if (currentCat) {
        setCategoryName(currentCat.name);
        // Sau đó dùng ID tìm được để lấy sản phẩm
        const prodRes = await productService.getProducts(currentCat.id);
        setProducts(prodRes || []);
      } else {
        setCategoryName("Danh mục không tồn tại");
        setProducts([]);
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1>{categoryName}</h1>
        <p>Tất cả sản phẩm thuộc danh mục này</p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", fontSize: "18px" }}>Đang tải dữ liệu...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#7f8c8d" }}>
              Hiện chưa có sản phẩm nào trong danh mục này. Bạn hãy vào trang Quản trị để thêm mới nhé!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
