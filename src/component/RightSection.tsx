import { useState, useContext, ReactElement, Fragment } from "react";
import ForBox from "./ForBox";
import VariableBox from "./VariableBox";
import IfBox from "./IfBox";
import ElseBox from "./ElseBox";
import PrintBox from "./PrintBox";
import { CodeDataContext } from "../pages/Home";
import _ from "lodash";

// 타입 정의
import { CodeItem } from "@/types/codeItem";
import { AllObjectItem } from "@/types/allObjectItem";
import { ActivateItem } from "@/types/activateItem";
import { ForItem } from "@/types/forItem";
import { PrintItem } from "@/types/printItem";
import { IfItem } from "@/types/ifItem";
import { ElseItem } from "@/types/elseItem";
import { VarItem } from "@/types/varItem";
interface ObjectItem {
  id: number;
  type: string;
  depth?: number;
  isLight: boolean;
  child: AllObjectItem[];
}
interface State {
  objects: AllObjectItem[];
}

const RightSection = () => {
  const [idx, setIdx] = useState<number>(0);
  const [usedId, setUsedId] = useState<number[]>([]); // 한 번사용한 id를 저장하는 리스트
  const [codeFlow, setCodeFlow] = useState<State>({
    // 시각화전에 데이터를 담아두는 리스트 객체
    objects: [{ id: 0, type: "start", depth: 0, isLight: false, child: [] }],
  });
  const [dataStructures, setDataStructures] = useState<CodeItem[]>([]); // 변수 데이터 시각화 리스트
  const [usedName, setUsedName] = useState<string[]>([]); // 사용한 변수 데이터 name 모아두는 리스트
  const [activate, setActivate] = useState<ActivateItem[]>([]); // 애니메이션을 줄 때 사용하는 리스트

  // context API로 데이터 가져오기
  // context API를 사용하는 패턴
  const context = useContext(CodeDataContext);
  //context가 없을 경우 에러 출력 패턴 처리안해주면 에러 발생
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }
  const { codeData } = context;
  // 스택에 넣을 객체를 생성하는 함수
  const createNewObject = (idx: number): AllObjectItem => {
    const baseObject: ObjectItem = {
      id: codeData[idx].id!,
      type: codeData[idx].type,
      depth: codeData[idx].depth,
      isLight: false,
      child: [],
    };
    const type: string = codeData[idx].type.toLowerCase();
    // type에 따라서 객체 생성
    switch (type) {
      case "print":
        return {
          ...baseObject,
          expr: codeData[idx].expr!,
          highlights: codeData[idx].highlights!,
        } as PrintItem;
      case "for":
        // for문 highlights 객체로 변환
        let isCurLight = false;
        let isStartLight = false;
        let isEndLight = false;
        let isStepLight = false;
        codeData[idx].highlights?.map((highlight: any) => {
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
          start: codeData[idx].condition!.start,
          end: codeData[idx].condition!.end,
          cur: codeData[idx].condition!.cur,
          target: codeData[idx].condition!.target,
          step: codeData[idx].condition!.step,
          isStartLight: isStartLight,
          isEndLight: isEndLight,
          isCurLight: isCurLight,
          isStepLight: isStepLight,
        } as ForItem;
      case "if":
        return baseObject as IfItem;
      case "else":
        return baseObject as ElseItem;
      default:
        console.log(type + " is not implemented!");
        return null as any;
    }
  };

  // 새로운 객체를 뒤에 추가하는 함수
  const addChild = (
    codeFlows: AllObjectItem[], // 현제 코드흐름 시각화 정보를 담고 있는 리스트
    targetDepth: number, // 추가해야하는 위치를 알려주는 depth
    newObject: AllObjectItem // 추가해야하는 객체 (이건 이름을 어떻게 지을까 toAddObject이렇게 할까)
  ): AllObjectItem[] => {
    //  add는 뒤에서 부터 추가한다
    let updated = false;
    return codeFlows.reduceRight<AllObjectItem[]>((acc, codeFlow) => {
      // 아직 추가하지 않았고, depth가 targetDepth - 1인 경우
      if (!updated && codeFlow.depth === targetDepth - 1) {
        updated = true;
        // 해당 노드의 child에 새로운 객체를 추가한다
        acc.unshift({ ...codeFlow, child: [...codeFlow.child, newObject] });
      }
      // 아직 child가 있고 노드가 끝나지 않은 경우
      else if (codeFlow.child && codeFlow.child.length > 0) {
        acc.unshift({
          ...codeFlow,
          // child로 들어가서 그 안에서 재귀로 들어간다
          child: addChild(codeFlow.child, targetDepth, newObject),
        });
      }
      // child가 더이상 없는 경우
      else {
        // 그냥 노드를 추가한다
        acc.unshift(codeFlow);
      }
      // 더 이상 돌 곳이 없으면 누산기를 반환한다
      return acc;
    }, []);
  };

  // 객체를 수정해야하는 경우에 실행하는 함수
  const updateChild = (
    codeFlows: AllObjectItem[], //현제 코드흐름 시각화 정보를 담고 있는 리스트
    newObject: AllObjectItem //수정해야하는 정보를 담고 있는 객체
  ): AllObjectItem[] => {
    return codeFlows.map((codeFlow) => {
      // 비주얼 스택을 순회하면서 수정해야하는 위치를 찾는다
      // 발견하고 반복문이 바로 끝나는 것이 아니라 계속 돌면서 남아있는 객체도 반환해야한다
      if (codeFlow.id === newObject.id) {
        // 발견하면 들어가서 수정한다
        return { ...codeFlow, ...newObject, child: codeFlow.child };
      } else if (codeFlow.child && codeFlow.child.length > 0) {
        // 끝까지 찾아도 없으면 child로 들어가서 재귀적으로 탐색한다
        return { ...codeFlow, child: updateChild(codeFlow.child, newObject) };
      } else {
        // 끝까지 찾아도 없으면 그냥 객체를 반환한다
        return codeFlow;
      }
    });
  };

  // 하이라이트 효과를 줘야하는 부분을 표시해주는 함수
  const turnLight = (
    codeFlows: AllObjectItem[], //비주얼 스택
    Activate: ActivateItem[] //활성화 스택
  ): AllObjectItem[] => {
    return codeFlows.map((codeFlow) => {
      if (Activate.some((data) => data.id === codeFlow.id)) {
        // 수정해야하는 위치일때
        // isLight을 true로 바꾼다
        return {
          ...codeFlow,
          isLight: true,
          child: turnLight(codeFlow.child, Activate),
        };
      } else if (codeFlow.child && codeFlow.child.length > 0) {
        return {
          ...codeFlow,
          isLight: false,
          child: turnLight(codeFlow.child, Activate),
        };
      } else {
        return { ...codeFlow, isLight: false };
      }
    });
  };

  // 자료구조 부분을 수정할때 실행하는 함수
  const updateVar = (
    targetName: string,
    dataStructures: CodeItem[], // 원래 들어있는 자료구조 데이터
    newData: CodeItem // 수정해야하는 자료구조가 들어있는 데이터
  ): CodeItem[] => {
    return dataStructures.map((dataStructure) => {
      return dataStructure.name === targetName
        ? { ...dataStructure, ...newData }
        : dataStructure;
    });
  };

  const updateActivate = (
    oldActivates: ActivateItem[], // 불이 들어와야하는 객체를 저장하는 옛날 리스트
    newActivate: ObjectItem // 새로 불이 들어와야하는 곳의 정보를 담고있는 객체
  ): ActivateItem[] => {
    // 새로 생성되는 활성화리스트를 임시로 받아서 리턴할 변수
    let tmpActivate: ActivateItem[] = [];

    for (let oldActivate of oldActivates) {
      if (oldActivate.depth === newActivate.depth) {
        tmpActivate.push({
          id: newActivate.id,
          depth: newActivate.depth,
          type: newActivate.type,
        });

        return tmpActivate;
      }
    }

    tmpActivate.push({
      id: newActivate.id,
      depth: newActivate.depth!,
      type: newActivate.type,
    });

    return tmpActivate;
  };

  const renderComponent = (
    codeFlows: AllObjectItem[] // 코드흐름을 보여주는 정보를 담고 있는 리스트
  ): JSX.Element => {
    return (
      <>
        {codeFlows.map((codeFlow) => {
          switch (codeFlow.type) {
            case "print": {
              const printItem = codeFlow as PrintItem;
              return (
                <Fragment key={codeFlow.id}>
                  <PrintBox key={printItem.id} printItem={printItem} />
                  {renderComponent(codeFlow.child)}
                </Fragment>
              );
            }
            case "for": {
              const forItem = codeFlow as ForItem;
              return (
                <ForBox key={forItem.id} forItem={forItem}>
                  {renderComponent(forItem.child)}
                </ForBox>
              );
            }
            case "if":
              return (
                <IfBox key={codeFlow.id} isLight={codeFlow.isLight}>
                  {renderComponent(codeFlow.child)}
                </IfBox>
              );
            case "else":
              return (
                <ElseBox key={codeFlow.id} isLight={codeFlow.isLight}>
                  {renderComponent(codeFlow.child)}
                </ElseBox>
              );
            default:
              return null;
          }
        })}
      </>
    );
  };

  const renderComponentDataStruct = (
    dataStructures: VarItem[] //변수시각화 리스트
  ): ReactElement => {
    return (
      <>
        {dataStructures.map((dataStructure) => (
          <VariableBox
            key={dataStructure.name}
            value={dataStructure.expr!}
            name={dataStructure.name!}
            isLight={dataStructure.isLight!}
          />
        ))}
      </>
    );
  };

  const handleClick = () => {
    // 임시로 코드흐름 시각화 정보를 담아둘 리스트를 미리 선언
    let changedCodeFlows: AllObjectItem[] = [];
    if (idx >= codeData.length) {
      console.log("더이상 데이터가 없습니다");
      return;
    }

    // 자료구조 시각화를 복사해서 담아놓는 변수
    let copyDataStructures = _.cloneDeep(dataStructures);
    // 자료구조 시각화 부분이 들어왔을 때
    if (codeData[idx].type.toLowerCase() === "assignViz".toLowerCase()) {
      codeData[idx].variables?.forEach((element) => {
        if (usedName.includes(element.name!)) {
          const targetName = element.name!;
          copyDataStructures = updateVar(
            targetName,
            copyDataStructures,
            element
          );
        } else {
          copyDataStructures.push(element);
          setUsedName((prevName) => [...prevName, element.name!]);
        }
      });
    }
    // 코드 시각화 부분이 들어왔을 때
    else {
      const newObject = createNewObject(idx);
      if (usedId.includes(codeData[idx].id!)) {
        // 한번 codeFlow list에 들어가서 수정하는 입력일 때
        // updateChild(비주얼 스택, 넣어야하는 위치를 알려주는 id, 넣어야하는 data)
        changedCodeFlows = updateChild(codeFlow.objects, newObject);
      } else {
        // 처음 codeFlow list에 들어가서 더해야하는 입력일 때
        const targetDepth: number = codeData[idx].depth!;
        const id: number = codeData[idx].id!;

        // 한번 사용한 id는 저장해준다
        setUsedId((prevIds) => [...prevIds, id]);
        // addChild(비주얼 스택, 넣어야하는 위치를 알려주는 depth, 넣어야하는 data)
        changedCodeFlows = addChild(codeFlow.objects, targetDepth, newObject);
      }

      const newActivate = updateActivate(activate, newObject);
      const turnedLight = turnLight(changedCodeFlows, newActivate);

      setActivate(newActivate);
      setCodeFlow({ objects: turnedLight });
    }

    // 불을 켜줘야하는 데이터 구조의 아이디를 담는 배열
    let idDataStructures;
    if (codeData[idx].variables === undefined) {
      idDataStructures = [];
    } else {
      idDataStructures = codeData[idx].variables?.map((element) => {
        return element.name;
      });
    }

    // 데이터 구조 시각화에서 isLight를 불을 켜줘야하는 부분에서 true인지 false인지 판단해주는 부분
    copyDataStructures = copyDataStructures.map((copyDataStructure) => {
      return {
        ...copyDataStructure,
        isLight: idDataStructures?.includes(copyDataStructure.name),
      };
    });

    setDataStructures(copyDataStructures);
    setIdx(idx + 1);
  };

  return (
    <div style={{ backgroundColor: "#f4f4f4", width: "100%" }}>
      <div>
        <ul style={{ display: "flex" }}>
          {renderComponentDataStruct(dataStructures)}
        </ul>
      </div>

      <ul>{renderComponent(codeFlow.objects[0].child)}</ul>
      <button onClick={handleClick}>특정 객체 child 에 객체 생성</button>
    </div>
  );
};

export default RightSection;
