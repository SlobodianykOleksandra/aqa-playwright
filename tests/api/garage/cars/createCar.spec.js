import {expect, test} from "@playwright/test";
import {USERS} from "../../../../src/data/users.js";
import {negativeFixturesCreateCar} from "./fixtures/createCar.fixtures.js";
import APIClient from "../../../../src/client/APIClient.js";

test.describe('Cars API', ()=>{
    test.describe('Create', ()=>{
        // test.describe.skip('Positive case (use header)', ()=>{
        //
        //     let client = axios.create({
        //         baseURL: 'https://qauto.forstudy.space/api'
        //     })
        //     let brands
        //
        //     test.beforeAll(async ()=>{
        //         const signInResponse = await client.post('/auth/signin', {
        //             "email": USERS.TONNY_PEPPERONY.email,
        //             "password": USERS.TONNY_PEPPERONY.password,
        //             "remember": false
        //         })
        //         const cookie = signInResponse.headers["set-cookie"][0].split(';')[0]
        //         client = axios.create({
        //             baseURL: 'https://qauto.forstudy.space/api',
        //             headers:{
        //                 cookie
        //             }
        //         })
        //
        //         const response = await client.get('/cars/brands')
        //         brands = response.data.data
        //     })
        //
        //     test.afterAll(async ()=>{
        //         const userCars = await client.get('/cars')
        //         await Promise.all(
        //             userCars.data.data.map((car) => client.delete(`/cars/${car.id}`))//returns array
        //         )
        //     })
        //
        //     test('Create car',async ()=>{
        //         for (const brand of brands) {
        //             await test.step(`Create car brand ${brand.title}`, async ()=>{
        //                 // const brand = brands[0] //{ id: 1, title: 'Audi', logoFilename: 'audi.png' }
        //                 const modelsResponse = await client.get(`/cars/models?carBrandId=${brand.id}`)
        //                 const models = modelsResponse.data.data
        //
        //                 for (const model of models) {
        //                     await test.step(`Model: ${model.title}`, async ()=>{
        //                         // const model = models[0]//{ id: 1, carBrandId: 1, title: 'TT' }
        //                         const createCarRequestBody = {
        //                             carBrandId: brand.id,
        //                             carModelId: model.id,
        //                             mileage: Math.floor(Math.random() * 1000)
        //                         }
        //
        //                         const createCarResponse = await client.post(`/cars`, createCarRequestBody)
        //                         await expect(createCarResponse.status, 'status should be valid').toBe(201)
        //                     })
        //                 }
        //             })
        //         }
        //     })
        // })

        test.describe('Positive case create (use cookie-jar)', ()=>{
            let client;
            let brands;

            test.beforeAll(async ()=>{
                client = await APIClient.authenticate(USERS.TONNY_PEPPERONY.email, USERS.TONNY_PEPPERONY.password)

                const response = await client.carControler.getBrands()
                brands = response.data.data
            })

            test.afterAll(async ()=>{
                const userCars = await client.carControler.getUserCars()
                await Promise.all(
                    userCars.data.data.map((car) => client.carControler.deleteCarById(car.id))//returns array
                )
            })

            test('Create car',async ()=>{
                for (const brand of brands) {
                    await test.step(`Create car brand ${brand.title}`, async ()=>{
                        // const brand = brands[0] //{ id: 1, title: 'Audi', logoFilename: 'audi.png' }
                        const modelsResponse = await client.carControler.getModelsByBrandId(brand.id)
                        const models = modelsResponse.data.data

                        for (const model of models) {
                            await test.step(`Model: ${model.title}`, async ()=>{
                                // const model = models[0]//{ id: 1, carBrandId: 1, title: 'TT' }
                                const createCarRequestBody = {
                                    carBrandId: brand.id,
                                    carModelId: model.id,
                                    mileage: Math.floor(Math.random() * 1000)
                                }

                                const createCarResponse = await client.carControler.createCar(createCarRequestBody)
                                await expect(createCarResponse.status, 'status should be valid').toBe(201)
                            })
                        }
                    })
                }
            })
        })

        test.describe('Negative case', ()=>{
            let client;
            let brands;

            test.beforeAll(async ()=>{
                client = await APIClient.authenticate(USERS.TONNY_PEPPERONY.email, USERS.TONNY_PEPPERONY.password)

                const response = await client.carControler.getBrands()
                brands = response.data.data
            })

            for (const {title, inputData, expectedData} of negativeFixturesCreateCar) {
                test(title, async ()=>{
                    const createCarResponse = await client.carControler.createCar(inputData)
                    await expect(createCarResponse.status, 'Status code should be valid').toBe(expectedData.statusCode)
                    await expect(createCarResponse.data, 'Response body should be equal').toEqual(expectedData.body)
                })
            }
        })
    })
})