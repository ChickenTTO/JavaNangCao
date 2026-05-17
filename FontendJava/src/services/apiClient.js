import axios from "axios";

// Khởi tạo một instance của Axios với các cấu hình mặc định
const apiClient = axios.create({
  baseURL: "http://localhost:9000/api/v1", // Địa chỉ của Quarkus Backend
  timeout: 10000, // Timeout sau 10 giây nếu server không phản hồi
  headers: {
    "Content-Type": "application/json",
    // Nếu có token xác thực (JWT), bạn có thể cấu hình ở đây sau này
    // "Authorization": `Bearer ${localStorage.getItem('token')}`
  },
});

// Interceptor cho Request (xử lý trước khi gửi API đi)
apiClient.interceptors.request.use(
  (config) => {
    // Tự động gắn JWT Token vào Header nếu đã đăng nhập
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho Response (xử lý khi nhận dữ liệu từ Backend về)
apiClient.interceptors.response.use(
  (response) => {
    // Chỉ lấy phần data của response để code gọn hơn
    return response.data;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
