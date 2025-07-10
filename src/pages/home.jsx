import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dias, setDias] = useState("");
  const [modal, setModal] = useState(false);
  const [completed, setCompleted] = useState(null);
  const token = localStorage.getItem("token");

  const select = (id) => {
    setCompleted(completed === id ? null : id);
  };

  const getTasks = () => {
    fetch("https://api-nodejs-crud.onrender.com/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          console.error("Erro nas buscas");
          return;
        }
        setTasks(data);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const removeTask = async (id) => {
    try {
      const resposta = await fetch(
        `https://api-nodejs-crud.onrender.com/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dados = await resposta.json();
      if (!resposta.ok) {
        alert(dados.error || "Erro ao deletar tarefas");
        return;
      }
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  function openModal() {
    setModal(!modal);
  }

  async function addTask() {
    try {
      if (title !== "" && description !== "" && dias !== "") {
        const resposta = await fetch(
          "https://api-nodejs-crud.onrender.com/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description, completed, dias }),
          }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          alert(dados.erro || "Erro ao enviar dados");
          return;
        }
        setTitle("");
        setDescription("");
        setDias("");
        getTasks();
      } else {
        alert("Por favor, preencha todos os campos!");
      }
    } catch (err) {
      console.log("Erro ao enviar dados");
    }
  }

  function converterParaPtBr(dataIso) {
    const data = new Date(dataIso);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4 text-uppercase fs-3">
        Adicione suas tarefas
      </h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-100 mt-2 p-3 rounded-3 bg-light">
          <form onSubmit={(e) => e.preventDefault(e)}>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Titulo da Terefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="form-control mb-3"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a Terefa"
            />

            <input
              type="date"
              className="form-control mb-3"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
            />
            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={addTask}
                className="btn btn-success"
              >
                Adicionar Tarefa
              </button>
            </div>
          </form>
        </div>
      </div>
      {/*Abaixo vai ser o local onde sera adicionado as tasks*/}
      <div className="w-100 d-flex flex-column justify-content-center">
        {tasks.map((item) => {
          const date = new Date(item.dias);
          const dateBr = date.toLocaleDateString("pt-BR");
          return (
            <div key={item.id} className="p-3 mt-3 rounded-3 bg-light">
              <div className="d-flex justify-content-between">
                <div
                  className={`d-flex flex-column  ${
                    completed === item.id ? "text-decoration-line-through" : ""
                  }`}
                  value={completed}
                >
                  <span className="p-2">{item.title}</span>
                  <span className="p-2">{item.description}</span>
                  <span className="p-2">{`Duração até: ${dateBr}`}</span>
                </div>
                <div className="d-lg-flex align-itens-center">
                  <div className=" d-lg-flex align-items-center gap-3">
                    <div>
                      <button
                        type="button"
                        className="bg-transparent p-0 border-0"
                      >
                        <i
                          className="bi bi-check-circle-fill"
                          style={{ fontSize: "20px", color: "green" }}
                          onClick={() => select(item.id)}
                        ></i>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={openModal}
                        type="button"
                        className="bg-transparent border-0 p-1"
                      >
                        <i
                          className="bi bi-trash3-fill"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                    <div>
                      <Link
                        to={`/edit-task/${item.id}`}
                        className="d-flex align-items-center text-decoration-none text-black"
                      >
                        <i
                          className="bi bi-pencil-square me-2"
                          style={{ fontSize: "20px" }}
                        ></i>
                        Editar tarefa
                      </Link>
                    </div>
                    {modal && (
                      <Modal
                        close={() => {
                          removeTask(item.id);
                          openModal();
                        }}
                        open={openModal}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
