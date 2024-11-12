import { ReactNode, useEffect, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
//components
import VariableBox from "./components/VariableBox/VariableBox";
import ListWrapper from "./components/ListWrapper/ListWrapper";
import TupleWrapper from "./components/TupleWrapper/TupleWrapper";
import DefFunctionDataStructure from "./components/DefFunctionDataStructure/DefFunctionDataStructure";

//type
import { DataStructureVarsItem } from "@/pages/Visualization/types/dataStructuresItem/dataStructureVarsItem";
import { DataStructureListItem } from "@/pages/Visualization/types/dataStructuresItem/dataStructureListItem";
import { DataStructureTupleItem } from "@/pages/Visualization/types/dataStructuresItem/dataStructureTupleItem";
import { WrapperDataStructureItem, StructureValue } from "../../types/dataStructuresItem/wrapperDataStructureItem";
import { DataStructureFunctionItem } from "@/pages/Visualization/types/dataStructuresItem/dataStructureFunctionItem";
//zustand
import { useArrowStore } from "@/store/arrow";

interface Props {
  children?: ReactNode;
  structure: DataStructureListItem | DataStructureVarsItem | WrapperDataStructureItem;

  height: number;
  width: number;
  top: number;
  right: number;
}

interface CallstackProps {
  children?: ReactNode;
  structure: StructureValue;

  height: number;
  width: number;
}

const StructureItem = ({ children, structure, height, width, top, right }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && structure.isLight) {
      const rect = ref.current.getBoundingClientRect();

      setTop(rect.top + top);
      setRight(rect.right + right);
    }
  }, [structure, ref, height, width]);

  return (
    <div ref={ref} style={{ width: "fit-content" }}>
      {children}
    </div>
  );
};
const CallstackItem = ({ children, structure, height, width }: CallstackProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && structure.isLight) {
      const rect = ref.current.getBoundingClientRect();

      setTop(rect.top);
      setRight(rect.right);
    }
  }, [ref, structure, height, width]);

  return (
    <div ref={ref} style={{ width: "fit-content" }}>
      {children}
    </div>
  );
};

export const renderingStructure = (
  structures: WrapperDataStructureItem, //변수시각화 리스트
  height: number,
  width: number
): ReactElement => {
  return (
    <>
      {Object.keys(structures).map((key, index) => {
        return (
          <div key={index}>
            <CallstackItem structure={structures[key]} height={height} width={width}>
              <div className="var-data-wrap">
                <div className="var-title">
                  <p>{key}</p>
                </div>
                <div className="call-stack-box">
                  {structures[key].data.map((structure) => {
                    switch (structure.type) {
                      case "variable": {
                        const variableItem = structure as DataStructureVarsItem;
                        return (
                          <AnimatePresence key={variableItem.name + key} mode="wait">
                            <motion.ul
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="var-list"
                              style={{ display: "inline-block" }}
                            >
                              <StructureItem structure={variableItem} height={height} width={width} top={-30} right={0}>
                                <VariableBox
                                  value={variableItem.expr}
                                  name={variableItem.name}
                                  isLight={variableItem.isLight}
                                />
                              </StructureItem>
                            </motion.ul>
                          </AnimatePresence>
                        );
                      }
                      case "list": {
                        const listItem = structure as DataStructureListItem;
                        return (
                          <AnimatePresence key={listItem.name + key} mode="wait">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ display: "inline-block" }}
                            >
                              <StructureItem structure={listItem} height={height} width={width} top={0} right={0}>
                                <ListWrapper listItem={listItem} />
                              </StructureItem>
                            </motion.div>
                          </AnimatePresence>
                        );
                      }
                      case "tuple": {
                        const tupleItem = structure as DataStructureTupleItem;
                        return (
                          <AnimatePresence key={tupleItem.name + key} mode="wait">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ display: "inline-block" }}
                            >
                              <StructureItem structure={tupleItem} height={height} width={width} top={0} right={0}>
                                <TupleWrapper listItem={tupleItem} />
                              </StructureItem>
                            </motion.div>
                          </AnimatePresence>
                        );
                      }
                      case "function": {
                        const functionItem = structure as DataStructureFunctionItem;
                        return (
                          <AnimatePresence key={functionItem.name + key} mode="wait">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ display: "inline-block" }}
                            >
                              <StructureItem structure={functionItem} height={height} width={width} top={0} right={0}>
                                <DefFunctionDataStructure functionItem={functionItem} />
                              </StructureItem>
                            </motion.div>
                          </AnimatePresence>
                        );
                      }
                      default: {
                        return null; // 다른 타입의 경우 아무것도 렌더링하지 않음
                      }
                    }
                  })}
                </div>
              </div>
            </CallstackItem>
          </div>
        );
      })}
    </>
  );
};
