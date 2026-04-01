import { regionData } from './data.js';
import { goToRegion } from './button.js';

function renderregionHTML() {
    let html = '';

    regionData.forEach((region) => {

        const getHTML = `
            <div class="region-item">
                <img src="${region.img}">
                <div class="region-item-title">
                    ${region.regionname}
                </div>
                <div class="region-item-description">
                    ${region.regiondescription}
                </div>
                <div class="region-item-button">
                    <button class="btn-region-page" data-region="${region.id}">
                        Go
                    </button>
                </div>
            </div>
        `;

        html += getHTML;
    });

    document.querySelector('.region-content').innerHTML = html;

    goToRegion();
}

renderregionHTML();