import { VariableDto } from "./variableDto";
export interface VariablesDto {
  variables: VariableDto[];
  type: string;
}

export const isVariablesDto = (item: any): item is VariablesDto => {
  return typeof item.variables === "object" && typeof item.type == "string";
};
