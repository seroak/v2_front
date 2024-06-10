"use client";
import React, { useState } from "react";
import ForBox from "./ForBox";
import VariableBox from "./VariableBox";
import IfBox from "./IfBox";
import ElseBox from "./ElseBox";
import PrintBox from "./PrintBox";

interface ObjectItem {
  id: number;
  type: string;
  depth: number;
  lightOn: boolean;
  child: AnyObjectItem[];
}

interface DummyItem {
  id?: number;
  type: string;
  depth: number;
  value?: number;
  name?: string;
  start?: number;
  end?: number;
  cur?: number;
  expr?: string;
  animation?: number[];
}

// 서브타입 정의
interface VariableItem extends ObjectItem {
  value: number;
  name: string;
}
interface PrintItem extends ObjectItem {
  expr: string;
  animation: number[];
}

interface ForItem extends ObjectItem {
  start: number;
  end: number;
  cur: number;
}

interface IfItem extends ObjectItem {}

interface ElseItem extends ObjectItem {}

interface End extends ObjectItem {}

type AnyObjectItem = VariableItem | ForItem | IfItem | ElseItem | End;

// 상태 인터페이스 정의
interface State {
  objects: AnyObjectItem[];
}
// activate 스택 타입 정의
interface ActivateItem {
  id: number;
  depth: number;
}

// 초기 데이터 설정
const dummy_json: DummyItem[] = [
  { type: "variable", depth: 1, value: 4, name: "a" },
  { id: 1, type: "for", depth: 1, start: 0, end: 3, cur: 0 },
  { id: 2, type: "for", depth: 2, start: 0, end: 1, cur: 0 },
  { id: 3, type: "print", depth: 3, expr: "1", animation: [0] },
  { id: 1, type: "for", depth: 1, start: 0, end: 3, cur: 1 },
  { id: 2, type: "for", depth: 2, start: 0, end: 1, cur: 0 },
  { id: 3, type: "print", depth: 3, expr: "1", animation: [0] },
  { id: 1, type: "for", depth: 1, start: 0, end: 3, cur: 2 },
  { id: 2, type: "for", depth: 2, start: 0, end: 1, cur: 0 },
  { id: 3, type: "print", depth: 3, expr: "1", animation: [0] },
];

