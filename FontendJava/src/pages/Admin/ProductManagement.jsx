import React, { useState, useEffect } from "react";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "", slug: "", summary: "", content: "", brand: "", price: "", featuredImage: "", categoryId: "", supplierId: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productService.getProducts();
      setProducts(res || []);
    } catch (error) {
      console.error("Lỗi lấy sản phẩm:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res || []);
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        supplierId: form.supplierId ? parseInt(form.supplierId) : null
      };

      if (editingId) {
        await productService.updateProduct(editingId, payload);
      } else {
        await productService.createProduct(payload);
      }
      setForm({ name: "", slug: "", summary: "", content: "", brand: "", price: "", featuredImage: "", categoryId: "", supplierId: "" });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi lưu sản phẩm:", error);
      alert("Lưu thất bại. Vui lòng kiểm tra lại thông tin (tên, slug, giá).");
    }
  };

  const handleEdit = (prod) => {
    setEditingId(prod.id);
    setForm({
      name: prod.name,
      slug: prod.slug,
      summary: prod.summary || "",
      content: prod.content || "",
      brand: prod.brand || "",
      price: prod.price || "",
      featuredImage: prod.featuredImage || "",
      categoryId: prod.category ? prod.category.id : "",
      supplierId: prod.supplier ? prod.supplier.id : ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div>
      <h2>Quản lý Sản phẩm</h2>
      
      <form onSubmit={handleSave} style={{ marginBottom: "20px", background: "#fff", padding: "20px", borderRadius: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <h3 style={{ gridColumn: "span 2" }}>{editingId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
        
        <input required type="text" placeholder="Tên sản phẩm" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ padding: "8px" }} />
        <input required type="text" placeholder="Slug (vd: iphone-15)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} style={{ padding: "8px" }} />
        <input required type="number" placeholder="Giá (VND)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} style={{ padding: "8px" }} />
        
        <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} style={{ padding: "8px" }}>
          <option value="">-- Chọn danh mục --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input type="text" placeholder="Thương hiệu (Brand)" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} style={{ padding: "8px" }} />
        <input type="text" placeholder="Link ảnh nổi bật" value={form.featuredImage} onChange={e => setForm({...form, featuredImage: e.target.value})} style={{ padding: "8px" }} />
        
        <textarea placeholder="Mô tả ngắn" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} style={{ padding: "8px", gridColumn: "span 2" }} />
        <textarea placeholder="Nội dung chi tiết" value={form.content} onChange={e => setForm({...form, content: e.target.value})} style={{ padding: "8px", gridColumn: "span 2" }} />

        <div style={{ gridColumn: "span 2" }}>
          <button type="submit" style={{ padding: "10px 20px", background: "#3498db", color: "#fff", border: "none", cursor: "pointer" }}>
            {editingId ? "Cập nhật" : "Thêm mới"}
          </button>
          {editingId && <button type="button" onClick={() => {setEditingId(null); setForm({ name: "", slug: "", summary: "", content: "", brand: "", price: "", featuredImage: "", categoryId: "", supplierId: "" })}} style={{ padding: "10px 20px", marginLeft: "10px", background: "#95a5a6", color: "#fff", border: "none", cursor: "pointer" }}>Hủy</button>}
        </div>
      </form>

      <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#ecf0f1" }}>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>ID</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Ảnh</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Tên</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Giá</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Danh mục</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>{prod.id}</td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>
                {prod.featuredImage && <img src={prod.featuredImage} alt="img" width="50" />}
              </td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>{prod.name}</td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>{prod.price}đ</td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>{prod.category ? prod.category.name : ""}</td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>
                <button onClick={() => handleEdit(prod)} style={{ marginRight: "10px", padding: "5px 10px", background: "#f1c40f", border: "none", cursor: "pointer" }}>Sửa</button>
                <button onClick={() => handleDelete(prod.id)} style={{ padding: "5px 10px", background: "#e74c3c", color: "#fff", border: "none", cursor: "pointer" }}>Xóa</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr><td colSpan="6" style={{ padding: "20px", textAlign: "center" }}>Chưa có sản phẩm nào.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
