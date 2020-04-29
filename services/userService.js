const titleService = require('./titleService');
const createUserResponse = require('../responses/createUserResponse');
var uuid = require("uuid");

const InvalidTitleException = (message) => {
    const error = new Error(message);

    error.code = "400";
    return error;
}
InvalidTitleException.prototype = new Error();

const userTypes = ["UserClient", "UserStaff"];

const createClient = (requestBody) => {

    // Grouping errors and providing in one response (something to think about, but more investigation needed for industry best practice)
    var e = {
        exception: "",
        message: "",
        status_code: "400",
        status: ""
    }

    // Validators required to reduce this
    if (!titleService.getTitle(requestBody.title).result) {
        e.exception = e.exception + "InvalidTitleException";
        e.message = e.message + "The provided title does not exist within your Novastone stack";
        e.status = "error";
    }

    // Using Typescript would help reduce this kind of validation. Building interfaces with permitted property values etc
    if (!userTypes.includes(requestBody.userType)) {
        e.exception = e.exception + ", InvalidUserTypeException";
        e.message = e.message + ", Only UserClient & UserStaff users are permitted in Novastone";
        e.status = "error";
    }

    if (e.status == "error") {
        return e;
    }

    // Building the response, Typescript Interfaces to ensure typing is correct and defaults are not restated
    createUserResponse.data.userType = requestBody.userType;
    createUserResponse.data.id = uuid.v4();
    createUserResponse.data.attributes.firstName = requestBody.firstName;
    createUserResponse.data.attributes.middleName = requestBody.middleName || "";
    createUserResponse.data.attributes.lastName = requestBody.lastName;
    createUserResponse.data.attributes.preferredLanguage = requestBody.preferredLanguage || 'en_GB';

    // Using the Title Service to get the Key for the requested 
    createUserResponse.data.relationships.title.data.id = titleService.getTitle(requestBody.title).value;

    return createUserResponse;
}

module.exports = { createClient };