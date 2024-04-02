const { UnAuthorizedForbiden } = require("../errors/custom-errors");

const checkPermisions = (reqUser, userId) => {

    // console.log(reqUser);
    // console.log(userId);
    // console.log(typeof userId);
    if(reqUser.role === 'admin') return;
    if(reqUser.userId === userId.toString()) return;

    throw new UnAuthorizedForbiden("Unauthorised access to this route")

}

module.exports = checkPermisions