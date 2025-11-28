# MedDiag - Sistema de Diagnostico Medico Inteligente

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-1.28+-FF4B4B?logo=streamlit&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Descripción General

MedDiag es un Sistema de Apoyo Diagnostico Medico basado en Inteligencia Artificial. Se desarrolló como un Producto Minimo Viable (MVP) durante el curso de Proyecto Integrador. La aplicación permite que los usuarios ingresen información sobre sus sintomas y obtener predicciones preliminares de posibles diagnosticos.

El sistema fue construido utilizando **Streamlit y Python**, integrando modelos de Machine Learning entrenados con datos medicos. La idea principal es proporcionar una herramienta que ayude a identificar tempranamente posibles problemas de salud.



---

## Objetivos del Proyecto

### Objetivo General

Desarrollar un sistema de apoyo diagnostico basado en inteligencia artificial que permita a las personas ingresar sintomas y recibir predicciones preliminares sobre posibles enfermedades.

### Objetivos Especificos

1. Analizar y adaptar un repositorio base con arquitectura modular
2. Entrenar modelos de Machine Learning para predicción de enfermedades
3. Crear una interfaz de usuario facil de usar con Streamlit
4. Realizar pruebas del sistema en diferentes fases del desarrollo
5. Documentar todo el proceso y resultados obtenidos

---

## Tecnologías Utilizadas

| Tecnología | Versión | Para qué se usa |
|-----------|---------|-----------------|
| **Python** | 3.10+ | Lenguaje principal de programación |
| **Streamlit** | 1.28+ | Para crear la interfaz de usuario |
| **scikit-learn** | 1.3+ | Para entrenar los modelos de Machine Learning |
| **Pandas** | 2.0+ | Para manipular y procesar los datos |
| **NumPy** | 1.24+ | Para calculos con arrays y matrices |
| **SQLite** | 3.40+ | Base de datos local donde guardamos los registros |
| **FastAPI** | Latest | Para el backend y gestionar las peticiones |

---

## Estructura del Proyecto

```
MedDiag/
  app/
    main.py               # Backend FastAPI (REST y persistencia)
    model_predict.py      # Carga y ejecucion de modelos ML
    models.py             # Modelos SQLAlchemy
    utils/
      crud.py             # Operaciones de base de datos
      database.py         # Configuracion de la base de datos
      validators.py       # Validaciones basicas

  frontend/
    app_streamlit.py      # Interfaz Streamlit consumiendo la API

  saved_models/           # Modelos entrenados (.sav)
  notebooks/              # Notebooks de entrenamiento
  render.yaml             # Despliegue en Render (API + Streamlit)
 Dockerfile              # Imagen del backend
  requirements.txt        # Dependencias del proyecto
  .env.example            # Variables de entorno ejemplo
  README.md
```

Para instrucciones de despliegue en Render consulta `DEPLOY.md`.

---

## Como Instalar y Ejecutar

### Antes de Comenzar

Necesitas tener instalado en tu computadora:
- Python version 3.10 o superior
- pip (para instalar las librerias)
- Git (para clonar el repositorio)

### Paso 1: Clonar el Repositorio

Abre la terminal y ejecuta:

```bash
git clone https://github.com/CarlosCastano33/MedDiag.git
cd MedDiag
```

### Paso 2: Crear un Entorno Virtual

Es importante crear un entorno virtual para no mezclar las librerias del proyecto con las del sistema.

```bash
# Si usas Linux o macOS
python -m venv venv
source venv/bin/activate

# Si usas Windows
python -m venv venv
venv\Scripts\activate
```

### Paso 3: Instalar las Dependencias

Instala todas las librerias que el proyecto necesita:

```bash
pip install -r requirements.txt
```

### Paso 4: Ejecutar la Aplicacion

#### Opcion 1: Solo Streamlit (La mas facil)

```bash
cd frontend
streamlit run app_streamlit.py
```

La aplicación se abrira en tu navegador en: `http://localhost:8501`

#### Opcion 2: Con Backend FastAPI (Si quieres probar el backend también)

En una primera terminal ejecuta:
```bash
cd app
uvicorn main:app --reload
```

En otra terminal ejecuta:
```bash
cd frontend
streamlit run app_streamlit.py
```

---

## Que Puede Hacer la Aplicacion

### 1. Ingresar Sintomas

El usuario puede seleccionar los sintomas que tiene, su edad, sexo y otros datos importantes. La aplicación valida que todos los datos sean correctos antes de procesar.

### 2. Predecir Posibles Diagnosticos

Una vez que ingresas los datos, el sistema utiliza los modelos de Machine Learning para analizar la información y predecir que enfermedades podrias tener. Da una probabilidad para cada enfermedad.

### 3. Ver Informacion sobre las Enfermedades

La aplicación muestra informacion educativa sobre los diagnosticos predichos, para que entiendas mejor que son esas enfermedades y cuales son sus síntomas.

### 4. Interfaz Facil de Usar

El diseño de la aplicación es simple y funciona tanto en computadoras como en celulares. Los resultados se muestran de forma clara y con graficos.

---

