import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Admin Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#2c3e50", color: "#fff", padding: "20px" }}>
        <h2>Admin Panel</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "30px", lineHeight: "2.5" }}>
          <li style={{ cursor: "pointer" }} onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
          <li style={{ cursor: "pointer" }} onClick={() => navigate("/admin/categories")}>Quản lý Danh mục</li>
          <li style={{ cursor: "pointer" }} onClick={() => navigate("/admin/products")}>Quản lý Sản phẩm</li>
          <li style={{ cursor: "pointer" }} onClick={() => navigate("/admin/users")}>Quản lý Người dùng</li>
        </ul>
        <button 
          onClick={handleLogout} 
          style={{ marginTop: "50px", padding: "10px", width: "100%", backgroundColor: "#e74c3c", color: "white", border: "none", cursor: "pointer" }}>
          Đăng xuất
        </button>
      </div>

      {/* Admin Content Area */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#ecf0f1" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
