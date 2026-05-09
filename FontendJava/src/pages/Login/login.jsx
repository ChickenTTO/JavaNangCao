import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="dashboard">
        <div className="content-dashboard">
          <h1>Login</h1>

          <div className="input-login">
            <div className="input-login-user">
              <input type="text" className="user" placeholder="Username" />
              <FaUser></FaUser>
            </div>
            <div className="input-login-pass">
              <input type="password" className="pass" placeholder="Password" />
              <FaLock></FaLock>
            </div>
          </div>
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
            <button>Login</button>
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
