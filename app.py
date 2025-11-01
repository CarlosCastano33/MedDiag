import os
import pickle
import streamlit as st
from streamlit_option_menu import option_menu
from translations import translations
from flags import get_flag

# Set page configuration
st.set_page_config(page_title="Health Assistant",
                   layout="wide",
                   page_icon="⚕️")

def text_input_with_state(label, key, default=''):
    """Helper function to create a text input that persists in session state"""
    value = st.session_state.get(key, default)
    user_input = st.text_input(label, value=value)
    st.session_state[key] = user_input
    return user_input
    
# getting the working directory of the main.py
working_dir = os.path.dirname(os.path.abspath(__file__))

# loading the saved models
diabetes_model = pickle.load(open(f'{working_dir}/saved_models/diabetes_model.sav', 'rb'))
heart_disease_model = pickle.load(open(f'{working_dir}/saved_models/heart_disease_model.sav', 'rb'))
parkinsons_model = pickle.load(open(f'{working_dir}/saved_models/parkinsons_model.sav', 'rb'))

# sidebar for navigation
with st.sidebar:
    # --- Selector de idioma ---
    #st.markdown("<h2 style='text-align: center;'>🇨🇴🌐🇬🇧</h2>", unsafe_allow_html=True)
    st.markdown(
        f"<h2 style='text-align: center;'><img src='{get_flag('uk')}' width='30' height='20'> 🌐 <img src='{get_flag('co')}' width='30' height='20'></h2>",
        unsafe_allow_html=True
        )

     # Toggle centrado debajo del emoji
    col_toggle = st.columns([1, 1, 1])
    with col_toggle[1]:
        language = st.toggle("", value=True)
    selected_language = "es" if language else "en"
    t = translations[selected_language]
    st.write("")

    #selected = option_menu('Multiple Disease Prediction System',
    selected = option_menu(t["MultipleDPS"],

                           [t["diabetes_prediction"],
                            t['heart_disease_prediction'],
                            t['parkinsons_prediction']],
                           menu_icon='hospital-fill',
                           icons=['activity', 'heart', 'person'],
                           default_index=0)


# Diabetes Prediction Page
if selected == t["diabetes_prediction"]:

    # page title
    #st.title('Diabetes Prediction using ML')
    st.title(t["title_diabetes"])

    # getting the input data from the user
    col1, col2, col3 = st.columns(3)

    with col1:
        pregnancies = text_input_with_state(t["pregnancies"], 'pregnancies')
        
    with col2:
        #Glucose = st.text_input('Glucose Level')
        Glucose = text_input_with_state(t["glucose_level"], 'Glucose')

    with col3:
        #BloodPressure = st.text_input('Blood Pressure value')
        BloodPressure = text_input_with_state(t["blood_pressure"], 'BloodPressure')

    with col1:
        #SkinThickness = st.text_input('Skin Thickness value')
        SkinThickness = text_input_with_state(t["skin_thickness"], 'SkinThickness')

    with col2:
        #Insulin = st.text_input('Insulin Level')
        Insulin = text_input_with_state(t["insulin_level"], 'Insulin')

    with col3:
        #BMI = st.text_input('BMI value')
        BMI = text_input_with_state(t["bmi"], 'BMI')

    with col1:
        #DiabetesPedigreeFunction = st.text_input('Diabetes Pedigree Function value')
        DiabetesPedigreeFunction = text_input_with_state(t["diabetes_pedigree_function"], 'DiabetesPedigreeFunction')

    with col2:
        #Age = st.text_input('Age of the Person')
        Age = text_input_with_state(t["age"], 'Age')

    # code for Prediction
    diab_diagnosis = ''

    # creating a button for Prediction

    #if st.button('Diabetes Test Result'):
    if st.button(t['button_diabetes']):

        user_input = [pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,
                      BMI, DiabetesPedigreeFunction, Age]

        user_input = [float(x) for x in user_input]

        diab_prediction = diabetes_model.predict([user_input])

        if diab_prediction[0] == 1:
            #diab_diagnosis = 'The person may be diabetic, consult your doctor.'
            diab_diagnosis = t['positive_diabetes']
        else:
            diab_diagnosis = t['negative_diabetes']

    st.success(diab_diagnosis)

