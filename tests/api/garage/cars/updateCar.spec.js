import {expect, test} from "@playwright/test";
import APIClient from "../../../../src/client/APIClient.js";
import {USERS} from "../../../../src/data/users.js";
import {positiveFixturesCreateCar} from "./fixtures/createCar.fixtures.js";
import {positiveFixturesUpdateCar} from "./fixtures/updateCar.fixtures.js";

test.describe('Cars API', ()=>{
    test.describe('Update', ()=>{
        test.describe('Positive case update', ()=>{
            let carId;
            let client;

            test.beforeAll(async ()=>{
                client = await APIClient.authenticate(USERS.TONNY_PEPPERONY.email, USERS.TONNY_PEPPERONY.password)
                const createCarResponse = await client.carControler.createCar(positiveFixturesCreateCar.PORSCHE)
                carId = createCarResponse.data.data.id
            })
            test.afterAll(async ()=>{
                const userCars = await client.carControler.getUserCars()
                await Promise.all(
                    userCars.data.data.map((car) => client.carControler.deleteCarById(car.id))
                )
            })

            test('Update car',async ()=>{
                await test.step('Update car', async ()=>{
                    const response = await client.carControler.updateCarById(carId, positiveFixturesUpdateCar.inputData)
                    await expect(response.status, 'status should be valid').toBe(200)
                })
                await test.step('Get car by Id', async ()=>{
                    const response = await client.carControler.getCarById(carId)
                    await expect(response.data.data, 'new data should be valid').toMatchObject({
                        id: carId,
                        carBrandId: positiveFixturesUpdateCar.expectedResult.carBrandId,
                        carModelId: positiveFixturesUpdateCar.expectedResult.carModelId,
                        initialMileage: positiveFixturesUpdateCar.expectedResult.initialMileage,
                        mileage: positiveFixturesUpdateCar.expectedResult.mileage,
                        brand: positiveFixturesUpdateCar.expectedResult.brand,
                        model: positiveFixturesUpdateCar.expectedResult.model,
                        logo: positiveFixturesUpdateCar.expectedResult.logo
                    })
                    await expect(new Date(response.data.data.updatedMileageAt).getTime()).toBeGreaterThan(new Date(response.data.data.carCreatedAt).getTime())
                })
            })
        })
    })
})