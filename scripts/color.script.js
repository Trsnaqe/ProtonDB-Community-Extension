window.addEventListener("DOMContentLoaded", function () {
  loadColors();
});

// Save the colors to local storage
function saveColors() {
  var platinumColor = document.getElementById("platinum").value || "#B4C7DC";
  var goldColor = document.getElementById("gold").value || "#CFB53B";
  var silverColor = document.getElementById("silver").value || "#A6A6A6";
  var bronzeColor = document.getElementById("bronze").value || "#CD7F32";
  var borkedColor = document.getElementById("borked").value || "#FF0000";
  var unknownColor = document.getElementById("unknown").value || "#3D3D3D";

  chrome.storage.local.set({
    platinumColor: platinumColor,
    goldColor: goldColor,
    silverColor: silverColor,
    bronzeColor: bronzeColor,
    borkedColor: borkedColor,
    unknownColor: unknownColor,
  });
}

// Load the colors from local storage
function loadColors() {
  chrome.storage.local.get(
    {
      platinumColor: "#B4C7DC",
      goldColor: "#CFB53B",
      silverColor: "#A6A6A6",
      bronzeColor: "#CD7F32",
      borkedColor: "#FF0000",
      unknownColor: "#3D3D3D",
    },
    function (result) {
      document.getElementById("platinum").value = result.platinumColor;
      document.getElementById("gold").value = result.goldColor;
      document.getElementById("silver").value = result.silverColor;
      document.getElementById("bronze").value = result.bronzeColor;
      document.getElementById("borked").value = result.borkedColor;
      document.getElementById("unknown").value = result.unknownColor;
    }
  );
}

// Reset the colors to their initial values
function resetColors() {
  chrome.storage.local.set(
    {
      platinumColor: "#B4C7DC",
      goldColor: "#CFB53B",
      silverColor: "#A6A6A6",
      bronzeColor: "#CD7F32",
      borkedColor: "#FF0000",
      unknownColor: "#3D3D3D",
    },
    loadColors
  );
}

// Save the colors whenever they change
var colorInputs = document.querySelectorAll('input[type="color"]');
colorInputs.forEach((input) => input.addEventListener("input", saveColors));
document
  .getElementById("resetColorsButton")
  .addEventListener("click", resetColors);
