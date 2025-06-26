import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    if (email === "" || password === "") {
      return alert("Campos obrigatorios faltando!");
    }

    const response = await fetch("https://api-nodejs-crud.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(response.erro || "Usuario não encontrado!");
      setPassword("");
      return;
    } else {
      localStorage.setItem("token", data.token);
      navigate("/tasks");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100 d-flex justify-content-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="p-3 bg-light rounded-3 w-75"
        >
          <h1 className="text-center">Login</h1>
          <div className="d-flex flex-column">
            <label htmlFor="email">E-mail:</label>
            <input
              className="form-control mt-2 mt-md-2 mt-lg-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="password">Senha:</label>
            <input
              className="form-control mt-2 mt-md-2 mt-lg-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <div className="mt-3">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>
          </div>
          <div className="text-center mt-3">
            <span>
              Não possui conta? <Link to="/register">Clique aqui!</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
