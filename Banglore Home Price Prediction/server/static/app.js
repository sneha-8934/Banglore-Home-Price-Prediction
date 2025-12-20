function getBathValue() {
  var radios = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return parseInt(radios[i].value);
    }
  }
  return -1;
}

function getBHKValue() {
  var radios = document.getElementsByName("uiBHK");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return parseInt(radios[i].value);
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  var sqft = document.getElementById("uiSqft").value;
  var bhk = getBHKValue();
  var bath = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  // Basic validation
  if (!sqft || bhk === -1 || bath === -1 || !location) {
    estPrice.innerHTML = "<h2>Please enter all values</h2>";
    return;
  }

  $.post("http://127.0.0.1:5000/predict_home_price", {
    total_sqft: parseFloat(sqft),
    bhk: bhk,
    bath: bath,
    location: location
  }, function (data) {
    estPrice.innerHTML =
      "<h2>₹ " + data.estimated_price + " Lakh</h2>";
  }).fail(function () {
    estPrice.innerHTML = "<h2>Server error</h2>";
  });
}

function onPageLoad() {
  console.log("document loaded");

  $.get("http://127.0.0.1:5000/get_location_names", function (data) {
    var uiLocations = document.getElementById("uiLocations");
    uiLocations.innerHTML = "";

    data.locations.forEach(function (loc) {
      var opt = document.createElement("option");
      opt.value = loc;
      opt.text = loc;
      uiLocations.appendChild(opt);
    });
  });
}

window.onload = onPageLoad;
