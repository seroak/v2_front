import { VizVarItem } from "@/types/vizVarItem";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import VariableBox from "../VariableBox";
import { VizListItem } from "@/types/vizListItem";
import ListDiv from "../ListDiv";

export const renderComponentDataStructure = (
  dataStructures: VizVarItem[] //변수시각화 리스트
): ReactElement => {
  return (
    <>
      {dataStructures.map((dataStructure) => {
        switch (dataStructure.type) {
          case "variable": {
            const variableItem = dataStructure as VizVarItem;

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
            const listItem = dataStructure as VizListItem;

            return (
              <AnimatePresence key={listItem.name} mode="wait">
                <motion.div
                  key={`${listItem.name}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListDiv listItem={listItem} />
                </motion.div>
              </AnimatePresence>
            );
          }
          default: {
            throw new Error(`Unsupported type: ${dataStructure.type}`);
          }
        }
      })}
    </>
  );
};
