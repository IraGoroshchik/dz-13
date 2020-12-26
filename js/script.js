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

class WeatherHeader {
    constructor(data) {
        this.city = data.name;
        this.country = data.sys.country;
        this.time = new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes());
        this.iconWeather = data.weather[0].icon;
        this.temp = Math.round(data.main.temp - 273) + ' °C';
        this.fellLikesTemp = Math.round(data.main.feels_like - 273) + ' °C';
        this.speedWind = data.wind.speed + ' m/s';
        this.degWind = data.wind.deg;
        this.directionWind ;
        this.init();

    }

    init() {
        this.getDirectionWind ()
        this.showWeatherHeader()

    }

    showWeatherHeader() {
        const template = `
            <section class="weatherNow"> 
                <div class="weatherNow__header">
                    <div class="location">${this.city + ', ' + this.country}</div>
                    <div class="time">
                    <i class="far fa-clock"></i>
                    ${this.time}
                    </div>
                </div>
                <div class="weatherNow__main">
                    <img src="http://openweathermap.org/img/wn/${this.iconWeather}@2x.png" class="imgIcon">
                    <div class="temp">${this.temp}</div>
                    <div class="tempFeelsLike"> Feels Like ${this.fellLikesTemp}</div>
                </div>
                <div class="weatherNow__footer">
                    <div class="wind"> 
                        <div class="directionWind">
                            <i class="fas fa-arrow-circle-up" style = "transform: rotate(${this.degWind}deg)"></i>
                            <span> ${this.directionWind}</span>
                        </div>
                        <div class="speedWind">
                            <i class="fas fa-wind"></i>
                            <span>${this.speedWind}</span>
                        </div>
                    </div>
                </div>
            </section>
        `

        container.innerHTML = container.innerHTML + template;
    }

    getDirectionWind () {
        if (45 < this.degWind && this.degWind <= 135)  {
            this.directionWind = 'East';

        } else if (135 < this.degWind && this.degWind <= 225){
            this.directionWind = 'South';
        } else if (225 < this.degWind && this.degWind <= 315){
            this.directionWind = 'West';
        } else {
            this.directionWind = 'North';
        }

    }

}



class WeatherBody {
    constructor(data) {
        // this.dateMilliseconds = data.dt
        // console.log(this.dateMilliseconds)
        // this.dateMonth = new Date(1608346800).getFullYear()
        // console.log(this.dateMonth)
        this.date = data.dt_txt.slice(0, 16)
        this.iconWeather = data.weather[0].icon
        this.temp = Math.round(data.main.temp - 273) + ' °C';
        this.init()
    }

    init() {
        this.renderWeatherDay()
    }

    renderWeatherDay() {
        const template = `
            <section class="weatherDay">
                <div class="dayDate">
                    <span class="date">${this.date}</span>
                </div>
                <div>
                    <img src="http://openweathermap.org/img/wn/${this.iconWeather}@2x.png" class="dayIcon">
                </div>
                <div class="dayTemp">
                    ${this.temp}
                </div>
            </section>
               
        `
        container.innerHTML = container.innerHTML + template;
    }

}




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


