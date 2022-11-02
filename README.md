# Public Sentiment Map of New York City
This map was one part of the capstone project of my MS degree in Geospatial Information Science. The visualization is a model of the dynamic public sentiment of New York City for a typical week in October 2019.

Big data from social media can make large profit and benefit daily life. However, current research and application focus on the descriptive analysis of the public sentiment lacking of the spatiotemporal pattern of sentiment polarity with quantitative analysis. In this capstone project, the spatial and temporal pattern of sentiment distribution of twitter data was analyzed to understand the spatial and temporal distribution of public happiness within New York City with a multivariate linear mixed-effect model. The twitter data was retrieved with Twitter Streaming API from October 14, 2019 to October 20, 2019 and cleaned with NLTK tool and regular regression. The Sentiment analysis was implemented with a deep learning model with LSTM neural network. The fixed effect of land use and time period to the sentiment score was investigated with a multivariate linear mixed-effects model. Finally, the tweets with sentiment score were visualized as a Web GIS Application. 43693 tweets were left in the NYC region after the data cleaning and spatial processing. The sentiment analysis result showed that half of the sentiment were positive (53.01%) and the other half were neutral (34.57%) and negative (12.42%). The result of linear mixed-effect model indicated the significant effect of time period, days of the week and land use type on the sentiment score. Among these fixed effects, the effect of land use categories was the largest. The result of the fixed effect revealed that the sentiment decreased by 0.084362 in the transportation area during late night on Friday than the sentiment in the recreation area before dawn on Saturday.

More details can be found from the poster below:
![GEOG797_poster_116374064_JinyiCai](https://user-images.githubusercontent.com/21276755/199408682-89ec07d4-f8b8-442c-b3c9-273ca817199b.jpg)


Design, Development, Data & Modelling - [Jinyi Cai](https://cjycathy.github.io/) <br/>
Map engine - [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/)<br/>
Graphing engine - [D3.js](https://d3js.org)
