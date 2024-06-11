"use client";
import React, { useState } from "react";
import ForBox from "./ForBox";
import VariableBox from "./VariableBox";
import IfBox from "./IfBox";
import ElseBox from "./ElseBox";
import PrintBox from "./PrintBox";
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
interface ListItem {
  depth: number;
  value: number;
  name: string;
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
  highlight?: number[];
  condition?: ConditionItem;
  list?: ListItem[];
}

interface ConditionItem {
  name: string;
  start: number;
  end: number;
  cur: number;
}

// Subtype definitions
interface VariableItem extends ObjectItem {
  value: number;
  name: string;
}
interface PrintItem extends ObjectItem {
  expr: string;
  highlight: number[];
}

interface ForItem extends ObjectItem {
  start: number;
  end: number;
  cur: number;
  name: string;
}

interface IfItem extends ObjectItem {}

interface ElseItem extends ObjectItem {}

interface End extends ObjectItem {}

type AnyObjectItem =
  | VariableItem
  | PrintItem
  | ForItem
  | IfItem
  | ElseItem
  | End;

// Activate stack type definition
interface ActivateItem {
  id: number;
  depth: number;
}

// Initial data setup
const dummy_json: DummyItem[] | { type: string; list?: ListItem[] }[] = [
  {
    type: "varList",
    list: [
      { depth: 1, value: 12, name: "a" },
      { depth: 1, value: 14, name: "b" },
    ],
  },
  {
    type: "varList",
    list: [
      { depth: 1, value: 13, name: "a" },
      { depth: 1, value: 13, name: "b" },
    ],
  },
  {
    type: "varList",
    list: [
      { depth: 1, value: 13, name: "a" },
      { depth: 1, value: 13, name: "c" },
    ],
  },
  {
    id: 1,
    type: "for",
    depth: 1,
    condition: { name: "i", start: 0, end: 3, cur: 0 },
  },
  {
    id: 2,
    type: "for",
    depth: 2,
    condition: { name: "j", start: 0, end: 1, cur: 0 },
  },
  {
    id: 3,
    type: "print",
    depth: 3,
    expr: "'*' * i + 1",
    highlight: [0, 1, 2, 4, 5],
  },
  {
    id: 3,
    type: "print",
    depth: 3,
    expr: "'*' * 2",
    highlight: [0, 1, 2, 4, 5],
  },
  {
    id: 3,
    type: "print",
    depth: 3,
    expr: "'**'",
    highlight: [0, 1, 2, 3],
  },
  {
    id: 1,
    type: "for",
    depth: 1,
    condition: { name: "i", start: 0, end: 3, cur: 1 },
  },
  {
    id: 2,
    type: "for",
    depth: 2,
    condition: { name: "j", start: 0, end: 1, cur: 0 },
  },
  { id: 3, type: "print", depth: 3, expr: "1", highlight: [0] },
  {
    id: 1,
    type: "for",
    depth: 1,
    condition: { name: "i", start: 0, end: 3, cur: 2 },
  },
  {
    id: 2,
    type: "for",
    depth: 2,
    condition: { name: "j", start: 0, end: 1, cur: 0 },
  },
  { id: 3, type: "print", depth: 3, expr: "1", highlight: [0] },
];

const RightSection: React.FC = () => {
  const [idx, setIdx] = useState<number>(0);
  const [usedId, setUsedId] = useState<number[]>([]); // List of used ids
  const [data, setData] = useState<State>({
    // Visualization list for conditions
    objects: [{ id: 0, type: "start", depth: 0, lightOn: false, child: [] }],
  });
  const [varData, setVarData] = useState<DummyItem[]>([]); // 변수 데이터 시각화 리스트
  const [usedName, setUsedName] = useState<string[]>([]); // 사용한 변수 데이터 name 모아두는 리스트
  const [activate, setActivate] = useState<ActivateItem[]>([]); // Active stack list

  const createNewObject = (idx: number): AnyObjectItem => {
    const baseObject: ObjectItem = {
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
          expr: dummy_json[idx].expr!,
          highlight: dummy_json[idx].highlight!,
        } as PrintItem;
      case "for":
        return {
          ...baseObject,
          start: dummy_json[idx].condition!.start,
          end: dummy_json[idx].condition!.end,
          cur: dummy_json[idx].condition!.cur,
          name: dummy_json[idx].condition!.name,
        } as ForItem;
      case "if":
        return baseObject as IfItem;
      case "else":
        return baseObject as ElseItem;
      default:
        return baseObject as End;
    }
  };

  const addChild = (
    items: AnyObjectItem[],
    targetDepth: number,
    newObject: AnyObjectItem
  ): AnyObjectItem[] => {
    let updated = false;
    return items.map((item) => {
      if (!updated && item.depth === targetDepth - 1) {
        updated = true;
        return { ...item, child: [...item.child, newObject] };
      } else if (item.child && item.child.length > 0) {
        return {
          ...item,
          child: addChild(item.child, targetDepth, newObject),
        };
      } else {
        return item;
      }
    });
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
                    highlight={print.highlight}
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
                  name={forItem.name}
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
          <VariableBox
            key={item.name}
            value={item.value!}
            name={item.name!}
            lightOn={item.lightOn}
          />
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

    let copyData = _.cloneDeep(varData);
    console.log(copyData);
    // For variables
    if (dummy_json[idx].type === "varList") {
      dummy_json[idx].list.forEach((element) => {
        if (usedName.includes(element.name!)) {
          const targetName = element.name!;
          const updatedData = updateVar(targetName, copyData, element);
          copyData = updatedData;
          console.log(updatedData);
        } else {
          copyData.push(element);
          setUsedName((prevName) => [...prevName, element.name!]);
        }
      });
    } else {
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
      const turnLightOnNewData = turnLightOn(new_data, newActivate);
      setActivate(newActivate);
      setData({ objects: turnLightOnNewData });
    }
    console.log("copyData", copyData);
    let tmpItemName;
    if (dummy_json[idx].list === undefined) {
      tmpItemName = [];
    } else {
      tmpItemName = dummy_json[idx].list?.map((element) => {
        return element.name;
      });
    }

    console.log("tmpItemName", tmpItemName);
    copyData = copyData.map((element) => {
      if (tmpItemName.includes(element.name)) {
        return { ...element, lightOn: true };
      } else {
        return { ...element, lightOn: false };
      }
    });
    console.log(copyData);
    setVarData(copyData);
    setIdx(idx + 1);
  };

  return (
    <div style={{ backgroundColor: "#f4f4f4", width: "100%" }}>
      <ul>{renderComponentVar(varData)}</ul>
      <ul>{renderComponent(data.objects[0].child)}</ul>
      <button onClick={handleClick}>특정 객체 child에 객체 생성</button>
    </div>
  );
};

export default RightSection;
