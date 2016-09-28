/**
 * Created by Bell on 16/8/24.
 */

export function validPassword(input) {
    if (!input) {
        return false;
    }
    const reg = /^[\x21-\x7e0-9a-zA-Z]{6,20}$/;
    return reg.test(input);
}

export function validEmail(input) {
    if (!input) {
        return false;
    }
    const reg = /^[0-9a-zA-Z._-]+@([0-9a-zA-Z]+[0-9a-zA-Z_-]*)(\.[0-9a-zA-Z]+[0-9a-zA-Z_-]*)+$/;
    return reg.test(input);
}

/**
 * get domain from email
 *
 * @param email
 */
export function getDomain(email) {
    const array = email.split('@');
    if (array != null && array.length === 2) {
        return array[1];
    }
    return null;
}