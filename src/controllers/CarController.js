import BaseController from "./BaseController.js";

export default class CarController extends BaseController{
    #CREATE_CAR_PATH = `/cars`
    #DELETE_CAR_PATH = `/cars`
    #UPDATE_CAR_PATH = '/cars'
    #BRANDS_PATH = '/cars/brands'
    #MODELS_PATH = '/cars/models'
    #USER_CARS_PATH = '/cars'
    #CARS_PATH = '/cars'

    constructor(jar) {
        super(jar)
    }

    async createCar(requestBody){
        return this.client.post(this.#CREATE_CAR_PATH, requestBody)
    }

    async getBrands(){
        return this.client.get(this.#BRANDS_PATH)
    }

    async getBrandById(id){
        return this.client.get(`${this.#BRANDS_PATH}/${id}`)
    }

    async getModels(){
        return this.client.get(this.#MODELS_PATH)
    }

    async getModelsByBrandId(brandId){
        return this.client.get(`${this.#MODELS_PATH}?carBrandId=${brandId}`)
    }

    async getModelById(id){
        return this.client.get(`${this.#MODELS_PATH}/${id}`)
    }

    async getUserCars(){
        return this.client.get(this.#USER_CARS_PATH)
    }

    async getCarById(id){
        return this.client.get(`${this.#CARS_PATH}/${id}`)
    }

    async deleteCarById(id){
        return this.client.delete(`${this.#DELETE_CAR_PATH}/${id}`)
    }

    async updateCarById(id, requestBody){
        return this.client.put(`${this.#UPDATE_CAR_PATH}/${id}`, requestBody)
    }

}