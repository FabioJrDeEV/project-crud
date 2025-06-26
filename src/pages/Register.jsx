import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function clickRegister() {
    if (email === "" || password === "") {
      return alert("Preencha todos os campos!");
    } else {
      const response = await fetch(
        "https://api-nodejs-crud.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      await response.json();

      if (!response.ok) {
        alert(response.erro || "Email já está em uso!");
        setPassword("");
        return;
      }
      alert("Conta criada com sucesso! Voltando para página de login!");
      navigate("/");
    }
  }

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100 d-flex justify-content-center">
        <form
          className="w-75 bg-light p-4 rounded-3"
          onSubmit={(e) => {
            e.preventDefault();
            clickRegister();
          }}
        >
          <h1 className="text-uppercase text-center mb-3">cadastre-se</h1>
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
          <div className="d-flex flex-column mt-2">
            <label htmlFor="senha">Senha:</label>
            <input
              className="form-control mt-2 mt-md-2 mt-lg-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="senha"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <div className="mt-3">
              <button type="submit" className="btn btn-success">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
