class Util {
    // Returns a random integer between min (included) and max (excluded)
    static getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Returns a random array of count numbers from 0 to count - 1
    static getRandomArray(count: number) {
        var array: number[] = [count];
        var i: number;
        for (i = 0; i < count; i++) {
            array[i] = i;
        }
        for (i = 0; i < count; i++) {
            var j = this.getRandomInt(0, count);
            var x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    }

    static mixUp(source: string[]): string[] {
        var length = source.length;
        var order = this.getRandomArray(length);
        var result: string[] = [];
        for (var i = 0; i < length; i++) {
            result.push(source[order[i]]);
        }
        return result;
    }
}
