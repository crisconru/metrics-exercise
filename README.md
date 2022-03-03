# Metrics-Exercise

This is a Proof of Concept -> Post and display metrics from frontend to a backend

The structure is a monorepo split in frontend and backend (an API).

The project is far to be functional and completed. The author is not proud with the final result but it is what it is.

Backend is more or less completed:

- [x] Gets metrics.
- [x] Post metrics to backend.
- [x] Get averages of metrics by day, hour, minute with a timestamp.
- [] Websocket to have realtime communication.

API has an OpenAPI docs at the endpoins `/docs` and `/redoc`.

Frontend is incompleted:

- [x] Gets metrics.
- [x] Post metrics.
- [] Get averages of metrics by day, hour, minute with a timestamp (this goal is half done).
- [] Display averages in an usable way (like a Time-Series chart).
- [] UI not horrible and responsive.
- [] Websocket to have realtime updates of the averages.

The project can be run in two ways:

1. docker-compose
2. Installing and running each service separately

## Docker-Compose

If you choose this option, run `docker-compose up` and you get:

- Frontend at 3333 port
- Backend at 8888 port

With docker-compose the project doesn't work well because an unresolved (by me) issue with CORS.

## Each service separately

This option at least work (with incomplete project) but need some steps. The two services need to run in the same machine because the CORS problem doesn't affect with localhost.

### Backend

Python 3.9 is needed and I'll recommend you to use virtual environment. There is a requirements.txt file if you install deps with PIP. If you use poetry, there is a pyproject.toml.

Before run the project create a `.env` file. There is a `dev.env` as a example, if you prefer rename this file to `.env`.

To run use `python main.py` and you get API running at the port you set in `.env` file

### Frontend

The front was developed with NODE 16. Is the typical project made with `create-react-app` and the TypeScript template.

Before run please modify at `src/context/MetricsProvider.tsx`. You need to set `BACKEND` const to the correct backend url. If you use `dev.env` with backend, uncomment the first `BACKEND` const and comment the second.

Then you can start with `npm start`.
