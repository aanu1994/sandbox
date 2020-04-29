const titleService = require('./titleService');
var uuid = require("uuid");

const createUserResponse = require('../responses/createUserResponse');


const InvalidTitleException = (message) => {
    const error = new Error(message);

    error.code = "400";
    return error;
}

InvalidTitleException.prototype = new Error();

const createClient = (requestBody) => {
    var e = {
        exception: "",
        message: "",
        status_code: "400",
        status: false
    }

    if (!titleService.getTitle(requestBody.title).result) {
        e.exception = e.exception + "InvalidTitleException";
        e.message = e.message + "The provided title does not exist within your Novastone stack";
        e.status = "error";
    }

    if (requestBody.userType != "UserClient" || requestBody.userType != "UserStaff") {
        e.exception = e.exception + ", InvalidUserTypeException";
        e.message = e.message + ", Only UserClient & UserStaff users are permitted in Novastone";
        e.status = "error";
    }

    if (e.status == "error") {
        return e;
    }

    createUserResponse.data.userType = requestBody.userType;
    createUserResponse.data.id = uuid.v4();
    createUserResponse.data.attributes.firstName = requestBody.firstName;
    createUserResponse.data.attributes.middleName = requestBody.middleName || "";
    createUserResponse.data.attributes.lastName = requestBody.lastName;
    createUserResponse.data.attributes.preferredLanguage = requestBody.preferredLanguage || 'en_GB';
    createUserResponse.data.relationships.title.data.id = titleService.getTitle(requestBody.title).value;

    return createUserResponse;
}

module.exports = { createClient };