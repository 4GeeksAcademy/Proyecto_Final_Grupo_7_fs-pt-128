
export const ModalBooking = ({ van, startDate, endDate, handleBooking, loading }) => {

    if (!van) return null;
    return (
        <>
            <div className="modal fade" id="modalReserva" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar Reserva</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Estás seguro de que deseas reservar la <strong>{van.model}</strong>?</p>
                            <ul>
                                <li><strong>Desde:</strong> {startDate?.toLocaleDateString()}</li>
                                <li><strong>Hasta:</strong> {endDate?.toLocaleDateString()}</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleBooking}
                                data-bs-dismiss="modal"
                            >{loading ? (
                                <div
                                    className="d-flex flex-column justify-content-center align-items-center"
                                    style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
                                >
                                    <div className="text-success mb-3">
                                        <i className="fa-solid fa-van-shuttle fa-4x fa-bounce"></i>
                                    </div>
                                    <h4 className="fw-light text-secondary">Preparando la ruta...</h4>
                                    <div className="mt-2 text-muted small italic">Verificando tu equipaje...</div>
                                </div>
                            ) : (
                                <span>Confirmar y Pagar</span>)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}