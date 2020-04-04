# SPATIOTEMPORAL-ANALYSIS-OF-PUBLIC-SENTIMENT-WITH-TWITTER-A-CASE-STUDY-IN-NEW-YORK-CITY-USA

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155723487.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dvbGRnaXJseQ==,size_16,color_FFFFFF,t_70)
Figure 1 Flowchart of the visualization

Spatial Processing
The point layer was buffered with the distance of 100 meters and the feature envelop to polygon tool was used to get polygon features. The polygon layer was converted into GeoJSON format and published to the Mapbox Studio as a tileset file so that it could be added as a source layer with the Mapbox API. 
	Web GIS Application Building
The Mapbox GL JS is a JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles. It is part of the Mapbox GL ecosystem, which includes Mapbox Mobile, a compatible renderer written in C++ with bindings for desktop and mobile platforms. 
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155732375.png)
Figure 9 Architecture of the Web GIS Application
The new mapboxgl.Map was used to create a new map object. The map object exposed methods and properties to programmatically change the map, and fired events as users interact with it. 

Use the new mapboxgl.Map to create a new map object. 
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155538712.png)
Figure 2 mapboxgl.Map Object

The on() method was used to initialize and call functions for the map. In this method, there were addLayer() and setFilter methods. The addlayer() added a Mapbox style layer to the map's style with the tileset source uploaded to the Mapbox studio. In the addlayer() method the fill-extrusion property could be used to create a 3D bar graph for better visualization. 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155546432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dvbGRnaXJseQ==,size_16,color_FFFFFF,t_70)
Figure 3 addlayer() method

The D3.js is a JavaScript library used to bind data to a Document Object Model (DOM), and then apply data-driven transformations to the document. The time range within the days of the week and hours of the day was implemented by drawing a slider with d3.slider() . 
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155553346.png)
Figure 4 d3.slider() method

The slideTimeCallback() and slideendTimeCallback() function can return the time range to show the time change on the page and get the sentiment score. So did the change of the days of the week.
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020040415555932.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dvbGRnaXJseQ==,size_16,color_FFFFFF,t_70)
Figure 5 slideTimeCallback() and slideendTimeCallback() function

When the user change the slider, the d3.select() method would be used to call the d3.slider() method.
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155605499.png)
Figure 6 d3.select() method

Once the slider was changed, the changeTime() function would be called to update the data shown on the map with the setFilter() method of the map object. The daytime variable was the combination of day and time value got from the slider of days of the week and time period of the day.
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155610182.png)
Figure 7 changeTime() function

In the story mode, the slider changed with different story by a updateStoryDaytime() function, which called the slideTimeCallback() function to update the data shown on the map with the setFilter() method at nyc.js. The sliders on the map were moved by the value() method of the sliderTime object.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155615867.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dvbGRnaXJseQ==,size_16,color_FFFFFF,t_70)
Figure 8 updateStoryDaytime() function

The district box was check as the story page change with updateStoryDistricts() function with d3.select().property() method. The data on the map was updated with the setFilter() method.![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404155621974.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dvbGRnaXJseQ==,size_16,color_FFFFFF,t_70)
Figure 9 updateStoryDistricts() function
