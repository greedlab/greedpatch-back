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
export function indexOf(array, item) {
    for (let i = 0; i < array.length; i++) {
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
export function remove(array, item) {
    let index = indexOf(array, item);
    if (index > -1) {
        return array.splice(index, 1);
    }
    return array;
}
