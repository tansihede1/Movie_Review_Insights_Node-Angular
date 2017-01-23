/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');

var fs = require('fs');
 
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
//var cfenv = require('cfenv');

// create a new express server
var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));



app.use(function(req,res,next){
    var _send = res.send;
    var sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});

// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();
var port= process.env.PORT || process.env.VCAP_APP_PORT || 3004;
// start server on the specified port and binding host
app.listen(port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on port" + port);
});

/*
var obj = require("./public/data/JSON_Blog.json");
console.log(obj);
*/



//Reads json data

var json_arr = [];
var jsonfile = require('jsonfile');
var file = './public/data/movie_review_updated.json';

var obj =JSON.stringify(jsonfile.readFileSync(file,'utf8'));
var jsonData = JSON.parse(obj);

 //  console.log(jsonData.length);
  // console.log("--------------Information --------");
    for (i = 0; i < jsonData.length; i++) {
		
     json_arr.push({'id':jsonData[i].Name,'Posts':jsonData[i].Data});
    
    }//close for loop
	

//closing of json read

//console.log(json_arr);

///get method to analyze bulk data 


var res1 =[];
var movie_ids=[];

var PersonalityInsightsV2 = require('watson-developer-cloud'),
multer = require('multer');

var creds = {
  username: 'a69582d1-2d35-4ed5-992e-328d97502cfe',
  password: 'ziJPcMKRSlPj'
   
};
creds.version = 'v2';
var personalityInsights = PersonalityInsightsV2.personality_insights(creds);

var uploading = multer({
    storage: multer.memoryStorage()
});

app.set('json spaces', 4);

//analyzes bulk data


app.get('/api/todos',function(req,res){
       
      for(j=0;j<json_arr.length;j++)
{ 
   for(k=0;k<json_arr[j].Posts.length;k++) {
    (function(index){personalityInsights.profile({
        text: json_arr[j].Posts[index].Review},
        function (error, result) {
            if (error) {
                res.send(error);
            }
            else {
                test(result,j,k);
            }
        }
    );
			  }(k));//pi close
   
     
//for loop close

var i=0;
var x=0;
var res2 =[];
var resavg =[]
 var p=0;
function test(result,j,k)
{
    
    //console.log("---------------------------------------------------length " + json_arr.length);
    //console.log("---------------------------------------------------array " + JSON.stringify(json_arr));
    var len = json_arr.length;

	res1.push(result);
	resavg.push(result);
	if(i < len)
		{
            movie_ids.push(json_arr[i].id);
		}
    i++;
    x++;
 //   console.log(json_arr.length);
 var arr =[]

    if( k== x)
	{
    	// need to calculate here avg and add it in different array with id and percentage
		//var dummy =JSON.parse(res1);
		var total1=0;
		var total2=0;
		var total3=0;
		var total4=0;
		var total5=0;
		var len=resavg.length;
		for(l=0;l<resavg.length;l++)
			{   
				total1 += resavg[l].tree.children[0].children[0].children[0].percentage
				total2 += resavg[l].tree.children[0].children[0].children[1].percentage
				total3 += resavg[l].tree.children[0].children[0].children[2].percentage
				total4 += resavg[l].tree.children[0].children[0].children[3].percentage
				total5 += resavg[l].tree.children[0].children[0].children[4].percentage
			}
		arr.push({"Movie":json_arr[p].id,"Pi":{"Opennes":total1/len,"Conscientiousness":total2/len,"Extraversion":total3/len,"Agreeableness":total4/len,"Neuroticism":total5/len}});
        //console.log(arr);
        res2.push(arr);
       // console.log(">>>>>>>>>>>" +JSON.stringify(resavg));
        x=0;
		p++;
	    resavg=[];
     
	}
    
	if((j*k) == i)
        {
        //send here final response with 5 values
      //  console.log("resavg----------------------------->>>>>>>>>>>" +JSON.stringify(res2)); 
        //console.log("res1----------------------------->>>>>>>>>>>" +JSON.stringify(res1));
        var openness =[];
        var Conscientiousness =[];
        var Extraversion =[];
        var Agreeableness =[];
        var Neuroticism =[];
        var sorted = [];
        for(n=0;n<res2.length;n++)
        {
            openness.push({key:res2[n][0].Movie,value:res2[n][0].Pi.Opennes});
            Conscientiousness.push({key:res2[n][0].Movie,value:res2[n][0].Pi.Conscientiousness});
            Extraversion.push({key:res2[n][0].Movie,value:res2[n][0].Pi.Extraversion});
            Agreeableness.push({key:res2[n][0].Movie,value:res2[n][0].Pi.Agreeableness});
            Neuroticism.push({key:res2[n][0].Movie,value:res2[n][0].Pi.Neuroticism});
        }
        openness = openness.sort(function (a, b) {
                    return b.value-a.value;});
        Conscientiousness = Conscientiousness.sort(function (a, b) {
                    return b.value-a.value;});
        Extraversion = Extraversion.sort(function (a, b) {
                    return b.value-a.value;});
        Agreeableness = Agreeableness.sort(function (a, b) {
                    return b.value-a.value;});
        Neuroticism = Neuroticism.sort(function (a, b) {
                    return b.value-a.value;});
    
sorted.push({key:'Openness',value:openness},{key:'Conscientiousness',value:Conscientiousness},{key:'Agreeableness',value:Agreeableness},{key:'Extraversion',value:Extraversion},{key:'Neuroticism',value:Neuroticism});
      //  console.log(sorted);
        res.json({'res1' : res1,'resavg':res2,'len' : len ,'movie_ids' :movie_ids,'sorted_avg':sorted});
        }
	
////	
}


   } 
   
}

}); //closing of get


