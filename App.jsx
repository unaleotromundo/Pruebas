import './App.css'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import { Star, Menu, X, MessageCircle, Image, Percent, Users } from 'lucide-react'
import { motion } from 'framer-motion'

// Importar imágenes
import heroImage from './assets/hero_image.png'
import productImage from './assets/product_gallery_image_1.png'
import testimonialImage from './assets/testimonial_image_1.png'
import iconPromociones from './assets/icon_promociones.png'
import iconGaleria from './assets/icon_galeria.png'
import iconComentarios from './assets/icon_comentarios.png'
import iconChat from './assets/icon_chat.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [chatEmail, setChatEmail] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    mensaje: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    
    if (!chatEmail || !chatMessage) {
      alert('Por favor ingresa tu email y mensaje')
      return
    }
    
    try {
      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: chatEmail,
          mensaje: chatMessage
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setChatMessage('')
        // Agregar mensaje a la lista local
        setChatMessages(prev => [...prev, {
          email: chatEmail,
          mensaje: chatMessage,
          timestamp: new Date().toISOString(),
          es_admin: false
        }])
        
        // Simular respuesta automática
        setTimeout(() => {
          setChatMessages(prev => [...prev, {
            email: 'admin@otromundo.com',
            mensaje: '¡Gracias por tu mensaje! Un representante te contactará pronto.',
            timestamp: new Date().toISOString(),
            es_admin: true
          }])
        }, 1000)
      } else {
        alert(data.error || 'Error al enviar mensaje')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión. Por favor intenta nuevamente.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/almacenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('¡Gracias por tu interés! Te contactaremos pronto.')
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          direccion: '',
          mensaje: ''
        })
      } else {
        alert(data.error || 'Error al enviar el formulario')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión. Por favor intenta nuevamente.')
    }
  }

  const testimonios = [
    {
      nombre: "Carlos Mendoza",
      negocio: "Almacén San José",
      comentario: "Desde que uso OtroMundo, mis ventas aumentaron un 40%. Los clientes aman ver las promociones en línea.",
      rating: 5,
      imagen: testimonialImage
    },
    {
      nombre: "María González",
      negocio: "Tienda La Esquina",
      comentario: "El chat en vivo me ayuda a atender mejor a mis clientes. Es muy fácil de usar.",
      rating: 5,
      imagen: testimonialImage
    },
    {
      nombre: "José Rodríguez",
      negocio: "Minimarket El Barrio",
      comentario: "Ahora puedo mostrar mis productos con precios actualizados. Mis clientes están más informados.",
      rating: 5,
      imagen: testimonialImage
    }
  ]

  const servicios = [
    {
      titulo: "Promociones Destacadas",
      descripcion: "Crea y gestiona ofertas especiales que atraigan más clientes a tu almacén.",
      icono: iconPromociones,
      color: "bg-accent"
    },
    {
      titulo: "Galería de Productos",
      descripcion: "Muestra tus productos con fotos atractivas y precios actualizados en tiempo real.",
      icono: iconGaleria,
      color: "bg-primary"
    },
    {
      titulo: "Comentarios de Clientes",
      descripcion: "Permite que tus clientes dejen reseñas y construye confianza en tu negocio.",
      icono: iconComentarios,
      color: "bg-secondary"
    },
    {
      titulo: "Chat en Vivo",
      descripcion: "Atiende a tus clientes en tiempo real y resuelve sus dudas al instante.",
      icono: iconChat,
      color: "bg-accent"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">O</span>
              </div>
              <span className="text-2xl font-bold text-primary">OtroMundo</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors">Inicio</a>
              <a href="#servicios" className="text-foreground hover:text-primary transition-colors">Servicios</a>
              <a href="#testimonios" className="text-foreground hover:text-primary transition-colors">Testimonios</a>
              <a href="#contacto" className="text-foreground hover:text-primary transition-colors">Contacto</a>
              <Button className="bg-primary hover:bg-primary/90">Registrarse</Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
              <div className="flex flex-col space-y-4">
                <a href="#inicio" className="text-foreground hover:text-primary transition-colors">Inicio</a>
                <a href="#servicios" className="text-foreground hover:text-primary transition-colors">Servicios</a>
                <a href="#testimonios" className="text-foreground hover:text-primary transition-colors">Testimonios</a>
                <a href="#contacto" className="text-foreground hover:text-primary transition-colors">Contacto</a>
                <Button className="bg-primary hover:bg-primary/90 w-fit">Registrarse</Button>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Digitalización para Almacenes
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Lleva tu almacén al{' '}
                <span className="text-primary">siguiente nivel</span>{' '}
                con OtroMundo
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Conecta con tus clientes, muestra tus productos y aumenta tus ventas 
                con nuestra plataforma diseñada especialmente para almacenes de barrio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Comenzar Gratis
                </Button>
                <Button size="lg" variant="outline">
                  Ver Demo
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={heroImage}
                alt="Almacén moderno con tecnología OtroMundo"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Todo lo que necesitas para{' '}
              <span className="text-primary">digitalizar</span> tu negocio
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Herramientas poderosas y fáciles de usar que transformarán la manera 
              en que tus clientes interactúan con tu almacén.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicios.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${servicio.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <img src={servicio.icono} alt={servicio.titulo} className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl">{servicio.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {servicio.descripcion}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de Productos Example */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Muestra tus productos con{' '}
              <span className="text-secondary">estilo profesional</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tus clientes podrán ver precios actualizados, ofertas especiales y 
              toda la información que necesitan antes de visitar tu almacén.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <img
              src={productImage}
              alt="Ejemplo de galería de productos con precios"
              className="rounded-2xl shadow-2xl w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section id="testimonios" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Lo que dicen nuestros{' '}
              <span className="text-accent">clientes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Almacenes de barrio que ya transformaron su negocio con OtroMundo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((testimonio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonio.imagen}
                        alt={testimonio.nombre}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{testimonio.nombre}</CardTitle>
                        <CardDescription>{testimonio.negocio}</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(testimonio.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">
                      "{testimonio.comentario}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contacto" className="py-20 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                ¿Listo para{' '}
                <span className="text-primary">transformar</span>{' '}
                tu almacén?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Únete a cientos de almacenes que ya están creciendo con OtroMundo. 
                Completa el formulario y te contactaremos para una demo personalizada.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-secondary-foreground text-sm">✓</span>
                  </div>
                  <span>Setup gratuito y sin compromisos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-secondary-foreground text-sm">✓</span>
                  </div>
                  <span>Soporte técnico incluido</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-secondary-foreground text-sm">✓</span>
                  </div>
                  <span>Capacitación personalizada</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Solicita tu Demo Gratuita</CardTitle>
                  <CardDescription>
                    Completa tus datos y te mostraremos cómo OtroMundo puede ayudar a tu negocio.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nombre">Nombre del Almacén</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej: Almacén San José"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="direccion">Dirección</Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        placeholder="Calle Principal #123"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="mensaje">Mensaje (Opcional)</Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos sobre tu almacén y qué te gustaría mejorar..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Solicitar Demo Gratuita
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">O</span>
                </div>
                <span className="text-2xl font-bold text-primary">OtroMundo</span>
              </div>
              <p className="text-background/80">
                Digitalizamos almacenes de barrio para conectar mejor con sus clientes 
                y aumentar sus ventas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-background/80">
                <li>Promociones</li>
                <li>Galería de Productos</li>
                <li>Comentarios</li>
                <li>Chat en Vivo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-background/80">
                <li>Sobre Nosotros</li>
                <li>Contacto</li>
                <li>Soporte</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-background/80">
                <li>info@otromundo.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Síguenos en redes sociales</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 OtroMundo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget Flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageCircle size={24} />
        </Button>
        
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-16 right-0 w-80 bg-background border rounded-lg shadow-xl"
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Chat en Vivo</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto">
              <p className="text-sm text-muted-foreground mb-4">
                ¡Hola! ¿En qué podemos ayudarte hoy?
              </p>
              
              {/* Mensajes del chat */}
              <div className="space-y-2 mb-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`p-2 rounded-lg text-sm ${
                    msg.es_admin 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-muted mr-4'
                  }`}>
                    <p className="font-medium text-xs opacity-70">
                      {msg.es_admin ? 'OtroMundo' : 'Tú'}
                    </p>
                    <p>{msg.mensaje}</p>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleChatSubmit} className="space-y-2">
                {!chatEmail && (
                  <Input 
                    placeholder="Tu email..." 
                    value={chatEmail}
                    onChange={(e) => setChatEmail(e.target.value)}
                    type="email"
                    required
                  />
                )}
                <Input 
                  placeholder="Escribe tu mensaje..." 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Enviar
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default App
