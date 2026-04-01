import { difficultyChoice, savedGameResult, userProfile, savedCurrentAchievement, 
    saveNewProfile, pageOnSave, checkPageSave } from "./storage.js"

savedCurrentAchievement(2)

let chosenDifficulty;
let levelMultiplier;
let userData = structuredClone(userProfile);

if (difficultyChoice == 'easy') {
    chosenDifficulty = 'Easy'
    levelMultiplier = 5
} else if (difficultyChoice == 'normal') {
    chosenDifficulty = 'Normal'
    levelMultiplier = 10
} else if (difficultyChoice == 'hard') {
    chosenDifficulty = 'Hard'
    levelMultiplier = 15
}

document.querySelector('.difficulty').innerHTML = chosenDifficulty + ' ' + `(level Multiplier: ${levelMultiplier})`

let progressionDisplay = '';
let rawEXP = 0
let totalEXP = 0;
let totalMark = 0;

for (let i=0; i<savedGameResult.length; i++) {
    if (savedGameResult[i] == 0) {
        progressionDisplay = progressionDisplay + '<div class="indicator red"></div>'
    } else if (savedGameResult[i] == 1) {
        progressionDisplay = progressionDisplay + '<div class="indicator green"></div>'
        rawEXP = rawEXP + 10
        totalMark = totalMark + Number(savedGameResult[i])
    }
}

totalEXP = rawEXP * levelMultiplier

isLevelUp(totalEXP)

function isLevelUp(value) {
    let obtainedScore = value + userData.sublevel;

    while (obtainedScore >= 250) {
        userData.level++
        obtainedScore = obtainedScore - 250
        console.log("leftover score: " + obtainedScore)
    } 

    userData.sublevel = obtainedScore
}

if (pageOnSave === false) { 
    saveNewProfile(userData);
    checkPageSave(true);
}

let resultDisplayText = document.querySelector('.result-display');

if (totalMark >= 3) {
    if (chosenDifficulty == 'Easy') {
        savedCurrentAchievement(3)
        resultDisplayText.innerHTML = 'You Passed'
    } else if (chosenDifficulty == 'Normal') {
        savedCurrentAchievement(6)
        resultDisplayText.innerHTML = 'You Passed'
    } else if (chosenDifficulty == 'Hard') {
        savedCurrentAchievement(5)
        resultDisplayText.innerHTML = 'You Passed'
        if (totalMark = 10) {
            savedCurrentAchievement(4)
        }
    }
} else if (totalMark == 0) {
    savedCurrentAchievement(9)
}

if (totalMark < 3) {
    resultDisplayText.innerHTML = 'Oops! You can do it better next time! :('
}

let audio;

if (totalMark >= 3) {
    audio = document.querySelector('.audio-pass')

} else {
    audio = document.querySelector('.audio-fail')

}

audio.volume = 0.5
audio.play()

document.querySelector('.progression-indicator').innerHTML = progressionDisplay
document.querySelector('.exp-obtained').innerHTML = rawEXP
document.querySelector('.final-exp-obtained').innerHTML = totalEXP
document.querySelector('.profile-progression').innerHTML = 'Level ' + userProfile.level + ' ' + `(${userProfile.sublevel}/250)`