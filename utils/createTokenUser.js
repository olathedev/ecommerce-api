const createTokenUser = (user) => {
    return {_id: user._id, email: user.email, role: user.role}
}


module.exports = createTokenUser