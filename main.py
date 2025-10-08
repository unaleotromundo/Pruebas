import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(layout="wide", page_title="Galería Minimalista 🌐")

DASHBOARD_FILES = {
    "01. Corporate (Inter)": {
        "file": "Dashboard Moderno2.html",
        "icon": "💎",
        "title_display": "Diseño Corporativo",
        "font_family": "Inter, sans-serif"
    },
    "02. Financial (Plex)": {
        "file": "dashboard-financial.html",
        "icon": "📈",
        "title_display": "Panel Financiero",
        "font_family": "'IBM Plex Sans', sans-serif"
    },
    "03. Industrial (Rajdhani)": {
        "file": "dashboard-industrial.html",
        "icon": "🏭",
        "title_display": "Vista Industrial",
        "font_family": "Rajdhani, sans-serif"
    },
    "04. Medical (Roboto)": {
        "file": "dashboard-medical.html",
        "icon": "🩺",
        "title_display": "Interfaz Médica",
        "font_family": "Roboto, sans-serif"
    },
    "05. Retail/Sales (Outfit)": {
        "file": "dashboard-retail.html",
        "icon": "🛍️",
        "title_display": "Dashboard de Ventas",
        "font_family": "Outfit, sans-serif"
    },
    "06. Tech/Vibrant (Poppins)": {
        "file": "dashboard-tech.html",
        "icon": "🧠",
        "title_display": "Panel Tecnológico",
        "font_family": "Poppins, sans-serif"
    },
}

STYLE_HTML = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
header {visibility: hidden;} 

.stApp {
    background-color: #0A0A0A; 
    font-family: 'Inter', sans-serif;
}

.titulo-minimal {
    font-family: 'Inter', sans-serif;
    font-size: 72px;
    font-weight: 200; 
    text-align: center;
    letter-spacing: 5px;
    color: #FFFFFF;
    text-transform: uppercase;
    text-shadow: 
        0 0 5px rgba(0, 200, 255, 0.5), 
        0 0 10px rgba(0, 200, 255, 0.2);
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(0, 200, 255, 0.2); 
    padding-bottom: 10px;
}

.subtitulo-minimal {
    font-size: 16px;
    font-weight: 300;
    color: #888888; 
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 60px;
    text-transform: uppercase;
}

.dashboard-title {
    font-size: 38px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #FFFFFF !important;
    text-align: left;
    margin: 0;
    padding: 8px 0;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

div.stButton > button {
    width: 100%; 
    height: 80px;
    border: 1px solid #222222; 
    border-radius: 4px; 
    padding: 15px 25px;
    background-color: #1A1A1A; 
    color: #BDBDBD; 
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row; 
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    white-space: nowrap;
}

div.stButton > button > div > p {
    font-weight: 500;
    font-size: 15px; 
    margin: 0;
    padding-left: 15px;
    color: #FFFFFF; 
    text-transform: uppercase;
    letter-spacing: 1px;
}

div.stButton > button:hover {
    background-color: #0F0F0F; 
    border-color: #00C8FF; 
    color: #00C8FF;
    box-shadow: 0 0 15px rgba(0, 200, 255, 0.6); 
    transform: scale(1.02); 
}

iframe[title="streamlit_component"] {
    height: 1000px !important;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.7);
    border: 1px solid #222222;
}
</style>
"""
st.markdown(STYLE_HTML, unsafe_allow_html=True)

if 'page' not in st.session_state:
    st.session_state.page = 'home'
    st.balloons()

if 'selected_dashboard' not in st.session_state:
    st.session_state.selected_dashboard = None

def navigate_to_home():
    st.session_state.page = 'home'
    st.session_state.selected_dashboard = None

def navigate_to_dashboard(clave):
    st.session_state.page = 'dashboard_view'
    st.session_state.selected_dashboard = clave

def load_html_file(filename):
    try:
        filepath = os.path.join(os.getcwd(), filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        st.error(f"⚠️ Error: El archivo '{filename}' no se encontró.")
        return None
    except Exception as e:
        st.error(f"❌ Error al leer el archivo '{filename}': {e}")
        return None

if st.session_state.page == 'home':
    st.markdown('<div class="titulo-minimal">Mirá Cho!</div>', unsafe_allow_html=True)
    st.markdown('<div class="subtitulo-minimal">Directorio de Temas | Estilo Consola Minimalista</div>', unsafe_allow_html=True)

    cols = st.columns(3)
    for i, (nombre, data) in enumerate(DASHBOARD_FILES.items()):
        with cols[i % 3]:
            btn_label = f"{data['icon']} {nombre}"
            st.button(btn_label, key=nombre, on_click=navigate_to_dashboard, args=(nombre,))

    st.write("")
    st.markdown("---")
    st.markdown('<p style="text-align: center; color: #555555; font-size: 14px; margin-top: 20px;">Cada vista se carga directamente desde el archivo HTML original, garantizando la integridad funcional.</p>', unsafe_allow_html=True)

elif st.session_state.page == 'dashboard_view' and st.session_state.selected_dashboard:
    clave_actual = st.session_state.selected_dashboard
    archivo_html = DASHBOARD_FILES[clave_actual]['file']
    
    col_back, col_title = st.columns([1, 4])
    
    with col_back:
        st.button("⬅️ VOLVER AL DIRECTORIO", on_click=navigate_to_home)

    with col_title:
        title_text = DASHBOARD_FILES[clave_actual]["title_display"]
        font_family = DASHBOARD_FILES[clave_actual]["font_family"]
        st.markdown(
            f'<h1 class="dashboard-title" style="font-family: {font_family};">{title_text}</h1>',
            unsafe_allow_html=True
        )

    st.markdown("---")
    
    dashboard_html = load_html_file(archivo_html)
    if dashboard_html:
        components.html(dashboard_html, height=1000, scrolling=True)