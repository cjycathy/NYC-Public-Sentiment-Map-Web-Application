///////////// VARS ///////////////
var pageNum = 1;
var backButton = d3.select("#story-back");
var forwardButton = d3.select("#story-forward");
var pageNumbers = d3.select("#storymode-controls-numbers");
var storyHeader = d3.select("#storymode-header");
var storyContent = d3.select("#storymode-content p");

// STORIES //
var stories = [

  { //title: "Wet brings Washington DC a cool summer",
    //description: "In 2014, the Washington DC average temperature was 77.7°F, 0.6°F above 2013. It is 2.3°F higher than the lowest temperature from 1962, 2.3°F means the trendy of the global warming is true, and if the increasement achieve 3.6 °F, would “take the climate outside of the range of observations which have been made over the last several hundred thousand years. This lower average than other years may come from the amazing precipitation in 2014. precipitation average across the Washington DC in 2014 was 30.76 inches, 0.82 inch above the 20th century average. This was the 40th wettest year on record for the Washington DC.",
    time: 2014,
    flyTo: {
      zoom: 10,
      center:  [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 9.5,
      center:  [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { //title: "One-month drought brought record high temperatures",
    //description: "In 2015, the Washington DC average temperature was 79.3°F, 1.6°F above 2013,0.9°F above average from 1962. This was the second warmest year in the 121-year period of record for the Washington DC. The warmest year on record was 2012 when the annual average temperature was 81.0°F. This marks the 19th consecutive year that the annual average temperature for the Washington DC was above the 20th century average. Since 1895, when the national temperature records began, the temperature of Washington DC has observed an average temperature increase of 0.14°F per decade.",
    time: 2015,
    flyTo: {
      zoom: 10.5,
      center:  [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.25,
      center:  [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { //title: "The highest temperature in history",
    //description: "In 2016, the Washington DC average temperature was 82.7°F, 3.4°F above 2015,4.6°F above average from 1962. There is an amazing truth is the temperature of this year is so high than the historical period, it has reached the highest temperature in history. This was the warmest year in the 122-year period of record for the Washington DC. This marks the 20th consecutive year that the annual average temperature for the Washington DC was above the 20th century average. The temperature of August 15 in Washington soared to 100 degrees, the hottest so far in that summer. ",
    time: 2016,
    flyTo: {
      zoom: 10.75,
      center:  [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 9.75,
      center: [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { //title: "Slightly August",
    //description: "The August Washington temperature is slightly below average, masking regional extremes. The below-average temperature in August ended a record-long streak of above-average temperatures for the nation that begin in March 2015. In 2017, the Washington DC average temperature was 77.4, 5.3°F below 2016.What was more, it was 0.7°F below of the average temperature since 1962, which greatly alleviated the hot July with an average monthly temperature of 81.7°F. The state-average precipitation total was 3.41 inches, 0.79 inches above average. It was a top 10 cold August maximum temperature during Washington history. ",
    time: 2017,
    flyTo: {
      zoom: 11,
      center:  [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.25,
      center:  [-73.9848, 40.7554],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { //title: "11th driest summer on record",
    //description: "Washington State had its 11th driest summer on record receiving about half the seasonal average. In 2018, the Washington DC average temperature was 81.0°F, same as 2012 and a little below 2016 became the second hottest record from 1962. The temperature was 3.6°F higher than last year and 2.9°F higher than average temperature from 1962, which means a new high temperature cycle was beginning at 2018 again. Continuous drying has caused the number of heat deaths caused by high temperatures to soar, and the total number of deaths in 2018 increased by 1.7% compared with the same period in 2017. ",
    time: 2018,
    flyTo: {
      zoom: 10.25,
      center:  [-73.9848, 40.7554],
      bearing: -15,
      pitch: 48,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 9.75,
      center:  [-73.9848, 40.7554],
      bearing: -15,
      pitch: 48,
      speed: 0.3
    }
  }
  
];

///////////// FUNCTIONS ///////////////

// Update Daytime.
function updateStoryDaytime(time){

  var year = time.toString();

  // Update the slider.
  slideTimeCallback(d3.event, time);
  slideendTimeCallback(d3.event, time);
  sliderTime.value(time);

  // Update the map.
  // if(map) {

  //   map.setPaintProperty("viz",
  //                        "fill-extrusion-height",
  //                        ["*", ["get", year], 5]);

  //   map.setPaintProperty("viz",
  //                         "fill-extrusion-color",
  //                         {"base": 1,
  //                          "type": "interval",
  //                          "property": year,
  //                          "default": "#800026",
  //                          "stops": [[0, "#fff7ec"],
  //                                    [10, "#fdd49e"],
  //                                    [20, "#fee8c8"],
  //                                    [40, "#fdbb84"],
  //                                    [80, "#fc8d59"],
  //                                    [160, "#ef6548"],
  //                                    [320, "#d7301f"],
  //                                    [640, "#b30000"],
  //                                    [1280, "#7f0000"]]});
  // };
};

// Update Story.
function updateStory(storyObj) {
  
  // Story vars.
  var title = storyObj['title'];
  var description = storyObj['description'];
  var time = storyObj['time'];
  if (media == "full")
    var cameraSettings = storyObj['flyTo'];
  else
    var cameraSettings = storyObj['flyToMobile'];

  // Update the Storymode content.
  storyHeader.text(title);
  storyContent.text(description);

  // Update the daytime.
  updateStoryDaytime(time);

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

