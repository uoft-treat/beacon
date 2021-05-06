import {ApiService}                from "../ApiService";
import {ApiInputError}             from "../error/ApiInputError";
import {Api, IApi}                 from "../../model/Api";
import {ApiDuplicateNameError}     from "../error/ApiDuplicateNameError";
import {ApiNotFoundError}          from "../error/ApiNotFoundError";
import {ApiDuplicateEndpointError} from "../error/ApiDuplicateEndpointError";

export class ApiServiceImpl implements ApiService {

    /**
     * Create a new API instance.
     * @param name
     */
    async createNewApi(name: string): Promise<IApi> {
        if (await Api.findOne({name})) {
            throw new ApiDuplicateNameError("An API with that name already exists.");
        }
        if (!name) {
            throw new ApiInputError("You must provide an API name.");
        }
        let api = new Api({
            name,
            endpoints: [],
        });
        await api.save();
        return api;
    }

    /**
     * Return all APIs in system.
     */
    async listAllApis(): Promise<IApi[]> {
        return await Api.find({});
    }

    /**
     * Get an API given name.
     * @param name
     */
    async getOneApiByName(name: string): Promise<IApi> {
        let api = await Api.findOne({name});
        if (!api) {
            throw new ApiNotFoundError("API with that name cannot be found.");
        }
        return api;
    }

    /**
     * Given API name and endpoint, add the endpoint to list.
     * @param name
     * @param endpoint
     */
    async addEndpointToApiByName(name: string, endpoint: string): Promise<IApi> {
        let api = await Api.findOne({name});
        if (!api) {
            throw new ApiNotFoundError("API with that name cannot be found.");
        }
        if (!endpoint) {
            throw new ApiInputError("You must provide an endpoint.");
        }
        if (api.endpoints.indexOf(endpoint) >= 0) {
            throw new ApiDuplicateEndpointError("Endpoint already exists.");
        }
        api.endpoints.push(endpoint);
        await api.save();
        return api;
    }

    /**
     * Give a name and an endpoint, remove the endpoint from API.
     * @param name
     * @param endpoint
     */
    async deleteEndpointFromApiByName(name: string, endpoint: string): Promise<IApi> {
        let api = await Api.findOne({name});
        if (!api) {
            throw new ApiNotFoundError("API with that name cannot be found.");
        }
        if (!endpoint) {
            throw new ApiInputError("You must provide an endpoint.");
        }
        let index = api.endpoints.indexOf(endpoint);
        if (index < 0) {
            throw new ApiNotFoundError("Endpoint with that name cannot be found.");
        }
        api.endpoints.splice(index, 1);
        await api.save();
        return api;
    }

    /**
     * Remove one API by name.
     * @param name
     */
    async deleteOneApiByName(name: string): Promise<void> {
        let api = await Api.findOne({name});
        if (!api) {
            throw new ApiNotFoundError("API with that name cannot be found.");
        }
        await api.remove();
        return;
    }

}