
// Copyright Year
var d = new Date(),
    n = d.getFullYear();
document.getElementById("year").innerHTML = n;

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        //Call weather today
        loadWeather(lat+','+lon);

        //Call Forecast
        loadForecast(lat+','+lon);

        //Call Location Map
        getLocation();
    });
});

//Get weather using lat/lng coordinates
function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'f',
        success: function(weather) {

            /*
            if (weather.alt.temp <= 5) {
                document.getElementById("changeBG").className = "below5";
            } else if (weather.alt.temp <= 15) {
                document.getElementById("changeBG").className = "below15";
            } else if (weather.alt.temp <= 25) {
                document.getElementById("changeBG").className = "below25";
            } else {
                document.getElementById("changeBG").className = "hot";
            }
             */

            document.getElementById("temperature").innerHTML = weather.temp+'&deg;'+weather.units.temp+' / '+weather.alt.temp+'&deg;C';
            document.getElementById("cityLoc").innerHTML = weather.city+', '+weather.region;
            document.getElementById("weatherToday").innerHTML = weather.currently;

            /*
            html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+' / '+weather.alt.temp+'&deg;C</h2>';
            html += '<h3>'+weather.city+', '+weather.region+'</h3>';
            html += '<h4 class="currently">'+weather.currently+'</h4>';
            $("#weather").html(html);
            */
        },

        error: function(error) {
            alert("An unknown error occurred.");
        }
    });
}

//Get 5-Day Forecast
function loadForecast(location, woeid) {
    $.simpleWeather({
        woeid: woeid,
        location: location,
        unit: 'f',
        success: function (weather) {
            html = '<h2 id="sameFont">5-Day Forecast</h2>';
            html += '<p>Day &nbsp; Low / High</p>'

            for (var i = 0; i < 5; i++) {
                html += '<p>' + weather.forecast[i].day + ': ' + weather.forecast[i].low + '&deg;' + weather.units.temp + ' / ' + weather.forecast[i].high + '&deg;' + weather.units.temp + '</p>';
            }

            $("#forecast").html(html);
        },
        error: function (error) {
            alert(error);
        }
    });
}

//Show Location Map
function getLocation() {
    if (navigator.geolocation) {
        showPosition();
    } else {
        alert("An error occurred.");
    }
}

function showPosition(position) {
    latlon = new google.maps.LatLng(lat, lon);

    windowWidth=$(window).width();
    mapholder = document.getElementById('mapholder');

    if (windowWidth <= 380) {
        mapholder.style.height = '250px';
        mapholder.style.width = '230px';
    } else {
        mapholder.style.height = '325px';
        mapholder.style.width = '320px';
    }

    var myOptions = {
        center:latlon,zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };

    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"Your location!"});
}

//alert(windowWidth);
