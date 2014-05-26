/**
 * Created by adityababbar on 5/26/14.
 */
var taskApp = angular.module('TaskApp' ,['ngRoute']);

    taskApp.config(function($routeProvider){
        $routeProvider.
            when("/",{
                templateUrl: '/TaskPortal/client/partials/showTasks.html',
              controller:'TaskController'
            })
    });


