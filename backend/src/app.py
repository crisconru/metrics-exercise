from fastapi import FastAPI
from .db.database import engine
from .metrics.routes import router as router_metrics
from .metrics import models as models_metrics
# DB
models_metrics.Base.metadata.create_all(bind=engine)
# Routes
app = FastAPI()
app.include_router(router=router_metrics, prefix='/metrics')


@app.get("/")
async def hello():
    return {"message": "Hello World"}