//finds insights based on entered text

app.post('/api/todos',function(req,res){  

    console.log(req.body.formData);
    var text = req.body.formData;
    
    personalityInsights.profile({
        text: text },
        function (error, result) {
            if (error) {
                res.json({'Err': error});
				//console.log(error);
            }
            else {
                res.json(result);
				console.log(result);
                
            }
        }
    );
});


//populates dropdown

app.get('/api/listDrpdwn',function(req,res){

    var arrlistmovies =[];var moviearry=[];


	for(i=0;i<json_arr.length;i++)
	{ 
	  arrlistmovies.push(json_arr[i].id);
      var arrlistauthors= [];

	   for(j=0;j<json_arr[i].Posts.length;j++)
	   { arrlistauthors.push(json_arr[i].Posts[j].Author);}
	  
		moviearry.push(arrlistauthors);
	}
	   return res.json({'arrlistmovies' :arrlistmovies,'arrlistauthors':arrlistauthors,'moviearry':moviearry});
}); //closing if get





// get AVERAGE data based on movie
	app.get('/api/getbyid/:movie_val', function(req, res) {
		//console.log('get by movie');
		var value = req.params.movie_val;
		var dataset =[];
		
		for(i=0;i<json_arr.length;i++)
		{
		if(json_arr[i].id == value)
			
		  dataset= json_arr[i].Posts;
		}
		
         for(k=0;k<dataset.length;k++) {
    (function(index){personalityInsights.profile({
        text: dataset[k].Review},
        function (error, result) {
            if (error) {
                res.send(error);
            }
            else {
                test_avg(result,k);
            }
        }
    );
			  }(k));
		 }

var i=0;
var resavg =[]
function test_avg(result,k)
{
    
    console.log("******" + result);
    console.log("%" + k);

	resavg.push(result); //full result for 3 reviews
    i++;
 //   console.log(json_arr.length);
 var arr =[]

    if( k== i)
	{
    	// need to calculate here avg and add it in different array with id and percentage
		//var dummy =JSON.parse(res1);
		var total1=0;
		var total2=0;
		var total3=0;
		var total4=0;
		var total5=0;
		var len=resavg.length;
		for(l=0;l<resavg.length;l++)
			{   
				total1 += resavg[l].tree.children[0].children[0].children[0].percentage
				total2 += resavg[l].tree.children[0].children[0].children[1].percentage
				total3 += resavg[l].tree.children[0].children[0].children[2].percentage
				total4 += resavg[l].tree.children[0].children[0].children[3].percentage
				total5 += resavg[l].tree.children[0].children[0].children[4].percentage
			}
		arr.push({"Movie":value,"Pi":{"Opennes":total1/len,"Conscientiousness":total2/len,"Extraversion":total3/len,"Agreeableness":total4/len,"Neuroticism":total5/len}});
      //  console.log(arr);
        res.json({'resavg':arr,'len' : len,'res1':resavg });
    	}
}

}); //closing of get AVERAGE data based on movie


		

// get data based on movie and author

		app.get('/api/getbyreviewid/', function(req, res) {
      //  console.log('get by author');
        var author = req.query.author;
        var movienm = req.query.movienm;		
		var res3;
		//console.log(author +'-->' + movienm);
		for(i=0;i<json_arr.length;i++)
		{
		if(json_arr[i].id == movienm)
		  { 
			for(j=0;j<json_arr[i].Posts.length;j++)
			{
				if(json_arr[i].Posts[j].Author == author)
				{    console.log("author matched");
					res3= json_arr[i].Posts[j].Review;
				     }
		     }
		  }
		}
		
     personalityInsights.profile({
        text: res3 },
        function (error, result) {
            if (error) {
                res.send(error);
            }
            else {
                res.json(result);
                
            }
        }
    );
}); //closing of get		
		
		
//---Deployment Tracker---------------------------------------------------------
require('cf-deployment-tracker-client').track();



 app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });



