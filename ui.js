var session     = new SessionLite(document.getElementsByClassName('view-container')[0])
var runner      = -1;
var MAX_SPEED   = 15;
var MIN_FPS      = 15;
var MS_PER_FRAME = 1000 / MIN_FPS;
var MAX_UPS      = 1000;


// If the HTML was saved in the non-default state, correct it.
window.addEventListener('load', initPage);

function goForever() {
  var startTime     = new Date().getTime(),
      ups           = Math.pow(MAX_UPS, document.getElementById('speed-slider').value),
      maxNumUpdates = ups * MS_PER_FRAME / 1000;

  for (var i=0; i < maxNumUpdates && new Date().getTime() - startTime < MS_PER_FRAME; i++) {
    on_off();
    actOnChanges();
  }
  updateYearMonitor();
  updateTempMonitor();
  updateAvgTempMonitor();
  session.update(collectUpdates());
  runner = setTimeout(goForever, 1000 / ups - (new Date().getTime() - startTime));
}

var yearMonitor = $('#year-monitor');
var yearMonitorValue = 0;
function updateYearMonitor() {
  var year = Prims.precision(Globals.getGlobal(8), 0)
  if(year != yearMonitorValue) {
    yearMonitor.html(year)
    yearMonitorValue = year;
  }
}

var tempMonitor = $('#temp-monitor');
var tempMonitorValue = 0;
function updateTempMonitor() {
  var temp = Prims.precision(Globals.getGlobal(6), 1)
  if(temp != tempMonitorValue) {
    tempMonitor.html(temp + " C")
    tempMonitorValue = temp;
  }
}

var avgTempMonitor = $('#avg-temp-monitor');
var avgTempMonitorValue = 0;
function updateAvgTempMonitor() {
  var avgTemp = Prims.precision(Globals.getGlobal(11), 1)
  if(avgTemp != avgTempMonitorValue) {
    avgTempMonitor.html(avgTemp + " C")
    avgTempMonitorValue = avgTemp;
  }
}

function stop() {
  clearTimeout(runner);
  runner = -1;
}

function toggleOn() {
  var goButton = document.getElementById('go-button');
  if (runner < 0) {
    goForever();
    goButton.value = "Turn Off";
  } else {
    stop()
    goButton.value = "Turn On";
  }
}

function updateAlbedoSlider() {
  var albedoSlider = document.getElementById('Albedo-slider');
  var albedo = albedoSlider.value
  $('#albedonum').html(albedo)
  Globals.setGlobal(1, albedo)
}

function updateBrightnessSlider() {
  var brightnessSlider = document.getElementById('Brightness-slider');
  var brightness = brightnessSlider.value
  $('#brightnessnum').html(brightness)
  Globals.setGlobal(0, brightness)
}

function updateCO2Slider() {
  var co2Slider = document.getElementById('CO2-slider');
  var co2 = co2Slider.value
  $('#c02num').html(co2)
  Globals.setGlobal(2, co2)
}

function updateCloudsSlider() {
  var cloudsSlider = document.getElementById('Clouds-slider');
  var clouds = cloudsSlider.value
  $('#cloudsnum').html(clouds)
  Globals.setGlobal(3, clouds)
}

function initPage() {
  document.getElementById('go-button').value = 'Turn On'
}

startup();
session.update(collectUpdates());
