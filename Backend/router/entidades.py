from fastapi import APIRouter, HTTPException
from database import (
    get_todos_pedidos,
    create_pedido,
    get_pedido_cliente,
    get_one_pedido,
    delete_pedido,
    update,
)

from models import PedidosEs, UpdatePedidosEs
from bson import ObjectId

pedido = APIRouter()


@pedido.get("/api/pedidoses")
async def get_pedidos():
    pedidos = await get_todos_pedidos()
    return pedidos


@pedido.post("/api/pedidoses")
async def save_pedidos(pedidos: PedidosEs):
    pedido_existente = await get_pedido_cliente(pedidos.cliente)

    if pedido_existente:
        raise HTTPException(
            status_code=400, detail="El cliente ya tiene un pedido registrado"
        )

    dict_pedido = pedidos.model_dump()
    if dict_pedido.get("id") is None:
        del dict_pedido["id"]

    responsive = await create_pedido(dict_pedido)
    return responsive


@pedido.get("/api/pedidoses/{id}", response_model=PedidosEs)
async def get_pedido(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")

    pedido = await get_one_pedido(id)
    if pedido:
        return pedido
    raise HTTPException(404, f"Pedido {id} no encontrado con ID")


@pedido.put("/api/pedidoses/{id}", response_model=PedidosEs)
async def put_pedidos(id: str, pedidos: UpdatePedidosEs):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")

    response = await update(id, pedidos)
    if response:
        return response

    raise HTTPException(404, f"Pedido {id} no encontrado")


@pedido.delete("/api/pedidoses/{id}")
async def remove_pedido(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")

    response = await delete_pedido(id)
    if response:
        return {"message": "Pedido borrado satisfactoriamente"}
    raise HTTPException(status_code=404, detail=f"Pedido {id} no encontrado")
