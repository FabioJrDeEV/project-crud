import { Alert } from "bootstrap";
import { useEffect, useState } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

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
      alert("Tarefa deletada com sucesso!");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  async function addTask() {
    try {
      if (title !== "" && description !== "") {
        const resposta = await fetch(
          "https://api-nodejs-crud.onrender.com/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
          }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          alert(dados.erro || "Erro ao enviar dados");
          return;
        }
        setTitle("");
        setDescription("");
        getTasks();
        alert("Tarefa inserida com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos!");
      }
    } catch (err) {
      console.log("Erro ao enviar dados");
    }
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
          return (
            <div key={item.id} className="p-3 mt-3 rounded-3 bg-light">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <span>{item.title}</span>
                  <span>{item.description}</span>
                </div>
                <div className="d-flex align-itens-center">
                  <button
                    onClick={() => removeTask(item.id)}
                    type="button"
                    className="btn btn-success"
                  >
                    remover tarefas
                  </button>
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
