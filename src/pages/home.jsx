function Home() {
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
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Titulo da Terefa"
            />
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Digite a Terefa"
            />
            <div className="d-flex justify-content-center">
              <button type="button" class="btn btn-success">
                Adicionar Tarefa
              </button>
            </div>
          </form>
        </div>
      </div>
      {/*Abaixo vai ser o local onde sera adicionado as tasks*/}
      <div className="w-100 d-flex justify-content-center mt-4">
        <h1>asuidaiu</h1>
      </div>
    </div>
  );
}

export default Home;