const RightSection: React.FC = () => {
  const [idx, setIdx] = useState<number>(0);
  const [usedId, setUsedId] = useState<number[]>([]); // 사용한 id 리스트
  const [data, setData] = useState<State>({
    // 조건문 시각화 리스트
    objects: [{ id: 0, type: "start", depth: 0, lightOn: false, child: [] }],
  });
  const [varData, setVarData] = useState<DummyItem[]>([]); // 변수 시각화 리스트
  const [usedName, setUsedName] = useState<string[]>([]); // 사용한 변수 name 리스트
  const [activate, setActivate] = useState<ActivateItem[]>([]); // 활성화 스택 리스트

  const createNewObject = (idx: number): AnyObjectItem => {
    const baseObject: AnyObjectItem = {
      id: dummy_json[idx].id!,
      type: dummy_json[idx].type,
      depth: dummy_json[idx].depth,
      lightOn: false,
      child: [],
    };

    switch (dummy_json[idx].type) {
      case "print":
        return {
          ...baseObject,
          expr: dummy_json[idx].expr,
          animation: dummy_json[idx].animation,
        } as PrintItem;
      case "for":
        return {
          ...baseObject,
          start: dummy_json[idx].start!,
          end: dummy_json[idx].end!,
          cur: dummy_json[idx].cur!,
        } as ForItem;
      case "if":
        return baseObject as IfItem;
      case "else":
        return baseObject as ElseItem;
      default:
        return baseObject;
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
    items: AnyObjectItem[],
    targetId: number,
    newObject: AnyObjectItem
  ): AnyObjectItem[] => {
    return items.map((item) => {
      if (item.id === targetId) {
        return { ...item, ...newObject, child: item.child };
      } else if (item.child && item.child.length > 0) {
        return { ...item, child: updateChild(item.child, targetId, newObject) };
      } else {
        return item;
      }
    });
  };

  const turnLightOn = (
    new_data: AnyObjectItem[],
    newActivate: ActivateItem[]
  ): AnyObjectItem[] => {
    return new_data.map((item) => {
      // 활성화 스택에 해당 id가 있는 경우
      if (newActivate.some((data) => data.id === item.id)) {
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

  const updateVar = (
    targetName: string,
    varData: DummyItem[],
    newVar: DummyItem
  ): DummyItem[] => {
    return varData.map((item) => {
      if (item.name === targetName) {
        return { ...item, ...newVar };
      } else {
        return item;
      }
    });
  };

  const updateActivate = (
    activate: ActivateItem[],
    targetDepth: number,
    targetId: number
  ): ActivateItem[] => {
    let tmp: ActivateItem[] = [];

    for (let element of activate) {
      if (element.depth >= targetDepth) {
        tmp.push({ id: targetId, depth: targetDepth });

        return tmp;
      } else {
        tmp.push(element);
      }
    }
    tmp.push({ id: targetId, depth: targetDepth });

    return tmp;
  };

  const renderComponent = (items: AnyObjectItem[]): JSX.Element | null => {
    return (
      <>
        {items.map((item) => {
          switch (item.type) {
            case "print":
              const print = item as PrintItem;
              return (
                <React.Fragment key={item.id}>
                  <PrintBox
                    key={print.id}
                    expr={print.expr}
                    animation={print.animation}
                    lightOn={print.lightOn}
                  />
                  {renderComponent(item.child)}
                </React.Fragment>
              );
            case "for":
              const forItem = item as ForItem;
              return (
                <ForBox
                  key={forItem.id}
                  start={forItem.start}
                  end={forItem.end}
                  cur={forItem.cur}
                  lightOn={forItem.lightOn}
                >
                  {renderComponent(forItem.child)}
                </ForBox>
              );
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

  const renderComponentVar = (items: DummyItem[]): JSX.Element | null => {
    return (
      <>
        {items.map((item) => (
          <VariableBox key={item.name} value={item.value!} name={item.name!} />
        ))}
      </>
    );
  };

  const handleClick = () => {
    let new_data: AnyObjectItem[] = [];
    if (idx >= dummy_json.length) {
      console.log("더이상 데이터가 없습니다");
      return;
    }

    // 변수인 경우
    if (dummy_json[idx].type === "variable") {
      // 변수가 한번 사용한 적이 있을때
      if (usedName.includes(dummy_json[idx].name!)) {
        const targetName = dummy_json[idx].name!;
        const updatedData = updateVar(targetName, varData, dummy_json[idx]);
        setVarData(updatedData);
      } else {
        setVarData((prevData) => [
          ...prevData,
          { ...dummy_json[idx] } as DummyItem,
        ]);
        setUsedName((prevName) => [...prevName, dummy_json[idx].name!]);
      }
    } else {
      // 코드 흐름 생성
      const newObject = createNewObject(idx);
      if (usedId.includes(dummy_json[idx].id!)) {
        const targetId = dummy_json[idx].id!;
        new_data = updateChild(data.objects, targetId, newObject);
      } else {
        setUsedId((prevIds) => [...prevIds, dummy_json[idx].id!]);

        const targetDepth: number = dummy_json[idx].depth;

        new_data = addChild(data.objects, targetDepth, newObject);
      }
      const targetId: number = dummy_json[idx].id!;
      const targetDepth: number = dummy_json[idx].depth;
      const newActivate = updateActivate(activate, targetDepth, targetId);
      console.log("시각화 트리", new_data);
      console.log("활성화 트리", newActivate);
      const turnLightOnNewData = turnLightOn(new_data, newActivate);
      console.log(turnLightOnNewData);
      setActivate(newActivate);
      setData({ objects: turnLightOnNewData });
    }

    setIdx(idx + 1);
  };

  return (
    <div>
      <ul>{renderComponentVar(varData)}</ul>
      <ul>{renderComponent(data.objects[0].child)}</ul>
      <button onClick={handleClick}>특정 객체 child에 객체 생성</button>
    </div>
  );
};

export default RightSection;
