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
  isTracking: boolean;
}

const StructureItem = ({ children, structure, isTracking }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);
  useEffect(() => {
    if (ref.current && isTracking) {
      const rect = ref.current.getBoundingClientRect();

      setTop(rect.top);
      setRight(rect.right);
    }
  }, [structure.id, structure.type, isTracking]);

  return <div ref={ref}>{children}</div>;
};

export const renderingStructure = (
  structures: DataStructureVarItem[], //변수시각화 리스트
  trackingId: number //추적할 아이디
): ReactElement => {
  return (
    <>
      {structures.map((structure, index) => {
        const isTracking = structure.id === trackingId;
        switch (structure.type) {
          case "variable": {
            const variableItem = structure as DataStructureVarItem;

            return (
              <AnimatePresence key={variableItem.name} mode="wait">
                <motion.ul
                  key={`${variableItem.name}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="var-list"
                  style={{ display: "inline-block" }}
                >
                  <StructureItem key={index} structure={structure} isTracking={isTracking}>
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
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "inline-block" }}
                >
                  <StructureItem key={index} structure={structure} isTracking={isTracking}>
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
