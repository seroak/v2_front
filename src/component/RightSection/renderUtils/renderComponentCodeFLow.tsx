import { AllObjectItem } from "@/types/allObjectItem";
import { PrintItem } from "@/types/printItem";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import PrintBox from "../PrintBox";
import ForBox from "../ForBox";
import IfBox from "../IfBox";
import { ElseItem } from "@/types/elseItem";
import ElseBox from "../ElseBox";
const codeFlowVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      opacity: { duration: 0.5 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      opacity: { duration: 0.5 },
    },
  },
};
export const renderComponentCodeFlow = (
  codeFlows: AllObjectItem[]
): ReactElement => {
  return (
    <>
      {codeFlows.map((codeFlow) => {
        switch (codeFlow.type) {
          case "print": {
            const printItem = codeFlow as PrintItem;
            return (
              <AnimatePresence key={printItem.id} mode="wait">
                <motion.div
                  key={printItem.id}
                  variants={codeFlowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <PrintBox printItem={printItem} />
                  {renderComponentCodeFlow(printItem.child)}
                </motion.div>
              </AnimatePresence>
            );
          }
          case "for": {
            const forItem = codeFlow as ForItem;
            return (
              <AnimatePresence key={forItem.id} mode="wait">
                <motion.div
                  key={forItem.id}
                  variants={codeFlowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <ForBox forItem={forItem}>
                    {renderComponentCodeFlow(forItem.child)}
                  </ForBox>
                </motion.div>
              </AnimatePresence>
            );
          }
          case "if":
            const ifItem = codeFlow as IfItem;
            return (
              <AnimatePresence key={ifItem.id} mode="wait">
                <motion.div
                  key={ifItem.id}
                  layout
                  variants={codeFlowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <IfBox isLight={codeFlow.isLight}>
                    {renderComponentCodeFlow(codeFlow.child)}
                  </IfBox>
                </motion.div>
              </AnimatePresence>
            );
          case "else":
            const elseItem = codeFlow as ElseItem;
            return (
              <AnimatePresence key={elseItem.id} mode="wait">
                <motion.div
                  key={elseItem.id}
                  layout
                  variants={codeFlowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ElseBox isLight={codeFlow.isLight}>
                    {renderComponentCodeFlow(codeFlow.child)}
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
