var Angular;
(function (Angular) {
    angular.module('app', [
        // Angular modules
        'ngAnimate',
        'ngRoute'
    ])
        .controller('QuizCtrl', Angular.QuizCtrl);
})(Angular || (Angular = {}));
