import { selectCountryId, selectDifficulty, savedCurrentAchievement } from "./storage.js";

document.querySelectorAll('.value-proposition-image, .shortcut')
    .forEach((image) => {
        image.addEventListener('click', () => {
            const destination = image.dataset.destination;
            window.location.href = `${destination}`;

        })
    })

document.querySelectorAll('.btn-cta')
    .forEach((button) => {
        button.addEventListener('click', () => {
            window.location.href = "library.html";
        })
})

document.querySelectorAll('.btn-go-to-region')
    .forEach((button) => {
        button.addEventListener('click', () => {
            window.location.href = "webpages/region.html";
        })
})

document.querySelectorAll('.btn-go-to-country')
    .forEach((button) => {
        button.addEventListener('click', () => {
            window.location.href = "webpages/country.html";
        })
})

document.querySelectorAll('.btn-go-to-difficulty')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const difficulty = button.dataset.selection;
            const destination = button.dataset.destination;
            selectDifficulty(difficulty)
            window.location.href = `${destination}`;
    })
})

export function goToRegion() {
    document.querySelectorAll('.btn-region-page')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const destination = button.dataset.region;
                window.location.href = `region/${destination}.html`;
            })
    })
}

export function goToCountry() {
    document.querySelectorAll('.btn-country-page')
        .forEach((button) => {
            button.addEventListener('click', () => {
                /* To select and store the countryID, and then navigate to correct location correctly */
                const selectedCountry = button.dataset.country;
                const destination = button.dataset.destination;
                selectCountryId(selectedCountry);
                window.location.href = destination;
            })
    })
}

document.querySelectorAll('.btn-return, .btn-quit')
    .forEach((button) => {
        button.addEventListener('click', () => {
        window.history.back();
    })
})

document.querySelectorAll('.btn-exit')
    .forEach((button) => {
        button.addEventListener('click', () => {
        window.location.href = 'index.html'
    })
})

document.querySelectorAll('.btn-toggle')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const targettedDiv = document.querySelector('.quiznow-explanation')
            const isVisible = targettedDiv.classList.contains('visible')

            if (isVisible) {
                targettedDiv.classList.remove('visible')
            } else {
                targettedDiv.classList.add('visible')
            }
    })
})

document.querySelectorAll('.btn-return-to-quiznow')
    .forEach((button) => {
        button.addEventListener('click', () => {
        window.location.href = 'quiznow.html'
    })
})

document.querySelectorAll('.btn-play-again')
    .forEach((button) => {
        button.addEventListener('click', () => {
        window.location.href = 'quiznowquestionnaire.html'
    })
})

export function changeSlide(direction, imageStorage, textStorage, category, region) {
    let selectedImageStorage = imageStorage;
    let selectedTextStorage = textStorage;
    let selectorImageElement = document.querySelector('.' + category + '-image');
    let selectorTextElement = document.querySelector('.' + category + '-name');
    let currentIndex = Number(selectorImageElement.dataset.index);

    currentIndex += direction;

    if (currentIndex >= selectedImageStorage.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = selectedImageStorage.length - 1;
    }

    selectorImageElement.src = selectedImageStorage[currentIndex];
    selectorTextElement.innerHTML = selectedTextStorage[currentIndex];

    selectorImageElement.dataset.index = currentIndex
}

/* Trigger Achievement section*/

export function visitGithubAchievement() {
    document.querySelector('.visit-github')
        .addEventListener('click', () => {
            savedCurrentAchievement(8)
        })
}

export function shortcutToLibrary() {
    document.querySelectorAll('.shortcut')
        .forEach((button) => {
            button.addEventListener('click', () => {
                savedCurrentAchievement(0)
            })
        })
}

/* @media */

document.querySelector('.hamburger-menu')
    .addEventListener('click', () => {
        document.querySelector('.website-nav')
            .classList.toggle('visible')
    })