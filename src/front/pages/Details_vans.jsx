import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { getSingleVan } from "../services/vanServices"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays, format } from "date-fns";
import { addBooking } from "../services/bookingServices";
import { login } from "../services/loginServices";
import { ModalGalery } from "../components/ModalGalery";
import { ModalBooking } from "../components/ModalBooking";


export const DetailsVan = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer()
    const [van, setVan] = useState()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");
    const [user, setUser] = useState({ email: "", password: "" });
    const [loginLoading, setLoginLoading] = useState(false)
    const [showGallery, setShowGallery] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const isLogin = !!store.user

    const days = endDate ? differenceInDays(endDate, startDate) : 0;
    const bookingTotal = days * parseFloat(van?.price_per_day)

    const blockBooking = van?.booking?.map(item => {
        const start = new Date(item.start_date);
        const end = new Date(item.end_date);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        return {
            start: start,
            end: end
        };
    })

    const getVan = async () => {
        const vanData = await getSingleVan(id)
        setVan(vanData)
        setLoading(false)
        console.log(vanData);
    }

    const handleBooking = async () => {
        const bookingData = {
            car_id: id,
            user_id: store.user.id,
            start_date: format(startDate, "dd-MM-yyyy"),
            end_date: format(endDate, "dd-MM-yyyy"),
            total_price: bookingTotal,
            status: "confirmed"
        };

        const response = await addBooking(bookingData, dispatch)
        if (response) {
            setStartDate(null)
            setEndDate(null)
            getVan()
            navigate("/user")
        }
    }

    const handleChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleChangeForm = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoginLoading(true);

        const response = await login(user);

        if (response.token) {
            localStorage.setItem("token", response.token);
            dispatch({ type: "auth_login", payload: { token: response.token } });
            dispatch({ type: "auth_set_user", payload: response.user });

            const closeButton = document.querySelector("#modalLoginAviso .btn-close");
            if (closeButton) closeButton.click();
        } else {
            setError("Credenciales incorrectas.");
        }
        setLoginLoading(false);
    };

    useEffect(() => {
        getVan()
    }, [id])

    return (
        <>
            {loading ? (
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
                <div className="container mt-5 mb-5">
                    <div className="row g-3 mb-4">
                        <div className="row g-3">
                            <div className="col-md-8">
                                {van.media && van.media.length > 0 ? (
                                    <div className="ratio ratio-16x9 h-100">
                                        <img
                                            src={van.media[0].url_vehicle}
                                            className="rounded-3 shadow-sm object-fit-cover"
                                            alt="Principal"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setShowGallery(true)}
                                        />
                                    </div>
                                ) : (
                                    <div className="bg-light d-flex align-items-center justify-content-center rounded-3 h-100 min-vh-50">
                                        <span className="text-muted">Sin imagen disponible</span>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex flex-column h-100 gap-3">
                                    {van.media?.slice(1, 3).map((item, index) => (
                                        <div key={index} className="flex-grow-1">
                                            {index === 0 ? (
                                                <div className="ratio ratio-4x3 h-100">
                                                    <img
                                                        src={item.url_vehicle}
                                                        className="rounded-3 shadow-sm object-fit-cover"
                                                        alt={`Van ${index}`}
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => setShowGallery(true)}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="row g-2 h-100">
                                                    {van.media.slice(2, 4).map((smallItem, smallIndex) => (
                                                        <div className="col-6" key={smallIndex}>
                                                            <div className="ratio ratio-1x1 h-100">
                                                                <img
                                                                    src={smallItem.url_vehicle}
                                                                    className="rounded-3 shadow-sm object-fit-cover"
                                                                    alt={`Small ${smallIndex}`}
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => setShowGallery(true)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm p-4 mb-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h1 className="display-5 fw-bold text-uppercase mb-0">{van.brand}</h1>
                                        <h3 className="text-muted">{van.model}</h3>
                                    </div>
                                    <span className={`badge ${van.available ? 'bg-success' : 'bg-danger'} p-2`}>
                                        {van.available ? 'Disponible' : 'No disponible'}
                                    </span>
                                </div>
                                <div className="d-flex flex-wrap gap-2 my-4">
                                    <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                                        <i className="fa-solid fa-users me-2"></i>{van.capacity} Plazas
                                    </span>
                                    <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                                        <i className="fa-solid fa-van-shuttle me-2"></i>{van.type_vehicle}
                                    </span>
                                    <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                                        <i className="fa-solid fa-euro-sign me-2"></i>{van.price_per_day}/día
                                    </span>
                                </div>
                                <hr />
                                <h4 className="fw-bold vandoo-text">Descripción</h4>
                                <p className="text-muted" style={{ lineHeight: "1.8" }}>
                                    {van.description}
                                </p>
                            </div>
                            <div className="card border-0 shadow-sm p-4">
                                <h5 className="fw-bold vandoo-text mb-3">Condiciones de Alquiler</h5>
                                <ul className="small text-secondary">
                                    <li>Kilometraje ilimitado para reservas de más de 7 días.</li>
                                    <li>Seguro a todo riesgo con franquicia.</li>
                                    <li>Asistencia en carretera 24/7.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-lg p-4" style={{ top: "20px" }}>
                                <h3 className="fw-bold mb-4 text-center">Reservar</h3>

                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted text-uppercase">Selecciona tus fechas</label>
                                    <div className="datepicker d-flex justify-content-center border rounded-3 p-2 bg-light">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleChangeDate}
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={new Date()}
                                            dateFormat="dd/MM/yyyy"
                                            selectsRange
                                            selectsStart
                                            excludeDateIntervals={blockBooking}
                                            disabled={!van.available}
                                            placeholderText={van.available ? "SELECCIONA FECHAS" : "NO DISPONIBLE"}
                                            className="form-control text-center"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Precio por día</span>
                                    <span className="fw-bold">{van.price_per_day}€</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Noches</span>
                                    <span className="fw-bold">{days}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="h5 fw-bold">Total</span>
                                    <span className="h4 fw-bold vandoo-text">
                                        {days > 0 ? bookingTotal : parseFloat(van.price_per_day)}€
                                    </span>
                                </div>

                                <button
                                    className="btn vandoo btn-lg w-100 fw-bold py-3 mb-3 shadow"
                                    disabled={!van.available || (isLogin && !endDate)}
                                    data-bs-toggle="modal"
                                    data-bs-target={isLogin ? "#modalReserva" : "#modalLoginAviso"}
                                >
                                    {van.available ? 'RESERVAR AHORA' : 'NO DISPONIBLE'}
                                </button>

                            </div>
                        </div>

                    </div>

                {/* ---------------MODAL DE CONFIRMAR RESERVA-------------- */}
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
                                    {/* <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button> */}
                                    <Link to="/user"> 
                                    <button
                                        type="button"
                                        className="btn vandoo"
                                        onClick={handleBooking}
                                        data-bs-dismiss="modal"
                                    >
                                        Confirmar y Pagar
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ----------------- MODAL INICIAR SECIÓN----------------- */}
                    <div className="modal-overlay modal fade" id="modalLoginAviso" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header border-0">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body text-center px-4 pb-5">
                                    <i className="userpage-avatar fa-solid fa-circle-user fa-4x mx-auto mb-3"></i>
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
                                                placeholder="tu@email.com"
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
                                                placeholder="********"
                                            />
                                        </div>
                                        <button type="submit" className="btn vandoo w-100 fw-bold py-2" disabled={loading}>
                                            {loginLoading ? "Cargando..." : "Entrar y Reservar"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalGalery
                        isOpen={showGallery}
                        onClose={() => setShowGallery(false)}
                        van={van}
                    />
                </div>
            )}
        </>
    )
}