import { useEffect, useState } from "react"
import { fetchPedidosEs } from "../api/entidades";
import EsCakeList from "../components/EsCakeList"

function Homepage() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        fetchPedidosEs()
            .then(res => {
                setPedidos(res.data)
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <EsCakeList pedidos={pedidos}></EsCakeList>
    );
}

export default Homepage;
