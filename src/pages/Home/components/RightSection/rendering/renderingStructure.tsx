import { VizVarItem } from "@/types/vizVarItem";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import VariableBox from "../components/VariableBox/VariableBox";
import { VizListItem } from "@/types/vizListItem";
import ListWrapper from "../components/ListWrapper/ListWrapper";

export const renderingStructure = (
  structures: VizVarItem[] //변수시각화 리스트
): ReactElement => {
  return (
    <>
      {structures.map((structure) => {
        switch (structure.type) {
          case "variable": {
            const variableItem = structure as VizVarItem;

            return (
              <AnimatePresence key={variableItem.name} mode="wait">
                <motion.div
                  key={`${variableItem.name}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <VariableBox
                    value={variableItem.expr!}
                    name={variableItem.name!}
                    isLight={variableItem.isLight!}
                  />
                </motion.div>
              </AnimatePresence>
            );
          }
          case "list": {
            const listItem = structure as VizListItem;

            return (
              <AnimatePresence key={listItem.name} mode="wait">
                <motion.div
                  key={`${listItem.name}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListWrapper listItem={listItem} />
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
