# Barra de progreso animada — Componente visual reutilizable

Componente de JavaScript puro (sin frameworks) que genera una **barra de progreso animada**: se rellena desde 0 hasta el porcentaje indicado con una animación suave, y puede actualizarse en cualquier momento a un nuevo valor.

¿Qué problema resuelve? Muchas interfaces necesitan mostrarle al usuario el avance de algo — una descarga, el uso de almacenamiento, el progreso hacia una meta — y un número solo ("46%") no comunica tan rápido como una barra visual que se llena frente a tus ojos. Este componente genera esa barra de forma dinámica y reutilizable, sin tener que escribir el HTML/CSS de cada barra a mano cada vez que se necesita una nueva.

## Instalación

Copia las carpetas `css/` y `js/` a tu proyecto e impórtalas en tu HTML:

```html
<link rel="stylesheet" href="css/componente.css">
<script src="js/componente.js"></script>
```

## Uso

Crea un contenedor vacío en tu HTML con un `id`:

```html
<div id="miBarra"></div>
```

Y llama a `crearBarraProgreso()` pasando el `id`, el porcentaje inicial (0-100) y opciones:

```javascript
crearBarraProgreso('miBarra', 65, {
  etiqueta: 'Progreso del curso',
  color: 'verde'   // 'azul' | 'verde' | 'naranja' | 'rojo'
});
```

La barra se anima automáticamente desde 0 hasta el valor indicado al crearse.

### Actualizar el valor después de creada

Si el progreso cambia con el tiempo (una descarga, un formulario que se completa), puedes actualizar la misma barra sin volver a crearla:

```javascript
actualizarBarraProgreso('miBarra', 90); // se anima desde su valor actual hasta 90%
```

```html
<button onclick="actualizarBarraProgreso('miBarra', 90)">Actualizar progreso</button>
```

## Reutilización

En `index.html` se usan **tres instancias** del mismo componente con distinto contenido y comportamiento: una barra de almacenamiento en naranja con valor fijo, una barra de meta de ventas en verde con valor fijo, y una barra de descarga en azul que arranca en 0% y se va actualizando en vivo cada vez que el usuario da clic en el botón — todo sin duplicar HTML, CSS o JS.

## Capturas de pantalla
### Interfaz del componente en acción
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9a471244-ab9f-48f4-b9d3-d4fcf3a8a37a" />

## Video demo

