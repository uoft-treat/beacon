import {inject, injectable}   from "inversify";
import * as  express          from 'express';
import * as bodyParser        from 'body-parser';
import {ExperimentController} from "../controller/ExperimentController";


@injectable()
export class RestServer {

    private experimentController: ExperimentController;
    private app;

    public constructor(
        @inject('ExperimentController') experimentController: ExperimentController,
    ) {
        this.experimentController = experimentController;

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
        this.app.post('/experiments', this.experimentController.createNewExperiment);
        this.app.get('/experiments', this.experimentController.getAllExperiments);
        this.app.get('/experiments/:uuid', this.experimentController.getOneExperimentByUuid);
        this.app.patch('/experiments/:uuid', this.experimentController.updateOneExperimentByUuid);
        this.app.get('/experiments/:uuid/templateSource', this.experimentController.getTemplateSource);
        this.app.get('/experiments/:uuid/scriptSource', this.experimentController.getScriptSource);
    }

    /**
     * Start the application.
     * @param cb Callback once app is started.
     */
    public start(cb) {
        this.app.listen(process.env.PORT || 3000, cb);
    }

}
