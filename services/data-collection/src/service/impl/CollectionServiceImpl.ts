import {CollectionService}       from "../CollectionService";
import {inject, injectable}      from "inversify";
import {Collection, ICollection} from "../../model/Collection";
import {IBlob}                   from "../../model/Blob";
import * as jsonschema           from 'jsonschema';
import * as Boom                 from '@hapi/boom';
import {BlobService}             from "../BlobService";

@injectable()
export class CollectionServiceImpl implements CollectionService {

    private blobService: BlobService;

    public constructor(
        @inject('BlobService') blobService: BlobService,
    ) {
        this.blobService = blobService;
    }

    /**
     * Create a new collection.
     * @param schema JSON schema associated with this collection.
     */
    async createNewCollection(schema?: string): Promise<ICollection> {
        let collection = new Collection({
            jsonSchema: schema,
        });
        await collection.save();
        return collection;
    }

    /**
     * Attempt to get one collection.
     * @param id
     */
    async getOneCollectionById(id: string): Promise<ICollection> {
        let collection = await Collection.findOne({_id: id});
        if (!collection) {
            throw Boom.notFound("Cannot find collection using ID provided.");
        }
        return collection;
    }

    /**
     * Insert a new blob into collection.
     * @param collection
     * @param body
     */
    async insertBlobIntoCollection(collection: ICollection, body: string): Promise<IBlob> {
        if (collection.jsonSchema) {
            let validator = new jsonschema.Validator();
            if (validator.validate(JSON.parse(body), JSON.parse(collection.jsonSchema)).errors.length > 0) {
                throw Boom.badRequest("Invalid body, must follow correct JSON schema.");
            }
        }
        return await this.blobService.createBlob(collection, body);
    }
}
