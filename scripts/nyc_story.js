///////////// VARS ///////////////
var pageNum = 1;
var backButton = d3.select("#story-back");
var forwardButton = d3.select("#story-forward");
var pageNumbers = d3.select("#storymode-controls-numbers");
var storyHeader = d3.select("#storymode-header");
var storyContent = d3.select("#storymode-content p");

// STORIES //
var stories = [

  { title: "The Story of NYC Public Sentiment",
    description: "The visualization you see here is a model of the dynamic public sentiment of New York City for a typical week in October 2019. The public sentiment score estimates are the result of a sentiment analysis on twitter data with a deep learning neural network. You may exit the story at any time by selecting the ‘Visualization’ tabs in the header above.  For more information, click ‘About’.  To continue, click the arrows below.",
    districts: [1,2,3,4,5],
    day: currentDay,
    time: currentHour,
    flyTo: {
      zoom: 11.75,
      center: [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3,
      curve:0
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3,
      curve:0
    }
  },

  { title: "Monday Blue",
    description: "On Monday, the sentiment fell below the average since people return to work and routine after break at weekends, which is known as Monday Blues. It contains elements of depression, tiredness, hopelessness and a sense that work is unpleasant but unavoidable. The emotion continued to fall till Tuesday and went up to the peak on Saturday.",
    districts: [1,2,3,4,5],
    day: 0,
    time: 21,
    flyTo: {
      zoom: 11.75,
      center: [-73.9245, 40.7251],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3,
      curve:0
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.9245, 40.7251],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3,
      curve:0
    }
  },

  { title: "4th most congested city in the US",
    description: "The lowest average sentiment score was found in the transportation area. As the annual INRIX Global Traffic Scorecard in 2018 indicated, the NYC ranked 4th of the most congested city in the US. Traffic problem can lead to aggressive driving even road rage. Aggressive driving can refer to any display of aggression by a driver, tailgating, flashing headlights, speeding or weaving through traffic are just some forms of aggressive driving. Extreme acts of physical assault are commonly called Road Rage.",
    districts: [5],
    day: 0,
    time: 0,
    flyTo: {
      zoom: 11.75,
      center: [-73.99, 40.755],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3,
      curve:0
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.98, 40.70],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3,
      curve:0
    }
  },

  { title: "Weekend Effect",
    description: "People experience better moods, greater vitality, and fewer aches and pains from Friday evening to Sunday afternoon, the variation of sentiment analysis result revealed. And that 'weekend effect' is largely associated with the freedom to choose one's activities and the opportunity to spend time with loved ones, the research found.",
    districts: [1,2,3,4,5],
    day: 6,
    time: 12,
    flyTo: {
      zoom: 11.75,
      center: [-73.9350, 40.6449],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3,
      curve:0
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.9350, 40.6449],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3,
      curve:0
    }
  },
  
];

///////////// FUNCTIONS ///////////////

// Update Districts.
function updateStoryDistricts(districts) {

  // Update the sidebar filter.
  d3.select("#cb1").property("checked", (districts.indexOf(4) > -1) ? true : false);
  d3.select("#cb2").property("checked", (districts.indexOf(1) > -1) ? true : false);
  d3.select("#cb3").property("checked", (districts.indexOf(2) > -1) ? true : false);
  d3.select("#cb4").property("checked", (districts.indexOf(5) > -1) ? true : false);
  d3.select("#cb5").property("checked", (districts.indexOf(3) > -1) ? true : false);

  // Update the map.
  if (map)
    map.setFilter('viz', ['in', 'zonecode'].concat(districts));
};


// Update Daytime.
function updateStoryDaytime(day,time){

  // var daytime = (day*24 + time).toString();

  // Update the slider.
  slideTimeCallback(d3.event, time);
  slideendTimeCallback(d3.event, time);
  sliderTime.value(time);

  slideDayCallback(d3.event, day);
  slideendDayCallback(d3.event, day);
  sliderDay.value(day);

  // Update the map.
  if(map) {

    map.setPaintProperty("viz",
                         "fill-extrusion-height",
                         ["*", ["get", "p"], 2]);

    map.setPaintProperty("viz",
                          "fill-extrusion-color",
                          {"base": 1,
                           "type": "interval",
                           "property": "p",
                           "default": "#800026",
                           "stops": 
                           [[0, "RGB(70, 137, 232)"],
                           [200, "RGB(148, 214, 242)"],
                           [600, "RGB(245, 250, 95)"],
                           [800, "RGB(250, 167, 95)"],
                           [900, "RGB(242, 24, 24)"],
                           [1000, "RGB(242, 24, 24)"]],
                           "default": "#800026"});
  };
};

// Update Story.
function updateStory(storyObj) {
  
  // Story vars.
  var title = storyObj['title'];
  var description = storyObj['description'];
  var districts = storyObj['districts'];
  var day = storyObj['day'];
  var time = storyObj['time'];
  if (media == "full")
    var cameraSettings = storyObj['flyTo'];
  else
    var cameraSettings = storyObj['flyToMobile'];

  // Update the Storymode content.
  storyHeader.text(title);
  storyContent.text(description);

  // Update the District filters.
  updateStoryDistricts(districts);

  // Update the daytime.
  updateStoryDaytime(day,time);

  // Update Camera.
  map.flyTo(cameraSettings);
};


///////////// CALLBACKS ///////////////

// Story mode click through FORWARD.
backButton.on("click", function () {
  
  // Update the Navigation bottom panel.
  pageNum = pageNum - 1;
  pageNumbers.text(pageNum + " of " + stories.length);
  backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
  forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

  // Update the story.
  updateStory(stories[pageNum-1]);
});

// Story mode click through BACKWARD.
forwardButton.on("click", function () {
  
  // Update the Navigation bottom panel.
  pageNum = pageNum + 1;
  pageNumbers.text(pageNum + " of " + stories.length);
  backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
  forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

  // Update the story.
  updateStory(stories[pageNum-1]);
});