# Heart Disease Prediction Page
if selected == t['heart_disease_prediction']:

    # page title
    st.title(t['title_heart'])

    col1, col2, col3 = st.columns(3)

    with col1:
        age = text_input_with_state(t['age'], 'heart_age')

    with col2:
        sex = text_input_with_state(t['sex'], 'sex')

    with col3:
        cp = text_input_with_state(t['cp'], 'cp')

    with col1:
        trestbps = text_input_with_state(t['trestbps'], 'trestbps')

    with col2:
        chol = text_input_with_state(t['chol'], 'chol')

    with col3:
        fbs = text_input_with_state(t['fbs'], 'fbs')

    with col1:
        restecg = text_input_with_state(t['restecg'], 'restecg')

    with col2:
        thalach = text_input_with_state(t['thalach'], 'thalach')

    with col3:
        exang = text_input_with_state(t['exang'], 'exang')

    with col1:
        oldpeak = text_input_with_state(t['oldpeak'], 'oldpeak')

    with col2:
        slope = text_input_with_state(t['slope'], 'slope')

    with col3:
        ca = text_input_with_state(t['ca'], 'ca')

    with col1:
        thal = text_input_with_state(t['thal'], 'thal')

    # code for Prediction
    heart_diagnosis = ''

    # creating a button for Prediction

    if st.button(t['button_heart']):

        user_input = [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]

        user_input = [float(x) for x in user_input]

        heart_prediction = heart_disease_model.predict([user_input])

        if heart_prediction[0] == 1:
            heart_diagnosis = t['positive_heart']
        else:
            heart_diagnosis = t['negative_heart']

    st.success(heart_diagnosis)

# Parkinson's Prediction Page
if selected == t['parkinsons_prediction']:

    # page title
    #st.title("Parkinson's Disease Prediction using ML")
    st.title(t['title_parkinson'])

    col1, col2, col3, col4, col5 = st.columns(5)

    with col1:
#        fo = st.text_input('MDVP:Fo(Hz)')
        fo = text_input_with_state(t['fo'], 'fo')

    with col2:
#        fhi = st.text_input('MDVP:Fhi(Hz)')
        fhi = text_input_with_state(t['fhi'], 'fhi')

    with col3:
        flo = text_input_with_state(t['flo'], 'flo')

    with col4:
        jitter_percent = text_input_with_state(t['jitter_percent'], 'jitter_percent')

    with col5:
        jitter_abs = text_input_with_state(t['jitter_abs'], 'jitter_abs')

    with col1:
        RAP = text_input_with_state(t['RAP'], 'RAP')

    with col2:
        PPQ = text_input_with_state(t['PPQ'], 'PPQ')

    with col3:
        DDP = text_input_with_state(t['DDP'], 'DDP')

    with col4:
        shimmer = text_input_with_state(t['shimmer'], 'shimmer')

    with col5:
        shimmer_dB = text_input_with_state(t['shimmer_dB'], 'shimmer_dB')

    with col1:
        APQ3 = text_input_with_state(t['APQ3'], 'APQ3')

    with col2:
        APQ5 = text_input_with_state(t['APQ5'], 'APQ5')

    with col3:
        APQ = text_input_with_state(t['APQ'], 'APQ')

    with col4:
        DDA = text_input_with_state(t['DDA'], 'DDA')

    with col5:
        NHR = text_input_with_state(t['NHR'], 'NHR')

    with col1:
        HNR = text_input_with_state(t['HNR'], 'HNR')

    with col2:
        RPDE = text_input_with_state(t['RPDE'], 'RPDE')

    with col3:
        DFA = text_input_with_state(t['DFA'], 'DFA')

    with col4:
        spread1 = text_input_with_state(t['spread1'], 'spread1')

    with col5:
        spread2 = text_input_with_state(t['spread2'], 'spread2')

    with col1:
        D2 = text_input_with_state(t['D2'], 'D2')

    with col2:
        PPE = text_input_with_state(t['PPE'], 'PPE')

    # code for Prediction
    parkinsons_diagnosis = ''

    # creating a button for Prediction    
    if st.button(t["button_parkinson"]):

        user_input = [fo, fhi, flo, jitter_percent, jitter_abs,
                      RAP, PPQ, DDP, shimmer, shimmer_dB, APQ3, APQ5,
                      APQ, DDA, NHR, HNR, RPDE, DFA, spread1, spread2, D2, PPE]

        user_input = [float(x) for x in user_input]

        parkinsons_prediction = parkinsons_model.predict([user_input])

        if parkinsons_prediction[0] == 1:
            parkinsons_diagnosis = t['positive_parkinson']
        else:
            parkinsons_diagnosis = t['negative_parkinson']

    st.success(parkinsons_diagnosis)
