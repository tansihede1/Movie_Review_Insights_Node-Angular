// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    
 
    $scope.formData = {};
    $scope.mydata = {};
    
 
    $scope.loadData = function(){
     $http.get('/api/listDrpdwn')
        .success(function(data) {
           
            $scope.blog_ids = data;
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    };
    
    $scope.loadData();
    
    
/*     $scope.fetchdata = function(id) {
        $http.get('/api/todoslist/' + id)
            .success(function(data) {
                $scope.fetcheddata = data;
                console.log(data);  
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    */
    

  /*  // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
          //  $scope.todos = data;
           // console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });*/

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {

     var dt = JSON.stringify($scope.formData);
     alert(dt);
        
     var params = { 
      'formData' : $scope.formData
      };
   
        $http.post('/api/todos' , params)
            .success(function(response) {

            $scope.mydata = response;
            
            for (var i=0;i< 5 ;i++)
            {
            console.log("*********BIG 5********")    
            console.log("id" + JSON.stringify( $scope.mydata.tree.children[0].children[0].children[i].id )) ;
            console.log("id" + JSON.stringify($scope.mydata.tree.children[0].children[0].children[i].percentage ) );   
            console.log("id" + JSON.stringify($scope.mydata.tree.children[0].children[0].children[i].sampling_error )) ;
            }
            
            
            var needsData = $scope.mydata.tree.children[1].children[0].children;                
            var valuesData = $scope.mydata.tree.children[2].children[0].children;
            

                if(response.code == 400)
                    console.log(response.error);
                
   
                 else 
                     console.log("Number of words are perfect");
            })
            .error(function(response) {
                console.log('Error: ' + response);
            });
        
        
        
        
 
	
     
    };
    
    
    //Analyze bulk data
    
    
    
      // when submitting the add form, send the text to the node API
    $scope.createTodobulk = function() {
   
        
     //   alert("hitting bulk");
        $http.get('/api/todos')
            .success(function(sucess) {

     
            $scope.mydatabulk = sucess.res1; //get responses
            $scope.blog_ids = sucess.blog_ids;
            
            console.log("+++" + sucess.res1[0].tree.children[0].children[0].children[0].id + "++++++++++++" +sucess.res1[0].tree.children[1].children[0].children[0].id);
            var len1 = $scope.length;
           /* for(var i=0;i<len1;i++)
            {
            
            $scope.mydatabulk[len1]=sucess.res1[len1];
            }*/
            
            
           // alert("1st value--->" + $scope.mydatabulk[0].tree.children[0].children[0].children[0].id)
            $scope.length = sucess.len; //get the length of responses
  
            $scope.getlength = function(leng) {
                return new Array(leng);   
            }
            
            
            $scope.big5length =5;
            $scope.getbig5length = function(leng){
            
            return new Array(leng);
            }
            
           // console.log(JSON.stringify(arr));
            //alert(sucess[0].tree.children[0].children[0].children.length);
       //   console.log(JSON.stringify(sucess));
        
           alert( "*****************" + $scope.mydatabulk[0].tree.children[0].children[0].children[0].percentage);
           /* 
            for(var i=0;i<$scope.length;i++)
            {
             var length_BIG5 = $scope.mydatabulk[i].tree.children[0].children[0].children.length; //returns length of big5 for 1t response
             var length_NEEDS = $scope.mydatabulk[i].tree.children[1].children[0].children.length;
             var length_VALUES = $scope.mydatabulk[i].tree.children[2].children[0].children.length;
            
            alert("for------->" +i + "big5--->"+ length_BIG5 +  " " +length_NEEDS + " " +length_VALUES);
          //       alert("for------->" +i + "big5--->"+ length_BIG5 );
            for (var j=0;j< length_BIG5 ;j++)
            {
            console.log("*********BIG 5********")    
            console.log("id" + JSON.stringify( $scope.mydatabulk[i].tree.children[0].children[0].children[j].id )) ;
            console.log("percentage" + JSON.stringify($scope.mydatabulk[i].tree.children[0].children[0].children[j].percentage ) );   
            console.log("sampling error" + JSON.stringify($scope.mydatabulk[i].tree.children[0].children[0].children[j].sampling_error )) ;
            }
           
            }
         */   
      
         /*
           
           var needsData = $scope.mydata.tree.children[1].children[0].children;    
              var valuesData = $scope.mydata.tree.children[2].children[0].children;*/

                if(sucess.res1.code == 400)
                    console.log(sucess.res1.error);
                
   
                 else 
                     console.log("Number of words are perfect");
            })
            .error(function(sucess) {
                console.log('Error: ' + sucess);
            });
    };

    
    

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);  
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
  
    
}
