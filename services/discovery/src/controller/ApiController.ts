import {ApiService}                        from "../service/ApiService";
import {CreateNewApiResponse}              from "./dto/CreateNewApiResponse";
import {ListAllApisResponse}               from "./dto/ListAllApisResponse";
import {GetOneApiByNameResponse}           from "./dto/GetOneApiByNameResponse";
import {AddOneEndpointToApiByNameResponse} from "./dto/AddOneEndpointToApiByNameResponse";
import {RemoveOneEndpointFromApiByName}    from "./dto/RemoveOneEndpointFromApiByName";
import {RemoveOneApiByName}                from "./dto/RemoveOneApiByName";

export class ApiController {

    apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    /**
     * Handle POST /apis
     * @param req
     * @param res
     * @param next
     */
    createNewApi = async (req, res, next) => {
        try {
            res.status(201);
            res.send(
                CreateNewApiResponse.constructFromModel(
                    await this.apiService.createNewApi(req.body.name)
                )
            );
        } catch (e) {
            return next(e);
        }
    };

    /**
     * Handle GET /apis
     * @param req
     * @param res
     * @param next
     */
    listAllApis = async (req, res, next) => {
        let apis = await this.apiService.listAllApis();
        let result = [];
        for (let api of apis) {
            result.push(ListAllApisResponse.constructFromModel(api));
        }
        res.send(result);
    };

    /**
     * Handle GET /apis/:name
     * @param req
     * @param res
     * @param next
     */
    getOneApiByName = async (req, res, next) => {
        try {
            res.send(
                GetOneApiByNameResponse.constructFromModel(
                    await this.apiService.getOneApiByName(req.params.name)
                )
            );
        } catch (e) {
            return next(e);
        }
    };

    /**
     * Handle GET /apis/:name/endpoints
     * @param req
     * @param res
     * @param next
     */
    getOneApiEndpointsByName = async (req, res, next) => {
        try {
            res.send(
                GetOneApiByNameResponse.constructFromModel(
                    await this.apiService.getOneApiByName(req.params.name)
                ).endpoints
            );
        } catch (e) {
            return next(e);
        }
    };

    /**
     * Handle POST /apis/:name/endpoints
     * @param req
     * @param res
     * @param next
     */
    addOneEndpointToApiByName = async (req, res, next) => {
        try {
            await this.apiService.addEndpointToApiByName(req.params.name, req.body.endpoint);
        } catch (e) {
            return next(e);
        }
        res.status(201);
        res.send(AddOneEndpointToApiByNameResponse.constructFromMessage("ok"));
    };

    /**
     * Handle DELETE /apis/:name/endpoints/:endpoint
     * @param req
     * @param res
     * @param next
     */
    removeOneEndpointFromApiByName = async (req, res, next) => {
        try {
            await this.apiService.deleteEndpointFromApiByName(req.params.name, req.params.endpoint);
        } catch (e) {
            return next(e);
        }
        res.send(RemoveOneEndpointFromApiByName.constructFromMessage("ok"));
    };

    /**
     * Handle DELETE /apis/:name
     * @param req
     * @param res
     * @param next
     */
    removeoneApiByName = async (req, res, next) => {
        try {
            await this.apiService.deleteOneApiByName(req.params.name);
        } catch (e) {
            return next(e);
        }
        res.send(RemoveOneApiByName.constructFromMessage("ok"));
    }
    
}