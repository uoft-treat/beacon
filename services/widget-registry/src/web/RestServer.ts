import {inject, injectable} from "inversify";
import * as  express        from 'express';
import * as bodyParser      from 'body-parser';
import {WidgetController}   from "../controller/WidgetController";


@injectable()
export class RestServer {

    private widgetController: WidgetController;
    private app;

    public constructor(
        @inject('WidgetController') widgetController: WidgetController,
    ) {
        this.widgetController = widgetController;

        // Init application
        this.app = express();
        this.app.use(bodyParser.json());

        this.bindRoutes();

        this.app.use((err, req, res, next) => {
            return res.status(err.output.statusCode).json(err.output.payload);
        });

    }

    /**
     * Bind all routes.
     */
    private bindRoutes() {
        this.app.post("/widgets", this.widgetController.createNewWidget);
        this.app.get("/widgets", this.widgetController.getAllWidgets);
        this.app.get("/widgets/:uuid", this.widgetController.getOneWidgetByUuid);
        this.app.patch("/widgets/:uuid", this.widgetController.updateOneWidgetByUuid);
        this.app.get("/widgets/:uuid/templateSource", this.widgetController.getTemplateSource);
        this.app.get("/widgets/:uuid/styleSource", this.widgetController.getStyleSource);
        this.app.get("/widgets/:uuid/scriptSource", this.widgetController.getScriptSource);
    }

    /**
     * Start the application.
     * @param cb Callback once app is started.
     */
    public start(cb) {
        this.app.listen(process.env.PORT || 3000, cb);
    }

}
