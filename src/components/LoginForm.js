import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

function LoginForm({ existingUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await FirebaseAuthService.loginUser(userName, password);
      setUserName("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLogout() {
    FirebaseAuthService.logOutUser();
  }

  async function handleSendPasswordResetEmail() {
    if (!userName) {
      alert("Missing UserName");
      return;
    }
    try {
      await FirebaseAuthService.sendPasswordResetEmail(userName);
      alert("sent password reset email");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLoginWithGoogle() {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome! {existingUser.email}</h3>{" "}
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            <input
              type="email"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-text"
            ></input>
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            ></input>
          </label>
          <div className="button-box">
            <button className="primary-button">Login</button>
            <button
              type="button"
              onClick={handleSendPasswordResetEmail}
              className="primary-button"
            >
              Reset Password
            </button>
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="primary-button"
            >
              Login Google
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
