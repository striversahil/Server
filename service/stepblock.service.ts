import { CodeBlock, CodeBlockSchema } from "../models/project/codeblock.model";
import { StepBlock, StepBlockType } from "../models/project/stepblock.model";
import languageDefault from "../package/common/codeBlock/defaultLanguageOutput.json";

class StepBlockService {
  static async getAll(codeBlock_id: string): Promise<any | null> {
    try {
      const codeBlock = await CodeBlock.findById(codeBlock_id).populate(
        "steps",
        "_id name language"
      );
      return codeBlock;
      // const Steps = codeBlock.steps.map((step: any) => {
      //   return {
      //     name: step.name,
      //     id: step._id,
      //     language: step.language,
      //   };
      // });
      // const codeblock: any = codeBlock;
      // codeblock.steps = Steps;
      // console.log("CodeBlock is thsi ", codeblock, Steps);
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
    language: string,
    step_id?: string
  ): Promise<StepBlockType | null> {
    try {
      const payload = languageDefault.find((item: any) => {
        if (item.value === language) {
          return item;
        }
      });
      const newStepBlock = new StepBlock({
        name: payload?.label,
        code: payload?.code,
        language: payload?.value,
        output: payload?.stdout,
        stdout: payload?.stdout,
      });

      await newStepBlock.save();

      if (step_id) {
        const codeBlock = await CodeBlock.findById(codeBlock_id);
        codeBlock?.steps.splice(
          codeBlock.steps.indexOf(step_id as any) + 1,
          0,
          newStepBlock._id as any
        );
        if (!codeBlock) return null;
        await codeBlock.save();
      } else {
        const codeBlock = await CodeBlock.findByIdAndUpdate(
          codeBlock_id,
          {
            $push: {
              steps: newStepBlock._id as string,
            },
          },
          { new: true }
        );
        if (!codeBlock) return null;
        await codeBlock.save();
      }

      return newStepBlock;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async codeUpdate(
    stepBlock_id: string,
    code: string
  ): Promise<StepBlockType | null> {
    try {
      const stepBlock = await StepBlock.findById(stepBlock_id);
      if (!stepBlock) return null;
      stepBlock.code = code;
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

  static async updateName(stepBlock_id: string, name: string) {
    try {
      return await StepBlock.findByIdAndUpdate(
        stepBlock_id,
        { name: name },
        { new: true }
      );
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default StepBlockService;
