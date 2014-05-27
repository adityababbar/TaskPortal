/**
 * Created by adityababbar on 5/26/14.
 */

var taskApp = angular.module('TaskApp' ,[]);



function TaskController($scope, $http){


        // when landing on the page, get all tasks and show them
        $http.get('/api/tasks')
        .success(function(data) {
            $scope.tasks = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        var addTask=function(){
            $http.post('/api/tasks', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }


}
