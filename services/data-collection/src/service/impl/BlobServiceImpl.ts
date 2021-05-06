import {BlobService} from "../BlobService";
import {injectable}  from "inversify";
import {ICollection} from "../../model/Collection";
import {Blob, IBlob} from "../../model/Blob";

@injectable()
export class BlobServiceImpl implements BlobService {

    /**
     * Create a new blob.
     * @param parentCollection
     * @param body
     */
    async createBlob(parentCollection: ICollection, body: String): Promise<IBlob> {
        let blob = new Blob({
            parentCollection,
            body,
        });
        await blob.save();
        return blob;
    }

    /**
     * Get a list of blobs by collection.
     * @param collection
     */
    async getBlobsByCollection(collection: ICollection): Promise<IBlob[]> {
        return await Blob.find({parentCollection: collection._id});
    }

}
