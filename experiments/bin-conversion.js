function getInt(array, word) {
    return array[word * 4] * 0x1000000
        + array[word * 4 + 1] * 0x10000
        + array[word * 4 + 2] * 0x100
        + array[word * 4 + 3];
}