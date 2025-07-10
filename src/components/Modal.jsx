function Modal({ close, open }) {
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.9)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Remover Tarefa</h5>
            <button
              type="button"
              className="btn-close"
              onClick={open}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Deseja realmente excluir essa tarefa?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={open}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button type="button" onClick={close} className="btn btn-danger">
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
