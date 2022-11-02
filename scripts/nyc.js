// Public Token
mapboxgl.accessToken = "pk.eyJ1IjoiY2p5Y2F0aHkiLCJhIjoiY2p6Nzl2eTkyMDc0NDNlbzFoanhlYTU2MiJ9.EzBskhAUnvb01NeSjMeKTA";

// Global vars
var vizControl = d3.select("#mode-viz");

var storyControl = d3.select("#mode-story");
var currentMode = "story";  //init mode
var neighborhood = "MN";
var color_total = false;

var daytime;
var daytime_stats;
var time = 0;
var day = 0;
var stime;
var sday;

// LOCAL TIME //
var currentDate = new Date();
var currentDay = (currentDate.getDay() == 0) ? 6 : currentDate.getDay() - 1;
var currentHour = currentDate.getHours();

// Media Vars
var media;
var isNarrow = window.matchMedia("(max-width: 620px)");
function changeMedia(x) {
  if (x.matches) {
    
    // Update media var.
    media = "mobile";
    
    // Hide sliders from story mode ONLY.
    if (currentMode == "stats") {
      d3.select("#controls").style("bottom", "140px");
    } else {
      d3.select("#controls").style("bottom", "30px");
    }

  } else {
    media = "full";
    d3.select("#controls").style("display", "block");
  };
};
changeMedia(isNarrow); // Call listener function at run time
isNarrow.addListener(changeMedia); // Attach listener function on state changes

// CB Controls vars
var cb1 = d3.select("#cb1");
var cb2 = d3.select("#cb2");
var cb3 = d3.select("#cb3");
var cb4 = d3.select("#cb4");
var cb5 = d3.select("#cb5");
var cbn = d3.selectAll(".cbn");

// Slider vars
var interval;
var sliding;
var value = 0;


// Story panel vars
var story = d3.select("#storymode");

// Map vars
var start_viz = {
  zoom: 11,
  center: [-73.9848, 40.7554],
  bearing: -2.35,
  pitch: 60.0
};

var start_viz_mobile = {
  zoom: 11.0,
  center: [-73.9848, 40.7554],
  bearing: -2.35,
  pitch: 60.0
};

var start_story = {
  zoom: 11.75,
  center: [-73.9848, 40.7554],
  bearing: -2.35,
  pitch: 60.0
};

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: start_story.center,
  zoom: start_story.zoom,
  maxZoom: 17,
  minZoom: 12,
  bearing: start_story.bearing,
  pitch: start_story.pitch
});

// Helper Functions
function timeFormatter(t) {
  var dt;
  if(t == 0) dt = '12 AM';
  if(t > 0 && t < 12) dt = t + ' AM';
  if(t == 12) dt = '12 PM';
  if(t > 12) dt = (t-12) + ' PM';
  return dt;
}

function dayFormatterShort(d) {
  var dt;
  if(d == 0) dt = 'MON';
  if(d == 1) dt = 'TUE';
  if(d == 2) dt = 'WED';
  if(d == 3) dt = 'THU';
  if(d == 4) dt = 'FRI';
  if(d == 5) dt = 'SAT';
  if(d == 6) dt = 'SUN';
  return dt;
}

// About Module Callbacks
d3.select("#about-map-button").on("click", function() {
  d3.select("#about").style("display", "none");});

d3.select("#about-close").on("click", function() {
  d3.select("#about").style("display", "none");});

d3.select("#about").on("click", function() {
  d3.select("#about").style("display", "none");});

d3.select("#about-link").on("click", function() {
  d3.select("#about").style("display", "block");
});


// Build sliders and set callbacks.

var slideTimeCallback = function(evt, value) {
  stime = value;
  
  d3.select("#handle-one-t")
     .html(timeFormatter(Math.round(value)));
  
  if(!sliding) {
    sliding = true;
    interval = setInterval(function () {
                            changeTime({day: sday, time: stime});
                            clearInterval(interval);
                            sliding = false;
                           }, 500);
  } 
};

var slideendTimeCallback = function(evt, value) {
    sliding = false;
    clearInterval(interval);
    changeTime({day: sday, time: stime});
   };

