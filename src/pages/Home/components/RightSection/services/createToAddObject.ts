import { AllObjectItem } from "@/pages/Home/types/allObjectItem";
import { ForItem } from "@/pages/Home/types/forItem";
import { ConditionItem } from "@/pages/Home/types/conditionItem";
import { PrintItem } from "@/pages/Home/types/printItem";
import { CreateToAddForData } from "@/pages/Home/types/createToAddData/createToAddForData";
import { CreateToAddPrintData } from "@/pages/Home/types/createToAddData/createToAddPrintData";
import { CreateToAddIfElseData } from "@/pages/Home/types/createToAddData/createToAddIfElseData";
import { CreateToAddIfElseChangeData } from "@/pages/Home/types/createToAddData/createToAddIfElseChangeData";
// 스택에 넣을 객체를 생성하는 함수
export const createToAddObject = (
  preprocessedCode:
    | CreateToAddPrintData
    | CreateToAddForData
    | CreateToAddIfElseData
): AllObjectItem => {
  const baseObject: AllObjectItem = {
    id: preprocessedCode.id!,
    type: preprocessedCode.type,
    depth: preprocessedCode.depth!,
    isLight: false,
    child: [],
  };

  const type: string = preprocessedCode.type.toLowerCase();

  // type에 따라서 객체 생성
  switch (type) {
    case "print":
      return {
        ...baseObject,
        expr: (preprocessedCode as CreateToAddPrintData).expr!,
        highlights: (preprocessedCode as CreateToAddPrintData).highlights!,
      } as PrintItem;
    case "for":
      preprocessedCode = preprocessedCode as CreateToAddForData;
      // for문 highlights 객체로 변환
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
        expr: (preprocessedCode as CreateToAddIfElseData).expr!,
      };
    case "elif":
      return {
        ...(baseObject as ConditionItem),
        highlights: [],
        expr: (preprocessedCode as CreateToAddIfElseData).expr!,
      };
    case "else":
      return {
        ...(baseObject as ConditionItem),
        highlights: [],
        expr: (preprocessedCode as CreateToAddIfElseData).expr!,
      };
    case "ifelsechange":
      return {
        ...baseObject,
        highlights: (preprocessedCode as CreateToAddIfElseChangeData)
          .highlights!,
        expr: (preprocessedCode as CreateToAddIfElseChangeData).expr!,
      };
    default:
      throw new Error(`Unsupported type: ${type}`); // 옵셔널 체이닝으로 undefined일 경우 처리
  }
};
