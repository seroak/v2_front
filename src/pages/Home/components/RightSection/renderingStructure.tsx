import { ReactNode, useEffect, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
//components
import VariableBox from "./components/VariableBox/VariableBox";
import ListWrapper from "./components/ListWrapper/ListWrapper";
//type
import { DataStructureVarItem } from "@/pages/Home/types/dataStructureVarItem";
import { DataStructureListItem } from "@/pages/Home/types/dataStructureListItem";
//zustand
import { useArrowStore } from "@/store/arrow";

interface Props {
  children?: ReactNode;
  structure: DataStructureListItem | DataStructureVarItem;

  height: number;
  width: number;
}

const StructureItem = ({ children, structure, height, width }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && structure.isLight) {
      const rect = ref.current.getBoundingClientRect();

      setTop(rect.top);
      setRight(rect.right);
    }
  }, [structure, height, width]);

  return (
    <div ref={ref} style={{ width: "fit-content" }}>
      {children}
    </div>
  );
};

export const renderingStructure = (
  structures: DataStructureVarItem[], //변수시각화 리스트
  height: number,
  width: number
): ReactElement => {
  return (
    <>
      {structures.map((structure, index) => {
        switch (structure.type) {
          case "variable": {
            const variableItem = structure as DataStructureVarItem;

            return (
              <AnimatePresence key={variableItem.name} mode="wait">
                <motion.ul
                  key={`${variableItem.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="var-list"
                  style={{ display: "inline-block" }}
                >
                  <StructureItem key={index} structure={variableItem} height={height} width={width}>
                    <VariableBox value={variableItem.expr!} name={variableItem.name!} isLight={variableItem.isLight!} />
                  </StructureItem>
                </motion.ul>
              </AnimatePresence>
            );
          }
          case "list": {
            const listItem = structure as DataStructureListItem;

            return (
              <AnimatePresence key={listItem.name} mode="wait">
                <motion.div
                  key={`${listItem.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "inline-block" }}
                >
                  <StructureItem key={index} structure={structure} height={height} width={width}>
                    <ListWrapper listItem={listItem} />
                  </StructureItem>
                </motion.div>
              </AnimatePresence>
            );
          }
          default: {
            throw new Error(`Unsupported type: ${structure.type}`);
          }
        }
      })}
    </>
  );
};
