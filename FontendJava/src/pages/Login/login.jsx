import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import authService from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ username, password });
      authService.setSession(response);
      
      // Chuyển hướng dựa trên Role
      if (authService.isAdmin()) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard/menu");
      }
    } catch (error) {
      setErrorMsg("Sai tài khoản hoặc mật khẩu!");
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="dashboard">
        <div className="content-dashboard">
          <h1>Login</h1>

          <div className="input-login">
            <div className="input-login-user">
              <input type="text" className="user" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <FaUser></FaUser>
            </div>
            <div className="input-login-pass">
              <input type="password" className="pass" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <FaLock></FaLock>
            </div>
          </div>
          {errorMsg && <p style={{color: 'red', marginTop: '10px'}}>{errorMsg}</p>}
          <div className="under-content">
            <div className="check-box">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>

            <div className="forgot">
              <p>Fogot Password?</p>
            </div>
          </div>
          <div className="button-login">
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className="no-account">
            <p>
              Dont't have an account?{" "}
              <span onClick={() => navigate("/sign-up")}>Register</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
