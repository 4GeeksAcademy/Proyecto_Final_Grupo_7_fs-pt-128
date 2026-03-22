import { Link } from "react-router-dom";

export const VanCard = ({ van }) => {

  return (
    <>
      <Link to={`/vans/${van.car_id}`} className="text-decoration-none text-dark">
        <div className="card h-100 shadow border rounded p-4 bg-ligth">
          <div
            id={`carousel-${van.car_id}`}
            className="carousel slide carousel-bg-dark"
            data-bs-ride="false"
          >
            <div className="carousel-inner">
              {van.media && van.media.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={item.url_vehicle}
                    className="d-block w-100 rounded border"
                    style={{ height: "250px", objectFit: "cover" }}
                    alt={van.model}
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
              data-bs-slide="prev"
              onClick={(e) => {
                e.preventDefault();
                e.currentTarget.blur();
              }}
            >
              <span className="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
            </button>
          </div>

          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h4 className="text-success fw-bold text-uppercase mb-1">{van.model}</h4>
                <h6 className="card-title fw-bold">{van.brand}</h6>
                <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                  <i className="fa-solid fa-users me-2"></i>{van.capacity} Plazas
                </span>
                <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                  <i className="fa-solid fa-van-shuttle me-2"></i>{van.type_vehicle}
                </span>
              </div>
              <div className="d-flex flex-column align-items-end">
              <p className="card-text text-end">
                <span className="fw-bold text-dark" style={{ fontSize: "50px" }}>{van.price_per_day}€</span> / día
              </p>
              <span className={`badge ${van.available ? 'bg-success' : 'bg-danger'}`}>
                {van.available ? 'Disponible' : 'No disponible'}
              </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};