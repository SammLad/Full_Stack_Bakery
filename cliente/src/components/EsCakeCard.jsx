import { useNavigate } from "react-router-dom";
import { updatePedidoEs } from "../api/entidades";

function EsCakeCard({ pedido }) {
    const navigate = useNavigate()
    return (
        <div
            className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-4 transition-all duration-200 hover:cursor-pointer hover:bg-emerald-100/70 hover:border-emerald-300 shadow-sm hover:shadow-md"
            onClick={() => {
                navigate(`/pedidos/${pedido._id}`)
            }}
        >
            <div className="flex justify-between items-center mb-1">
                <h2 className="font-bold text-2xl text-emerald-950 tracking-tight">{pedido.cliente}</h2>
                <button
                    className="p-2 rounded-lg transition-colors hover:bg-emerald-200/60 text-emerald-800"
                    onClick={async (e) => {
                        e.stopPropagation()
                        const res = await updatePedidoEs(pedido._id, { entregado: !pedido.entregado })
                        if (res.status == 200) {
                            window.location.reload()
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className={`w-6 h-6 ${pedido.entregado ? 'text-emerald-600' : 'text-emerald-300/80'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                </button>
            </div>

            {/* Producto de repostería agregado con un tono verde intermedio y buena legibilidad */}
            <p className="text-emerald-900/90 font-medium text-sm mb-2">
                {pedido.producto_reposteria}
            </p>

            <p className="text-emerald-800 font-semibold">{pedido.precio_total}</p>
        </div>
    )
}

export default EsCakeCard;