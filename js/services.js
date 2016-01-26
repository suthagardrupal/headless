/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('headlessWebApp');
app.service('getContactData', function($http){
  this.tasks =  getContactContents;   
  function getContactContents(callback){
    $http.get('http://headlessdrupal.in/api/feedback?_format=hal_json')
            .success(function(data){
            callback(data);
    })
  }
})

