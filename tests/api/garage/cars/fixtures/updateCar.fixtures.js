import {CAR_BRANDS} from "../../../../../src/dictionary/cars/carBrands.js";
import {CAR_MODELS} from "../../../../../src/dictionary/cars/carModels.js";

export const positiveFixturesUpdateCar ={
    inputData:{
        "carBrandId": CAR_BRANDS.PORSCHE.id,
        "carModelId": CAR_MODELS.PORSCHE.NINE11.id,
        "mileage": 168223
    },
    expectedResult:{
        carBrandId: CAR_BRANDS.PORSCHE.id,
        carModelId: CAR_MODELS.PORSCHE.NINE11.id,
        initialMileage: 222,
        mileage: 168223,
        brand: CAR_BRANDS.PORSCHE.title,
        model: CAR_MODELS.PORSCHE.NINE11.title,
        logo: CAR_BRANDS.PORSCHE.logoFilename
    }
}
