export default {
  name: 'App',
  data() {
    return {
      location: 'Belgrade, RS',
      temperatureK: 296,
      icon: 'filter_drama',
      current_time: '23:07',
      weather_description: 'Light Rain',
      min_temperatureK: 288,
      max_temperatureK: 298,
      humidity: 77,
      pressure: 1007,
      unitsCelsius: true,
      current_time: this.setCurrentTime(7200),
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeatherCoordinates);
    }
  },
  computed: {
    temperature: function() {
      return this.unitsCelsius
        ? this.toCelisus(this.temperatureK)
        : this.toFahrenheit(this.temperatureK);
    },
    max_temperature: function() {
      return this.unitsCelsius
        ? this.toCelisus(this.max_temperatureK)
        : this.toFahrenheit(this.max_temperatureK);
    },
    min_temperature: function() {
      return this.unitsCelsius
        ? this.toCelisus(this.min_temperatureK)
        : this.toFahrenheit(this.min_temperatureK);
    },
  },
  methods: {
    toCelisus: function(tempK) {
      return Math.round(tempK - 273);
    },
    toFahrenheit: function(tempK) {
      return Math.round((tempK * 9.0) / 5 - 459.67);
    },
    changeUnits: function() {
      this.unitsCelsius = this.$refs.toggle.checked;
    },
    getWeatherCoordinates(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.getApiKey()}`;
      fetch(url, { mode: 'cors' })
        .then(function(response) {
          if (response.status == 200) {
            return response.json();
          } else {
            throw Error(`Network error: ${response.status}`);
          }
        })
        .then(this.changeWeatherData)
        .catch(function(error) {
          console.log(error);
        });
    },
    getWeather: function() {
      let city = this.$refs.cityInput.value;
      if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.getApiKey()}`;
        fetch(url, { mode: 'cors' })
          .then(function(response) {
            if (response.status == 200) {
              return response.json();
            } else {
              throw Error(`Network error: ${response.status}`);
            }
          })
          .then(this.changeWeatherData)
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getApiKey: function() {
      return 'df0d4518168e1c67243b9b1f50fc86ec';
    },
    changeWeatherData: function(data) {
      this.location = `${data.name}, ${data.sys.country}`;
      this.temperatureK = data.main.temp;
      this.max_temperatureK = data.main.temp_max;
      this.min_temperatureK = data.main.temp_min;
      this.pressure = data.main.pressure;
      this.humidity = data.main.humidity;
      this.weather_description = data.weather[0].description;
      this.setWeatherIcon(data.weather[0].main);

      this.setCurrentTime(data.timezone);
    },
    setCurrentTime: function(timezone) {
      //timezone is UTC offset in seconds
      // so if we are in timezone UTC-4 timezone would be -14400

      //since we get a UTC timezone and when we call new Date() we get
      //time in local timezone, we have to calculate the offset of the local
      //timezone to be able to tell the time in a different timezone
      const local_timezone_offset = new Date().getTimezoneOffset() * 60;

      //have to use a minus because add operation is not defined for dates
      let current_date = new Date(
        new Date() - (-local_timezone_offset - timezone) * 1000
      );
      //we are slicing the last 3 characters, ebcase toLocateTimeString
      //returns a string in format HH:MM:SS
      this.current_time = current_date.toLocaleTimeString('en-GB').slice(0, -3);
      return this.current_time;
    },
    setWeatherIcon: function(weather_description) {
      let weather_description_to_icons = {
        clouds: 'filter_drama',
        clear: 'wb_sunny',
        rain: 'opacity',
        thunderstorm: 'flash_on',
        snow: 'ac_unit',
      };
      weather_description =
        weather_description[0].toLowerCase() + weather_description.slice(1);
      this.icon = weather_description_to_icons[weather_description];
    },
  },
};
