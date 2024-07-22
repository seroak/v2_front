import { ForDto, isForDto } from "./forDto";
import { PrintDto, isPrintDto } from "./printDto";
import { VariablesDto, isVariablesDto } from "./variablesDto";
import { IfElseDto, isIfElseDto } from "./ifElseDto";
import { IfElseChangeDto, isIfElseChangeDto } from "./ifElseChangeDto";
import { CodeFlowVariableDto, isCodeFlowVariableDto } from "./codeFlowVariableDto";
export type ValidTypeDto = ForDto | PrintDto | VariablesDto | IfElseDto | IfElseChangeDto | CodeFlowVariableDto;

export const isValidTypeDto = (item: any): item is ValidTypeDto => {
  return (
    isForDto(item) ||
    isPrintDto(item) ||
    isVariablesDto(item) ||
    isIfElseDto(item) ||
    isIfElseChangeDto(item) ||
    isCodeFlowVariableDto(item)
  );
};

export const isValidTypeDtoArray = (data: any): data is ValidTypeDto[] => {
  return Array.isArray(data) && data.every(isValidTypeDto);
};
