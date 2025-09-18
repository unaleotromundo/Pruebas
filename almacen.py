from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Almacen(db.Model):
    __tablename__ = 'almacenes'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    direccion = db.Column(db.String(200), nullable=False)
    mensaje = db.Column(db.Text, nullable=True)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    activo = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<Almacen {self.nombre}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'email': self.email,
            'telefono': self.telefono,
            'direccion': self.direccion,
            'mensaje': self.mensaje,
            'fecha_registro': self.fecha_registro.isoformat() if self.fecha_registro else None,
            'activo': self.activo
        }

class ChatMessage(db.Model):
    __tablename__ = 'chat_messages'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    es_admin = db.Column(db.Boolean, default=False)
    
    def __repr__(self):
        return f'<ChatMessage {self.email}: {self.mensaje[:50]}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'mensaje': self.mensaje,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'es_admin': self.es_admin
        }

