import { userProfile, saveNewProfile, savedAchievement, savedCurrentAchievement } from "./storage.js";

let currentDisplay = '';

document.querySelectorAll('.item')
    .forEach((selection) => {
        selection.addEventListener('click', () => {
            const subjectChosen = selection.dataset.subject
            removeActive()
            selection.classList.add('active')
            selectionDisplay(subjectChosen)
            document.querySelector('.function-display').innerHTML = currentDisplay

            if (subjectChosen == 'profile') {
                enableEdit();
            }
        })
    })

function removeActive() {
    document.querySelectorAll('.item')
        .forEach((item) => {
            item.classList.remove('active')
        })
}

function selectionDisplay(value) {
    if (value == 'profile') {
        currentDisplay = `
                            <div class="profile-section">
                                <div>
                                    <img class="profile-picture" src='${userProfile.img}'}>
                                    <div class="profile-data-grid">
                                        <div>
                                            Name:
                                        </div>
                                        <div class="profile-username">
                                            ${userProfile.username}
                                        </div>
                                        <div>
                                            Level:
                                        </div>
                                        <div>
                                            ${userProfile.level} (${userProfile.sublevel}/250)
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button class="btn-edit">
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <form class="edit-profile-grid">
                                <div>
                                    Change Name:
                                </div>
                                <input type="text" name="name">
                                <div>
                                    Change Profile Image:
                                </div>
                                <select name="profile-picture">
                                    <option value="default">Default</option>
                                    <option value="cat">Cat</option>
                                    <option value="sunflower">Sunflower</option>
                                    <option value="crab">Crab</option>
                                    <option value="bird">Bird</option>
                                </select>
                                <div class="reset">
                                    <input class="btn-reset" type="reset" name="reset" value="Clear">
                                </div>
                                <div class="submit">
                                    <input class="btn-submit" type="submit" name="submit" value="Update">
                                </div>
                            </form>
                            `
    } else if (value == 'achievement') {
        generateAchievementHTML()
    } else if (value == 'setting') {
        generateSettingHTML()
    }
}

function defaultLoad() {
    currentDisplay = `
                    <div class="profile-section">
                        <div>
                            <img class="profile-picture" src='${userProfile.img}'}>
                            <div class="profile-data-grid">
                                <div>
                                    Name:
                                </div>
                                <div class="profile-username">
                                    ${userProfile.username}
                                </div>
                                <div>
                                    Level:
                                </div>
                                <div>
                                    ${userProfile.level} (${userProfile.sublevel}/250)
                                </div>
                            </div>
                        </div>
                        <div>
                            <button class="btn-edit">
                                Edit
                            </button>
                        </div>
                    </div>
                    <form class="edit-profile-grid">
                        <div>
                            Change Name:
                        </div>
                        <input type="text" name="name">
                        <div>
                            Change Profile Image:
                        </div>
                        <select name="profile-picture">
                            <option value="default">Default</option>
                            <option value="cat">Cat</option>
                            <option value="sunflower">Sunflower</option>
                            <option value="crab">Crab</option>
                            <option value="bird">Bird</option>
                        </select>
                        <div class="reset">
                            <input class="btn-reset" type="reset" name="reset" value="Clear">
                        </div>
                        <div class="submit">
                            <input class="btn-submit" type="submit" name="submit" value="Update">
                        </div>
                    </form>
                    `

    document.querySelector('.function-display').innerHTML = currentDisplay

    enableEdit()
}

defaultLoad()

