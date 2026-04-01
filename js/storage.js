import { achievementStorage } from "./achievement.js";

export let countryChoice;

export let difficultyChoice;

export let savedGameResult;

export let userProfile = {
    img: 'https://res.cloudinary.com/dyghlzxwz/image/upload/q_auto/f_auto/v1775018447/default_qznajw.webp',
    username: 'Guest_1',
    level: 1,
    sublevel: 0,
}

export let savedAchievement;

export let pageOnSave = JSON.parse(localStorage.getItem('pageOnSave')) || false;

loadFromStorage();

export function loadFromStorage() {
    countryChoice = JSON.parse(localStorage.getItem('countryChoice'))
    difficultyChoice = JSON.parse(localStorage.getItem('difficultyChoice'))
    savedGameResult = JSON.parse(localStorage.getItem('savedGameResult'))
    userProfile = JSON.parse(localStorage.getItem('userProfile')) || userProfile
    savedAchievement = JSON.parse(localStorage.getItem('savedAchievement')) || achievementStorage
    pageOnSave = JSON.parse(localStorage.getItem('pageOnSave'))
}

export function saveToStorage() {
    localStorage.setItem('countryChoice', JSON.stringify(countryChoice));
    localStorage.setItem('difficultyChoice', JSON.stringify(difficultyChoice));
    localStorage.setItem('savedGameResult', JSON.stringify(savedGameResult));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('savedAchievement', JSON.stringify(savedAchievement));
    localStorage.setItem('pageOnSave', JSON.stringify(pageOnSave));
}

export function selectCountryId(value) {
    countryChoice = value;
    saveToStorage();
}

export function selectDifficulty(value) {
    difficultyChoice = value;
    saveToStorage();
}

export function saveGameResult(value) {
    savedGameResult = value;
    saveToStorage();
}

export function saveNewProfile(value) {
    userProfile = value;
    saveToStorage();
}

export function savedCurrentAchievement(value) {
    savedAchievement[value].hasObtained = 1
    saveToStorage();
}

export function checkPageSave(value) {
    pageOnSave = value
    saveToStorage();
}