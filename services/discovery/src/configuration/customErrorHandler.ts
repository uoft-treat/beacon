import {ApiInputError}         from "../service/error/ApiInputError";
import {ApiDuplicateNameError} from "../service/error/ApiDuplicateNameError";
import {ApiNotFoundError}      from "../service/error/ApiNotFoundError";

export const customErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiInputError) {
        return res.status(400).json({message: err.message});
    } else if (err instanceof ApiDuplicateNameError) {
        return res.status(409).json({message: err.message});
    } else if (err instanceof ApiNotFoundError) {
        return res.status(404).json({message: err.message});
    } else if (err.output && err.output.statusCode) {
        return res.status(err.output.statusCode).json(err.output.payload);
    } else {
        return res.status(500).json({message: err.message});
    }
}
