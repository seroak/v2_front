import React, {
  useState,
  useContext,
  ReactNode,
  ReactElement,
  Fragment,
} from "react";
import ForBox from "./ForBox";
import VariableBox from "./VariableBox";
import IfBox from "./IfBox";
import ElseBox from "./ElseBox";
import PrintBox from "./PrintBox";
import { CodeDataContext } from "../pages/Home";
import _ from "lodash";

interface ObjectItem {
  id: number;
  type: string;
  depth?: number;
  lightOn: boolean;
  child: AnyObjectItem[];
}
interface State {
  objects: AnyObjectItem[];
}

interface DummyItem {
  id?: number;
  type: string;
  depth?: number;
  value?: number;
  name?: string;
  start?: number;
  end?: number;
  cur?: number;
  expr?: string;
  highlight?: number[] | string[];
  condition?: ConditionItem;
  variables?: VariableList[];
}
interface VarItem extends DummyItem {
  lightOn?: boolean;
}
interface VariableList {
  name: string;
  expr: string;
  depth: number;
  type?: string;
}
interface ConditionItem {
  target: string;
  start: number;
  end: number;
  cur: number;
  step: number;
}

// Subtype definitions

interface PrintItem extends ObjectItem {
  expr: string;
  highlight: number[];
}

interface ForItem extends ObjectItem {
  start: number;
  startLightOn: boolean;
  end: number;
  endLightOn: boolean;
  cur: number;
  curLightOn: boolean;
  target: string;
  step: number;
  stepLightOn: boolean;
}

interface IfItem extends ObjectItem {}

interface ElseItem extends ObjectItem {}

interface End extends ObjectItem {}

type AnyObjectItem = PrintItem | ForItem | IfItem | ElseItem | End;

// Activate stack type definition
interface ActivateItem {
  id: number;
  depth: number;
  type: string;
}

