import {inject, injectable} from "inversify";
import {WidgetService}      from "../service/WidgetService";
import {WidgetNoSourceDto}  from "../web/dto/WidgetNoSourceDto";

@injectable()
export class WidgetController {

    private widgetService: WidgetService;

    constructor(
        @inject("WidgetService") widgetService: WidgetService
    ) {
        this.widgetService = widgetService;
    }

    createNewWidget = async (req, res, next) => {
        try {
            let widget = await this.widgetService.createNewWidget(
                req.body.name,
                req.body.author,
                req.body.templateSource,
                req.body.scriptSource,
                req.body.styleSource,
            );
            let dto: WidgetNoSourceDto = {
                name: widget.name,
                author: widget.author,
                uuid: widget.uuid
            };
            res.send(dto);
        } catch (e) {
            return next(e);
        }
    };

    getAllWidgets = async (req, res, next) => {
        let widgets = await this.widgetService.getAllWidgets();
        let dtos: WidgetNoSourceDto[] = [];
        for (const widget of widgets) {
            dtos.push({
                name: widget.name,
                author: widget.author,
                uuid: widget.uuid
            });
        }
        res.send(dtos);
    };

    getOneWidgetByUuid = async (req, res, next) => {
        try {
            let widget = await this.widgetService.getWidgetByUuid(req.params.uuid);
            let dto: WidgetNoSourceDto = {
                name: widget.name,
                author: widget.author,
                uuid: widget.uuid
            };
            res.send(dto);
        } catch (e) {
            return next(e);
        }
    };

    updateOneWidgetByUuid = async (req, res, next) => {
        try {
            let widget = await this.widgetService.updateWidget(
                req.params.uuid,
                req.body.name,
                req.body.author,
                req.body.templateSource,
                req.body.scriptSource,
                req.body.styleSource,
            );
            let dto: WidgetNoSourceDto = {
                name: widget.name,
                author: widget.author,
                uuid: widget.uuid
            };
            res.send(dto);
        } catch (e) {
            return next(e);
        }
    };

    getTemplateSource = async (req, res, next) => {
        try {
            let widget = await this.widgetService.getWidgetByUuid(req.params.uuid);
            res.header("Content-Type", "text/plain");
            res.send(widget.templateSource);
        } catch (e) {
            return next(e);
        }
    };

    getStyleSource = async (req, res, next) => {
        try {
            let widget = await this.widgetService.getWidgetByUuid(req.params.uuid);
            res.header("Content-Type", "text/plain");
            res.send(widget.styleSource);
        } catch (e) {
            return next(e);
        }
    };

    getScriptSource = async (req, res, next) => {
        try {
            let widget = await this.widgetService.getWidgetByUuid(req.params.uuid);
            res.header("Content-Type", "text/plain");
            res.send(widget.scriptSource);
        } catch (e) {
            return next(e);
        }
    }

}