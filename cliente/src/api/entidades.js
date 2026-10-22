import axios from "axios"

const URL = "http://localhost:8000"
const endpoint = `${URL}/api/pedidoses`

export const fetchPedidosEs = () => axios.get(endpoint);

export const fetchPedidoEs = async (id) =>
    axios.get(`${endpoint}/${id}`)

export const createPedidoEs = (newPedido) =>
    axios.post(endpoint, newPedido);

export const updatePedidoEs = (id, pedido) =>
    axios.put(`${endpoint}/${id}`, pedido)

export const deletePedidoEs = (id) =>
    axios.delete(`${endpoint}/${id}`)
