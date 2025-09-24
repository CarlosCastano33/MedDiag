# multiple-disease-prediction-streamlit-app
This repository contains the codebase for "Multiple Disease Prediction Streamlit App". The training notebooks &amp; the datasets are also provided in the respective folders. 

app.py is the streamlit app code.
run the command "**pip install -r requirements.txt**" to install the required dependencies for the streamlit app.

You may need to install additional libraries for running the jupyter notebooks.

# 🩺 Sistema de Diagnóstico Médico Inteligente (MVP)

Aplicación web de **apoyo diagnóstico** construida con **Python + Streamlit**. El modelo predictivo sugiere posibles diagnósticos a partir de síntomas y variables clínicas ingresadas por el usuario.

 **Aviso Importante**: Esta herramienta es un **apoyo** y **no** reemplaza la valoración médica profesional.

---

## Objetivos

- Entregar un **MVP** funcional de apoyo diagnóstico.
- Entrenar y versionar un **modelo reproducible** (scikit-learn).
- Proveer una **UI simple** para predicción en tiempo real.
- Reportar **métricas** (accuracy, precision, recall, F1) y matriz de confusión.

---

## Arquitectura (resumen)

- **Datos** → CSV en `data/raw/`
- **Entrenamiento** → pipeline scikit-learn (preprocesamiento + modelo)
- **Persistencia** → `models/model.pkl` + `models/metrics.json`
- **UI** → Streamlit (`app/app.py`) que consume el modelo serializado