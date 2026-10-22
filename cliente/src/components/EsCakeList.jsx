import EsCakeCard from "./EsCakeCard"

function EsCakeList({ pedidos }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {pedidos.map(pedido => (
                <EsCakeCard pedido={pedido} key={pedido._id} />
            ))}
        </div>
    );
}

export default EsCakeList