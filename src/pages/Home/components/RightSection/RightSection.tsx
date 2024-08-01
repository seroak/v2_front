import { useState, useContext, useEffect } from "react";
import { PreprocessedCodesContext } from "../../Home";
import "./RightSection.css";
import Split from "react-split";
import _ from "lodash";

// 타입 정의
import { CodeItem } from "@/pages/Home/types/codeItem";
import { AllObjectItem } from "@/pages/Home/types/allObjectItem";
import { ActivateItem } from "@/pages/Home/types/activateItem";
import { VariablesItem } from "@/pages/Home/types/variablesItem";
import { VariablesDto } from "@/pages/Home/types/dto/variablesDto";
import { ForDto } from "@/pages/Home/types/dto/forDto";
import { PrintDto } from "@/pages/Home/types/dto/printDto";
import { IfElseDto } from "@/pages/Home/types/dto/ifElseDto";
import { CodeFlowVariableDto } from "@/pages/Home/types/dto/codeFlowVariableDto";
import { PrintItem } from "@/pages/Home/types/printItem";
// services폴더에서 가져온 함수
import { addCodeFlow } from "./services/addCodeFlow";
import { updateCodeFlow } from "./services/updateCodeFlow";
import { turnLight } from "./services/turnLight";
import { createObjectToAdd } from "./services/createObjectToAdd";
import { updateDataStructure } from "./services/updateDataStructure";
import { updateActivate } from "./services/updateActivate";
import { turnOffAllNodeLight } from "./services/turnOffAllNodeLight";

//rendUtils에서 가져온 함수
import { renderingStructure } from "./renderingStructure";
import { renderingCodeFlow } from "./renderingCodeFlow";
import { IfElseChangeDto } from "@/pages/Home/types/dto/ifElseChangeDto";
import { refreshCodeFlow } from "./services/refreshCodeFlow";
import { deleteCodeFlow } from "./services/deleteCodeFlow";

//zustand store
import { useConsoleStore, useCodeFlowLengthStore } from "@/store/console";

interface State {
  objects: AllObjectItem[];
}

