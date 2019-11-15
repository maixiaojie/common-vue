module.exports = function getPadLength(obj) {
    let longest = 10;
    for(let name in obj) {
        if(name.length + 1 > longest) {
            longest = name.length + 1
        }
    }
    return longest
}