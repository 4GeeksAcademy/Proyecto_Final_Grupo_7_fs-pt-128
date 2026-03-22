import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", body: "" });

    const handleOpenHelp = (type) => {
        let content = { title: "", body: null};

        if (type === 'faq') {
        content = {
            title: "Preguntas Frecuentes",
            body: (
                <div>
                    <p><strong>¿Cómo alquilo una camper?</strong><br /> Selecciona tu modelo favorito y reserva tus fechas.</p>
                    <p><strong>¿Qué documentos necesito?</strong><br /> DNI y carnet de conducir con 2 años de antigüedad.</p>
                    <p><strong>¿Las campers tienen cocina?</strong><br /> Nuestras VanDoo vienen preparadas para tu aventura (consulta equipamiento por modelo).</p>
                </div>
            )
        };
    } else if (type === 'terms') {
        content = {
            title: "Términos de Uso",
            body: (
                <div>
                    <p>Al usar VanDoo, aceptas nuestras políticas de alquiler.</p>
                    <p>El depósito de fianza se devuelve íntegro tras revisar que la camper no tiene daños.</p>
                    <p><strong>Edad mínima requerida:</strong> 21 años.</p>
                </div>
            )
        };
    } else if (type === 'contact') {
        content = {
            title: "Contacto",
            body: (
                <div>
                    <p>Estamos encantados de ayudarte en tu próxima aventura.</p>
                    <hr />
                    <p><strong>Email:</strong> info@vandoo.com</p>
                    <p><strong>Teléfono:</strong> +34 600 000 000</p>
                    <p><strong>Horario:</strong> Lunes a Viernes de 09:00 a 19:00.</p>
                </div>
            )
        };
    }

    setModalContent(content);
    setIsModalOpen(true);
};

    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container text-center text-md-start">
                <div className="row text-center text-md-start">

                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold text-success">Vandoo</h5>
                        <p className="small text-secondary">
                            Redefiniendo los viajes en carretera. Menos hoteles, más estrellas bajo el cielo. Tu comunidad camper de confianza.
                        </p>
                    </div>

                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold small">Servicios</h5>
                        <p><Link to="/map" className="text-white text-decoration-none small">Mapa de Rutas</Link></p>
                        <p><Link to="/vans" className="text-white text-decoration-none small">Alquiler de Vans</Link></p>
                        <p><Link to="/blog" className="text-white text-decoration-none small">Guía Camper</Link></p>
                    </div>

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold small">Ayuda</h5>
                        <p>
                            <span
                                className="text-white text-decoration-none small"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleOpenHelp('faq')}
                            >
                                Preguntas Frecuentes
                            </span>
                        </p>
                        <p>
                            <span
                                className="text-white text-decoration-none small"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleOpenHelp('terms')}
                            >
                                Términos de Uso
                            </span>
                        </p>
                        <p>
                            <span
                                className="text-white text-decoration-none small"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleOpenHelp('contact')}
                            >
                                Contacto
                            </span>
                        </p>
                    </div>

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold small">Síguenos</h5>
                        <div className="d-flex justify-content-center justify-content-md-start gap-3">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <i className="fab fa-facebook fa-lg"></i>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <i className="fab fa-x-twitter fa-lg"></i>
                            </a>
                            
                        </div>
                        
                        <p className="small text-secondary">
                            info@vandoo.com
                        </p>
                    </div>
                </div>

                <hr className="mb-4 mt-5" />

                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p className="small text-secondary">
                            © {new Date().getFullYear()} Copyright:
                            <strong className="text-success"> Vandoo.com</strong>
                        </p>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-white text-dark border-0">
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold text-uppercase small">{modalContent.title}</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <div className="modal-body p-4 text-start">
                    {modalContent.body} 
                </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn btn-success btn-sm " onClick={() => setIsModalOpen(false)}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    )
}