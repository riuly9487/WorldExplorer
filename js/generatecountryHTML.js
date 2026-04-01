import { countryData } from "./data.js";
import { goToCountry } from "./button.js";


function rendercountryHTML() {
    let html = '';

    const region = document.querySelector('.country-content').dataset.region;
    const displayall = document.querySelector('.country-content').dataset.displayall;

    if (displayall == "Yes") {

        /* This section is to generate webpages for country.html*/

        countryData.forEach((country) => {

        const getHTML = `
            <div class="country-item">
                <img src="${country.img}">
                <div class="country-item-title">
                    ${country.countryname}
                </div>
                <div class="country-item-description">
                    ${country.countrydescription}
                </div>
                <div class="country-item-button">
                    <button class="btn-country-page" data-country="${country.id}" data-destination="countryprofile.html">
                        Go
                    </button>
                </div>
            </div>
        `;

        html += getHTML;
    });

    } else {

        /* This section is to generate webpages for ea.html, sea.html*/

        countryData.forEach((country) => {
            if (country.region == region) {
                const getHTML = `
                    <div class="country-item">
                        <img src="${country.img}">
                        <div class="country-item-title">
                            ${country.countryname}
                        </div>
                        <div class="country-item-description">
                            ${country.countrydescription}
                        </div>
                        <div class="country-item-button">
                            <button class="btn-country-page" data-country="${country.id}" data-destination="../countryprofile.html">
                                Go
                            </button>
                        </div>
                    </div>
                `;

                html += getHTML;
            }

    });

    }

    document.querySelector('.country-content').innerHTML = html;

    goToCountry();
}

rendercountryHTML();