import { useState } from "react"

export const ModalGalery = ({isOpen, onClose, van}) => {
    if (!isOpen) return null
    return (
        <>
            <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1050 }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content bg-transparent">
                        <div id={`carousel-${van.car_id}`} className="carousel slide" data-bs-ride="false">
                            <div className="carousel-inner">
                                {van.media.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                    >
                                        <img
                                            src={img.url_vehicle}
                                            className="d-block w-100"
                                            style={{ maxHeight: '80vh', objectFit: 'contain' }}
                                            alt="Vehicle"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={`#carousel-${van.car_id}`}
                                data-bs-slide="prev"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.blur();
                                }}
                            >
                                <span className="carousel-control-prev-icon bg-dark rounded" aria-hidden="true"></span>
                            </button>

                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`#carousel-${van.car_id}`}
                                data-bs-slide="next"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.blur();
                                }}
                            >
                                <span className="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="btn btn-danger position-absolute top-0 end-0 m-3"
                            style={{ zIndex: 1100 }}
                        >
                            X
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}