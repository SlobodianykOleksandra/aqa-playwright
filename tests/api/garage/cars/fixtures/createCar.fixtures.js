import {CAR_BRANDS} from "../../../../../src/dictionary/cars/carBrands.js";
import {CAR_MODELS} from "../../../../../src/dictionary/cars/carModels.js";
import {CAR_ERROR_MESSAGES} from "../../../../../src/dictionary/cars/errorMessages.js";

export const negativeFixtures = [
    {
        title: 'Brand is missing - error message',
        inputData: {
            carModelId: CAR_MODELS.AUDI.R8.id,
            mileage: Math.floor(Math.random() * 1000)
        },
        expectedData: {
            statusCode: 400,
            body:{
                status: CAR_ERROR_MESSAGES.messageStatus,
                message: CAR_ERROR_MESSAGES.requiredBrand
            }
        }
    },
    {
        title: 'Model is missing - error message',
        inputData: {
            carBrandId: CAR_BRANDS.AUDI.id,
            mileage: Math.floor(Math.random() * 1000)
        },
        expectedData: {
            statusCode: 400,
            body:{
                status: CAR_ERROR_MESSAGES.messageStatus,
                message: CAR_ERROR_MESSAGES.requiredModel
            }
        }
    },
    {
        title: 'Mileage is missing - error message',
        inputData: {
            carBrandId: CAR_BRANDS.AUDI.id,
            carModelId: CAR_MODELS.AUDI.R8.id
        },
        expectedData: {
            statusCode: 400,
            body:{
                status: CAR_ERROR_MESSAGES.messageStatus,
                message: CAR_ERROR_MESSAGES.requiredMileage
            }
        }
    },
    {
        title: 'Wrong model for current brand - error message',
        inputData: {
            carBrandId: CAR_BRANDS.AUDI.id,
            carModelId: CAR_MODELS.BMW.X6.id,
            mileage: Math.floor(Math.random() * 1000)
        },
        expectedData: {
            statusCode: 404,
            body:{
                status: CAR_ERROR_MESSAGES.messageStatus,
                message: CAR_ERROR_MESSAGES.notFoundModel
            }
        }
    },
    {
        title: 'Wrong brand - error message',
        inputData: {
            carBrandId: 777,
            carModelId: CAR_MODELS.BMW.X6.id,
            mileage: Math.floor(Math.random() * 1000)
        },
        expectedData: {
            statusCode: 404,
            body:{
                status: CAR_ERROR_MESSAGES.messageStatus,
                message: CAR_ERROR_MESSAGES.notFoundBrand
            }
        }
    },
    {
        title: 'Wrong type of brand - error message',
        inputData: {
            carBrandId: CAR_BRANDS.AUDI.title,
            carModelId: CAR_MODELS.AUDI.R8.id,
            mileage: Math.floor(Math.random() * 1000)
        },
        expectedData: {
            statusCode: 400,
            body:{
                status: CAR_ERROR_MESSAGES.messageStatus,
                message: CAR_ERROR_MESSAGES.invalidBrand
            }
        }
    },
    {
        title: 'Wrong type of model - error message',
        inputData: {
            carBrandId: CAR_BRANDS.AUDI.id,
            carModelId: CAR_MODELS.AUDI.R8.title,
            mileage: Math.floor(Math.random() * 1000)
        },
        expectedData: {
            statusCode: 400,
            body:{
                status: CAR_ERROR_MESSAGES.messageStatus,
                message: CAR_ERROR_MESSAGES.invalidModel
            }
        }
    },
    {
        title: 'Wrong type of mileage - error message',
        inputData: {
            carBrandId: CAR_BRANDS.AUDI.id,
            carModelId: CAR_MODELS.AUDI.R8.id,
            mileage: '2580 km'
        },
        expectedData: {
            statusCode: 400,
            body:{
                status: CAR_ERROR_MESSAGES.messageStatus,
                message: CAR_ERROR_MESSAGES.invalidMileage
            }
        }
    }
]