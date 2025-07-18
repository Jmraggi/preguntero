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

    // Función para mezclar aleatoriamente un array (algoritmo de Fisher-Yates)
    function shuffleArray(array) {
        const shuffled = [...array]; // Crear una copia del array original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
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
                
                // Mezclar las opciones aleatoriamente para mayor dificultad
                const shuffledOptions = shuffleArray(options);
                
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                
                // Agregar indicador si es de múltiple selección
                const questionText = isMultipleChoice 
                    ? `<strong>${index + 1}. ${question}</strong> <span class="badge bg-info">Múltiple selección (${correct_answers.length})</span>`
                    : `<strong>${index + 1}. ${question}</strong>`;
                
                listItem.innerHTML = questionText;

                const optionsContainer = document.createElement('div');
                optionsContainer.classList.add('mt-2');

                shuffledOptions.forEach(option => {
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
        const totalQuestions = questions.length;
        const pointsPerQuestion = 5;

        questions.forEach((questionObj, index) => {
            const { correct_answer, correct_answers } = questionObj;
            const isMultipleChoice = Array.isArray(correct_answers) && correct_answers.length > 1;
            
            const questionContainer = document.querySelector(`input[name="question-${index}"]`).closest('.list-group-item');
            const optionsContainer = questionContainer.querySelector('div');
            
            // Remover clases anteriores
            optionsContainer.querySelectorAll('label').forEach(label => {
                label.classList.remove('text-success', 'text-danger', 'fw-bold');
            });
            
            let isCorrect = false;
            
            if (isMultipleChoice) {
                // Para preguntas de múltiple selección
                const selectedOptions = document.querySelectorAll(`input[name="question-${index}"]:checked`);
                const selectedValues = Array.from(selectedOptions).map(option => option.value);
                
                // Verificar si las respuestas seleccionadas coinciden exactamente con las correctas
                const correctAnswersSet = new Set(correct_answers);
                const selectedAnswersSet = new Set(selectedValues);
                
                isCorrect = correctAnswersSet.size === selectedAnswersSet.size && 
                           [...correctAnswersSet].every(answer => selectedAnswersSet.has(answer));
                
                // Marcar opciones correctas e incorrectas
                optionsContainer.querySelectorAll('label').forEach(label => {
                    const input = label.querySelector('input');
                    const value = input.value;
                    const isSelected = input.checked;
                    const shouldBeSelected = correctAnswersSet.has(value);
                    
                    if (shouldBeSelected) {
                        label.classList.add('text-success', 'fw-bold');
                        if (!isSelected) {
                            label.innerHTML = label.innerHTML + ' ✓ (Correcta)';
                        }
                    } else if (isSelected) {
                        label.classList.add('text-danger', 'fw-bold');
                        label.innerHTML = label.innerHTML + ' ✗ (Incorrecta)';
                    }
                });
                
            } else {
                // Para preguntas de una sola respuesta
                const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
                const correctAnswer = correct_answer || (Array.isArray(correct_answers) ? correct_answers[0] : null);
                
                isCorrect = selectedOption && selectedOption.value === correctAnswer;
                
                // Marcar opciones correctas e incorrectas
                optionsContainer.querySelectorAll('label').forEach(label => {
                    const input = label.querySelector('input');
                    const value = input.value;
                    const isSelected = input.checked;
                    
                    if (value === correctAnswer) {
                        label.classList.add('text-success', 'fw-bold');
                        if (!isSelected) {
                            label.innerHTML = label.innerHTML + ' ✓ (Correcta)';
                        }
                    } else if (isSelected) {
                        label.classList.add('text-danger', 'fw-bold');
                        label.innerHTML = label.innerHTML + ' ✗ (Incorrecta)';
                    }
                });
            }
            
            if (isCorrect) {
                correctCount++;
            }
            
            // Deshabilitar inputs después de la calificación
            optionsContainer.querySelectorAll('input').forEach(input => {
                input.disabled = true;
            });
        });

        // Calcular puntuación y nota final
        const totalPoints = correctCount * pointsPerQuestion;
        const maxPoints = totalQuestions * pointsPerQuestion;
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        
        // Calcular nota final según la escala
        let finalGrade;
        let gradeColor;
        let gradeText;
        
        if (correctCount >= 1 && correctCount <= 2) {
            finalGrade = 1;
            gradeColor = 'danger';
            gradeText = 'Desaprobado';
        } else if (correctCount >= 3 && correctCount <= 4) {
            finalGrade = 2;
            gradeColor = 'danger';
            gradeText = 'Desaprobado';
        } else if (correctCount >= 5 && correctCount <= 6) {
            finalGrade = 3;
            gradeColor = 'danger';
            gradeText = 'Desaprobado';
        } else if (correctCount >= 7 && correctCount <= 8) {
            finalGrade = 4;
            gradeColor = 'danger';
            gradeText = 'Desaprobado';
        } else if (correctCount >= 9 && correctCount <= 10) {
            finalGrade = 5;
            gradeColor = 'warning';
            gradeText = 'Aprobado';
        } else if (correctCount >= 11 && correctCount <= 12) {
            finalGrade = 6;
            gradeColor = 'warning';
            gradeText = 'Aprobado';
        } else if (correctCount >= 13 && correctCount <= 14) {
            finalGrade = 7;
            gradeColor = 'success';
            gradeText = 'Aprobado';
        } else if (correctCount >= 15 && correctCount <= 16) {
            finalGrade = 8;
            gradeColor = 'success';
            gradeText = 'Aprobado';
        } else if (correctCount >= 17 && correctCount <= 18) {
            finalGrade = 9;
            gradeColor = 'success';
            gradeText = 'Aprobado';
        } else if (correctCount >= 19 && correctCount <= 20) {
            finalGrade = 10;
            gradeColor = 'success';
            gradeText = 'Aprobado';
        } else {
            finalGrade = 0;
            gradeColor = 'danger';
            gradeText = 'Desaprobado';
        }
        
        // Mostrar resultados en alert
        // const resultMessage = `
        //     📊 RESULTADOS DEL EXAMEN:
        //     ✅ Respuestas correctas: ${correctCount} de ${totalQuestions}
        //     📈 Porcentaje: ${percentage}%
        //     🎯 Puntuación: ${totalPoints} de ${maxPoints} puntos
        //     📋 Nota Final: ${finalGrade}/10 - ${gradeText}
        // `;
        
        // alert(resultMessage);
        
        // Mostrar resultados visuales
        const resultsSection = document.getElementById('results-section');
        const resultsContent = document.getElementById('results-content');
        
        resultsContent.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <div class="text-center">
                        <h3 class="text-${gradeColor}">${correctCount}/${totalQuestions}</h3>
                        <small class="text-muted">Respuestas correctas</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="text-center">
                        <h3 class="text-${gradeColor}">${finalGrade}/10</h3>
                        <small class="text-muted">Nota Final</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="text-center">
                        <h3 class="text-${gradeColor}">${totalPoints}</h3>
                        <small class="text-muted">Puntos obtenidos</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="text-center">
                        <h3 class="text-${gradeColor}">${gradeText}</h3>
                        <small class="text-muted">Resultado</small>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="progress">
                    <div class="progress-bar bg-${gradeColor}" role="progressbar" style="width: ${(finalGrade/10)*100}%" aria-valuenow="${finalGrade}" aria-valuemin="0" aria-valuemax="10">${finalGrade}/10</div>
                </div>
            </div>
        `;
        
        resultsSection.style.display = 'block';
        
        // Ocultar botón de enviar
        submitExamButton.style.display = 'none';
    });
});
