/**
 * Created by Bell on 16/8/25.
 */

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Project = new mongoose.Schema({
    bundle_id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    introduction: {type: String},
    members: {type: Array}
});

Project.methods.isManager = function isManager(userid) {
    const user = this;
    const members = user.members;
    let result = false;
    if (!members) {
        return result;
    }
    for (let member of members) {
        if (!result && member.id && member.id === userid && member.role == 1) {
            result = true;
        }
    }
    return result;
};

Project.methods.isMember = function isMember(userid) {
    const user = this;
    const members = user.members;
    let result = false;
    if (!members) {
        return result;
    }
    for (let member of members) {
        if (!result && member.id === userid) {
            result = true;
        }
    }
    return result;
};

Project.methods.indexOf = function indexOf(userid) {
    const user = this;
    const members = user.members;
    let index = -1;
    if (!members) {
        return index;
    }
    for (let i = 0; i < members.length; i++) {
        if (index == -1 && members[i].id === userid) {
            index = i;
        }
    }
    return index;
};

export default mongoose.model('project', Project);
