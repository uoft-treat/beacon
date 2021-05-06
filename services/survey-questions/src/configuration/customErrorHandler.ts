import {SurveyQuestionInputError, SurveyQuestionNotFoundError} from "../service/error";
import {SurveyQuestionConflictError} from "../service/error/SurveyQuestionConflictError";

export const customErrorHandler = (err, req, res, next) => {
    // 404
    if(err instanceof SurveyQuestionNotFoundError) {
        return res.status(404).json({message: err.message});
    // 400
    } else if (err instanceof SurveyQuestionInputError) {
        return res.status(400).json({message: err.message});
    } else if (err instanceof SurveyQuestionConflictError) {
        return res.status(409).json({message: err.message});
    // Boom error
    } else if(err.output && err.output.statusCode) {
        return res.status(err.output.statusCode).json(err.output.payload);
    } else {
        return res.status(500).json({message: err.message});
    }
};
