import {CAR_ERROR_MESSAGES} from "../../../../../src/dictionary/cars/errorMessages.js";

export const negativeFixturesDeleteCar = {
    expectedData: {
        statusCode: 404,
        body:{
            status: CAR_ERROR_MESSAGES.messageStatus,
            message: CAR_ERROR_MESSAGES.carNotFound
        }
    }
}