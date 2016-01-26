/**
 * Main AngularJS Headless Web Application 
 */
var app = angular.module('headlessWebApp', [
  'ngRoute','ngSanitize', 'ngCookies', 'ui.bootstrap', 'ngAnimate'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "HomeCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "FaqPageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "ServicesCtrl"})
    .when("/news", {templateUrl: "partials/news.html", controller: "NewsCtrl"})
	  .when("/news/:newsName", {templateUrl: "partials/newspage.html", controller: "NewsPageCtrl"})
    .when("/feedback", {templateUrl: "partials/contact.html", controller: "ContactCtrl"})
    .when("/feedback/:feedbackName", {templateUrl: "partials/feedbackpage.html", controller: "feedbackPageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    
    .when('/login', {
          controller: 'LoginController',
          templateUrl: 'login/login.view.html',
          controllerAs: 'vm'
      })

     .when('/register', {
          controller: 'RegisterController',
          templateUrl: 'register/register.view.html',
          controllerAs: 'vm'
      })
    
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);


// Controller function and passing $http service and $scope var.
app.controller('LoginController', function($scope, $http, $route, $routeParams) {
  console.log('I am from LoginController main.js');
  //console.log($scope);
  
  $scope.login =function() {

    console.log('I am from LoginController login fn');

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://headlessdrupal.in/user/login",
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
       // "postman-token": "01d4e1dc-3508-3793-21c1-56386559f9f6",
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": {
        "name": username,
        "pass": password,
        "form_id": "user_login_form"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });



           /* vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });*/
        };
});

// Controller function and passing $http service and $scope var.
app.controller('RegisterController', function($scope, $http, $route, $routeParams) {
  console.log('I am from RegisterController main.js');
  console.log($scope);
  
  function register() {

    console.log('I am from RegisterController register fn');
           /* vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });*/
        };
});

// Controller function and passing $http service and $scope var.
app.controller('postController', function($scope, $http) {
	
	console.log($scope);
	
  // create a blank object to handle form data.
    $scope.user = {};
  // calling our submit function.
    $scope.submitForm = function() {
    // Posting data to php file
   /* $http({
      method  : 'POST',
      url     : 'clone.php',
      data    : $scope.user, //forms user object
      headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
     })
      .success(function(data) {
        if (data.errors) {
          // Showing errors.
          $scope.errorName = data.errors.name;
          $scope.errorUserName = data.errors.username;
          $scope.errorEmail = data.errors.email;
        } else {
          $scope.message = data.message;
        }
      });*/
    };
});


app.controller('MenuCtrl', function ($scope, $http) {
  $http.get("http://headlessdrupal.in/api/menu/news?_format=hal_json")
  .success(function (response) {	
	  $scope.menus = response;	
  });  
});


app.controller('ContactCtrl', function ($scope, $http, getContactData, $cookies) {
	      getContactData.tasks(function(data){  
            $scope.data = data;      
            $scope.feedbackDatas = data;   
            $scope.viewby = 5;
            $scope.totalItems = $scope.data.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5; //Number of pager buttons to show            
        });
        
        $scope.submitFeedBackform = function () {
          
          var package = {}; var msg_title = '';
          if(jQuery.trim($scope.contact_title).length > 1){            
            msg_title = jQuery.trim($scope.contact_title);
          }else{
            msg_title = jQuery.trim($scope.message).substring(0, 60).split(" ").slice(0, -1).join(" ");  
          }
          

          package.title= [{'value': msg_title}]
          package.body= [{'value':  $scope.message}]        
          package.field_name= [{'value': $scope.contact_name}]
          package.field_phone_number= [{'value': $scope.contact_phone}]
          package.field_email= [{'value': $scope.contact_email}]
          package._links = {"type":{"href":"http://headlessdrupal.in/rest/type/node/feedback"}}

          var tokenVal = '';
         $http.get("http://headlessdrupal.in/rest/session/token")
            .success(function (tokenVal) {  
              console.log(tokenVal);
              $http({
                url : 'http://headlessdrupal.in/entity/node',
                async:true,
                crossDomain:true,
                beforeSend: function (request) {
             //     request.setRequestHeader("X-CSRF-Token", tokenVal);
                },
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept':'application/json',                  
                //     "X-CSRF-Token": tokenVal,
                // }, 
                data: JSON.stringify(package),
               // data : package,
                contentType: "application/json",
                dataType: "json",
                method : 'POST',
               })
              .success(function(data){
                  $scope.contact_title = '';
                  $scope.message = '';
                  $scope.contact_name = '';
                  $scope.contact_phone = '';
                  $scope.contact_email = '';
             /*     var now = new Date();
                  var minutes = 2;
                  var exp = new Date(now.getTime() + minutes * 60 *1000);
                  $cookies.put('myfeedBack', '1', {'expires': exp});*/

                  var thanksMsg = '<h3>Thanks for submitting your feedback</h3>';
                  $('#feedBackForm').html(thanksMsg);
                  getContactData.tasks(function(data){         
                      $scope.data = data;      
                      $scope.feedbackDatas = data;   
                      $scope.viewby = 5;
                      $scope.totalItems = $scope.data.length;
                      $scope.currentPage = 1;
                      $scope.itemsPerPage = $scope.viewby;
                      $scope.maxSize = 5; //Number of pager buttons to show       
                  });
              }
          );
          });
        };	
});


