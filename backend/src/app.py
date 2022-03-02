from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db.database import engine
from .metrics.routes import router as router_metrics
from .metrics import models as models_metrics
# DB
models_metrics.Base.metadata.create_all(bind=engine)
# Routes
app = FastAPI()
app.include_router(router=router_metrics, prefix='/metrics')
# CORS
origins = [
    "http://localhost:3000",
    "http://localhost",
    "frontend",
    "frontend:3000",
    "frontend:3333"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def hello():
    return {"message": "Hello World"}
