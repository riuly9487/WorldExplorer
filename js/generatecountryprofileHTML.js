import { countryChoice } from "./storage.js";
import { countryData } from "./data.js";
import {changeSlide } from "./button.js";
import { selectCountryId, savedCurrentAchievement } from "./storage.js";

savedCurrentAchievement(7)

function renderCountryProfileHTML() {
    let html;

    countryData.forEach((country) => {
        if (country.id == countryChoice) {
            /* Generate header section */

            let header = `
                    <div class="website-countryprofile-header">
                        <div class="website-countryprofile-picture">
                            <img src="${country.img}">
                        </div>
                        <div class="website-countryprofile-subtitle">
                            <div class="country">
                                ${country.countryname}
                            </div>
                            <div class="description">
                                ${country.countrydescription}
                            </div>
                        </div>
                    </div>
                     `

            /* Generate banner section */

            let banner = `
                    <div class="website-countryprofile-banner">
                        <img src="${country.banner}">
                        <div>${country.bannerdescription}</div>
                    </div>
                     `

            /* Generate geographical section */

            let nearbyCountries = country.geonearby;
            let nearbyCountriesHTML = '';
            let displaySize = 'normal';

            if (nearbyCountries.length > 4) {
                displaySize ='small'
            }

            let geographical = `
                            <div class="website-countryprofile-geographical">
                                <div class="heading">
                                    Geographical Location
                                </div>
                                <div class="website-countryprofile-geographical-content">
                                    <img class="country-map" src="${country.map}">
                                    <div class="website-countryprofile-geographical-description">
                                        <div class="description">
                                            ${country.geodescription}
                                        </div>
                                        <div class="title">
                                            Nearby Countries
                                        </div>
                                        <div class="website-countryprofile-geographical-nearby-country-${displaySize}">
                           `
            
            nearbyCountries.forEach((selected) => {
                countryData.forEach((country) => {
                    if (country.countryname == selected) {
                        let countryhtml = `
                                        <div class="country go-to-this-country" data-country="${country.id}" data-destination="countryprofile.html">
                                            <img class="${displaySize}" src="${country.img}">
                                            <div>
                                                ${country.countryname}
                                            </div>
                                        </div>
                                        `
                                        
                        nearbyCountriesHTML += countryhtml
                    }
                })
            })
            
            let geoclosingHTMl = '</div></div></div></div>';
            nearbyCountriesHTML += geoclosingHTMl

            /* Generate demographic section */

            let demographic = `
                                <div class="website-countryprofile-demographic">
                                    <div class="heading">
                                        Demographics
                                    </div>
                                    <div class="description">
                                        ${country.demodescription}
                                    </div>
                                    <div class="demographic-slideshow">
                                        <div class="desktop-button">
                                            <button class="btn-previous" data-type="demographic">
                                                Previous Image
                                            </button>
                                        </div>
                                        <div class="demographic-hero">
                                            <img class="demographic-image" src="${country.demoImageStorage[0]}" data-index=0>
                                            <div class="demographic-name">
                                                ${country.demoTextSorage[0]}
                                            </div>
                                        </div>
                                        <div class="desktop-button">
                                            <button class="btn-next" data-type="demographic">
                                                Next Image
                                            </button>
                                        </div>
                                        <div class="mobile-button">
                                            <button class="btn-previous" data-type="demographic">
                                                Previous Image
                                            </button>
                                            <button class="btn-next" data-type="demographic">
                                                Next Image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                              `

            /* Generate facts, ruling and monetary section */

            let facts = `
                        <div class="website-countryprofile-facts-gov-mny">
                            <div class="heading">
                                Country Facts, Governence and Monetary System
                            </div>
                        `

            let i = 0

            while (i < country.factsDescription.length) {
                let generateFactsHTML = `
                                    <div class="description">
                                        ${country.factsDescription[i]}
                                    </div>
                                    <div class="image-container">
                                        <img src="${country.factsImage[i]}">
                                    </div>
                                    <div class="image-description">
                                        ${country.factsImageDescription[i]}
                                    </div>
                                    `
                facts += generateFactsHTML
                i++
            }

            let closingFactsHTML = '</div>'
            facts += closingFactsHTML

            /* Generate national food section */

            let nationalFood = `
                                <div class="website-countryprofile-nationalfood">
                                    <div class="heading">
                                        National Foods
                                    </div>
                                    <div class="description">
                                        ${country.nationalDescription}
                                    </div>
                                    <div class="nationalfood-slideshow">
                                        <div class="desktop-button">
                                            <button class="btn-previous" data-type="nationalfood">
                                                Previous Image
                                            </button>
                                        </div>
                                        <div class="nationalfood-hero">
                                            <img class="nationalfood-image" src="${country.nationalFoodImageStorage[0]}" data-index=0>
                                            <div class="nationalfood-name">
                                                ${country.nationalFoodTextStorage[0]}
                                            </div>
                                        </div>
                                        <div class="desktop-button">
                                            <button class="btn-next" data-type="nationalfood">
                                                Next Image
                                            </button>
                                        </div>
                                        <div class="mobile-button">
                                            <button class="btn-previous" data-type="nationalfood">
                                                Previous Image
                                            </button>
                                            <button class="btn-next" data-type="nationalfood">
                                                Next Image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                `

            /* Generate festival section */
            
            let festival = `
                            <div class="website-countryprofile-festival">
                                <div class="heading">
                                    National Holidays and Festivals
                                </div>
                                <div class="description">
                                    ${country.festivalDescription}
                                </div>
                                <div class="festival-slideshow">
                                    <div class="desktop-button">
                                        <button class="btn-previous" data-type="festival">
                                            Previous Image
                                        </button>
                                    </div>
                                    <div class="festival-hero">
                                        <img class="festival-image" src="${country.festivalImageStorage[0]}" data-index=0>
                                        <div class="festival-name">
                                            ${country.festivalTextStorage[0]}
                                        </div>
                                    </div>
                                    <div class="desktop-button">
                                        <button class="btn-next" data-type="festival">
                                            Next Image
                                        </button>
                                    </div>
                                    <div class="mobile-button">
                                        <button class="btn-previous" data-type="festival">
                                            Previous Image
                                        </button>
                                        <button class="btn-next" data-type="festival">
                                            Next Image
                                        </button>
                                    </div>
                                </div>
                            </div>
                            `

            html = header + banner + geographical + nearbyCountriesHTML + demographic + facts + nationalFood + festival
            
            /* Functionality section */

            document.querySelector('.website-countryprofile').innerHTML = html;

            document.querySelectorAll('.btn-previous')
                .forEach((button) => {
                    button.addEventListener('click', () => {
                        const data = button.dataset.type;
        
                        if (data == 'demographic') {
                            changeSlide(-1, country.demoImageStorage, country.demoTextSorage, data, country.countryname.toLowerCase())
                        } else if (data == 'nationalfood') {
                            changeSlide(-1, country.nationalFoodImageStorage, country.nationalFoodTextStorage, data, country.countryname.toLowerCase())
                        } else if (data == 'festival') {
                            changeSlide(-1, country.festivalImageStorage, country.festivalTextStorage, data, country.countryname.toLowerCase())
                        }
                    })
                }
            )

            document.querySelectorAll('.btn-next')
                .forEach((button) => {
                    button.addEventListener('click', () => {
                        const data = button.dataset.type;

                        if (data == 'demographic') {
                            changeSlide(1, country.demoImageStorage, country.demoTextSorage, data, country.countryname.toLowerCase())
                        } else if (data == 'nationalfood') {
                            changeSlide(1, country.nationalFoodImageStorage, country.nationalFoodTextStorage, data, country.countryname.toLowerCase())
                        } else if (data == 'festival') {
                            changeSlide(1, country.festivalImageStorage, country.festivalTextStorage, data, country.countryname.toLowerCase())
                        }
                    })
                }
            )
        }

        document.querySelectorAll('.go-to-this-country')
                .forEach((button) => {
                    button.addEventListener('click', () => {
                        /* This Code is similar to the one in button.js */
                        const selectedCountry = button.dataset.country;
                        const destination = button.dataset.destination;
                        selectCountryId(selectedCountry);
                        window.location.href = destination;
                    })
            })
    });

}

renderCountryProfileHTML();