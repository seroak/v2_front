import { AllObjectItem } from "@/types/allObjectItem";
import { PrintItem } from "@/types/printItem";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import PrintBox from "./components/PrintBox/PrintBox";
import ForBox from "./components/ForBox/ForBox";
import IfBox from "./components/IfBox/IfBox";
import { ElseItem } from "@/types/elseItem";
import ElseBox from "./components/ElseBox/ElseBox";
import { ForItem } from "@/types/forItem";
import { IfItem } from "@/types/conditionItem";

export const renderingCodeFlow = (codeFlows: AllObjectItem[]): ReactElement => {
  return (
    <>
      {codeFlows.map((codeFlow, index) => {
        switch (codeFlow.type) {
          case "print": {
            const printItem = codeFlow as PrintItem;
            return (
              <div key={index}>
                <PrintBox key={index} printItem={printItem} />
                {renderingCodeFlow(printItem.child)}
              </div>
            );
          }
          case "for": {
            const forItem = codeFlow as ForItem;
            return (
              <div key={index}>
                <ForBox key={index} forItem={forItem}>
                  {renderingCodeFlow(forItem.child)}
                </ForBox>
              </div>
            );
          }
          case "if":
            const ifItem = codeFlow as IfItem;
            return (
              <AnimatePresence key={ifItem.id} mode="wait">
                <motion.div key={ifItem.id} layout>
                  <IfBox isLight={codeFlow.isLight}>
                    {renderingCodeFlow(codeFlow.child)}
                  </IfBox>
                </motion.div>
              </AnimatePresence>
            );
          case "else":
            const elseItem = codeFlow as ElseItem;
            return (
              <AnimatePresence key={elseItem.id} mode="wait">
                <motion.div key={elseItem.id} layout>
                  <ElseBox isLight={codeFlow.isLight}>
                    {renderingCodeFlow(codeFlow.child)}
                  </ElseBox>
                </motion.div>
              </AnimatePresence>
            );
          default:
            throw new Error(`${codeFlow.type} is unexpected type`);
        }
      })}
    </>
  );
};
