import { useEffect } from "react";
import { VanCard } from "../components/VanCard";
import useGlobalReducer from "../hooks/useGlobalReducer"
import { getAllVans } from "../services/vanServices";

export const All_vans = () => {

    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        getAllVans(dispatch);
    }, [])

    return (
        <>
            <div
                className="position-relative d-flex align-items-center justify-content-center text-center text-white"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://i.imgur.com/B0DL3tW.jpeg")', 
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed', 
                    backgroundPosition: 'center',
                    minHeight: '400px', 
                }}
            >
                <div className="container position-relative z-index-1 py-5">
                    <h1 className="display-4 fw-bold">
                        TU PRÓXIMA AVENTURA EMPIEZA AQUÍ.
                    </h1>
                    <p className="lead mt-3 mx-auto" style={{ maxWidth: '600px' }}>
                        En nuestro catalogo de furgontas, vas a encontrar la camper perfecta para tus nececidades.
                    </p>
                </div>
            </div>

            <div className="min-vh-100">
                <div className="container">
                    <div className="row py-5 g-4">
                        {store.vans && store.vans.map((van) => (
                            <div className="col-12 col-md-6" key={van.car_id}>
                                <VanCard van={van} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}