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

    if (!titleService.getTitle(requestBody.title).result) {
        var e =  {
            exception: "InvalidTitleException",
            message: "The provided title does not exist within your Novastone stack",
            status_code: "400"
        }

        return e;
    }

    createUserResponse.data.relationships.title.data.id = titleService.getTitle(requestBody.title).value;

    createUserResponse.data.id = uuid.v4();
    createUserResponse.data.attributes.firstName = requestBody.firstName;
    createUserResponse.data.attributes.middleName = requestBody.middleName || "";
    createUserResponse.data.attributes.lastName = requestBody.lastName;
    createUserResponse.data.attributes.preferredLanguage = requestBody.preferredLanguage || 'en_GB';

    return createUserResponse;
}

module.exports = { createClient };