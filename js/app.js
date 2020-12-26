const key = '03fb54ebf904aeecf7fbb0e169f0c7ad';
const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${key}`;
const urlWeather5 = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${key}`;



function fetchData(method, url) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.statusText);

        xhr.send();
    });

    return promise;
}

import { WeatherHeader } from './weatherHeader'

import { WeatherBody } from './weatherBody'


fetchData('GET', urlWeather)
    .then(responce => {
        const data = JSON.parse(responce);
        new WeatherHeader(data)
    })

fetchData('GET', urlWeather5)
    .then(responce => {
        const data5 = JSON.parse(responce);
        const dataList = data5.list
        dataList.forEach( function(item, i) {
            if (i % 8 == 0) {
                new WeatherBody(dataList[i])
            }
        })
    })


