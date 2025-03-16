import { Response } from "express";

export const sendResponse = (
  res:Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};
