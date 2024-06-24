const mongoose = require('mongoose');
const { model, Schema } = mongoose

const User = new Schema({
    name: {
        type: String,
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Criador','Agencia', 'Marca', 'admin'],
        default: `Criador`
    },
    handle: {
        type: String,
        required: true,
        unique: true
    },
    links:[{
        url:{type: String},
        title: {type: String},
        icon: {type: String},
    }],
    sociaMedia:{
        facebook: {type: String},
        instagram: {type: String},
        twitter: {type: String},
        linkedin: {type: String},
        youtube: {type: String},
        github: {type: String}
    },
}, {collection: 'users-data-linktree'});

const userModel = model('userData', User);

module.exports = userModel;