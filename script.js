const date = $("#DateSpan"),
    locat = $("#txt-location"),
    btn = $("#btn-local"),
    lblLocat = $("#city"),
    region = $("#country"),
    desc = $("#dscrp"),
    highTemp = $("#txt-temp"),
    tempF = $("#temp-f"),
    sunrise = $("#sunRice"),
    sunset = $("#sunSet"),
    windSpeed = $("#Wind-speed"),
    windDirec = $("#wind-dire"),
    cloud = $("#cloud"),
    pressure = $("#pressure"),
    humidity = $("#humidity"),
    tempFeel = $("#feels-like"),
    uv = $("#uv"),
    hous = $("#hour"),
    min = $("#min"),
    mer = $("#Merid"),
    dte = $("#DateSpan"),
    maxtemp = $("#max-temp"),
    mintemp = $("#min-temp");

var temp = ["temp-0", "temp-1", "temp-2", "temp-3", "temp-4", "temp-5", "temp-6", "temp-7", "temp-8",
    "temp-9", "temp-10", "temp-11", "temp-12", "temp-13", "temp-14", "temp-15", "temp-16", "temp-17",
    "temp-18", "temp-19", "temp-20", "temp-21", "temp-22", "temp-23"];

var imginner = ["img-0", "img-1", "img-2", "img-3", "img-4", "img-5", "img-6", "img-7", "img-8",
    "img-9", "img-10", "img-11", "img-12", "img-13", "img-14", "img-15", "img-16", "img-17",
    "img-18", "img-19", "img-20", "img-21", "img-22", "img-23"];

const monthNames = ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const d = new Date();

$(document).ready(function () {

    function updateTime() {
        currentTime = new Date();
        min.text(currentTime.getMinutes());
    }
    setInterval(updateTime, 1000);

    hou();


});

function hou() {

    const houn = d.getHours();
    var dat = "am";
    var hounew = houn;
    if (houn > 12) {

        hounew = (houn - 12);
        dat = "pm";

    }
    hous.text(hounew + ": ");
    mer.text(dat);

}

dte.text(monthNames[d.getMonth()] + " " + d.getDate() + " " + days[d.getDay()]);


navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    $.ajax({
        url: `http://api.weatherapi.com/v1/current.json?q=${lat, long}&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            maniDeatils(resp);
        }
    })
    $.ajax({
        url: `http://api.weatherapi.com/v1/astronomy.json ?q=${lat, long}&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            sunTime(resp);
        }
    })
    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${lat, long}&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            hourTemp(resp);

        }
    })
});



btn.click(
    () => {
        let loction = locat.val();
        lblLocat.text(loction + ",");
        mainApiCall(loction);
    }
);







function mainApiCall(loction) {
    $.ajax({
        url: `http://api.weatherapi.com/v1/current.json?q=${loction}&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            maniDeatils(resp);
        }
    })
    $.ajax({
        url: `http://api.weatherapi.com/v1/astronomy.json ?q=${loction}&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            sunTime(resp);
        }
    })
    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${loction}&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            hourTemp(resp);
        }
    })
}










function maniDeatils(resp) {

    lblLocat.text(resp.location.name + ",");
    region.text(resp.location.country);
    desc.text(resp.current.condition.text);
    highTemp.text(resp.current.temp_c);
    $(".weather-img").html(`<img src="` + resp.current.condition.icon + `" style="width: 100px;">`);

    tempF.text("Temp(F) : " + resp.current.temp_f);

    windSpeed.text("Wind Speed : " + resp.current.wind_kph + "kph");
    windDirec.text("Wind Dire : " + resp.current.wind_dir);
    cloud.text("Cloud : " + resp.current.cloud);
    pressure.text("Pressure : " + resp.current.pressure_mb + "mb");
    humidity.text("Humidity : " + resp.current.humidity);
    tempFeel.text("Temp Feel : " + resp.current.feelslike_c);
    uv.text("uv : " + resp.current.uv);
}
function sunTime(resp) {
    sunrise.text("Sunrise : " + resp.astronomy.astro.sunrise);
    sunset.text("Sunset : " + resp.astronomy.astro.sunset);
}
function hourTemp(resp) {
    maxtemp.text(resp.forecast.forecastday[0].day.maxtemp_c);
    mintemp.text(resp.forecast.forecastday[0].day.mintemp_c);

    $.each(temp, function (i, val) {
        $("#" + val).text(resp.forecast.forecastday[0].hour[i].temp_c);

    });
    $.each(imginner, function (i, val) {
        $("#" + val).html(`<img src="` + resp.forecast.forecastday[0].hour[i].condition.icon + `" style="width: 30px;">`);
    });

}

////////////////////////////////////////////////////////////////////////////////////////////////////////





