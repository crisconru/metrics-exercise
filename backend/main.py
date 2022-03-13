from os import getenv
from dotenv import load_dotenv

load_dotenv()
PORT = int(getenv('APP_PORT', 8000))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('src.app:app', port=PORT, host='0.0.0.0', reload=True)
