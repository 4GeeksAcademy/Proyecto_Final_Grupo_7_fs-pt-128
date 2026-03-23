import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ModalSignup = ({ 
    show, 
    onClose, 
    user, 
    error, 
    loginLoading, 
    handleSubmit, 
    handleChangeForm 
}) => {
    const navigate = useNavigate();

    if (!show) return null;

    return (
        <>
            <div 
                className="modal-backdrop fade show" 
                style={{ zIndex: 1040 }}
                onClick={onClose} 
            ></div>

            <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body text-center px-4 pb-5">
                            <i className="fa-solid fa-circle-user fa-4x text-primary mb-3"></i>
                            <h4 className="fw-bold">¡Casi listo!</h4>
                            <p className="text-muted mb-4">Inicia sesión para finalizar tu reserva.</p>

                            <form onSubmit={handleSubmit} className="text-start">
                                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                                
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChangeForm}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="form-label small fw-bold">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChangeForm}
                                        required
                                    />
                                </div>
                                
                                <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={loginLoading}>
                                    {loginLoading ? "Cargando..." : "Entrar y Reservar"}
                                </button>
                            </form>

                            <div className="signup-login-link mt-3 text-center">
                                ¿No tienes cuenta?{" "}
                                <span
                                    className="text-primary fw-bold"
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => navigate("/signup")}
                                >
                                    Regístrate gratis
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};