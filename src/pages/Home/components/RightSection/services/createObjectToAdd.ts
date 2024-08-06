import { AllObjectItem } from "@/pages/Home/types/allObjectItem";
import { ForItem } from "@/pages/Home/types/forItem";
import { ConditionItem } from "@/pages/Home/types/conditionItem";
import { PrintItem } from "@/pages/Home/types/printItem";
import { ForDataToAdd } from "@/pages/Home/types/dataToAdd/forDataToAdd";
import { PrintDataToAdd } from "@/pages/Home/types/dataToAdd/printDataToAdd";
import { IfElseDataToAdd } from "@/pages/Home/types/dataToAdd/ifElseDataToAdd";
import { IfElseChangeDataToAdd } from "@/pages/Home/types/dataToAdd/ifElseChangeDataToAdd";
import { CodeFlowVariableDtoToAdd } from "@/pages/Home/types/dataToAdd/codeFlowVariableDataToAdd";
import { WhileDto } from "@/pages/Home/types/dto/whileDto";
import { CodeFlowListDto } from "@/pages/Home/types/dto/codeFlowListDto";
// 스택에 넣을 객체를 생성하는 함수
export const createObjectToAdd = (
  preprocessedCode: PrintDataToAdd | ForDataToAdd | IfElseDataToAdd | WhileDto
): AllObjectItem => {
  const baseObject: AllObjectItem = {
    id: preprocessedCode.id!,
    type: preprocessedCode.type,
    depth: preprocessedCode.depth!,
    isLight: false,
    child: [],
  };

  const type: string = preprocessedCode.type.toLowerCase();

  switch (type) {
    case "print":
      return {
        ...baseObject,
        expr: (preprocessedCode as PrintDataToAdd).expr!,
        highlights: (preprocessedCode as PrintDataToAdd).highlights!,
        console: (preprocessedCode as PrintDataToAdd).console,
      } as PrintItem;

    case "for":
      preprocessedCode = preprocessedCode as ForDataToAdd;

      let isCurLight = false;
      let isStartLight = false;
      let isEndLight = false;
      let isStepLight = false;
      preprocessedCode.highlights?.map((highlight: any) => {
        highlight = highlight.toLowerCase();

        if (highlight === "cur") {
          isCurLight = true;
        }
        if (highlight === "start") {
          isStartLight = true;
        }
        if (highlight === "end") {
          isEndLight = true;
        }
        if (highlight === "step") {
          isStepLight = true;
        }
      });

      return {
        ...baseObject,
        start: preprocessedCode.condition!.start,
        end: preprocessedCode.condition!.end,
        cur: preprocessedCode.condition!.cur,
        target: preprocessedCode.condition!.target,
        step: preprocessedCode.condition!.step,
        isStartLight: isStartLight,
        isEndLight: isEndLight,
        isCurLight: isCurLight,
        isStepLight: isStepLight,
      } as ForItem;

    case "if":
      return {
        ...(baseObject as ConditionItem),
        highlights: [],
        expr: (preprocessedCode as IfElseDataToAdd).expr,
      };

    case "elif":
      return {
        ...(baseObject as ConditionItem),
        highlights: [],
        expr: (preprocessedCode as IfElseDataToAdd).expr,
      };

    case "else":
      return {
        ...(baseObject as ConditionItem),
        highlights: [],
        expr: (preprocessedCode as IfElseDataToAdd).expr,
      };

    case "ifelsechange":
      return {
        ...baseObject,
        highlights: (preprocessedCode as IfElseChangeDataToAdd).highlights!,
        expr: (preprocessedCode as IfElseChangeDataToAdd).expr,
      };

    case "variable":
      return {
        ...baseObject,
        expr: (preprocessedCode as CodeFlowVariableDtoToAdd).expr,
      };
    case "list":
      return {
        ...baseObject,
        expr: (preprocessedCode as CodeFlowListDto).expr,
      };
    case "whilechangecondition":
      return {
        ...baseObject,
        type: "while",
        highlights: [],
        expr: (preprocessedCode as WhileDto).expr,
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
