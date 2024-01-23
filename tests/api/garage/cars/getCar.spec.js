import {expect, test} from "@playwright/test";
import {USERS} from "../../../../src/data/users.js";
import {CAR_BRANDS} from "../../../../src/dictionary/cars/carBrands.js";
import {CAR_MODELS} from "../../../../src/dictionary/cars/carModels.js";
import APIClient from "../../../../src/client/APIClient.js";
import {positiveFixturesCreateCar} from "./fixtures/createCar.fixtures.js";

test.describe('Cars API', ()=>{
    test.describe('Get by Id', ()=>{
        test.describe('Positive case get', ()=>{
            let carId;
            let brandId;
            let modelId;
            let client;
            let otherClient;
            let carsCounter = 0

            test.beforeAll(async ()=>{
                otherClient = await APIClient.authenticate(USERS.TEST_USER.email, USERS.TEST_USER.password)
                const modelsResponse = await otherClient.carControler.getModelsByBrandId(CAR_BRANDS.FORD.id)
                const models = modelsResponse.data.data

                for (const model of models) {
                    await test.step(`Model: ${model.title}`, async ()=>{
                        const createCarRequestBody = {
                            carBrandId: CAR_BRANDS.FORD.id,
                            carModelId: model.id,
                            mileage: Math.floor(Math.random() * 1000)
                        }
                        const createCarResponseOther = await otherClient.carControler.createCar(createCarRequestBody)
                        await expect(createCarResponseOther.status, 'status should be valid').toBe(201)
                        carsCounter++
                        })
                    }
                client = await APIClient.authenticate(USERS.TONNY_PEPPERONY.email, USERS.TONNY_PEPPERONY.password)
                const createCarResponse = await client.carControler.createCar(positiveFixturesCreateCar.BMW)
                carId = createCarResponse.data.data.id
                brandId = createCarResponse.data.data.carBrandId
                modelId = createCarResponse.data.data.carModelId
                })

            test.afterAll(async ()=>{
                const userCars = await client.carControler.getUserCars()
                await Promise.all(
                    userCars.data.data.map((car) => client.carControler.deleteCarById(car.id))//returns array
                )
                const otherUserCars = await otherClient.carControler.getUserCars()
                await Promise.all(
                    otherUserCars.data.data.map((car) => otherClient.carControler.deleteCarById(car.id))//returns array
                )
            })

            test('Get car by Id',async ()=>{
                const response = await client.carControler.getCarById(carId)
                await expect(response.status, 'status should be valid').toBe(200)
                await expect(response.data.data, 'response should be valid').toMatchObject({
                    "id": carId,
                    "carBrandId": CAR_BRANDS.BMW.id,
                    "carModelId": CAR_MODELS.BMW.THREE.id,
                    "initialMileage": 111,
                    "mileage": 111,
                    "brand": CAR_BRANDS.BMW.title,
                    "model": CAR_MODELS.BMW.THREE.title,
                    "logo": CAR_BRANDS.BMW.logoFilename
                })
            })

            test.only('Get all users cars',async ()=>{
                const response = await otherClient.carControler.getUserCars()
                await expect(response.status, 'status should be valid').toBe(200)
                const resData = await response.data.data
                await expect(resData.length).toBe(carsCounter)
            })

            test('Get brand by Id',async ()=>{
                const response = await client.carControler.getBrandById(brandId)
                await expect(response.status, 'status should be valid').toBe(200)
                await expect(response.data.data, 'response should be valid').toEqual(CAR_BRANDS.BMW)
            })

            test('Get model by Id',async ()=>{
                const response = await client.carControler.getModelById(modelId)
                await expect(response.status, 'status should be valid').toBe(200)
                await expect(response.data.data, 'response should be valid').toEqual(CAR_MODELS.BMW.THREE)
            })

            test('Get all brands',async ()=>{
                const response = await client.carControler.getBrands()
                await expect(response.status, 'status should be valid').toBe(200)
                await expect(response.data.data, 'response should be valid').toEqual([CAR_BRANDS.AUDI,CAR_BRANDS.BMW, CAR_BRANDS.FORD, CAR_BRANDS.PORSCHE, CAR_BRANDS.FIAT])
            })

            test('Get all models',async ()=>{
                const modelsArray = [
                    ...Object.values(CAR_MODELS.AUDI),
                    ...Object.values(CAR_MODELS.BMW),
                    ...Object.values(CAR_MODELS.FORD),
                    ...Object.values(CAR_MODELS.PORSCHE),
                    ...Object.values(CAR_MODELS.FIAT),
                ]
                const response = await client.carControler.getModels()
                await expect(response.status, 'status should be valid').toBe(200)
                await expect(response.data.data, 'response should be valid').toEqual(modelsArray)
            })
        })
    })
})