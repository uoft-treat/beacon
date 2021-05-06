import {inject, injectable}   from "inversify";
import {CollectionController} from "../controller/CollectionController";
import * as  express          from 'express';
import * as bodyParser        from 'body-parser';


@injectable()
export class RestServer {

    private collectionController: CollectionController;
    private app;

    public constructor(
        @inject('CollectionController') collectionController: CollectionController,
    ) {
        this.collectionController = collectionController;

        // Init application
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use((err, req, res, next) => {
            return res.status(err.output.statusCode).json(err.output.payload);
        });

        this.bindRoutes();
    }

    /**
     * Bind all routes.
     */
    private bindRoutes() {
        this.app.post("/collections", this.collectionController.createCollection);
        this.app.get("/collections/:id", this.collectionController.getOneCollection);
        this.app.post("/collections/:id/blobs", this.collectionController.insertOneBlobIntoCollection);
        this.app.get("/collections/:id/blobs", this.collectionController.getBlobsByCollection);
    }

    /**
     * Start the application.
     * @param cb Callback once app is started.
     */
    public start(cb) {
        this.app.listen(process.env.PORT || 3000, cb);
    }

}
