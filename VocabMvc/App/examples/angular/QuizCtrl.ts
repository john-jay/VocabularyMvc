module Angular {
    export class QuizCtrl {
        testItems: VocItem[];
        choices: string[];
        seq = 0;

        curItem: VocItem;
        isCorrect = undefined;
        isComplete = false;

        public static $inject = ['$scope', '$http'];
        constructor(private $scope: ng.IScope, private $http: ng.IHttpService) {
            this.loadData();
        }

        loadData() {
            this.$http.get('/Assets/VocTest.json').then((response) => {
                var data = <any>response.data;
                var items = <VocItem[]>data.lesson; 
                this.testItems = Util.mixUp(items); // randomized questions
                this.choices = $.map(items, item => { return item.word; }).sort(); // sorted answers
                this.goNext();
            });
        }
        clickWord = (clickedItem: string) => {
            // show "correct" message and next button
            var isCorrect = clickedItem === this.curItem.word;
            this.isCorrect = isCorrect;
        }
        goNext = () => {
            this.isCorrect = undefined;
            if (this.seq === this.testItems.length) {
                this.curItem = null;
                this.choices = [];
                this.isComplete = true;
            } else {
                this.curItem = this.testItems[this.seq];
                this.seq++;
            }
        }

    }
}
