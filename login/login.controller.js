(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    //LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    //function LoginController($location, AuthenticationService, FlashService) {
    function LoginController() {
    	console.log('I am from LoginController');
    	var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
           // AuthenticationService.ClearCredentials();
        })();

        function login() {console.log('I am from LoginController login fn');
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
    }

})();
