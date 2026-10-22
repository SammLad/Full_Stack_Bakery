from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if v is not None else v)]


class PedidosEs(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    producto_reposteria: str = Field(..., min_length=3)
    cliente: str = Field(..., min_length=3)
    precio_total: float = Field(..., gt=100)
    entregado: bool = False

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str},
    }


class UpdatePedidosEs(BaseModel):
    producto_reposteria: Optional[str] = None
    cliente: Optional[str] = None
    precio_total: Optional[float] = None
    entregado: Optional[bool] = None

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str},
    }
