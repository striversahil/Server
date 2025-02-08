import { Request, Response } from "express";
import asyncHandler from "../../helper/asyncHandler";

export const CreateComponent = asyncHandler(async (req: Request, res: Response) => {
      const { component } = req.body;
});