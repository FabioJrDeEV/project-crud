import { useState } from "react";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function addTask() {
    const dados = { title, description };
    try {
      if (title !== "" && description !== "") {
        const resposta = await fetch(
          "https://api-nodejs-crud.onrender.com/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
          }
        );

        await resposta.json();
        console.log("Dados enviado com sucesso");
        setTitle("");
        setDescription("");
      } else {
        alert("Por favor, preencha todos os campos!");
      }
    } catch (err) {
      console.log(err);
      console.log("Erro ao enviar dados");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4 text-uppercase fs-3">
        Adicione suas tarefas
      </h1>
      <div className="w-100 d-flex justify-content-center">
        <div
          className="w-75 mt-2 p-3 rounded-3"
          style={{ border: "1px solid black" }}
        >
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
    </div>
  );
}

export default Home;
