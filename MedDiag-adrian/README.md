# 🩺 MedDiag – Sistema de Apoyo Diagnóstico con IA (MVP)

**MedDiag** es un prototipo de aplicación de apoyo diagnóstico médico basado en **Inteligencia Artificial**, desarrollado como Proyecto Integrador de Ingeniería de Sistemas (UdeA).

El sistema permite registrar datos básicos de un paciente, ingresar variables clínicas sencillas y obtener una **predicción preliminar de riesgo** para tres condiciones:

- Diabetes
- Enfermedad cardíaca
- Enfermedad de Parkinson

> ⚠️ **Aviso importante:**  
> MedDiag es una herramienta **académica** y de demostración.  
> No reemplaza en ningún caso la valoración de un profesional en salud.

---

## 🎯 Objetivo del MVP

El objetivo principal es **demostrar la viabilidad técnica** de un sistema de apoyo diagnóstico:

- Integrando modelos de **Machine Learning** entrenados.
- Exponiéndolos a través de una interfaz web en **Streamlit**.
- Registrando los resultados de las predicciones en una **base de datos** para construir historial de diagnósticos.  

---

## 🧱 Arquitectura Actual

La versión actual de MedDiag implementa una arquitectura **monolítica** centrada en Streamlit:

1. **Interfaz de usuario (UI)**
   - Construida íntegramente en **Streamlit** (`app.py`).
   - Usa `streamlit-option-menu` para la navegación entre enfermedades.
   - Soporta español e inglés mediante un toggle y el archivo `translations.py`.  

2. **Módulo de predicción (ML)**
   - Tres modelos entrenados con **scikit-learn**, almacenados en `saved_models/`:
     - `diabetes_model.sav`
     - `heart_disease_model.sav`
     - `parkinsons_model.sav`
   - Los modelos se cargan en memoria al iniciar la app.:contentReference[oaicite:17]{index=17}  

3. **Capa de datos (persistencia)**
   - ORM implementado con **SQLAlchemy** (`models.py`, `database.py`, `crud.py`).  
   - BD por defecto: `SQLite` local (`meddiag.db`), configurable mediante `DATABASE_URL` en `.env`.
   - Se registran:
     - Pacientes (`users`)
     - Enfermedades soportadas (`diseases`, seed inicial: DIAB, HEART, PARK)
     - Diagnósticos realizados (`diagnoses`)
     - Detalles de probabilidad por enfermedad (`diagnosis_details`)

No se utiliza FastAPI en esta versión: toda la lógica de UI y predicción vive dentro de Streamlit.

---

## 🧪 Funcionalidades principales

- 🧍 **Registro básico de paciente**
  - Nombre, correo (opcional), teléfono (opcional), edad y género.:contentReference[oaicite:19]{index=19}  

- 📊 **Predicción de Diabetes**
  - Modelo entrenado a partir de variables clínicas estándar: embarazos, glucosa, presión arterial, IMC, etc.
  - El formulario muestra un subconjunto de campos; otros se completan con valores clínicos promedio.  

- ❤️ **Predicción de Enfermedad Cardíaca**
  - Variables típicas del dataset de UCI Heart: edad, sexo, tipo de dolor torácico, presión en reposo, colesterol, frecuencia cardiaca máxima, etc.
  - Parte de las variables se capturan vía `selectbox` y `number_input`, otras se inicializan con valores por defecto para simplificar el formulario.  

- 🧠 **Predicción de Parkinson**
  - Variables derivadas de la señal de voz (frecuencia, jitter, shimmer, NHR, HNR, etc.).
  - El usuario ingresa algunos parámetros clave y el sistema completa el resto con valores estándar.  

- 💾 **Registro de diagnósticos**
  - Cada predicción guarda:
    - Usuario asociado.
    - Enfermedad (DIAB, HEART o PARK).
    - Probabilidad estimada (si el modelo expone `predict_proba`).
    - Mensaje final de diagnóstico (texto mostrado al usuario).  

---

## 🛠️ Tecnologías utilizadas

| Componente       | Tecnología                  |
|------------------|----------------------------|
| Lenguaje         | Python 3.10+               |
| UI               | Streamlit, streamlit-option-menu |
| ML / IA          | scikit-learn               |
| ORM / BD         | SQLAlchemy + SQLite/PostgreSQL |
| Configuración    | python-dotenv (`.env`)     |

Las dependencias mínimas están definidas en `requirements.txt`.:contentReference[oaicite:21]{index=21}  

---

## 🚀 Despliegue local

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/<TU_USUARIO>/<TU_REPO_MEDDIAG>.git
cd <TU_REPO_MEDDIAG>
