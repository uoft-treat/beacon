"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var express = require("express");
var bodyParser = require("body-parser");
var ExperimentController_1 = require("../controller/ExperimentController");
var RestServer = /** @class */ (function () {
    function RestServer(experimentController) {
        this.experimentController = experimentController;
        // Init application
        this.app = express();
        this.app.use(bodyParser.json());
        this.bindRoutes();
        this.app.use(function (err, req, res, next) {
            return res.status(err.output.statusCode).json(err.output.payload);
        });
    }
    /**
     * Bind all routes.
     */
    RestServer.prototype.bindRoutes = function () {
        this.app.post('/experiments', this.experimentController.createNewExperiment);
        this.app.get('/experiments', this.experimentController.getAllExperiments);
        this.app.get('/experiments/:uuid', this.experimentController.getOneExperimentByUuid);
        this.app.patch('/experiments/:uuid', this.experimentController.updateOneExperimentByUuid);
        this.app.get('/experiments/:uuid/templateSource', this.experimentController.getTemplateSource);
        this.app.get('/experiments/:uuid/scriptSource', this.experimentController.getScriptSource);
    };
    /**
     * Start the application.
     * @param cb Callback once app is started.
     */
    RestServer.prototype.start = function (cb) {
        this.app.listen(process.env.PORT || 3000, cb);
    };
    RestServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject('ExperimentController')),
        __metadata("design:paramtypes", [ExperimentController_1.ExperimentController])
    ], RestServer);
    return RestServer;
}());
exports.RestServer = RestServer;