app.controller('feedbackPageCtrl', function ($scope, $http, $route, $routeParams) {
    console.log("Page Controller reporting for duty feedbackPageCtrl.");
    console.log($routeParams.feedbackName);
    var routeParamsVal = jQuery.trim($routeParams.feedbackName);

    if(jQuery.trim($routeParams.feedbackName1).length >= 1){            
        routeParamsVal = routeParamsVal+'/'+jQuery.trim($routeParams.feedbackName1);
    }
    if(jQuery.trim($routeParams.feedbackName2).length >= 1){            
        routeParamsVal = routeParamsVal+'/'+jQuery.trim($routeParams.feedbackName2);
    }

     $http.get("http://headlessdrupal.in/"+routeParamsVal+"?_format=hal_json")
    .success(function (response) { console.log(response.title[0].value);
     $scope.myHTMLTitle = response.title[0].value;
     $scope.myHTML =response.body[0].value;
      
    });
});



/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
 /* // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })*/
});

app.controller('HomeCtrl', function ($scope, $http) {

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var currIndex = 0;

    $http.get("http://headlessdrupal.in/api/slider?_format=hal_json")
      .success(function (response) {
          $scope.slides = response;     
    });  
	
	  $http.get("http://headlessdrupal.in/node/5?_format=hal_json")
	     .success(function (response) {
    		 $scope.myHTML =response.body[0].value;
    		 $scope.myHTMLTitle =response.title[0].value;
	  });
});

app.controller('NewsCtrl', function ($scope, $http) {
	  console.log("Page Controller reporting for duty NewsCtrl.");
	  
	  $http.get("http://headlessdrupal.in/api/news?_format=hal_json")
  	  .success(function (response) {
  		    $scope.news = response;		  
	  });
});

app.controller('NewsPageCtrl', function ($scope, $http, $route, $routeParams) {
	  console.log("Page Controller reporting for duty NewsPageCtrl.");
	  console.log($routeParams.newsName);
	   $http.get("http://headlessdrupal.in/news/"+$routeParams.newsName+"?_format=hal_json")
	  .success(function (response) { console.log(response.title[0].value);
		 $scope.myHTMLTitle = response.title[0].value;
		 $scope.myHTML =response.body[0].value;
		  
	  });
});

app.controller('ServicesCtrl', function ($scope, $http) {
	  $http.get("http://headlessdrupal.in/node/3?_format=hal_json")
	  .success(function (response) {
		 $scope.myHTML =response.body[0].value;		  
	  });
});

app.controller('FaqPageCtrl', function ($scope, $http) {        
	  $http.get("http://headlessdrupal.in/api/faq?_format=hal_json")
	  .success(function (response) {
		  $scope.faqs = response;	  
	  });
    $scope.oneAtATime = true;

});

/*app.controller('LoginController', function ($scope, $http,$route, $routeParams) {
	console.log('I am from LoginController');
});
app.controller('RegisterController', function ($scope, $http) {
    
});*/