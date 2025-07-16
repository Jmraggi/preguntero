document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript cargado y DOM listo.');

    const generateExamButton = document.getElementById('generate-exam');
    const submitExamButton = document.getElementById('submit-exam');
    const examSection = document.getElementById('exam-section');
    const examQuestionList = document.getElementById('exam-question-list');

    let questions = []; // Variable para almacenar las preguntas cargadas

    // Función para seleccionar elementos aleatorios de un array
    function getRandomQuestions(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Generar el examen
    generateExamButton.addEventListener('click', function () {
        const questionData = document.getElementById('question-data').value.trim();
        try {
            const allQuestions = JSON.parse(questionData); // Parsear el JSON ingresado
            if (!Array.isArray(allQuestions) || !allQuestions.every(q => q.question && q.options && (q.correct_answer || q.correct_answers))) {
                throw new Error('El formato de las preguntas no es válido.');
            }

            // Seleccionar un máximo de 20 preguntas aleatorias
            questions = getRandomQuestions(allQuestions, Math.min(20, allQuestions.length));

            // Limpiar el área de preguntas del examen
            examQuestionList.innerHTML = '';

            // Generar preguntas dinámicamente
            questions.forEach((questionObj, index) => {
                const { question, options, correct_answer, correct_answers } = questionObj;
                const isMultipleChoice = Array.isArray(correct_answers) && correct_answers.length > 1;
                
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                
                // Agregar indicador si es de múltiple selección
                const questionText = isMultipleChoice 
                    ? `<strong>${index + 1}. ${question}</strong> <span class="badge bg-info">Múltiple selección (${correct_answers.length})</span>`
                    : `<strong>${index + 1}. ${question}</strong>`;
                
                listItem.innerHTML = questionText;

                const optionsContainer = document.createElement('div');
                optionsContainer.classList.add('mt-2');

                options.forEach(option => {
                    const label = document.createElement('label');
                    label.classList.add('d-block', 'form-check-label');
                    const input = document.createElement('input');
                    
                    // Usar checkbox para múltiple selección, radio para una sola
                    input.type = isMultipleChoice ? 'checkbox' : 'radio';
                    input.name = `question-${index}`;
                    input.value = option;
                    input.classList.add('form-check-input', 'me-2');
                    
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(option));
                    optionsContainer.appendChild(label);
                });

                listItem.appendChild(optionsContainer);
                examQuestionList.appendChild(listItem);
            });

            // Mostrar la sección del examen
            examSection.style.display = 'block';

            // Mostrar el botón de enviar examen
            submitExamButton.style.display = 'block';
        } catch (error) {
            alert('Error al cargar preguntas: ' + error.message);
            console.error('Error al cargar preguntas:', error);
        }
    });

    // Calificar el examen
    submitExamButton.addEventListener('click', function () {
        let correctCount = 0;

        questions.forEach((questionObj, index) => {
            const { correct_answer, correct_answers } = questionObj;
            const isMultipleChoice = Array.isArray(correct_answers) && correct_answers.length > 1;
            
            if (isMultipleChoice) {
                // Para preguntas de múltiple selección
                const selectedOptions = document.querySelectorAll(`input[name="question-${index}"]:checked`);
                const selectedValues = Array.from(selectedOptions).map(option => option.value);
                
                // Verificar si las respuestas seleccionadas coinciden exactamente con las correctas
                const correctAnswersSet = new Set(correct_answers);
                const selectedAnswersSet = new Set(selectedValues);
                
                const isCorrect = correctAnswersSet.size === selectedAnswersSet.size && 
                                 [...correctAnswersSet].every(answer => selectedAnswersSet.has(answer));
                
                if (isCorrect) {
                    correctCount++;
                }
            } else {
                // Para preguntas de una sola respuesta
                const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
                const correctAnswer = correct_answer || (Array.isArray(correct_answers) ? correct_answers[0] : null);
                
                if (selectedOption && selectedOption.value === correctAnswer) {
                    correctCount++;
                }
            }
        });

        alert(`Respuestas correctas: ${correctCount} de ${questions.length}`);
    });
});
