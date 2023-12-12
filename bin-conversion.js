function getInt(array, word) {
    return array[word * 4] * 0x1000000
        + array[word * 4 + 1] * 0x10000
        + array[word * 4 + 2] * 0x100
        + array[word * 4 + 3];
}

function tankIcon(id) {
    return `<img src="images/tanks/tank${id}.png" alt="tank ${id}" class="tank-icon" />`;
}

function getTanks(array, word) {
    const int = array[word * 4 + 3];
    
    if (int === 0) return '<span class="zero">None</span>';
    
    if (int < 10) return tankIcon(int);
    
    const idR = int % 10;
    const idL = (int - idR) * 0.1;
    
    let tanks = '';
    for (let i = idL; i <= idR; i++) {
        tanks += tankIcon(i);
    }
    
    return tanks;
}