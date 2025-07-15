# Preguntero

Este proyecto es una herramienta interactiva que permite gestionar preguntas y respuestas en formato JSON para generar exámenes de opción múltiple directamente en el navegador. No requiere bases de datos ni almacenamiento externo, ya que todo se maneja en memoria mientras la página está abierta.

## ¿Qué hace este proyecto?

1. **Carga de preguntas**: Permite ingresar preguntas y respuestas en formato JSON.
2. **Generación de exámenes**: Crea dinámicamente un examen basado en las preguntas ingresadas.
3. **Calificación automática**: Evalúa las respuestas seleccionadas y muestra el puntaje obtenido.

---

## Elementos principales

### 1. **Gestión de Preguntas**
- **Área de texto**: Para ingresar preguntas en formato JSON.
- **Botón "Generar Examen"**: Procesa las preguntas ingresadas y genera el examen.

### 2. **Examen**
- **Lista de preguntas**: Muestra las preguntas con opciones de respuesta.
- **Botón "Enviar Respuestas"**: Evalúa las respuestas seleccionadas y muestra el puntaje.

---

## Vista general del flujo

1. **Carga de preguntas**:
   - Ingresa preguntas en formato JSON en el área de texto.
   - Haz clic en **Generar Examen**.

2. **Realización del examen**:
   - Responde las preguntas seleccionando las opciones correctas.
   - Haz clic en **Enviar Respuestas** para calificar.

---

## Instrucciones para generar el JSON con ChatGPT

### 1. Si ya tienes preguntas

Para generar preguntas en formato JSON que sean compatibles con esta página, utiliza el siguiente prompt en ChatGPT:

```
Quisiera que me generes preguntas en formato JSON para un multiple choice. Cada pregunta debe incluir:
- Una clave "question" con el texto de la pregunta.
- Una clave "options" con un array de opciones de respuesta.
- Una clave "correct_answer" con la respuesta correcta.

Ejemplo de salida esperada:
[
  {
    "question": "¿Cuál es la capital de Francia?",
    "options": ["París", "Londres", "Madrid"],
    "correct_answer": "París"
  },
  {
    "question": "¿Cuál es 2 + 2?",
    "options": ["3", "4", "5"],
    "correct_answer": "4"
  }
]
```

### 2. Si tienes un texto y necesitas generar preguntas

Si tienes un texto y deseas que ChatGPT genere preguntas de opción múltiple basadas en ese texto, utiliza el siguiente prompt:

```
Tengo el siguiente texto:

[PEGA AQUÍ TU TEXTO]

Quisiera que generes preguntas de opción múltiple basadas en este texto. Cada pregunta debe incluir:
- Una clave "question" con el texto de la pregunta.
- Una clave "options" con un array de opciones de respuesta.
- Una clave "correct_answer" con la respuesta correcta.

Ejemplo de salida esperada:
[
  {
    "question": "¿Cuál es el tema principal del texto?",
    "options": ["Opción 1", "Opción 2", "Opción 3"],
    "correct_answer": "Opción correcta"
  },
  {
    "question": "¿Qué se menciona como un beneficio en el texto?",
    "options": ["Opción A", "Opción B", "Opción C"],
    "correct_answer": "Opción correcta"
  }
]
```

---

## Formato JSON esperado

El JSON debe cumplir con el siguiente formato:

```json
[
  {
    "question": "Texto de la pregunta",
    "options": ["Opción 1", "Opción 2", "Opción 3"],
    "correct_answer": "Opción correcta"
  },
  {
    "question": "Otra pregunta",
    "options": ["Opción A", "Opción B", "Opción C"],
    "correct_answer": "Opción correcta"
  }
]
```

### Ejemplo válido

```json
[
  {
    "question": "¿Cuál es la capital de Francia?",
    "options": ["París", "Londres", "Madrid"],
    "correct_answer": "París"
  },
  {
    "question": "¿Cuál es 2 + 2?",
    "options": ["3", "4", "5"],
    "correct_answer": "4"
  }
]
```

---

## Solución de problemas

- **El botón "Generar Examen" no funciona**:
  - Asegúrate de que el JSON esté en el formato correcto.
  - Verifica la consola del navegador para identificar errores (F12 > Consola).

- **No se muestran las preguntas**:
  - Asegúrate de haber ingresado preguntas válidas en el área de texto.
  - Verifica que el JSON tenga las claves `question`, `options` y `correct_answer`.

- **No se califican las respuestas**:
  - Asegúrate de haber seleccionado una opción para cada pregunta antes de hacer clic en **Enviar Respuestas**.

---

## Notas adicionales

- Este sistema no utiliza almacenamiento externo ni bases de datos. Todo se maneja en memoria mientras la página está abierta.
- Si cierras o recargas la página, las preguntas cargadas se perderán.
