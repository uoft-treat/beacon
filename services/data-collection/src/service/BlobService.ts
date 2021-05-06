import {ICollection} from "../model/Collection";
import {IBlob}       from "../model/Blob";

export interface BlobService {

    createBlob(collection: ICollection, body: String): Promise<IBlob>;

    getBlobsByCollection(collection: ICollection): Promise<IBlob[]>;

}
