let weatherList = [];

fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-6AD9E8C3-4C0C-423D-8A6D-BD4257220711&format=JSON").then(function (res) {
    return res.json();
}).then(function (data) {
    weatherList = data.records.location;
    console.log(weatherList);
}).catch(function (error) {
    console.log(error);
})

const title = document.querySelector("#title");
const city = document.querySelector("#city");
const parameter = document.querySelector("#parameter");
const temp = document.querySelector("#temp");
const rain = document.querySelector("#rain");
const img = document.querySelector(".fa-solid");

const btn = document.querySelector("#get-btn");


btn.addEventListener("click", function () {
    const weather = weatherList.filter(function (i) {
        if (i.locationName === city.value) {
            return i;
        }
    });
    const maxT = weather[0].weatherElement[2].time[0].parameter.parameterName;
    const minT = weather[0].weatherElement[2].time[1].parameter.parameterName;
    const pop = weather[0].weatherElement[1].time[0].parameter.parameterName;

    title.innerText = weather[0].locationName;

    parameter.innerText = weather[0].weatherElement[0].time[0].parameter.parameterName;
    temp.innerText = minT + "~" + maxT + "˚C"
    rain.innerText = "降雨機率: " + pop + "%"
    console.log(weather[0].weatherElement[0].time[0].parameter.parameterName);

    switch (parameter.innerText) {
        case "陰天":
        case "多雲":
            img.setAttribute("class", "fa-solid fa-cloud");
            break;
        case "多雲時陰":
            img.setAttribute("class", "fa-solid fa-cloud-fog");
            break;
        case "多雲短暫雨":
        case "多雲午後短暫雨":
        case "陰短暫雨":
        case "多雲時陰短暫雨":
        case "陰時多雲短暫陣雨":
            img.setAttribute("class", "fa-solid fa-cloud-rain");
            break;
        case "晴時多雲":
            img.setAttribute("class", "fa-sharp fa-solid fa-cloud-sun");
            break;
        case "多雲短暫雨":
            img.setAttribute("class", "fa-solid fa-cloud-rain");
            break;

    }

});

