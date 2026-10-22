import { Link } from "react-router-dom"

function Navbar() {
    return (
        <header className="flex justify-between items-center my-7 py-2 border-b border-emerald-200/60">
            <Link to={"/"} className="group">
                <h1 className="text-3xl font-bold text-emerald-950 tracking-tight group-hover:text-emerald-800 transition-colors">
                    Pastelería
                </h1>
            </Link>
            <Link
                to={"/pedidos/agregar"}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95"
            >
                Realizar pedido
            </Link>
        </header>
    )
}

export default Navbar;