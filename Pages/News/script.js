const hedLine = $("#head-line"),
    events = $("#event"),
    areas = $("#areas"),
    decr = $("#desr"),
    insrt = $("#instruction"),
    datepicker = $("#datepicker"),
    locat = $("#txt-location"),
    btn = $("#btn-local"),
    outerDive = $("#outer");


const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1);



var tmdate = [tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate(),].join("-");
const d = new Date(),
    tdate = [d.getFullYear(), (d.getMonth() + 1), d.getDate()].join("-");



$(document).ready(function () {
    outerDive.hide();

    datepicker.datepicker({
        dateFormat: "yy-mm-dd",
        minDate: "+1d",
        maxDate: "+2w"
    });
}
)


navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;


    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?key=4aadb5ff6b43428cb37153814233005&days=14&q=${lat, long}&dt=${tmdate}&alerts=yes`,
        method: "GET",
        success: function (resp) {
            const location = resp.location.name;
            maniDeatils(resp, location, tmdate);
        }
    })
});

btn.click(
    () => {
        let loction = locat.val();

        var date = datepicker.val();

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
function mainApiCall(location, date) {
    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?key=4aadb5ff6b43428cb37153814233005&days=14&q=${location}&dt=${date}&alerts=yes`,
        method: "GET",
        success: function (resp) {
            maniDeatils(resp, location, date);
        }
    });
}




function maniDeatils(resp, location, date) {
    const contry = resp.location.country;
    if (resp.alerts.alert.length != 0) {
        outerDive.show();

        for (let index = 0; index < resp.alerts.alert.length; index++) {
            console.log("number of element" + index);
            hedLine.text(resp.alerts.alert[index].headline),
                events.text(resp.alerts.alert[index].event),
                areas.text("Arears :" + resp.alerts.alert[index].areas),
                decr.text(resp.alerts.alert[index].desc),
                insrt.text("Instructions :" + resp.alerts.alert[index].instruction)
        }


    } else {
        alert("There are no Weather alerts related to " + location + ", " + contry + " on " + date);
    }
}