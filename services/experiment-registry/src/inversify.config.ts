import "reflect-metadata";
import {Container}             from "inversify";
import {RestServer}            from "./web/RestServer";
import {ExperimentController}  from "./controller/ExperimentController";
import {ExperimentService}     from "./service/ExperimentService";
import {ExperimentServiceImpl} from "./service/impl/ExperimentServiceImpl";

let container = new Container();

container.bind<ExperimentService>('ExperimentService').to(ExperimentServiceImpl);
container.bind<ExperimentController>('ExperimentController').to(ExperimentController);



container.bind<RestServer>('RestServer').to(RestServer);

export default container;
