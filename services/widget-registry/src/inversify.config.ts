import "reflect-metadata";
import {Container}         from "inversify";
import {RestServer}        from "./web/RestServer";
import {WidgetService}     from "./service/WidgetService";
import {WidgetServiceImpl} from "./service/impl/WidgetServiceImpl";
import {WidgetController}  from "./controller/WidgetController";

let container = new Container();

container.bind<WidgetService>('WidgetService').to(WidgetServiceImpl);
container.bind<WidgetController>('WidgetController').to(WidgetController);


container.bind<RestServer>('RestServer').to(RestServer);

export default container;
