// import { Request, Response } from "express";
// import asyncHandler from "../../../../helper/asyncHandler";
// import ApiResponse from "../../../../helper/ApiResponse";
// import StepBlockService from "../../../../service/stepblock.service";

// export const updateStep = asyncHandler(async (req: Request, res: Response) => {
//   const { metadata, payload } = req.body;
//   if (!metadata) {
//     return res
//       .status(400)
//       .json(new ApiResponse(400, {}, "CodeBlock Not given with Params..."));
//   }
//   if (!payload) {
//     return res.status(400).json(new ApiResponse(400, {}, "Step not given"));
//   }
//   const codeBlock = await StepBlockService.update(
//     metadata._id,
//     metadata.step,
//     payload
//   );
//   if (!codeBlock) {
//     return res
//       .status(500)
//       .json(
//         new ApiResponse(
//           500,
//           {},
//           "CodeBlock could not be updated \n Server Error"
//         )
//       );
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, codeBlock, "CodeBlock Updated Successfully"));
// });
