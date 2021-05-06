import {CollectionService}  from "../service/CollectionService";
import {inject, injectable} from "inversify";
import {BlobService}        from "../service/BlobService";

@injectable()
export class CollectionController {

    private collectionService: CollectionService;
    private blobService: BlobService;

    public constructor(
        @inject('CollectionService') collectionService: CollectionService,
        @inject('BlobService') blobService: BlobService,
    ) {
        this.collectionService = collectionService;
        this.blobService = blobService;
    }

    createCollection = async (req, res, next) => {
        try {
            res.send(
                await this.collectionService.createNewCollection(req.body.schema)
            );
        } catch (e) {
            return next(e);
        }
    };

    getOneCollection = async (req, res, next) => {
        try {
            res.send(
                await this.collectionService.getOneCollectionById(req.params.id)
            );
        } catch (e) {
            return next(e);
        }
    };

    insertOneBlobIntoCollection = async (req, res, next) => {
        try {
            res.send(
                await this.collectionService.insertBlobIntoCollection(
                    await this.collectionService.getOneCollectionById(req.params.id),
                    req.body.body,
                )
            )
        } catch (e) {
            return next(e);
        }
    };

    getBlobsByCollection = async (req, res, next) => {
        try {
            res.send(
                await this.blobService.getBlobsByCollection(
                    await this.collectionService.getOneCollectionById(req.params.id),
                )
            )
        } catch (e) {
            return next(e);
        }
    }

}
