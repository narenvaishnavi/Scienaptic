    var app=angular.module('single-page-app',['ngRoute']);


    app.config(function($routeProvider){


          $routeProvider
              .when('/',{
                    templateUrl: 'home.html'
              })
              .when('/chart',{
                    templateUrl: 'chart.html'
              });


    });


    app.controller('cfgController',function($scope,$http){

        // To fetch JSON response
        $http({
                method : "GET",
                url : "response.json"
              }).then(function sucessHandler(response) {
                  $scope.myWelcome = response.data;
                }, function errorHandler(response) {
                  $scope.myWelcome = response.statusText;
              });

        // Method call for Chart.js
         $scope.clickMe = function(res,conceptName){
            angular.forEach($scope.myWelcome,function(value,key){
             if(res == value.cid){
                 $scope.name = conceptName;
                  if(value.freqCount != undefined){
                      $scope.data = Object.values(value.freqCount);
                  }
                  else{
                      $scope.data = Object.values(value.graph);
                  }
             }
         });
         // Chart.js
         var barChartData = {
            labels : $scope.data,
            datasets : [
                {
                    fillColor : "#B22222",
                    strokeColor : "#B22222",
                    highlightFill: "#808080",
                    highlightStroke: "#808080",
                    data : $scope.data
                }
            ],
      scaleGridLineColor : "#000"

        }
      $( document ).ready(function() {
        var c = document.getElementById("winners");
        var ctx = c.getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : false
     });
    });
  }

});
