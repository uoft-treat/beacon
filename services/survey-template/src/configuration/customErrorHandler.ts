import {SurveyTemplateInputError}    from "../service/error/SurveyTemplateInputError";
import {SurveyTemplateNotFoundError} from "../service/error/SurveyTemplateNotFoundError";

export const customErrorHandler = (err, req, res, next) => {
    if (err instanceof SurveyTemplateInputError) {
        return res.status(400).json({message: err.message});
    } else if (err instanceof SurveyTemplateNotFoundError) {
        return res.status(404).json({message: err.message});
    } else if (err.output && err.output.statusCode) {
        return res.status(err.output.statusCode).json(err.output.payload);
    } else {
        return res.status(500).json({message: err.message});
    }
}
