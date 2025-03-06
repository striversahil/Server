import { CodeBlock } from "../models/project/codeblock.model";
import { StepBlock, StepBlockType } from "../models/project/stepblock.model";

class StepBlockService {
  static async getAll(codeBlock_id: string): Promise<any[] | null> {
    try {
      const codeBlock = await CodeBlock.findById(codeBlock_id).populate(
        "steps"
      );
      if (!codeBlock) return null;
      const steps = codeBlock.steps.map((step: any) => {
        return {
          name: step.name,
          id: step._id,
        };
      });
      return steps;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getById(stepBlock_id: string): Promise<StepBlockType | null> {
    try {
      return await StepBlock.findById(stepBlock_id);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    codeBlock_id: string,
    payload: any
  ): Promise<StepBlockType> {
    try {
      const newStepBlock = new StepBlock({
        name: payload.name,
        code: payload.code,
      });
      CodeBlock.findByIdAndUpdate(codeBlock_id, {
        $push: {
          steps: newStepBlock._id,
        },
      });
      await newStepBlock.save();
      return newStepBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async codeUpdate(
    stepBlock_id: string,
    payload: any
  ): Promise<StepBlockType | null> {
    try {
      const stepBlock = await StepBlock.findById(stepBlock_id);
      if (!stepBlock) return null;
      stepBlock.code = payload.code;
      await stepBlock.save();
      return stepBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(
    stepBlock_id: string,
    codeBlock_id: string
  ): Promise<StepBlockType | null> {
    try {
      await CodeBlock.findByIdAndUpdate(codeBlock_id, {
        $pull: {
          steps: stepBlock_id,
        },
      });
      const stepBlock = await StepBlock.findByIdAndDelete(stepBlock_id);
      if (!stepBlock) return null;
      return stepBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async duplicate(
    codeBlock_id: string,
    stepBlock_id: string
  ): Promise<StepBlockType | null> {
    try {
      const stepBlock = await StepBlock.findById(stepBlock_id);
      if (!stepBlock) return null;

      const newStepBlock = new StepBlock({
        name: stepBlock.name,
        code: stepBlock.code,
        language: stepBlock.language,
        output: stepBlock.output,
      });
      await newStepBlock.save();

      const codeBlock = await CodeBlock.findById(codeBlock_id);
      if (!codeBlock) return null;

      const steps = codeBlock.steps;
      const stepIndex = steps.indexOf(stepBlock_id as any);

      codeBlock.steps.splice(stepIndex + 1, 0, newStepBlock._id as any);
      await codeBlock.save();

      return newStepBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default StepBlockService;
