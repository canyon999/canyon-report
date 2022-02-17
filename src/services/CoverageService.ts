import {file,mockTreeSummary} from "../mock";

export class CoverageService {
  static async retrieveACoverageForAProject(params: any): Promise<any> {
    return mockTreeSummary
  }
  static async fileContent(params: any): Promise<any> {
    return file
  }
}
