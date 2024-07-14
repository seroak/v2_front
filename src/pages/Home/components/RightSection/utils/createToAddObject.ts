import { AllObjectItem } from "@/types/allObjectItem";
import { ForItem } from "@/types/forItem";
import { ConditionItem } from "@/types/conditionItem";
import { PrintItem } from "@/types/printItem";
import { MainFuncForElseData } from "@/types/mainFuncData/mainFuncForData";
import { MainFuncPrintData } from "@/types/mainFuncData/mainFuncPrintData";
import { MainFuncIfElseData } from "@/types/mainFuncData/mainFuncifElseData";
// 스택에 넣을 객체를 생성하는 함수
export const createToAddObject = (
  preprocessedCode: MainFuncPrintData | MainFuncForElseData | MainFuncIfElseData
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
        expr: (preprocessedCode as MainFuncPrintData).expr!,
        highlights: (preprocessedCode as MainFuncPrintData).highlights!,
      } as PrintItem;
    case "for":
      preprocessedCode = preprocessedCode as MainFuncForElseData;
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
        expr: (preprocessedCode as MainFuncIfElseData).expr!,
      };
    case "elif":
      return {
        ...(baseObject as ConditionItem),
        expr: (preprocessedCode as MainFuncIfElseData).expr!,
      };
    case "else":
      return {
        ...(baseObject as ConditionItem),
        expr: (preprocessedCode as MainFuncIfElseData).expr!,
      };
    default:
      throw new Error(`Unsupported type: ${type}`); // 옵셔널 체이닝으로 undefined일 경우 처리
  }
};
