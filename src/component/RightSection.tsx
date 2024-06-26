import { useState, useContext, ReactElement, Fragment } from "react";
import ForBox from "./ForBox";
import VariableBox from "./VariableBox";
import IfBox from "./IfBox";
import ElseBox from "./ElseBox";
import PrintBox from "./PrintBox";
import { CodeDataContext } from "../pages/Home";
import _ from "lodash";
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
  const [visual, setVisual] = useState<State>({
    // 시각화전에 데이터를 담아두는 리스트 객체
    objects: [{ id: 0, type: "start", depth: 0, isLight: false, child: [] }],
  });
  const [varData, setVarData] = useState<CodeItem[]>([]); // 변수 데이터 시각화 리스트
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
        let curIsLight = false;
        let startIsLight = false;
        let endIsLight = false;
        let stepIsLight = false;
        codeData[idx].highlights?.map((highlight: any) => {
          highlight = highlight.toLowerCase();

          if (highlight === "cur") {
            curIsLight = true;
          }
          if (highlight === "start") {
            startIsLight = true;
          }
          if (highlight === "end") {
            endIsLight = true;
          }
          if (highlight === "step") {
            stepIsLight = true;
          }
        });

        return {
          ...baseObject,
          start: codeData[idx].condition!.start,
          end: codeData[idx].condition!.end,
          cur: codeData[idx].condition!.cur,
          target: codeData[idx].condition!.target,
          step: codeData[idx].condition!.step,
          startIsLight: startIsLight,
          endIsLight: endIsLight,
          curIsLight: curIsLight,
          stepIsLight: stepIsLight,
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
    items: AllObjectItem[],
    targetDepth: number,
    newObject: AllObjectItem
  ): AllObjectItem[] => {
    //  add는 뒤에서 부터 추가한다
    let updated = false;
    return items.reduceRight<AllObjectItem[]>((acc, item) => {
      // 아직 추가하지 않았고, depth가 targetDepth - 1인 경우
      if (!updated && item.depth === targetDepth - 1) {
        updated = true;
        // 해당 노드의 child에 새로운 객체를 추가한다
        acc.unshift({ ...item, child: [...item.child, newObject] });
      }
      // 아직 child가 있고 노드가 끝나지 않은 경우
      else if (item.child && item.child.length > 0) {
        acc.unshift({
          ...item,
          // child로 들어가서 그 안에서 재귀로 들어간다
          child: addChild(item.child, targetDepth, newObject),
        });
      }
      // child가 더이상 없는 경우
      else {
        // 그냥 노드를 추가한다
        acc.unshift(item);
      }
      // 더 이상 돌 곳이 없으면 누산기를 반환한다
      return acc;
    }, []);
  };

  // 객체를 수정해야하는 경우에 실행하는 함수
  const updateChild = (
    // todo renaming for readAbility
    items: AllObjectItem[], //비주얼 스택
    newObject: AllObjectItem //넣어야하는 data
  ): AllObjectItem[] => {
    return items.map((item) => {
      // 비주얼 스택을 순회하면서 수정해야하는 위치를 찾는다
      // 발견하고 반복문이 바로 끝나는 것이 아니라 계속 돌면서 남아있는 객체도 반환해야한다
      if (item.id === newObject.id) {
        // 발견하면 들어가서 수정한다
        return { ...item, ...newObject, child: item.child };
      } else if (item.child && item.child.length > 0) {
        // 끝까지 찾아도 없으면 child로 들어가서 재귀적으로 탐색한다
        return { ...item, child: updateChild(item.child, newObject) };
      } else {
        // 끝까지 찾아도 없으면 그냥 객체를 반환한다
        return item;
      }
    });
  };

  const turnisLight = (
    new_data: AllObjectItem[], //비주얼 스택
    newActivate: ActivateItem[] //활성화 스택
  ): AllObjectItem[] => {
    return new_data.map((item) => {
      if (newActivate.some((data) => data.id === item.id)) {
        // 수정해야하는 위치일때
        // ligthOn을 true로 바꾼다
        return {
          ...item,
          isLight: true,
          child: turnisLight(item.child, newActivate),
        };
      } else if (item.child && item.child.length > 0) {
        return {
          ...item,
          isLight: false,
          child: turnisLight(item.child, newActivate),
        };
      } else {
        return { ...item, isLight: false };
      }
    });
  };

  // todo 변수명 + 구조를 다같이 살펴봐주면.
  const updateVar = (
    targetName: string,
    varData: CodeItem[],
    newVar: CodeItem
  ): CodeItem[] => {
    return varData.map((item) => {
      return item.name === targetName ? { ...item, ...newVar } : item;
    });
  };

  const updateActivate = (
    activate: ActivateItem[], //활성화 스택
    newObject: ObjectItem //넣어야하는 data
  ): ActivateItem[] => {
    let tmp: ActivateItem[] = [];

    for (let element of activate) {
      if (element.depth === newObject.depth) {
        tmp.push({
          id: newObject.id,
          depth: newObject.depth,
          type: newObject.type,
        });

        return tmp;
      }
    }

    tmp.push({
      id: newObject.id,
      depth: newObject.depth!,
      type: newObject.type,
    });

    return tmp;
  };

  const renderComponent = (
    items: AllObjectItem[] //비주얼 스택
  ): JSX.Element => {
    return (
      <>
        {items.map((item) => {
          switch (item.type) {
            case "print": {
              const printItem = item as PrintItem;
              return (
                <Fragment key={item.id}>
                  <PrintBox key={printItem.id} printItem={printItem} />
                  {renderComponent(item.child)}
                </Fragment>
              );
            }
            case "for": {
              const forItem = item as ForItem;
              console.log(forItem);
              return (
                <ForBox key={forItem.id} forItem={forItem}>
                  {renderComponent(forItem.child)}
                </ForBox>
              );
            }
            case "if":
              return (
                <IfBox key={item.id} isLight={item.isLight}>
                  {renderComponent(item.child)}
                </IfBox>
              );
            case "else":
              return (
                <ElseBox key={item.id} isLight={item.isLight}>
                  {renderComponent(item.child)}
                </ElseBox>
              );
            default:
              return null;
          }
        })}
      </>
    );
  };

  const renderComponentVar = (
    items: VarItem[] //변수시각화 리스트
  ): ReactElement => {
    return (
      <>
        {items.map((item) => (
          <VariableBox
            key={item.name}
            value={item.expr!}
            name={item.name!}
            isLight={item.isLight!}
          />
        ))}
      </>
    );
  };

  const handleClick = () => {
    let newData: AllObjectItem[] = [];
    if (idx >= codeData.length) {
      console.log("더이상 데이터가 없습니다");
      return;
    }

    let copyData = _.cloneDeep(varData);
    // For variables
    // todo compare -> lower or upper
    if (codeData[idx].type.toLowerCase() === "assignViz".toLowerCase()) {
      codeData[idx].variables?.forEach((element) => {
        if (usedName.includes(element.name!)) {
          const targetName = element.name!;
          copyData = updateVar(targetName, copyData, element);
        } else {
          copyData.push(element);
          setUsedName((prevName) => [...prevName, element.name!]);
        }
      });
    } else {
      const newObject = createNewObject(idx);
      if (usedId.includes(codeData[idx].id!)) {
        // 한번 visual list에 들어가서 수정하는 입력일 때
        // updateChild(비주얼 스택, 넣어야하는 위치를 알려주는 id, 넣어야하는 data)
        newData = updateChild(visual.objects, newObject);
      } else {
        // 처음 visual list에 들어가서 더해야하는 입력일 때
        const targetDepth: number = codeData[idx].depth!;
        const id: number = codeData[idx].id!;

        // 한번 사용한 id는 저장해준다
        setUsedId((prevIds) => [...prevIds, id]);
        // addChild(비주얼 스택, 넣어야하는 위치를 알려주는 depth, 넣어야하는 data)
        newData = addChild(visual.objects, targetDepth, newObject);
      }

      const newActivate = updateActivate(activate, newObject);
      const turnisLightNewData = turnisLight(newData, newActivate);

      setActivate(newActivate);
      setVisual({ objects: turnisLightNewData });
    }

    // judge for turn on or off light.
    let tmpItemName;
    if (codeData[idx].variables === undefined) {
      tmpItemName = [];
    } else {
      tmpItemName = codeData[idx].variables?.map((element) => {
        return element.name;
      });
    }

    copyData = copyData.map((element) => {
      // todo validate this code
      return { ...element, isLight: tmpItemName?.includes(element.name) };
    });

    console.log(copyData);
    setVarData(copyData);
    setIdx(idx + 1);
  };

  return (
    <div style={{ backgroundColor: "#f4f4f4", width: "100%" }}>
      <div>
        <ul style={{ display: "flex" }}>{renderComponentVar(varData)}</ul>
      </div>

      <ul>{renderComponent(visual.objects[0].child)}</ul>
      <button onClick={handleClick}>특정 객체 child 에 객체 생성</button>
    </div>
  );
};

export default RightSection;
