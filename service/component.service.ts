/**
 * Component Service : It will Assume that You have done all the Validation Checks
 */

import {
  Component,
  ComponentInterface,
} from "../models/project/component.model";
import { Project } from "../models/project/project.model";

class ComponentService {
  static async getAll(project_id: string): Promise<ComponentInterface[]> {
    try {
      const project = await Project.findById(project_id);
      if (!project) return [];
      return await Component.find({ _id: { $in: project.components } }).sort({
        createdAt: -1,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getById(id: string): Promise<ComponentInterface | null> {
    try {
      return await Component.findById(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    project_id: string,
    name: string,
    coordinates: number[],
    payload: any,
    configuration: any
  ): Promise<ComponentInterface | null> {
    try {
      const newComponent = new Component(
        {
          name: name,
          coordinates: coordinates,
          payload: payload,
          configuration: configuration,
        },
        { new: true }
      );
      await newComponent.save();
      const project = await Project.findByIdAndUpdate(
        project_id,
        {
          $push: {
            components: newComponent._id,
          },
        },
        { new: true }
      );
      if (!project) return null;
      // this returning project neccesary to confirm that component is added to project
      return newComponent;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  //   static async updateComponent(id: string, Component: any) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await Component.findByIdAndUpdate(id, Component);
  //   }

  static async delete(
    id: string,
    project_id: string
  ): Promise<ComponentInterface | null> {
    try {
      const component = await Component.findByIdAndDelete(id);
      if (!component) return null;
      const project = await Project.findByIdAndUpdate(project_id, {
        $pull: {
          components: id,
        },
      });
      if (!project) return null;
      return component;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default ComponentService;
