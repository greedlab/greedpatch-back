"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.indexOf = indexOf;
exports.remove = remove;
/**
 * Created by Bell on 16/8/25.
 */

/**
 * get index of item in array
 *
 * @param array
 * @param item
 * @returns {number}
 */
function indexOf(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == item) {
            return i;
        }
    }
    return -1;
}

/**
 * remore item in array
 *
 * @param array
 * @param item
 * @returns array
 */
function remove(array, item) {
    var index = indexOf(array, item);
    if (index > -1) {
        return array.splice(index, 1);
    }
    return array;
}
//# sourceMappingURL=array.js.map
