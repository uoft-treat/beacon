import {ICollection} from "../model/Collection";
import {IBlob}       from "../model/Blob";

export interface CollectionService {

    createNewCollection(schema?: string): Promise<ICollection>;

    insertBlobIntoCollection(collection: ICollection, body: string): Promise<IBlob>;

    getOneCollectionById(id: string): Promise<ICollection>;

}