## Como Entrenamos los Modelos

Entrenamos tres modelos diferentes para detectar:
- **Diabetes Tipo 2**
- **Enfermedades del Corazon**
- **Parkinson**

Los resultados del entrenamiento fueron los siguientes:

| Enfermedad | Precision | Recall | F1-Score | AUC-ROC |
|-----------|-----------|--------|----------|---------|
| Diabetes | 74% | 68% | 71% | 0.84 |
| Enfermedades del Corazon | 87% | 82% | 84% | 0.90 |
| Parkinson | 90% | 86% | 88% | 0.93 |

**Nota sobre los numeros:** Estos numeros indican que tan bien funciona cada modelo. Por ejemplo, Precision significa que cuando el modelo dice que tienes la enfermedad, que tan probable es que sea verdad.

---

## Estado Actual del Proyecto

Esta es la situación de cada parte del proyecto:

| Parte del Proyecto | Estado | Comentario |
|------------------|--------|-----------|
| Ingreso de sintomas | ✅ Terminado | Funciona correctamente |
| Modelos de predicción | ✅ Terminado | Los 3 modelos estan entrenados |
| Base de datos | ✅ Terminado | Guardamos los registros localmente |
| Visualizacion de resultados | ✅ Terminado | Se muestran bien los resultados |
| Validacion medica |  En progreso | Aun se puede mejorar mas |

---

## Como Reentrenar el Modelo

Si quieres entrenear nuevamente el modelo con otros datos, puedes usar el archivo Jupyter. Abre la terminal y ejecuta:

```bash
cd notebooks
jupyter notebook 01_train.ipynb
```

Despues de entrenar, los nuevos modelos se guardaran automaticamente en la carpeta `models/`.

---

## Metodologia que Usamos

Desarrollamos MedDiag siguiendo un enfoque **Agil**, esto significa que hicimos el proyecto en varias etapas pequeñas:

1. **Planeacion:** Definimos que queriamos lograr
2. **Diseño:** Pensamos en como guardar y procesar los datos
3. **Desarrollo de Modelos:** Entrenamos los modelos de Machine Learning
4. **Implementacion:** Construimos la interfaz y el backend
5. **Pruebas:** Verificamos que todo funcionara correctamente
6. **Documentacion:** Escribimos todo lo que aprendimos

---

## Problemas Encontrados y Posibles Mejoras

### Problemas Actuales

1. **Los modelos no son perfectos** - Podrían funcionar mejor si tuvieramos más datos para entrenar
2. **Solo detectamos 3 enfermedades** - Queremos agregar más tipos de diagnosticos en el futuro
3. **No tenemos validacion de doctores** - Un medico profesional deberia revisar nuestros resultados
4. **No es muy escalable** - El proyecto actual es pequeño, pero si crece va a necesitar ser reorganizado

### Ideas para Mejorar en el Futuro

- Agregar mas enfermedades que el sistema pueda predecir
- Usar modelos mas avanzados con redes neuronales profundas
- Desplegar la aplicacion en la nube (AWS, Google Cloud)
- Validar los resultados con hospitales y clinicas reales
- Crear una aplicacion movil para celulares
- Agregar seguridad para proteger los datos de los usuarios

---

## El Equipo que Desarrollo MedDiag

Este proyecto fue realizado por estudiantes de Ingenieria de Sistemas como trabajo del curso **Proyecto Integrador**:

- **Adrian Espinosa** - Desarrollador Backend
- **Carlos Castaño** - Desarrollador Frontend
- **Diana Huertas** - Especialista en Machine Learning

**Docente Asesor:** Sandra Patricia Zabala Orrego

---

## Referencias que Consultamos

Estas fueron algunas de las fuentes que consultamos para aprender:

1. Documentacion de Streamlit: https://streamlit.io/
2. Documentacion de FastAPI: https://fastapi.tiangolo.com/
3. Documentacion de scikit-learn: https://scikit-learn.org/
4. Documentacion de Pandas: https://pandas.pydata.org/
5. Documentacion de NumPy: https://numpy.org/

---

## Licencia

Este proyecto esta bajo la licencia MIT, esto significa que puedes usarlo libremente, pero debes darle credito a los autores.

---

## Como Contribuir

Si quieres ayudar a mejorar MedDiag, puedes:

1. Hacer un Fork del repositorio
2. Crear una rama nueva con tu nombre: `git checkout -b feature/tuNombre`
3. Hacer cambios y commit: `git commit -m "Descripcion de lo que cambiaste"`
4. Hacer push: `git push origin feature/tuNombre`
5. Abrir un Pull Request

---

## Notas Finales

MedDiag es un proyecto educativo que demuestra como podemos usar Inteligencia Artificial para ayudar en el area de la salud. Aunque funciona bien para un MVP, es importante recordar que **no debe reemplazar** la opinion de un medico profesional.

Aprendimos mucho durante este proyecto, desde como funcionan los modelos de Machine Learning, hasta como construir una aplicacion web completa con Streamlit.

**© 2025 - Proyecto Integrador - Ingenieria de Sistemas**

*Medellín, Colombia*