const RightSection = () => {
  const [codeFlowList, setCodeFlowList] = useState<State[]>([
    {
      objects: [{ id: 0, type: "start", depth: 0, isLight: false, child: [] }],
    },
  ]);
  const [StructuresList, setStructuresList] = useState<CodeItem[][]>([[]]); // 변수 데이터 시각화 리스트의 변화과정을 담아두는 리스트
  const context = useContext(PreprocessedCodesContext); // context API로 데이터 가져오기
  if (!context) {
    throw new Error("CodeContext not found"); //context가 없을 경우 에러 출력 패턴 처리안해주면 에러 발생
  }
  const setConsole = useConsoleStore((state) => state.setConsole);
  const consoleIdx = useConsoleStore((state) => state.consoleIdx);
  const setCodeFlowLength = useCodeFlowLengthStore((state) => state.setCodeFlowLength);
  const { preprocessedCodes } = context;

  // codeFlowList를 업데이트하는 useEffect
  useEffect(() => {
    let trackingId: number = 0;
    let activate: ActivateItem[] = [];
    const usedId: number[] = [];
    const usedName: string[] = [];
    let accCodeFlow: State = {
      objects: [{ id: 0, type: "start", depth: 0, isLight: false, child: [] }],
    };
    let accDataStructures: CodeItem[] = [];
    const accCodeFlowList: State[] = [];
    const accDataStructuresList: CodeItem[][] = [];
    const accConsoleLogList: string[] = [];
    let accConsoleLog: string = "";
    for (let preprocessedCode of preprocessedCodes) {
      let changedCodeFlows: AllObjectItem[] = [];

      // 자료구조 시각화 부분이 들어왔을 때
      if (preprocessedCode.type.toLowerCase() === "assign".toLowerCase()) {
        (preprocessedCode as VariablesDto).variables.forEach((variable: VariablesItem) => {
          // 이미 한번 자료구조 시각화에 표현된 name인 경우
          if (usedName.includes(variable.name!)) {
            const targetName = variable.name!;

            accDataStructures = updateDataStructure(targetName, accDataStructures, variable);
          }
          // 처음 시각화해주는 자료구조인 경우
          else {
            accDataStructures.push(variable as CodeItem);
            usedName.push(variable.name!);
          }

          if (variable.type.toLowerCase() === "variable".toLowerCase()) {
            let deletedCodeFlow = deleteCodeFlow(accCodeFlow.objects, variable.id!);
            accCodeFlow = { objects: deletedCodeFlow };
          }
        });
      }
      // 코드 시각화 부분이 들어왔을 때
      else {
        // ifelseDefine 타입
        if (preprocessedCode.type.toLowerCase() === "ifElseDefine".toLocaleLowerCase()) {
          // ifelse가 들어왔을 때 한번에 모든 노드의 Light를 다 false로  바꿔주는 함수
          const turnoff = turnOffAllNodeLight(accCodeFlow.objects);

          accCodeFlow = { objects: turnoff };
          for (let condition of (preprocessedCode as IfElseDto).conditions) {
            // ifelse 타입의 객체에 depth를 추가해주는 부분
            const ifElseItem = Object.assign(condition, {
              depth: (preprocessedCode as IfElseDto).depth,
            });
            // ifelse 타입의 객체를 만들어주는 함수
            const toAddObject = createObjectToAdd(ifElseItem);

            // isLight를 true로 바꿔준다
            toAddObject.isLight = true;
            let finallyCodeFlow: any;
            if (usedId.includes(toAddObject.id)) {
              // child부분을 초기화 해주는 함수
              finallyCodeFlow = refreshCodeFlow(accCodeFlow.objects, toAddObject);
            } else {
              usedId.push(toAddObject.id);
              finallyCodeFlow = addCodeFlow(accCodeFlow.objects, toAddObject, trackingId);
            }

            accCodeFlow = { objects: finallyCodeFlow };
          }
        }
        //그밖의 타입
        else {
          const toAddObject = createObjectToAdd(
            preprocessedCode as ForDto | PrintDto | IfElseChangeDto | CodeFlowVariableDto
          );

          // print 타입일 때 console창의 로그를 만드는 부분
          if ((toAddObject as PrintItem).type === "print") {
            const printObject = toAddObject as PrintItem;
            if (printObject.console !== null) {
              accConsoleLog += printObject.console;
            }
          }

          // 한번 codeFlow list에 들어가서 수정하는 입력일 때
          if (usedId.includes(toAddObject.id!)) {
            changedCodeFlows = updateCodeFlow(accCodeFlow.objects, toAddObject);
          }
          // 처음 codeFlow list에 들어가서 더해야하는 입력일 때
          else {
            usedId.push(toAddObject.id);
            changedCodeFlows = addCodeFlow(accCodeFlow.objects, toAddObject, trackingId);
          }
          activate = updateActivate(activate, toAddObject);
          const finallyCodeFlow = turnLight(changedCodeFlows, activate);

          accCodeFlow = { objects: finallyCodeFlow };
          trackingId = toAddObject.id;
        }
      }
      // 불을 켜줘야하는 자료구조의의 name을 담는 배열
      let toLightStructures: any;
      if ((preprocessedCode as VariablesDto).variables === undefined) {
        toLightStructures = [];
      } else {
        toLightStructures = (preprocessedCode as VariablesDto).variables?.map((element) => {
          return element.name;
        });
      }

      // toLightStructures 를 참고해서 데이터 구조 시각화 데이터 속성 중 isLight가 true인지 false인지 판단해주는 부분
      accDataStructures = accDataStructures.map((structure) => ({
        ...structure,
        isLight: toLightStructures?.includes(structure.name), // toLightStructures 에 자료구조 name이 있으면 isLight를 true로 바꿔준다
      }));

      // 자료구조리스트에서 얕은 복사 문제가 생겨서 깊은 복사를 해준다
      const deepCloneStructures = _.cloneDeep(accDataStructures);
      accDataStructuresList.push(deepCloneStructures);
      accCodeFlowList.push(accCodeFlow);
      accConsoleLogList.push(accConsoleLog);
    }

    setCodeFlowList(accCodeFlowList);
    setStructuresList(accDataStructuresList);
    setConsole(accConsoleLogList);
    setCodeFlowLength(accCodeFlowList.length);
  }, [preprocessedCodes]);

  return (
    <div id="split-2">
      <Split
        sizes={[50, 50]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        cursor="row-resize"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        className="split-container"
      >
        <div id="split-2-1" className="view-section2-1">
          <p className="view-section-title">시각화</p>
          <div className="view-data">
            <p className="data-name">변수</p>

            <ul className="var-list">
              {StructuresList?.length > 0 && consoleIdx >= 0 && renderingStructure(StructuresList[consoleIdx])}
            </ul>
          </div>
        </div>
        <div id="split-2-2" className="view-section2-2">
          <div className="view-data">
            <p className="data-name">코드흐름</p>

            {codeFlowList?.length > 0 &&
              consoleIdx >= 0 &&
              renderingCodeFlow(codeFlowList[consoleIdx].objects[0].child)}
          </div>
        </div>
      </Split>
    </div>
    // <div style={{ backgroundColor: "#f4f4f4", width: "100%" }}>

    // </div>
  );
};

export default RightSection;
