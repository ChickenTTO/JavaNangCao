import React, { useState, useEffect } from "react";
import categoryService from "../../services/categoryService";
import authService from "../../services/authService";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "", description: "", parentId: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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
      if (editingId) {
        await categoryService.update(editingId, form);
      } else {
        await categoryService.create(form);
      }
      setForm({ name: "", slug: "", description: "", parentId: null });
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Lỗi lưu danh mục:", error);
      alert("Lưu thất bại. Vui lòng kiểm tra lại dữ liệu.");
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      parentId: cat.parentId || null
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      try {
        await categoryService.delete(id);
        fetchCategories();
      } catch (error) {
        console.error("Lỗi xóa danh mục:", error);
      }
    }
  };

  return (
    <div>
      <h2>Quản lý Danh mục (Categories)</h2>
      
      <form onSubmit={handleSave} style={{ marginBottom: "20px", background: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h3>{editingId ? "Sửa danh mục" : "Thêm danh mục mới"}</h3>
        <input required type="text" placeholder="Tên danh mục" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }} />
        <input required type="text" placeholder="Slug (vd: quan-ao-nam)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }} />
        <textarea required placeholder="Mô tả" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#3498db", color: "#fff", border: "none", cursor: "pointer" }}>
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
        {editingId && <button type="button" onClick={() => {setEditingId(null); setForm({ name: "", slug: "", description: "", parentId: null })}} style={{ padding: "10px 20px", marginLeft: "10px", background: "#95a5a6", color: "#fff", border: "none", cursor: "pointer" }}>Hủy</button>}
      </form>

      <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#ecf0f1" }}>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>ID</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Tên</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Slug</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Mô tả</th>
            <th style={{ padding: "12px", border: "1px solid #bdc3c7" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>{cat.id}</td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>{cat.name}</td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>{cat.slug}</td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>{cat.description}</td>
              <td style={{ padding: "12px", border: "1px solid #bdc3c7" }}>
                <button onClick={() => handleEdit(cat)} style={{ marginRight: "10px", padding: "5px 10px", background: "#f1c40f", border: "none", cursor: "pointer" }}>Sửa</button>
                <button onClick={() => handleDelete(cat.id)} style={{ padding: "5px 10px", background: "#e74c3c", color: "#fff", border: "none", cursor: "pointer" }}>Xóa</button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr><td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>Chưa có danh mục nào.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryManagement;
