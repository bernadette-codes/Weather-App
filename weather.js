// Copyright Year
var d = new Date(),
    n = d.getFullYear();
document.getElementById("year").innerHTML = n;

//Get weather using lat/lng coordinates
function loadWeather() {
    var units = 'imperial',
        url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=' + units + '&appid=16c3de9108ed16c9179c1c51008b687e';

    $.getJSON(url, function(data) {
        // Fetch the weather after the API call.
        var tempF = data.main.temp,
            tempUnit = units === 'metric' ? 'C' : 'F',
            tempC = ((tempF - 32) / (9/5)).toFixed(2),
            description = data.weather[0].description;

        //Display Temperature
        document.getElementById("temperature").innerHTML = tempF + '&deg;' + tempUnit + ' / ' + tempC + '&deg;C';
        document.getElementById("weatherToday").innerHTML = description;

        //Sets Background Color Based on Temperature
        if(tempF <= 82.4){
            //Blue Background
            $("body").css("background", "linear-gradient(#3A67AB, #E8F6FF)");
            $(".colorSet").css({"background-color": "#3A67AB", "color": "#ffffff", "border": "1px solid #E8F6FF"});
        } else {
            //Red Background
            $("body").css("background", "linear-gradient(#ab453a, #f6eceb)");
            $(".colorSet").css({"background-color": "#ab453a", "color": "#ffffff", "border": "1px solid #f6eceb"});
        }
    });

} // end loadWeather

//Get 5-Day Forecast
function loadForecast(location, woeid) {
    $.simpleWeather({
        woeid: woeid,
        location: location,
        unit: 'f',
        success: function (weather) {
            html = '<h2 id = "sameFont">5-Day Forecast</h2>';
            html += '<p>Day &nbsp; Low / High</p>';
            var i;
            for (i = 0; i < 5; i++) {
                html += '<p>' + weather.forecast[i].day + ' - ' + weather.forecast[i].low + '&deg;' + weather.units.temp + ' / ' + weather.forecast[i].high + '&deg;' + weather.units.temp + '</p>';
            }
            $("#forecast").html(html);
        }, // end success function

        error: function (error) {
            alert(error);
        }
    }); // end simpleWeather
} // end loadForecast

//Show Location Map
function getLocation() {
    if (navigator.geolocation) {
        showPosition();
    } else {
        alert("An error occurred.");
    }
} // end getLocation

function showPosition() {
    var latlon = new google.maps.LatLng(lat, lon),
        windowWidth = $(window).width(),
        mapholder = document.getElementById("mapholder");

    if (windowWidth <= 380) {
        mapholder.style.height = '250px';
        mapholder.style.width = '230px';
    } else {
        mapholder.style.height = '325px';
        mapholder.style.width = '320px';
    }

    var myOptions = {
            center: latlon,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            }
        }, //end myOptions
        map = new google.maps.Map(mapholder, myOptions),
        marker = new google.maps.Marker({
            position: latlon,
            map: map,
            title: "Your location!"
        }); // end marker
} // end showPosition

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        //Call weather today
        loadWeather();

        //Call Forecast
        loadForecast(lat + ',' + lon);

        //Call Location Map
        getLocation();
    }); // end getCurrentPosition

}); // end ready
