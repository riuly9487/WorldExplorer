import { difficultyChoice, saveGameResult, checkPageSave } from "./storage.js";
import { easyQuestionnaire, normalQuestionnaire, hardQuestionnaire } from "./questionnaire.js";

let selectedQuestionnaire;

if (difficultyChoice == 'easy') {
    selectedQuestionnaire = easyQuestionnaire
} else if (difficultyChoice == 'normal') {
    selectedQuestionnaire = normalQuestionnaire
} else if (difficultyChoice == 'hard') {
    selectedQuestionnaire = hardQuestionnaire
}

let chosenQuestionIndex = [];

function getRandomElement() {
    let i=0
    while (i < 5) {
        let chosenQuestionSequence = Math.floor(Math.random() * selectedQuestionnaire.length);

        if (chosenQuestionIndex.includes(chosenQuestionSequence)) {
            /* Do not insert same question lol */
        } else {
            chosenQuestionIndex.push(chosenQuestionSequence)
            i++
        }
    }
}

getRandomElement()

const bgm = document.querySelector('.audio-bgm')
bgm.volume = 0.2
bgm.loop = true

function playBGM(durationMs = 1000) {
    bgm.currentTime = 0;
    bgm.volume = 0;
    bgm.play();

    const step = 0.01;
    const intervalTime = durationMs * step;
    
    const fadeIn = setInterval(() => {
        if (bgm.volume < 0.19) {
            bgm.volume += step;
        } else {
            bgm.volume = 0.2;
            clearInterval(fadeIn);
        }
    }, intervalTime);
}

function stopBGM(durationMs = 1000) {
    const step = 0.01; 
    const intervalTime = durationMs * step;
    
    const fadeOut = setInterval(() => {
        if (bgm.volume > step) {
            bgm.volume -= step;
        } else {
            bgm.volume = 0;
            bgm.pause();
            bgm.currentTime = 0;
            bgm.volume = 0.2;
            clearInterval(fadeOut);
        }
    }, intervalTime);
}

let currentIndex = 0;
let answerSelectionID;
let currentGameResult = [];
let performResultSave = false;

function renderQuestion() {
    document.querySelectorAll('.quiznow-choice').forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    performResultSave = false

    document.querySelector('.question-image').classList.remove('none')

    if (currentIndex == 4) {
        document.querySelector('.btn-next-question').innerHTML = 'Finish'
    }

    playBGM()

    let chosenQuestionSet = selectedQuestionnaire[chosenQuestionIndex[currentIndex]];

    document.querySelector('.current-progress').innerHTML = 'Question ' + (currentIndex + 1)
    document.querySelector('.question-image').src = chosenQuestionSet.img
    document.querySelector('.question-text').innerHTML = chosenQuestionSet.question

    if (chosenQuestionSet.img == 'none') {
        document.querySelector('.question-image').classList.add('none')
    }

    let x = 1;
    let shapeElement = ['○', '△', '□', '◇']

    while (x < 5) {
        document.querySelector(`#a${x}`).innerHTML = shapeElement[x-1] + ' ' + chosenQuestionSet[`answer${x}`]
        x++
    }

    document.querySelectorAll('.quiznow-choice')
        .forEach((button) => {
            button.addEventListener('click', () => {
                answerSelectionID = button.dataset.value;
                let i = 1;

                document.querySelectorAll('.quiznow-choice').forEach(button => {
                    if (i != answerSelectionID) {
                        button.classList.add('invisible');
                    }
                    i++
                });

                if (!performResultSave) {
                    if (answerSelectionID == chosenQuestionSet.correctAnswer) {
                        currentGameResult.push('1')
                        performResultSave = true
                    } else {
                        currentGameResult.push('0')
                        performResultSave = true
                    }
                }

                stopBGM()

                setTimeout(displayExplanation, 1000)

                function displayExplanation() {
                    document.querySelector('.btn-toggle').classList.add('visible')
                    document.querySelector('.btn-next-question').classList.add('visible')
                    document.querySelector('.quiznow-explanation').classList.add('visible')

                    let explanationText = chosenQuestionSet.explanation

                    if (answerSelectionID == chosenQuestionSet.correctAnswer) {
                        document.querySelector('.explanation-result').innerHTML = "You're Correct! ✅"
                        const audio = document.querySelector('.audio-correct')
                        audio.volume = 0.5
                        audio.play()
                    } else {
                        document.querySelector('.explanation-result').innerHTML = "Something went wrong! ❌"
                        const audio = document.querySelector('.audio-wrong')
                        audio.volume = 0.5
                        audio.play()
                    }

                    document.querySelector('.explanation-section').innerHTML = explanationText
                }
        })
    })
}

document.querySelector('.btn-next-question')
    .addEventListener('click', () => {
        if (currentIndex == 4) {
            saveGameResult(currentGameResult)
            window.location.href = 'quiznowresult.html'
        } else {
            resetQuestion()
            currentIndex++;
            renderQuestion()
            checkPageSave(false)

            function resetQuestion() {
                document.querySelector('.btn-toggle').classList.remove('visible')
                document.querySelector('.btn-next-question').classList.remove('visible')
                document.querySelector('.quiznow-explanation').classList.remove('visible')

                document.querySelectorAll('.quiznow-choice').forEach(button => {
                    button.classList.remove('invisible');
                });
            }
        }
    }
)

renderQuestion()



