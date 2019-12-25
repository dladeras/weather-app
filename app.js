var weatherApp = new Vue({
  el: '#app',
  data: {
    near: '',
    name: '',
    city: '',
    country: '',
    currentTemp: '',
    lon: '',
    lat: '',
    feelsLike: '',
    minTemp: '',
    maxTemp: '',
    pressure: '',
    humidity: '',
    wind: '',
    overcast: '',
    icon: '',
    timezone: '',
    weatherBackgroundImage: '',
    sunrise: '',
    venues: '',
    venueName: '',
    venueDistance: '',
    venueAddress: '',
    venueCategoryName: '',
    venuePrefix: '',
    venueSuffix: '',
    venueButton: '',
    sunset: ''
  },
  methods: {
    onSubmit() {
      // var url1 = 'http://openweathermap.org/data/2.5/forecast/daily?id=524901&lang=zh_cn&appid=d8dc20c3264fd9ad006e15e190adbbb9';
      var url1 = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.name + '&units=metric&APPID=d8dc20c3264fd9ad006e15e190adbbb9';

      // Get data from Open Weather API
      axios.get(url1)
        .then(response => {

          this.name = response.data.name;
          this.city = response.data.name + ',';
          this.country = response.data.sys.country;
          this.currentTemp = response.data.main.temp + '°c';
          this.lon = response.data.coord.lon;
          this.lat = response.data.coord.lat;
          this.feelsLike = 'Feels like: ' + response.data.main.feels_like + '°c';
          this.minTemp = 'Min Temp: ' + response.data.main.temp_min + '°c';
          this.maxTemp = 'Max Temp: ' + response.data.main.temp_max + '°c';
          this.pressure = 'Pressure: ' + response.data.main.pressure;
          this.humidity = 'Humidity: ' + response.data.main.humidity + '%';
          this.wind = 'Wind: ' + response.data.wind.speed + 'm/s';
          this.overcast = response.data.weather[0].description;
          this.timezone  = response.data.timezone ;
          this.timezone  = response.data.timezone ;
          this.icon = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png";
          this.weatherBackgroundImage = "assets/images/" + response.data.name.toLowerCase() + ".jpg";
          this.sunrise = 'Sunrise: ' + new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = 'Sunset: ' + new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);

          let url2 = 'https://api.foursquare.com/v2/venues/search?ll=' + this.lat + ',' + this.lon + '&limit=6&client_id=MTIKIOHCMAGIICVM3NMTF2JQI5WLUKBEW2DSEYIKSYYXAGOT&client_secret=YWHVCIDS0P2MDJQLQKY5PV1YKRRTVGJ4SMAHTYRU2PWU1CH0&v=20191216';

          // Get data from Foursquare API
          axios
            .get(url2)
            .then(response => {
              this.near = 'Places near' + ' ' + this.city + ' ' + this.country;
              this.venues = response.data.response.venues;
              this.venueName = response.data.response.venues[0].name;
              this.venueDistance = response.data.response.venues[0].location.distance;
              this.venueAddress = response.data.response.venues[0].location.address;
              this.venueCategoryName = response.data.response.venues[0].categories.name;
              this.venuePrefix = response.data.response.venues[0].categories[0].icon.prefix;
              this.venueSuffix = response.data.response.venues[0].categories[0].icon.suffix;
              this.venueButton = 'Learn More';
            })
        })

      .catch(error => {
        console.log(error);
      });
    },
  },
});
