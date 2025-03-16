import { Response } from "express";
export declare const sendResponse: (res: Response, statusCode: number, message: string, data?: any) => Response<any, Record<string, any>>;
