# Movie Review Insights

A Movie Review Insights is built with node.js,Angular,jQuery and IBM Watson Personality Insights Service, For demonstration purposes and a tutorial.

Node provides the RESTful API. Angular provides the frontend and accesses the API.


##Personality Insights service 

The IBM Watson Personality Insights service uses linguistic analysis to extract cognitive and social characteristics from input text such as email, text messages, tweets, forum posts, and more. By deriving cognitive and social preferences, the service helps users to understand, connect to, and communicate with other people on a more personalized level.

## Requirements

- [Node and npm](http://nodejs.org)

##Running locally

The application uses Node.js and npm so you will have to download and install them as part of the steps below.

	1.Clone the repository: `https://github.com/tansihede1/Movie_Review_Insights_Node-Angular`
	2.Copy the credentials from your personality-insights-service service in Bluemix to credentials.json, you can see the credentials using:

    $ cf env <application-name>

    Example output:

    System-Provided:
    {
    "VCAP_SERVICES": {
      "personality_insights": [{
          "credentials": {
            "url": "<url>",
            "password": "<password>",
            "username": "<username>"
          },
        "label": "personality_insights",
        "name": "personality-insights-service",
        "plan": "IBM Watson Personality Insights Monthly Plan"
     }]
    }
    }

    3. You need to copy username, password and url.
    4. Install Node.js
    5. Go to the project folder in a terminal and run: npm install
    6. Start the application
      npm start
    7. Go to http://localhost:3004


![Movie-Review-Insights](http://i.imgur.com/a/lo0EC.png)
