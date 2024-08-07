import { useRef, useEffect, ReactNode } from "react";
import { AllObjectItem } from "@/pages/Home/types/allObjectItem";
import { PrintItem } from "@/pages/Home/types/printItem";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import PrintBox from "./components/PrintBox/PrintBox";
import ForBox from "./components/ForBox/ForBox";
import IfBox from "./components/IfBox/IfBox";
import ElseBox from "./components/ElseBox/ElseBox";
import ElifBox from "./components/ElifBox/ElifBox";
import CodeFlowVariableBox from "./components/CodeFlowVariableBox/CodeFlowVariableBox";
import CodeFlowListWrapper from "./components/CodeFlowListWrapper/CodeFlowListWrapper";
import WhileBox from "./components/WhileBox/WhileBox";

// type import
import { ElseItem } from "@/pages/Home/types/elseItem";
import { ForItem } from "@/pages/Home/types/forItem";
import { ConditionItem } from "@/pages/Home/types/conditionItem";
import { CodeFlowVariableItem } from "@/pages/Home/types/codeFlow/codeFlowVariableItem";
import { CodeFlowListItem } from "@/pages/Home/types/codeFlow/codeFlowListItem";
import { WhileItem } from "@/pages/Home/types/codeFlow/whileItem";

//zustand
import { useArrowStore } from "@/store/arrow";

interface Props {
  codeFlow: AllObjectItem;
  isTracking: boolean;
  children?: ReactNode;
}
const CodeFlowItem = ({ codeFlow, isTracking, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && isTracking) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top);
      setRight(rect.right);
    }
  }, [codeFlow.id, codeFlow.type, isTracking]);

  return <div ref={ref}>{children}</div>;
};

export const renderingCodeFlow = (codeFlows: AllObjectItem[], trackingId: number): ReactElement => {
  return (
    <>
      {codeFlows.map((codeFlow, index) => {
        const isTracking = codeFlow.id === trackingId;
        switch (codeFlow.type) {
          case "print": {
            const printItem = codeFlow as PrintItem;
            return (
              <CodeFlowItem key={index} codeFlow={codeFlow} isTracking={isTracking}>
                <PrintBox printItem={printItem} />
                {renderingCodeFlow(printItem.child, trackingId)}
              </CodeFlowItem>
            );
          }
          case "for": {
            const forItem = codeFlow as ForItem;
            return (
              <div>
                <ForBox forItem={forItem} isTracking={isTracking}>
                  {renderingCodeFlow(forItem.child, trackingId)}
                </ForBox>
              </div>
            );
          }
          case "if":
            const ifItem = codeFlow as ConditionItem;
            return (
              <AnimatePresence key={ifItem.id} mode="wait">
                <motion.div key={ifItem.id} layout>
                  <CodeFlowItem key={index} codeFlow={codeFlow} isTracking={isTracking}>
                    <IfBox isLight={codeFlow.isLight} ifItem={ifItem}>
                      {renderingCodeFlow(codeFlow.child, trackingId)}
                    </IfBox>
                  </CodeFlowItem>
                </motion.div>
              </AnimatePresence>
            );
          case "elif":
            const elifItem = codeFlow as ConditionItem;
            return (
              <AnimatePresence key={elifItem.id} mode="wait">
                <motion.div key={elifItem.id} layout>
                  <CodeFlowItem key={index} codeFlow={codeFlow} isTracking={isTracking}>
                    <ElifBox isLight={codeFlow.isLight} elifItem={elifItem}>
                      {renderingCodeFlow(codeFlow.child, trackingId)}
                    </ElifBox>
                  </CodeFlowItem>
                </motion.div>
              </AnimatePresence>
            );
          case "else":
            const elseItem = codeFlow as ElseItem;
            return (
              <AnimatePresence key={elseItem.id} mode="wait">
                <motion.div key={elseItem.id} layout>
                  <CodeFlowItem key={index} codeFlow={codeFlow} isTracking={isTracking}>
                    <ElseBox isLight={codeFlow.isLight} elseItem={elseItem}>
                      {renderingCodeFlow(codeFlow.child, trackingId)}
                    </ElseBox>
                  </CodeFlowItem>
                </motion.div>
              </AnimatePresence>
            );
          case "variable":
            const variableItem = codeFlow as CodeFlowVariableItem;
            return (
              <div>
                <CodeFlowVariableBox codeFlowVariableItem={variableItem} isTracking={isTracking} />
              </div>
            );
          case "list":
            const listItem = codeFlow as CodeFlowListItem;
            return (
              <div>
                <CodeFlowListWrapper codeFlowListItem={listItem} isTracking={isTracking} />
              </div>
            );
          case "while":
            const whileItem = codeFlow as WhileItem;
            return (
              <div key={whileItem.id}>
                <WhileBox key={index} whileItem={whileItem}>
                  {renderingCodeFlow(whileItem.child, trackingId)}
                </WhileBox>
              </div>
            );
          default:
            throw new Error(`${codeFlow.type} is unexpected type`);
        }
      })}
    </>
  );
};
