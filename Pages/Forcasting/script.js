const date = $("#DateSpan"),
    datepikker = $("#datepicker"),
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
    chanceOfRain = $("#chance-of-rain"),
    chanceOfSnow = $("#chance-of-sonw"),
    humidity = $("#humidity"),
    vision = $("#avg-vision"),
    uv = $("#uv"),
    hous = $("#hour"),
    min = $("#min"),
    mer = $("#Merid"),
    dte = $("#DateSpan"),
    maxtemp = $("#max-temp"),
    mintemp = $("#min-temp"),
    dateInput = $("#date-input-feild");

var temp = ["temp-0", "temp-1", "temp-2", "temp-3", "temp-4", "temp-5", "temp-6", "temp-7", "temp-8",
    "temp-9", "temp-10", "temp-11", "temp-12", "temp-13", "temp-14", "temp-15", "temp-16", "temp-17",
    "temp-18", "temp-19", "temp-20", "temp-21", "temp-22", "temp-23"];

var imginner = ["img-0", "img-1", "img-2", "img-3", "img-4", "img-5", "img-6", "img-7", "img-8",
    "img-9", "img-10", "img-11", "img-12", "img-13", "img-14", "img-15", "img-16", "img-17",
    "img-18", "img-19", "img-20", "img-21", "img-22", "img-23"];

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1);


 
var tmdate = [tomorrow.getFullYear(),tomorrow.getMonth() + 1,tomorrow.getDate(),].join("-");


$(document).ready(function () {
    datepikker.datepicker({
        dateFormat: "yy-mm-dd",
        minDate: "+1d",
        maxDate: "+2w"
    });
}
)

navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    dte.text(tmdate);
    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${lat, long}&dt=${tmdate}&days=14&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            maniDeatils(resp);
        }
    })

    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${lat, long}&dt=${tmdate}&days=14&key=4aadb5ff6b43428cb37153814233005`,

        method: "GET",
        success: function (resp) {
            sunTime(resp);
        }
    })

    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${lat, long}&dt=${tmdate}&days=14&key=4aadb5ff6b43428cb37153814233005`,

        method: "GET",
        success: function (resp) {
            hourTemp(resp);

        }
    })
});



btn.click(
    () => {
        let loction = locat.val();
        //lblLocat.text(loction + ",");
        var date = datepikker.val();

        const nullday = tomorrow.getDate(),
            nullYear = tomorrow.getFullYear(),
            nullmonth = tomorrow.getMonth() + 1,

            nullDate = [nullYear, nullmonth, nullday].join("-");
        var apiDate;

        if (date == 0) {
            apiDate = nullDate;
            mainApiCall(loction, apiDate);
        } else {
            apiDate = date;
            mainApiCall(loction, apiDate);
        }

    }
);


function mainApiCall(loction, date) {
    console.log("apiDate" + date);
    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${loction}&dt=${date}&days=14&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            maniDeatils(resp);
            console.log("for date: " + resp.forecast.forecastday[0].date);
            dte.text(date);
        },
        error: function (xhr, status, error) {
            alert("Please Check your location !");
        }

    })
    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${loction}&dt=${date}&days=14&key=4aadb5ff6b43428cb37153814233005`,
        method: "GET",
        success: function (resp) {
            sunTime(resp);
        }
    })
    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${loction}&dt=${date}&days=14&key=4aadb5ff6b43428cb37153814233005`,

        method: "GET",
        success: function (resp) {
            hourTemp(resp);
        }
    })

}



function maniDeatils(resp) {

    lblLocat.text(resp.location.name + ",");
    region.text(resp.location.country);
    desc.text(resp.forecast.forecastday[0].day.condition.text);
    highTemp.text(resp.forecast.forecastday[0].day.avgtemp_c);
    $(".weather-img").html(`<img src="` + resp.forecast.forecastday[0].day.condition.icon + `" style="width: 100px;">`);
    tempF.text("Temp(F) : " + resp.forecast.forecastday[0].day.avgtemp_f);
    windSpeed.text("Wind Speed : " + resp.forecast.forecastday[0].day.maxwind_kph + "kph");
    chanceOfRain.text("Chance of rain : " + resp.forecast.forecastday[0].day.daily_chance_of_rain + "%");
    chanceOfSnow.text("Chance of Snow : " + resp.forecast.forecastday[0].day.daily_chance_of_snow + "%");
    humidity.text("Humidity : " + resp.forecast.forecastday[0].day.avghumidity);
    vision.text("visibility  : " + resp.forecast.forecastday[0].day.avgvis_km + " (km)");
    uv.text("uv : " + resp.forecast.forecastday[0].day.uv);
}
function sunTime(resp) {
    sunrise.text("Sunrise : " + resp.forecast.forecastday[0].astro.sunrise);
    sunset.text("Sunset : " + resp.forecast.forecastday[0].astro.sunset);
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






