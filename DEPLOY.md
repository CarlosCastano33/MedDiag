# Guía de despliegue en Render

Esta guía resume cómo preparar el repositorio, configurar variables y desplegar la API (FastAPI) y el frontend (Streamlit) en Render con base de datos Postgres.

## 1. Preparar el repo
- Incluye en git todo el código y los modelos `.sav` en `saved_models/`.
- Archivos clave: `render.yaml`, `Dockerfile`, `requirements.txt`, `app/`, `frontend/`, `.env.example`.
- Opcional: crea `.env` local copiando `.env.example` para probar antes de subir.

## 2. Variables de entorno

### Backend (`meddiag-api`)
- `DATABASE_URL`: cadena Postgres. Render la autocompleta si vinculas la base.
- `MODEL_DIR`: ruta a los modelos (por defecto `./saved_models`).
- `ALLOWED_ORIGINS`: dominios permitidos para CORS (ej. `*` o `https://<tu-streamlit>.onrender.com`).

### Frontend (`meddiag-streamlit`)
- `API_BASE_URL`: URL pública HTTPS de la API en Render (ej. `https://meddiag-api.onrender.com`).

## 3. Probar localmente (opcional)
```
python -m venv venv
venv\Scripts\activate  # o source venv/bin/activate
pip install -r requirements.txt

# Usando SQLite por defecto
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000

# En otra terminal
API_BASE_URL=http://127.0.0.1:8000 streamlit run frontend/app_streamlit.py
```
Para usar Postgres local con Docker:
```
docker compose up -d db
set DATABASE_URL=postgresql+psycopg2://meddiag:meddiag@localhost:5432/meddiag
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

## 4. Crear la base en Render
1. En Render, **New → PostgreSQL**. Nombra la instancia (ej. `meddiag-db`).
2. Copia el `Connection string`; Render la inyectará como `DATABASE_URL` en el blueprint.

## 5. Desplegar con `render.yaml` (Blueprint)
1. En Render, **New → Blueprint** y apunta a tu repo/branch.
2. Revisa que detecte los servicios:
   - `meddiag-api` (FastAPI, arranque `uvicorn app.main:app --host 0.0.0.0 --port $PORT`)
   - `meddiag-streamlit` (Streamlit, arranque `streamlit run frontend/app_streamlit.py ...`)
   - Base de datos `meddiag-db`.
3. Ajusta variables:
   - En `meddiag-api`: `MODEL_DIR=./saved_models`, `ALLOWED_ORIGINS` a tu dominio de frontend.
   - En `meddiag-streamlit`: cambia `API_BASE_URL` al dominio real de la API si difiere.
4. Crea el blueprint y espera el build. Render instalará `requirements.txt` y desplegará.

## 6. Verificación
- API: visita `https://<tu-api>.onrender.com/health` debe responder `{"status":"ok"}`.
- Frontend: abre `https://<tu-streamlit>.onrender.com`, ejecuta una predicción y confirma que se guarda (sección Historial).

## 7. Notas y recomendaciones
- Los modelos `.sav` fueron entrenados con scikit-learn 1.0.2; en producción se cargan con 1.7.2. Para evitar warnings, repickle o reentrena con la versión actual.
- Si cambias los nombres de servicio/dominio en Render, actualiza `API_BASE_URL` y `ALLOWED_ORIGINS` en consecuencia.
- Mantén los secretos (como el `DATABASE_URL`) configurados en Render, no en el repo.
