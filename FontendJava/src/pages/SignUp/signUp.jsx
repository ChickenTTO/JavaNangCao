import "./signUp.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="signup">
      <div className="dashboard-signup">
        <div className="content-dashboard-signup">
          <h1>Sign Up</h1>

          <div className="input-signup">
            <div className="input-signup-field">
              <input type="text" placeholder="Username" />
              <FaUser />
            </div>
            <div className="input-signup-field">
              <input type="email" placeholder="Email" />
              <FaEnvelope />
            </div>
            <div className="input-signup-field">
              <input type="password" placeholder="Password" />
              <FaLock />
            </div>
            <div className="input-signup-field">
              <input type="password" placeholder="Confirm Password" />
              <FaLock />
            </div>
          </div>

          <div className="button-signup">
            <button>Create Account</button>
          </div>

          <div className="have-account">
            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
