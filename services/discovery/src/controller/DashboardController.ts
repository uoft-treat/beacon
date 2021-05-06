import {ApiService} from "../service/ApiService";

export class DashboardController {

    apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    getDashboardHome = async (req, res, next) => {

        let apis = await this.apiService.listAllApis();

        res.render('dashboard', {apis});
    };

    addNewEndpointToApi = async (req, res, next) => {
        try {
            await this.apiService.addEndpointToApiByName(req.body.name, req.body.endpoint);
        } catch (e) {
            next(e);
        }
        res.redirect('../dashboard');
    };

    removeEndpointFromApi = async (req, res, next) => {
        try {
            await this.apiService.deleteEndpointFromApiByName(req.body.name, req.body.endpoint);
        } catch (e) {
            next(e);
        }
        res.redirect('../dashboard');
    };

    addNewApi = async (req, res, next) => {
        try {
            await this.apiService.createNewApi(req.body.name);
        } catch (e) {
            next(e);
        }
        res.redirect('../dashboard');
    };

    removeApi = async (req, res, next) => {
        try {
            await this.apiService.deleteOneApiByName(req.body.name);
        } catch (e) {
            next(e);
        }
        res.redirect('../dashboard');
    };

}