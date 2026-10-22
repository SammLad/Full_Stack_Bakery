import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPedidoEs, createPedidoEs, deletePedidoEs, updatePedidoEs } from "../api/entidades";


function EsCakeForm() {
    const [producto_reposteria, setProductoReposteria] = useState('')
    const [cliente, setCliente] = useState('')
    const [precio_total, setPrecioTotal] = useState('')
    const params = useParams()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const datosPedido = {
            producto_reposteria,
            cliente,
            precio_total: Number(precio_total)
        };

        try {
            if (!params.id) {
                const res = await createPedidoEs(datosPedido);
                console.log(res);
            } else {
                const res = await updatePedidoEs(params.id, datosPedido);
                console.log(res);
            }
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchPedidoEs(params.id)
                .then((res) => {
                    setProductoReposteria(res.data.producto_reposteria);
                    setCliente(res.data.cliente)
                    setPrecioTotal(res.data.precio_total)
                })
                .catch((err) => console.log(err))
        }

    }, [params.id])

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <div className="w-full max-w-md">
                <form className="bg-white border border-emerald-200/90 shadow-2xl shadow-emerald-950/10 p-8 rounded-2xl" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-6 text-emerald-950 tracking-tight">
                        {params.id ? "Actualizar Pedido Especial" : "Realizar Pedido Especial"}
                    </h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-emerald-900 mb-1">Producto de repostería</label>
                            <input
                                type="text"
                                placeholder="Ej. Tarta de chocolate"
                                className="block py-2.5 px-3 w-full bg-emerald-50/30 border border-emerald-200 rounded-xl text-emerald-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                                onChange={(e) => setProductoReposteria(e.target.value)}
                                value={producto_reposteria}
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-emerald-900 mb-1">Nombre del cliente</label>
                            <input
                                type="text"
                                placeholder="Ej. María Pérez"
                                className="block py-2.5 px-3 w-full bg-emerald-50/30 border border-emerald-200 rounded-xl text-emerald-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                                onChange={(e) => setCliente(e.target.value)}
                                value={cliente}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-emerald-900 mb-1">Costo total</label>
                            <input
                                type="number"
                                step="any"
                                placeholder="Ej. $15.000"
                                className="block py-2.5 px-3 w-full bg-emerald-50/30 border border-emerald-200 rounded-xl text-emerald-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                                onChange={(e) => setPrecioTotal(e.target.value)}
                                value={precio_total}
                            />
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 active:scale-95">
                        {params.id ? "Actualizar Pedido" : "Crear Pedido"}
                    </button>
                </form>

                {params.id && (
                    <button
                        className="w-full mt-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 active:scale-95"
                        onClick={async () => {
                            try {
                                const res = await deletePedidoEs(params.id)
                                console.log(res)
                                navigate("/")
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                    >
                        Borrar pedido
                    </button>
                )}
            </div>
        </div>
    )
}

export default EsCakeForm