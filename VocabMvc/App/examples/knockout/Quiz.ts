module Knockout {
    class Quiz {
        testItems: VocItem[];
        choices = ko.observableArray<string>();
        seq = 0;

        curItem = ko.observable<VocItem>();
        isCorrect = ko.observable(undefined);
        isComplete = ko.observable(false);

        constructor() {
            this.loadData();
        }

        loadData() {
            $.getJSON("/Assets/VocTest.json", data => {
                var items: VocItem[] = $.map(data.lesson, item => {
                    return new VocItem(item);
                });
                this.testItems = Util.mixUp(items);
                var choices = $.map(items, item => { return item.word; }).sort();
                this.choices(choices);
                this.goNext();
            });
        }
        clickWord = (clickedItem: string) => {
            // show "correct" message and next button
            var isCorrect = clickedItem === this.curItem().word;
            this.isCorrect(isCorrect);
        }
        goNext = () => {
            this.isCorrect(undefined);
            if (this.seq === this.testItems.length) {
                this.curItem(null);
                this.choices([]);
                this.isComplete(true);
            } else {
                this.curItem(this.testItems[this.seq]);
                this.seq++;
            }
        }
    }

    ko.applyBindings(new Quiz());
}