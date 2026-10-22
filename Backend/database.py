from motor.motor_asyncio import AsyncIOMotorClient
from models import PedidosEs, UpdatePedidosEs
from bson import ObjectId

cliente = AsyncIOMotorClient("mongodb://localhost")
database = cliente.pedidosdatabase
coleccion = database.pedidos


async def get_one_pedido(id):
    pedido = await coleccion.find_one({"_id": ObjectId(id)})
    if pedido:
        pedido["_id"] = str(pedido["_id"])
    return pedido


async def create_pedido(pedido):
    new_pedido = await coleccion.insert_one(pedido)
    created_pedido = await coleccion.find_one({"_id": new_pedido.inserted_id})
    if created_pedido:
        created_pedido["_id"] = str(created_pedido["_id"])

    return created_pedido


async def get_todos_pedidos():
    pedidos = []
    cursor = coleccion.find({})
    async for document in cursor:
        document["_id"] = str(document["_id"])
        pedidos.append(PedidosEs(**document))
    return pedidos


async def update(id: str, data: UpdatePedidosEs):

    pedidos = data.model_dump(by_alias=True, exclude_none=True)
    pedidos.pop("_id", None)

    await coleccion.update_one({"_id": ObjectId(id)}, {"$set": pedidos})

    document = await coleccion.find_one({"_id": ObjectId(id)})

    if document:
        document["_id"] = str(document["_id"])
    return document


async def delete_pedido(id: str):
    await coleccion.delete_one({"_id": ObjectId(id)})
    return True


async def get_pedido_cliente(cliente: str):
    pedido = await coleccion.find_one({"cliente": cliente})
    return pedido
