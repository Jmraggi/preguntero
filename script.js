document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript cargado y DOM listo.');

    const generateExamButton = document.getElementById('generate-exam');
    const submitExamButton = document.getElementById('submit-exam');
    const examSection = document.getElementById('exam-section');
    const examQuestionList = document.getElementById('exam-question-list');

    let questions = []; // Variable para almacenar las preguntas cargadas

    // Generar el examen
    generateExamButton.addEventListener('click', function () {
        const questionData = document.getElementById('question-data').value.trim();
        try {
            questions = JSON.parse(questionData); // Parsear el JSON ingresado
            if (!Array.isArray(questions) || !questions.every(q => q.question && q.options && q.correct_answer)) {
                throw new Error('El formato de las preguntas no es válido.');
            }

            // Limitar a un máximo de 20 preguntas
            questions = questions.slice(0, 20);

            // Limpiar el área de preguntas del examen
            examQuestionList.innerHTML = '';

            // Generar preguntas dinámicamente
            questions.forEach(({ question, options }, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `<strong>${index + 1}. ${question}</strong>`;

                const optionsContainer = document.createElement('div');
                optionsContainer.classList.add('mt-2');

                options.forEach(option => {
                    const label = document.createElement('label');
                    label.classList.add('d-block', 'form-check-label');
                    const input = document.createElement('input');
                    input.type = 'radio';
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

        questions.forEach(({ correct_answer }, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption && selectedOption.value === correct_answer) {
                correctCount++;
            }
        });

        alert(`Respuestas correctas: ${correctCount} de ${questions.length}`);
    });
});