var slideDayCallback = function(evt, value) {
  sday = value;
  
  d3.select("#handle-one-b")
    .html(dayFormatterShort(Math.round(value)));
  
  if(!sliding) {
    sliding = true;
    interval = setInterval(function () {
                            changeTime({day: sday, time: stime});
                            clearInterval(interval);
                            sliding = false;
                           }, 500);

  }
};

var slideendDayCallback = function(evt, value) {
    sliding = false;
    clearInterval(interval);
    changeTime({day: sday, time: stime});
   };

var sliderTime = d3.slider().min(0).max(23).step(1).id('t')
                     .on("slide", slideTimeCallback)
                     .on("slideend", slideendTimeCallback);

var sliderDay = d3.slider().min(0).max(6).step(1).id('b')
                     .on("slide", slideDayCallback)
                     .on("slideend", slideendDayCallback);

function getSliders() {

  // TIME
  d3.select('#slider-t').call(sliderTime);

  // DAY
  d3.select('#slider-b').call(sliderDay);

  // Init Slider text.
  d3.select("#handle-one-t").text('12 AM');
  d3.select("#handle-one-b").text('MON');
}

// Change data by time.
function changeTime(settings) {

  time = (settings.time) ? settings.time : 0;
  day = (settings.day) ? settings.day : 0;
  // daytime = ((day+1)*24 + time).toString();
  daytime = ((day)*24 + time);
  // daytime_stats = (color_total) ? daytime + "p" : daytime + "d";

  // filter according to time
  map.setFilter('viz', ["==", "timeperi_1",daytime]);
  console.log(daytime)
  
  // if(map) {

  //   // VIZ
  //   map.setPaintProperty("viz",
  //                        "fill-extrusion-height",
  //                        ["*", ["get", "p"], 2]);

  //   map.setPaintProperty("viz",
  //                         "fill-extrusion-color",
  //                         // ['get','color']
  //                         {"base": 1,
  //                          "type": "interval",
  //                          "property": "p",
  //                          "stops": 
  //                          [[0, "RGB(70, 137, 232)"],
  //                          [200, "RGB(148, 214, 242)"],
  //                          [400, "RGB(245, 250, 95)"],
  //                          [600, "RGB(250, 167, 95)"],
  //                          [800, "RGB(242, 24, 24)"],
  //                          [1000, "RGB(242, 24, 24)"]],
  //                          "default": "#800026"}
  //                          );
  // }
}

// Change the map mode.
function changeMode(settings) {

  // Control Legends.
  d3.select("#legend-content").style("display", (settings.id == "viz" || settings.id == "story") ? "block": "none");
  d3.select("#cbs-content").style("display", (settings.id == "viz" || settings.id == "story") ? "block": "none");
  d3.select("#statslegend-content").style("display", (settings.id == "viz" || settings.id == "story") ? "none": "block");

  // Control Sliders.
  if (media == "mobile" && settings.id == "story")
    d3.select("#controls").style("display", "none");
  else
    d3.select("#controls").style("display", "block");

  // Header button attrs.
  vizControl.attr("class", (settings.id == "viz") ? "mode-selected" : "mode");
  //statsControl.attr("class", (settings.id == "stats") ? "mode-selected" : "mode");
  storyControl.attr("class", (settings.id == "story") ? "mode-selected" : "mode");


  // Change the map to VIZ mode.
  if (settings.id == "viz") {
    
    // Change the map view settings.
    if (media == "full") map.flyTo(start_viz);
    else map.flyTo(start_viz_mobile);

    // Reset the time.
    // changeTime({time: 2014});
    // slideTimeCallback(d3.event, 2014);
    // slideendTimeCallback(d3.event, 2014);
    // sliderTime.value(year);

    changeTime({day: currentDay, time: currentHour});
    slideTimeCallback(d3.event, currentHour);
    slideendTimeCallback(d3.event, currentHour);
    sliderTime.value(currentHour);
    slideDayCallback(d3.event, currentDay);
    slideendDayCallback(d3.event, currentDay);
    sliderDay.value(currentDay);


    // Turn on VIZ overlays 
    // map.setLayoutProperty("viz", "visibility", "visible");
  
    // Turn off Story panel.
    story.style("display", "none");

  }

  // Change the map to STORY mode.
  if (settings.id == "story") {

    // Change map view settings.
    map.flyTo(start_story);

    map.setLayoutProperty("viz", "visibility", "visible");

    // Turn on the story panel.
    story.style("display", "block");

    // Turn off info panel.
    info.style("display", "none");

    // Start at the beginning.
    pageNum = 1;
    pageNumbers.text(pageNum + " of " + stories.length);
    backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
    forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );
    updateStory(stories[pageNum-1]);
  }

  currentMode = settings.id;
}