function generateAchievementHTML() {
    const headingObtained = `<div class="achievement-heading">
                                Achievement Obtained
                            </div>`
    const headingNotObtained = `<div class="achievement-heading">
                                    Achievement Awaiting to be obtained
                                </div>`
    let achievementObtained = '';
    let achievementNotObtained = '';
    
    savedAchievement.forEach((achievement) => {
        if (achievement.hasObtained == 0) {
            achievementNotObtained = achievementNotObtained + `<div class="achievement-container">
                                                                    <img class="black-white" src="${achievement.achievementImg}">
                                                                    <div class="achievement-content">
                                                                        <div class="achievement-name">
                                                                            ${achievement.achievementName}
                                                                        </div>
                                                                        <div class="achievement-description">
                                                                            ${achievement.achievementDescription}
                                                                        </div>
                                                                    </div>
                                                                </div>`
        } else if (achievement.hasObtained == 1) {
            achievementObtained = achievementObtained + `<div class="achievement-container">
                                                            <img class="normal" src="${achievement.achievementImg}">
                                                            <div class="achievement-content">
                                                                <div class="achievement-name">
                                                                    ${achievement.achievementName}
                                                                </div>
                                                                <div class="achievement-description">
                                                                    ${achievement.achievementDescription}
                                                                </div>
                                                            </div>
                                                        </div>`
                                                        console.log(123)
        }
    })

    currentDisplay = `<div class="achievement-display">` + headingObtained + `<div class="achievement-obtained">`
                    + achievementObtained + `</div>` + headingNotObtained + `<div class="achievement-not-obtained">`
                    + achievementNotObtained + `</div>` + `</div>`

    document.querySelector('.function-display').innerHTML = currentDisplay
}

function generateSettingHTML() {
    warningCounter = 7

    currentDisplay = `<div class="setting-display">
                        <div class="reset-title">
                            By interact with this button, <b>the user progression will be fully reset.</b> 
                            Don't worry, you have to press <b>7 times</b> in order to confirm your decision.
                        </div>
                        <button class="btn-reset-account">
                            RESET
                        </button>
                        <div class="user-alert">
                            7 times pending
                        </div>
                    </div>`

    document.querySelector('.function-display').innerHTML = currentDisplay

}

let warningCounter = 7;

document.querySelector('.function-display').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-reset-account')) {
            
            if (warningCounter > 0) {
                warningCounter--;
                
                const alertBox = document.querySelector('.user-alert');
                if (warningCounter > 0) {
                    alertBox.innerText = `${warningCounter} times pending`;
                } else {
                    alertBox.innerText = 'Your progression has been resetted';
                    event.target.disabled = true;
                    resetProgression()
                }
            }
        }
    })

function resetProgression() {
    let newProfile = {
        img: 'https://res.cloudinary.com/dyghlzxwz/image/upload/q_auto/f_auto/v1775018447/default_qznajw.webp',
        username: 'Guest_1',
        level: 1,
        sublevel: 0,
    }

    savedAchievement.forEach((achievement) => {
        achievement.hasObtained = 0
    })

    saveNewProfile(newProfile)
}

function enableEdit() {
    document.querySelector('.btn-edit')
        .addEventListener('click', (btn) => {
            const onEdit = btn.currentTarget
            onEdit.classList.toggle('active')
            document.querySelector('.edit-profile-grid').classList.toggle('active')
            
    })
}

const form = document.querySelector('.edit-profile-grid');

document.addEventListener('submit', (e) => {
    if (e.target && e.target.classList.contains('edit-profile-grid')) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get('name');
        const ProfileImage = formData.get('profile-picture');
        let newProfileImage = '';

        let profilePictureStorage = [{
            name: 'default',
            url: 'https://res.cloudinary.com/dyghlzxwz/image/upload/q_auto/f_auto/v1775018447/default_qznajw.webp'
        }, {
            name: 'cat',
            url: 'https://res.cloudinary.com/dyghlzxwz/image/upload/q_auto/f_auto/v1775018446/cat_leylhx.webp'
        },{
            name: 'sunflower',
            url: 'https://res.cloudinary.com/dyghlzxwz/image/upload/q_auto/f_auto/v1775018450/sunflower_xylozc.webp'
        },{
            name: 'crab',
            url: 'https://res.cloudinary.com/dyghlzxwz/image/upload/q_auto/f_auto/v1775018447/crab_fkyhij.webp'
        },{
            name: 'bird',
            url: 'https://res.cloudinary.com/dyghlzxwz/image/upload/q_auto/f_auto/v1775018444/bird_yttxhg.webp'
        }]

        for (let i = 0; i < profilePictureStorage.length; i++) {
            if (formData.get('profile-picture') == profilePictureStorage[i].name) {
                newProfileImage = profilePictureStorage[i].url
            }

        document.querySelector('.profile-picture').src = newProfileImage;
        document.querySelector('.profile-username').innerHTML = name;
        
        let newProfile = {
            img: newProfileImage,
            username: name,
            level: userProfile.level,
            sublevel: userProfile.sublevel
        };

        saveNewProfile(newProfile);
        savedCurrentAchievement(1)
    }
}});