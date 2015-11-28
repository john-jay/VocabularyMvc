﻿
module Angular { 
    export class QuizCtrl {
        testItems: VocItem[];
        choices: string[];
        seq = 0;

        curItem : VocItem;
        showCorrect = false;
        randomChoices : string[];
        isComplete = false;

        public static $inject= ['$scope'];
        constructor(private $scope: ng.IScope) {
            this.loadData();
        }

        loadData() {
            $.getJSON("/Assets/VocTest.json", data => { // May use ng-service
                var items: VocItem[] = $.map(data.lesson, item => {
                    return new VocItem(item);
                });
                this.testItems = items;
                this.choices = $.map(items, item => { return item.word; });
                this.goNext();
                this.randomChoices = Util.mixUp(this.choices);
                this.$scope.$apply();
            });
        }
        clickWord = (clickedItem: string) => {
            // show "correct" message and next button
            var isCorrect = clickedItem === this.curItem.word;
            this.showCorrect = isCorrect;
        }
        goNext = () => {
            this.showCorrect = false;
            if (this.seq === this.testItems.length) {
                this.curItem =null;
                this.randomChoices =[];
                this.isComplete = true;
            } else {
                this.curItem = this.testItems[this.seq];
                this.seq++;
            }
        }

    }
}
