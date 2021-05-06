import {IWidget} from "../model/Widget";

export interface WidgetService {

    createNewWidget(name: string, author: string, templateSource: string, scriptSource: string, styleSource: string): Promise<IWidget>;

    getAllWidgets(): Promise<IWidget[]>;

    getWidgetByUuid(uuid: string): Promise<IWidget>;

    updateWidget(uuid: string, name: string, author: string, templateSource: string, scriptSource: string, styleSource: string): Promise<IWidget>;

}
