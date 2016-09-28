'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validPassword = validPassword;
exports.validEmail = validEmail;
exports.getDomain = getDomain;
/**
 * Created by Bell on 16/8/24.
 */

function validPassword(input) {
    if (!input) {
        return false;
    }
    var reg = /^[\x21-\x7e0-9a-zA-Z]{6,20}$/;
    return reg.test(input);
}

function validEmail(input) {
    if (!input) {
        return false;
    }
    var reg = /^[0-9a-zA-Z._-]+@([0-9a-zA-Z]+[0-9a-zA-Z_-]*)(\.[0-9a-zA-Z]+[0-9a-zA-Z_-]*)+$/;
    return reg.test(input);
}

/**
 * get domain from email
 *
 * @param email
 */
function getDomain(email) {
    var array = email.split('@');
    if (array != null && array.length === 2) {
        return array[1];
    }
    return null;
}
//# sourceMappingURL=regex.js.map