const RightSection = () => {
  const [idx, setIdx] = useState<number>(0);
  const [usedId, setUsedId] = useState<number[]>([]); // 한 번사용한 id를 저장하는 리스트
  const [visual, setVisual] = useState<State>({
    // 시각화전에 데이터를 담아두는 리스트 객체
    objects: [{ id: 0, type: "start", depth: 0, lightOn: false, child: [] }],
  });
  const [varData, setVarData] = useState<DummyItem[]>([]); // 변수 데이터 시각화 리스트
  const [usedName, setUsedName] = useState<string[]>([]); // 사용한 변수 데이터 name 모아두는 리스트
  const [activate, setActivate] = useState<ActivateItem[]>([]); // 애니메이션을 줄 때 사용하는 리스트

  // context API로 데이터 가져오기
  const context = useContext(CodeDataContext);
  //context가 없을 경우 에러 출력 패턴 처리안해주면 에러 발생
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }
  const { codeData, setCodeData } = context;
  const createNewObject = (idx: number): AnyObjectItem => {
    const baseObject: ObjectItem = {
      id: codeData[idx].id!,
      type: codeData[idx].type,
      depth: codeData[idx].depth,
      lightOn: false,
      child: [],
    };
    const type: string = codeData[idx].type.toLowerCase();

    switch (type) {
      case "print":
        return {
          ...baseObject,
          expr: codeData[idx].expr!,
          highlight: codeData[idx].highlight!,
        } as PrintItem;
      case "for":
        // for문 highlight 객체로 변환
        let curLightOn = false;
        let startLightOn = false;
        let endLightOn = false;
        let stepLightOn = false;
        codeData[idx].highlight?.map((item) => {
          item = item.toLowerCase();

          if (item === "cur") {
            curLightOn = true;
          }
          if (item === "start") {
            startLightOn = true;
          }
          if (item === "end") {
            endLightOn = true;
          }
          if (item === "step") {
            stepLightOn = true;
          }
        });

        return {
          ...baseObject,
          start: codeData[idx].condition!.start,
          end: codeData[idx].condition!.end,
          cur: codeData[idx].condition!.cur,
          target: codeData[idx].condition!.target,
          step: codeData[idx].condition!.step,
          startLightOn: startLightOn,
          endLightOn: endLightOn,
          curLightOn: curLightOn,
          stepLightOn: stepLightOn,
        } as ForItem;
      case "if":
        return baseObject as IfItem;
      case "else":
        return baseObject as ElseItem;
      // case "end":
      //   return baseObject as End;
      default:
        console.log(type + " is not implemented!");
    }
  };

  const addChild = (
    items: AnyObjectItem[],
    targetDepth: number,
    newObject: AnyObjectItem
  ): AnyObjectItem[] => {
    let updated = false;
    return items.reduceRight<AnyObjectItem[]>((acc, item) => {
      if (!updated && item.depth === targetDepth - 1) {
        updated = true;
        acc.unshift({ ...item, child: [...item.child, newObject] });
      } else if (item.child && item.child.length > 0) {
        acc.unshift({
          ...item,
          child: addChild(item.child, targetDepth, newObject),
        });
      } else {
        acc.unshift(item);
      }
      return acc;
    }, []);
  };

  const updateChild = (
    // todo renaming for readAbility
    items: AnyObjectItem[], //비주얼 스택
    newObject: AnyObjectItem //넣어야하는 data
  ): AnyObjectItem[] => {
    return items.map((item) => {
      if (item.id === newObject.id) {
        return { ...item, ...newObject, child: item.child };
      } else if (item.child && item.child.length > 0) {
        return { ...item, child: updateChild(item.child, newObject) };
      } else {
        return item;
      }
    });
  };

  const turnLightOn = (
    new_data: AnyObjectItem[], //비주얼 스택
    newActivate: ActivateItem[] //활성화 스택
  ): AnyObjectItem[] => {
    return new_data.map((item) => {
      if (newActivate.some((data) => data.id === item.id)) {
        // 수정해야하는 위치일때

        return {
          ...item,
          lightOn: true,
          child: turnLightOn(item.child, newActivate),
        };
      } else if (item.child && item.child.length > 0) {
        return {
          ...item,
          lightOn: false,
          child: turnLightOn(item.child, newActivate),
        };
      } else {
        return { ...item, lightOn: false };
      }
    });
  };

  // todo 변수명 + 구조를 다같이 살펴봐주면.
  const updateVar = (
    targetName: string,
    varData: DummyItem[],
    newVar: DummyItem
  ): DummyItem[] => {
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
    items: AnyObjectItem[] //비주얼 스택
  ): JSX.Element => {
    return (
      <>
        {items.map((item) => {
          switch (item.type) {
            case "print": {
              const print = item as PrintItem;
              return (
                <Fragment key={item.id}>
                  <PrintBox
                    key={print.id}
                    expr={print.expr}
                    highlight={print.highlight}
                    lightOn={print.lightOn}
                  />
                  {renderComponent(item.child)}
                </Fragment>
              );
            }
            case "for": {
              const forItem = item as ForItem;

              return (
                <ForBox
                  key={forItem.id}
                  start={forItem.start}
                  startLightOn={forItem.startLightOn}
                  end={forItem.end}
                  endLightOn={forItem.endLightOn}
                  cur={forItem.cur}
                  curLightOn={forItem.curLightOn}
                  target={forItem.target}
                  step={forItem.step}
                  stepLightOn={forItem.stepLightOn}
                  lightOn={forItem.lightOn}
                >
                  {renderComponent(forItem.child)}
                </ForBox>
              );
            }
            case "if":
              return (
                <IfBox key={item.id} lightOn={item.lightOn}>
                  {renderComponent(item.child)}
                </IfBox>
              );
            case "else":
              return (
                <ElseBox key={item.id} lightOn={item.lightOn}>
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
            lightOn={item.lightOn!}
          />
        ))}
      </>
    );
  };

  const handleClick = () => {
    let newData: AnyObjectItem[] = [];
    // console.log(codeData);
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
      const turnLightOnNewData = turnLightOn(newData, newActivate);
      // console.log(turnLightOnNewData);
      setActivate(newActivate);
      setVisual({ objects: turnLightOnNewData });
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
      return { ...element, lightOn: tmpItemName?.includes(element.name) };
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
