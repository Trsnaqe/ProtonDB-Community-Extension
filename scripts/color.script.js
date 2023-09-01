const DEFAULT_COLOR_PALETTE = {
    platinumColor: "#B4C7DC",
    goldColor: "#CFB53B",
    silverColor: "#A6A6A6",
    bronzeColor: "#CD7F32",
    borkedColor: "#FF0000",
    unknownColor: "#3D3D3D",
};

var colorPickers = document.querySelectorAll(".custom-color-picker");

function getStoredColorPalette(callback) {
    chrome.storage.local.get(DEFAULT_COLOR_PALETTE, callback);
}

function saveColors(event) {
    const pickerFor = event.target.parentElement.getAttribute("picker-for");

    let currentColorPalette;
    getStoredColorPalette((colorPalette) => {
        currentColorPalette = colorPalette;
    });

    const newColorPalette = {
        ...currentColorPalette,
        [`${pickerFor}Color`]: event.target.value,
    };

    chrome.storage.local.set(newColorPalette);

    updateColorPickers(newColorPalette);
}

function loadColors() {
    getStoredColorPalette(updateColorPickers);
}

function updateColorPickers(newColorPalette) {
    colorPickers.forEach((colorPicker) => {
        const pickerFor = colorPicker.getAttribute("picker-for");
        const colorPickerInput = colorPicker.querySelector("input");

        colorPickerInput.value = newColorPalette[`${pickerFor}Color`];
        colorPicker.style.backgroundColor = newColorPalette[`${pickerFor}Color`];
    });
}


function resetColors() {
    if (!confirm("Are you sure you want to reset the colors to default values?")) {
        return;
    }
    chrome.storage.local.set(DEFAULT_COLOR_PALETTE, loadColors);
}



/* Event Listeners */

window.addEventListener("DOMContentLoaded", function () {
    loadColors();
});

colorPickers.forEach((colorPicker) => {
    const colorPickerInput = colorPicker.querySelector("input");

    colorPicker.addEventListener("click", (event) => {
        console.log(colorPickerInput);
        colorPickerInput.click();
    });

    colorPickerInput.addEventListener("input", saveColors);
});

document.getElementById("resetColorsButton").addEventListener("click", resetColors);
