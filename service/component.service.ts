/**
 * Component Service : It will Assume that You have done all the Validation Checks
 */

import {
  Component,
  ComponentInterface,
} from "../models/project/component.model";
import { ProjectInterface } from "../models/project/project.model";
import { Project } from "../models/project/project.model";
import { Section } from "../models/project/section.model";

class ComponentService {
  static async getAll(project_id: string): Promise<any[] | null> {
    try {
      const project = await Section.findById(project_id).populate("components");
      if (!project) return null;
      return project.components || null;
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

  static async updateComponent(
    metadata: any,
    payload: any
  ): Promise<ComponentInterface | null> {
    try {
      const component = await Component.findByIdAndUpdate(
        metadata._id,
        {
          name: metadata.name,
          coordinates: metadata.coordinates,
          payload: payload,
          configuration: metadata.configuration,
        },
        { new: true }
      );
      return component;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    project_id: string,
    metadata: any,
    payload: any
  ): Promise<ComponentInterface | null> {
    try {
      const newComponent = new Component({
        name: metadata.name,
        coordinates: metadata.coordinates,
        payload: payload,
        configuration: metadata.configuration,
      });
      await Project.findByIdAndUpdate(
        project_id,
        {
          $push: {
            components: newComponent._id,
          },
        },
        { new: true }
      );
      await newComponent.save();
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
    section_id: string
  ): Promise<ComponentInterface | null> {
    try {
      const component = await Component.findByIdAndDelete(id);
      if (!component) return null;
      const project = await Section.findByIdAndUpdate(section_id, {
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
