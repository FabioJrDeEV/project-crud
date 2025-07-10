import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dias, setDias] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateTask = async (taskId) => {
    try {
      const result = await fetch(
        `https://api-nodejs-crud.onrender.com/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, dias }),
        }
      );

      const data = await result.json();

      if (!result.ok) {
        alert(data.erro || "Erro ao atualizar tarefa!");
        return;
      }
      setTitle("");
      setDescription("");
      alert("Tarefa atualizada com sucesso! Voltando a pagina de tarefas!");
      navigate("/tasks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3">Edite sua tarefa</h1>
      <div className="w-100 d-flex justify-content-center mt-4">
        <div className="w-100 mt-2 p-3 rounded-3 bg-light">
          <form onSubmit={(e) => e.preventDefault(e)}>
            <input
              className="form-control mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Titulo da Terefa"
            />
            <input
              className="form-control mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
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
                onClick={() => updateTask(id)}
                className="btn btn-success"
              >
                Editar tarefa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
