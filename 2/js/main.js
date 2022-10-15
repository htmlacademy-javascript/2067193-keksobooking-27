const getRandomArbitrary(min, max) => {
    if (min < 0 || max < 0 || min === max) {
        return NaN;
    };

    if (max > min) {
        [max, min] = [min, max];
    };
    return Math.random() * (max - min) + min;
}

