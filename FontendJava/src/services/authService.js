import apiClient from "./apiClient";

const authService = {
  /**
   * Gọi API Login
   * @param {Object} data 
   * @example data = { username: "admin", password: "123" }
   */
  login: (data) => {
    return apiClient.post("/auth/login", data);
  },

  /**
   * Gọi API Refresh Token
   */
  refreshToken: (token) => {
    return apiClient.post(`/auth/refresh?token=${token}`);
  },

  /**
   * Lưu Token và thông tin User vào LocalStorage
   */
  setSession: (authData) => {
    localStorage.setItem("accessToken", authData.accessToken);
    localStorage.setItem("refreshToken", authData.refreshToken);
    localStorage.setItem("user", JSON.stringify({
      id: authData.userId,
      username: authData.username,
      email: authData.email,
      roles: authData.roles
    }));
  },

  /**
   * Lấy thông tin user hiện tại
   */
  getUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Xóa thông tin đăng nhập (Logout)
   */
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  /**
   * Kiểm tra xem user có quyền ADMIN không
   */
  isAdmin: () => {
    const user = authService.getUser();
    return user && user.roles && user.roles.includes("ADMIN");
  }
};

export default authService;
