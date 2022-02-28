from os import getenv
from dotenv import load_dotenv

load_dotenv()
PORT = int(getenv('APP_PORT', 8000))

if __name__ == '__main__':
    import uvicorn
    from src import app
    uvicorn.run(app=app, port=PORT)
