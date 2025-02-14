/**
 * Component Service : It will Assume that You have done all the Validation Checks
 */

import {
  Component,
  ComponentInterface,
} from "@/models/project/component.model";
import { Project } from "@/models/project/project.model";

class ComponentService {
  static async getAll(): Promise<ComponentInterface[]> {
    return await Component.find();
  }

  static async getById(id: string): Promise<ComponentInterface | null> {
    return await Component.findById(id);
  }

  static async create(project_id: string): Promise<ComponentInterface> {
    const newComponent = new Component();
    await newComponent.save();
    await Project.findByIdAndUpdate(project_id, {
      $push: {
        components: newComponent._id,
      },
    });
    return newComponent;
  }

  //   static async updateComponent(id: string, Component: any) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await Component.findByIdAndUpdate(id, Component);
  //   }

  static async delete(id: string) {
    return await Component.findByIdAndDelete(id);
  }
}

export default ComponentService;
