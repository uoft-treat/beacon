import "reflect-metadata";
import {Container}             from "inversify";
import {CollectionService}     from "./service/CollectionService";
import {CollectionServiceImpl} from "./service/impl/CollectionServiceImpl";
import {CollectionController}  from "./controller/CollectionController";
import {RestServer}            from "./web/RestServer";
import {BlobService}           from "./service/BlobService";
import {BlobServiceImpl}       from "./service/impl/BlobServiceImpl";

let container = new Container();

container.bind<CollectionService>('CollectionService').to(CollectionServiceImpl);
container.bind<CollectionController>('CollectionController').to(CollectionController);

container.bind<BlobService>('BlobService').to(BlobServiceImpl);

container.bind<RestServer>('RestServer').to(RestServer);

export default container;
