import { ForDto, isForDto } from "./forDto";
import { PrintDto, isPrintDto } from "./printDto";
import { VariablesDto, isVariablesDto } from "./variablesDto";
import { IfElseDto, isIfElseDto } from "./ifElseDto";
import { IfElseChangeDto, isIfElseChangeDto } from "./ifElseChangeDto";
export type AllDto = ForDto | PrintDto | VariablesDto | IfElseDto | IfElseChangeDto;

export const isAllDto = (item: any): item is AllDto => {
  return (
    isForDto(item) ||
    isPrintDto(item) ||
    isVariablesDto(item) ||
    isIfElseDto(item) ||
    isIfElseChangeDto(item)
  );
};

export const isAllDtoArray = (data: any): data is AllDto[] => {
  return Array.isArray(data) && data.every(isAllDto);
};
