const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required']
    },

    lastname: {
        type: String,
        required: [true, 'Firstname is required']
    },

    email: {
        type: String,
        required: [true, 'Firstname is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Firstname is required'],
        minLength: 6
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})


UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


UserSchema.statics.comparePassword = async function(candidatePassword, password) {
    const match = await bcrypt.compare(candidatePassword, password)
    return match
}
module.exports = mongoose.model('User', UserSchema)