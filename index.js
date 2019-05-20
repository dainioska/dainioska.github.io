(function() {
  //function to set time interval and refresh ISS coordinate in global map
  let btn01 = document.getElementById("id_btn01");
  btn01.addEventListener("click", function(e) {
    e.preventDefault();
    setInterval(getPlaceJson, 5000);
    //set method to show time (first 5seconds)
    let date = new Date();
    let output01 = document.getElementById("id_output01");
    output01.innerHTML = date.toTimeString();
  });
  //function to convert ISS data 
  function outputPlace(obj) {
    let output01 = document.getElementById("id_output01");
    output01.textContent = `Latitude: ${
      obj.latitude
    }/---/Longitude: ${obj.longitude}`;
    //variable to set ISS latitude and longitude
    let outLat = obj.latitude;
    let outLong = obj.longitude;
    //to implement ISS image in global map
    L.circle([outLat, outLong], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 900
    }).addTo(myMap);
    //to implement ISS popup
    L.popup()
      .setLatLng([outLat, outLong])
      .setContent("Labukas, TKS skrenda čia!!!")
      .openOn(myMap);
  }

  // function get ISS place json
  function getPlaceJson() {
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", "https://api.wheretheiss.at/v1/satellites/25544");
    myRequest.onload = function() {
      let data = JSON.parse(myRequest.responseText);
      console.log(data); // reserved to test Place JSON
      outputPlace(data);
    };
    myRequest.send();
  }

  // function convert ISS people data
  function outputPeople(obj) {
    let output02 = document.getElementById("id_output02");
    let newArray = obj.people.map(function(element) {
      return element.name + " / ";
    });
    output02.innerHTML = `${newArray}`;
  }

  // function get ISS people json
  let btn02 = document.getElementById("id_btn02");
  btn02.addEventListener("click", function(e) {
    e.preventDefault();
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", "http://api.open-notify.org/astros.json");
    myRequest.onload = function() {
      let data = JSON.parse(myRequest.responseText);
      //console.log(data); // reserved to test People JSON
      outputPeople(data);
    };
    myRequest.send();
  });

  //to global map (0.00 longitude of Greenwich)
  let myMap = L.map("mapid").setView([10.5, 0.0], 2);
  //method to get global map
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
})();
