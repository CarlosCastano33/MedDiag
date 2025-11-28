# database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import streamlit as st

# Carga variables de entorno desde .env
load_dotenv()

# Función para obtener DATABASE_URL de forma segura
def get_database_url():
    # 1. Intentar leer de Streamlit Cloud (si está disponible)
    try:
        import streamlit as st
        if "DATABASE_URL" in st.secrets:
            return st.secrets["DATABASE_URL"]
    except:
        pass  # Streamlit no está disponible, estamos local

    # 2. Intentar leer de .env
    db_url = os.getenv("DATABASE_URL")
    if db_url:
        return db_url

    # 3. Fallback seguro (solo local)
    return "sqlite:///./meddiag.db"

DATABASE_URL = get_database_url()

# Para SQLite necesitamos un argumento extra en check_same_thread
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Probar conexión solo una vez y cerrarla
try:
    with engine.connect() as conn:
        print("Conexión OK:", DATABASE_URL)
except Exception as e:
    print("Error de conexión:", e)