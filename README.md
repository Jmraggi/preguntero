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

Genera preguntas de examen en formato JSON con la siguiente estructura:

Para preguntas de UNA SOLA respuesta correcta:
```
{
  "question": "¿Cuál es la capital de Francia?",
  "options": ["París", "Londres", "Madrid", "Roma", "Berlín"],
  "correct_answer": "París"
}
```

Para preguntas de MÚLTIPLES respuestas correctas:
```
{
  "question": "¿Cuáles de los siguientes son lenguajes de programación?",
  "options": ["JavaScript", "HTML", "Python", "CSS", "Java"],
  "correct_answers": ["JavaScript", "Python", "Java"]
}
```

Para preguntas de VERDADERO o FALSO:
```
{
  "question": "¿La capital de Francia es París?",
  "options": ["Verdadero", "Falso"],
  "correct_answer": "Verdadero"
}
```

**Reglas importantes:**
- Usa "correct_answer" (singular) para preguntas de una sola respuesta
- Usa "correct_answers" (plural, array) para preguntas de múltiples respuestas
- **GENERA TODAS LAS PREGUNTAS** - No omitas ninguna pregunta del listado
- **Las preguntas y respuestas deben ser EXACTAMENTE como las escribo** - No cambies la redacción
- **Todas las preguntas deben tener exactamente 5 respuestas** (excepto verdadero/falso)
- **Para preguntas de verdadero/falso, usa solo 2 opciones: "Verdadero" y "Falso"**
- Las opciones incorrectas deben ser plausibles pero claramente incorrectas
- Dificultad media-alta en las opciones distractoras

El formato final debe ser un array JSON válido que contenga todas las preguntas.

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