// Define map behavior and callback functions.
// map.on("load", function(e) {
  
//   // Add Source.
//   map.addSource("DCtem", {'type': "geojson",
//                            'data':"https://geogws003.ad.umd.edu:6443/arcgis/rest/services/GEOG677_Summer2019/nyc5/MapServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson" });

//   // Add VIZ layer.
//   map.addLayer({"id": "viz",
//                 "type": "fill-extrusion",
//                 "source": "DCtem",
//                 "paint": {"fill-extrusion-opacity": 0.8,
//                           "fill-extrusion-height": ['*',["get", "p"],500],
//                           "fill-extrusion-height-transition": {duration: 500,
//                                                                delay: 0},
//                           "fill-extrusion-color": {"base": 1,
//                                                    "type": "interval",
//                                                    "property": "0",
//                                                    "default": "#800026",
//                                                    "stops": [[0, "#fff7ec"],
//                                                             [500, "#fdd49e"],
//                                                             [1000, "#fee8c8"],
//                                                             [1500, "#fdbb84"],
//                                                             [2000, "#fc8d59"],
//                                                             ]}}});

// Define map behavior and callback functions.
map.on('load', function() {
  // map.addSource("section0", {
  //   type: "vector",
  //   url: "mapbox://cjycathy.bniasq97"
  //   // "https://geogws003.ad.umd.edu:6443/arcgis/rest/services/GEOG677_Summer2019/nyc10/MapServer/1/query?where=1=1&outFields=*&outSR=4326&f=geojson",

  // });

  map.addLayer({
    "id": "viz",
    "type": "fill-extrusion", 
    // "maxzoom":20,
    // "source": "section0",
    "source":{
      type: "vector",
      url: "mapbox://cjycathy.bniasq97",
      // "https://geogws003.ad.umd.edu:6443/arcgis/rest/services/GEOG677_Summer2019/nyc10/MapServer/1/query?where=1=1&outFields=*&outSR=4326&f=geojson",
    },
    "source-layer": "total-3msea5",
    "layout": {'visibility': 'visible'},
    "paint": {
      'fill-extrusion-height': ["*", ["get", "p"], 2],
      "fill-extrusion-color": 
      // ['get','color']
      {"base": 1,
                           "type": "interval",
                           "property": "p",
                           "stops": [[0, "RGB(70, 137, 232)"],
                           [200, "RGB(148, 214, 242)"],
                           [400, "RGB(245, 250, 95)"],
                           [600, "RGB(250, 167, 95)"],
                           [800, "RGB(242, 24, 24)"],
                           [1000, "RGB(242, 24, 24)"]],
                           "default": "#800026"}
    },
  });
  map.setFilter('viz', ["==", "timeperi_1",0]);
                                                            
  // Draw sliders.
  getSliders();

// Visualization District filters.
cbn.on("change", function() { 
    
  // Init a set of all districts.
  var filter = new Set([1,2,3,4,5]);

  // Add and remove callbacks.
  (cb1.property("checked")) ? filter.add(4) : filter.delete(4);
  (cb2.property("checked")) ? filter.add(1) : filter.delete(1);
  (cb3.property("checked")) ? filter.add(2) : filter.delete(2);
  (cb4.property("checked")) ? filter.add(5) : filter.delete(5);
  (cb5.property("checked")) ? filter.add(3) : filter.delete(3);


  // Set the filter based on the set.
  map.setFilter('viz', ['in', 'zonecode'].concat(Array.from(filter)));
  
});

  // Modes control.
  vizControl.on('click', function () {changeMode({id: 'viz'});});
  storyControl.on('click', function () {changeMode({id: 'story'});});


  // Initialize app mode.
  if (media == "full") changeMode({id: 'story'});
  if (media == "mobile") changeMode({id: 'viz'});

});

// Set default map cursor to a hand.
map.getCanvas().style.cursor = "default";

