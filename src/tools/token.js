/**
 * Created by Bell on 16/8/24.
 */

import Token from '../models/token';

export async function delTokens(userid) {
    if (!userid) {
        return false;
    }
    await Token.remove({userid, status: 0});
    return true;
}

export async function getTokens(userid) {
    if (!userid) {
        return null;
    }
    const docs = await Token.find({userid, status: 0});
    let array = new Array();
    for (let doc of docs) {
        if (doc.token) {
            array.push(doc.token);
        }
    }
    return array;
}

export async function saveToken(token, name, type) {
    if (!token) {
        return;
    }
    let object = {token};
    if (name) {
        object.name = name;
    }
    if (type) {
        object.type = type;
    }
    const token_object = new Token(object);
    await token_object.save();
}