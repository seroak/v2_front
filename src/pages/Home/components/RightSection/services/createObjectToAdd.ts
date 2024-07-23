import { AllObjectItem } from "@/pages/Home/types/allObjectItem";
import { ForItem } from "@/pages/Home/types/forItem";
import { ConditionItem } from "@/pages/Home/types/conditionItem";
import { PrintItem } from "@/pages/Home/types/printItem";
import { CreateForDataToAdd } from "@/pages/Home/types/createDataToAdd/createForDataToAdd";
import { CreatePrintDataToAdd } from "@/pages/Home/types/createDataToAdd/createPrintDataToAdd";
import { CreateIfElseDataToAdd } from "@/pages/Home/types/createDataToAdd/createIfElseDataToAdd";
import { CreateIfElseChangeDataToAdd } from "@/pages/Home/types/createDataToAdd/createIfElseChangeDataToAdd";
import { CreateCodeFlowVariableDtoToAdd } from "@/pages/Home/types/createDataToAdd/createCodeFlowVariableDataToAdd";
// 스택에 넣을 객체를 생성하는 함수
export const createObjectToAdd = (
  preprocessedCode: CreatePrintDataToAdd | CreateForDataToAdd | CreateIfElseDataToAdd
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
        expr: (preprocessedCode as CreatePrintDataToAdd).expr!,
        highlights: (preprocessedCode as CreatePrintDataToAdd).highlights!,
        console: (preprocessedCode as CreatePrintDataToAdd).console,
      } as PrintItem;

    case "for":
      preprocessedCode = preprocessedCode as CreateForDataToAdd;

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
        expr: (preprocessedCode as CreateIfElseDataToAdd).expr!,
      };

    case "elif":
      return {
        ...(baseObject as ConditionItem),
        highlights: [],
        expr: (preprocessedCode as CreateIfElseDataToAdd).expr!,
      };

    case "else":
      return {
        ...(baseObject as ConditionItem),
        highlights: [],
        expr: (preprocessedCode as CreateIfElseDataToAdd).expr!,
      };

    case "ifelsechange":
      return {
        ...baseObject,
        highlights: (preprocessedCode as CreateIfElseChangeDataToAdd).highlights!,
        expr: (preprocessedCode as CreateIfElseChangeDataToAdd).expr!,
      };

    case "variable":
      return {
        ...baseObject,
        expr: (preprocessedCode as CreateCodeFlowVariableDtoToAdd).expr!,
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
