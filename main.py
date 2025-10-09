import streamlit as st

# Configuración de la página
st.set_page_config(
    page_title="🎯 Plan de Mejoras - Feria Virtual",
    page_icon="🚀",
    layout="wide"
)

# Estilos CSS personalizados
st.markdown("""
<style>
    .improvement-card {
        background-color: white;
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        transition: box-shadow 0.2s;
    }
    .improvement-card:hover {
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }
    .priority-critica {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
    }
    .priority-alta {
        background-color: #ffedd5;
        color: #c2410c;
        border: 1px solid #fed7aa;
    }
    .priority-media {
        background-color: #fef9c3;
        color: #854d0e;
        border: 1px solid #fde047;
    }
    .priority-baja {
        background-color: #dbeafe;
        color: #1d4ed8;
        border: 1px solid #93c5fd;
    }
    .quick-wins {
        background: linear-gradient(to right, #10b981, #059669);
        border-radius: 16px;
        padding: 1.5rem;
        color: white;
        margin-top: 2rem;
    }
    .stTabs [data-baseweb="tab-list"] {
        gap: 12px;
    }
    .stTabs [data-baseweb="tab"] {
        height: 40px;
        border-radius: 8px;
        background-color: #f1f5f9;
        color: #475569;
    }
    .stTabs [aria-selected="true"] {
        background-color: #2563eb;
        color: white;
    }
</style>
""", unsafe_allow_html=True)

# Título principal
st.title("🎯 Plan de Mejoras - Feria Virtual")
st.markdown("Recomendaciones priorizadas para hacer tu plataforma más profesional y práctica")

# Datos
improvements = {
    "ux": [
        {
            "priority": "Alta",
            "title": "Onboarding para nuevos usuarios",
            "description": "Tour guiado para comerciantes que se registran por primera vez",
            "icon": "👥",
            "code": """// Agregar en initializeApp()
if (isFirstVisit) {
  showOnboardingTour();
}

function showOnboardingTour() {
  const steps = [
    { element: '#register', title: '¡Bienvenido!', text: 'Registra tu puesto aquí' },
    { element: '#products', title: 'Explora', text: 'Descubre productos locales' },
    { element: '#cartIcon', title: 'Carrito', text: 'Guarda productos para contactar' }
  ];
  // Implementar con una librería como Intro.js o Driver.js
}"""
        },
        {
            "priority": "Alta",
            "title": "Vista previa antes de publicar productos",
            "description": "Mostrar cómo se verá el producto antes de guardarlo",
            "icon": "👁️",
            "code": """// En el modal de producto
<button onclick="previewProduct()">
  <i class="fas fa-eye"></i> Vista Previa
</button>

function previewProduct() {
  const tempProduct = {
    name: document.getElementById('productName').value,
    price: document.getElementById('productPrice').value,
    // ... resto de datos
  };
  // Renderizar en un modal temporal
}"""
        },
        {
            "priority": "Media",
            "title": "Confirmación visual al agregar al carrito",
            "description": "Toast mejorado con imagen del producto",
            "icon": "🛒",
            "code": """function showCartToast(product) {
  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.innerHTML = \`
    <img src="\${product.imageUrl}" alt="">
    <div>
      <strong>\${product.name}</strong>
      <p>Agregado al carrito</p>
    </div>
    <button onclick="toggleCart()">Ver carrito</button>
  \`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
}"""
        },
        {
            "priority": "Media",
            "title": "Favoritos/Lista de deseos",
            "description": "Permitir guardar productos sin agregarlos al carrito",
            "icon": "❤️",
            "code": """// Agregar botón de favorito en cada producto
<button class="btn-favorite" onclick="toggleFavorite('\${product.id}')">
  <i class="fas fa-heart"></i>
</button>

// Sistema de favoritos con localStorage
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFavorite(productId) {
  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteUI();
}"""
        }
    ],
    "features": [
        {
            "priority": "Alta",
            "title": "Sistema de valoraciones y reseñas",
            "description": "Permitir a los usuarios calificar productos y vendedores",
            "icon": "⭐",
            "code": """// Nueva tabla en Supabase: product_reviews
{
  id: uuid,
  product_id: uuid,
  user_email: text,
  rating: integer (1-5),
  comment: text,
  created_at: timestamp
}

// Mostrar estrellas en productos
<div class="product-rating">
  <span class="stars">★★★★☆</span>
  <span class="rating-count">(24 reseñas)</span>
</div>"""
        },
        {
            "priority": "Alta",
            "title": "Notificaciones push (opcional)",
            "description": "Alertar sobre nuevos productos de vendedores favoritos",
            "icon": "🔔",
            "code": """// Pedir permiso para notificaciones
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      // Guardar token de notificación
      subscribeToVendor(vendorId);
    }
  });
}"""
        },
        {
            "priority": "Media",
            "title": "Compartir productos en redes sociales",
            "description": "Botones para compartir en WhatsApp, Facebook, Twitter",
            "icon": "📤",
            "code": """function shareProduct(product) {
  const url = window.location.origin + '?product=' + product.id;
  const text = \`Mira este producto: \${product.name} por $\${product.price}\`;
  
  // WhatsApp
  window.open(\`https://wa.me/?text=\${encodeURIComponent(text + ' ' + url)}\`);