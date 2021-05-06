import {WidgetService}   from "../WidgetService";
import {IWidget, Widget} from "../../model/Widget";
import {injectable}      from "inversify";
import * as uuid              from 'uuid/v4';
import * as Boom                 from '@hapi/boom';



@injectable()
export class WidgetServiceImpl implements WidgetService {

    async createNewWidget(name: string, author: string, templateSource: string, scriptSource: string, styleSource: string): Promise<IWidget> {
        try {
            let widget = new Widget({
                uuid: uuid(),
                name, author, templateSource, scriptSource, styleSource
            });
            await widget.save();
            return widget;
        } catch (e) {
            console.log(e);
            throw Boom.badRequest("Invalid request, please make sure you have all fields required.");
        }
    }

    async getAllWidgets(): Promise<IWidget[]> {
        return await Widget.find({});
    }

    async getWidgetByUuid(uuid: string): Promise<IWidget> {
        let widget = await Widget.findOne({uuid});
        if(widget) {
            return widget;
        } else {
            throw Boom.notFound("Widget with that UUID cannot be found.");
        }
    }

    async updateWidget(uuid: string, name: string, author: string, templateSource: string, scriptSource: string, styleSource: string): Promise<IWidget> {
        let widget = await Widget.findOne({uuid});
        if(widget) {
            if(name) widget.name = name;
            if(author) widget.author = author;
            if(templateSource) widget.author = templateSource;
            if(scriptSource) widget.author = scriptSource;
            if(styleSource) widget.author = styleSource;
            await widget.save();
            return widget;
        } else {
            throw Boom.notFound("Widget with that UUID cannot be found.");
        }
    }

}