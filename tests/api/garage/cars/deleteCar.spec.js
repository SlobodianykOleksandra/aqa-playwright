import {expect, test} from "@playwright/test";
import {USERS} from "../../../../src/data/users.js";
import {negativeFixturesDeleteCar} from "./fixtures/deleteCar.fixtures.js";
import APIClient from "../../../../src/client/APIClient.js";
import {positiveFixturesCreateCar} from "./fixtures/createCar.fixtures.js";

test.describe('Cars API', ()=>{
    test.describe('Delete', ()=>{
        test.describe('Positive case delete', ()=>{
            let carId;
            let client;

            test.beforeAll(async ()=>{
                client = await APIClient.authenticate(USERS.TONNY_PEPPERONY.email, USERS.TONNY_PEPPERONY.password)
                const createCarResponse = await client.carControler.createCar(positiveFixturesCreateCar.BMW)
                carId = createCarResponse.data.data.id
            })

            test('Delete car',async ()=>{
                await test.step('Delete car', async ()=>{
                    const response = await client.carControler.deleteCarById(carId)
                    await expect(response.status, 'status should be valid').toBe(200)
                })
                await test.step('Get car by Id', async ()=>{
                    const response = await client.carControler.getCarById(carId)
                    await expect(response.status, 'status should be valid').toBe(negativeFixturesDeleteCar.expectedData.statusCode)
                    await expect(response.data, 'status should be valid').toEqual(negativeFixturesDeleteCar.expectedData.body)
                })
            })
        })
    })
})