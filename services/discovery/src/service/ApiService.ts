import {IApi} from "../model/Api";

export interface ApiService {
    createNewApi(name: string): Promise<IApi>;

    listAllApis(): Promise<IApi[]>;

    deleteOneApiByName(name: string): Promise<void>;

    getOneApiByName(name: string): Promise<IApi>;

    addEndpointToApiByName(name: string, endpoint: string): Promise<IApi>;

    deleteEndpointFromApiByName(name: string, endpoint: string): Promise<IApi>;
}