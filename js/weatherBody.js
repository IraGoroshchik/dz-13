class WeatherBody {
    constructor(data) {
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

export { WeatherBody };