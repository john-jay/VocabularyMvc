module Angular {
    angular.module('app', [
        // Angular modules
        'ngAnimate',
        'ngRoute'

        // Custom modules

        // 3rd Party Modules
        
    ])
        .controller('QuizCtrl', QuizCtrl)
        .directive('vocabFeedback', () => {
            return {
                templateUrl: 'vocab-feedback.html'
            }
        });
}
