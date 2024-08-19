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
  width: number;
  height: number;
}
const CodeFlowItem = ({ codeFlow, isTracking, width, height, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    console.log("codeFlow", codeFlow);
    if (ref.current && codeFlow.isLight) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top);
      setRight(rect.right);
    }
  }, [codeFlow, isTracking, ref, width, height]);

  return (
    <div style={{ width: "fit-content" }} ref={ref}>
      {children}
    </div>
  );
};

export const renderingCodeFlow = (
  codeFlows: AllObjectItem[],
  trackingId: number,
  width: number,
  height: number
): ReactElement => {
  return (
    <>
      {codeFlows.map((codeFlow, index) => {
        const isTracking = codeFlow.id === trackingId;
        switch (codeFlow.type) {
          case "print": {
            const printItem = codeFlow as PrintItem;
            return (
              <CodeFlowItem
                key={printItem.id}
                codeFlow={codeFlow}
                isTracking={isTracking}
                width={width}
                height={height}
              >
                <PrintBox key={printItem.id} printItem={printItem} />
                {renderingCodeFlow(codeFlow.child, trackingId, width, height)}
              </CodeFlowItem>
            );
          }
          case "for": {
            const forItem = codeFlow as ForItem;
            return (
              <div key={forItem.id}>
                <ForBox key={forItem.id} forItem={forItem} isTracking={isTracking} width={width} height={height}>
                  {renderingCodeFlow(codeFlow.child, trackingId, width, height)}
                </ForBox>
              </div>
            );
          }
          case "if":
            const ifItem = codeFlow as ConditionItem;
            return (
              <AnimatePresence key={ifItem.id} mode="wait">
                <motion.div key={ifItem.id} layout>
                  <CodeFlowItem key={index} codeFlow={codeFlow} isTracking={isTracking} width={width} height={height}>
                    <IfBox isLight={codeFlow.isLight} ifItem={ifItem}>
                      {renderingCodeFlow(codeFlow.child, trackingId, width, height)}
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
                  <CodeFlowItem key={index} codeFlow={codeFlow} isTracking={isTracking} width={width} height={height}>
                    <ElifBox isLight={codeFlow.isLight} elifItem={elifItem}>
                      {renderingCodeFlow(codeFlow.child, trackingId, width, height)}
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
                  <CodeFlowItem key={index} codeFlow={codeFlow} isTracking={isTracking} width={width} height={height}>
                    <ElseBox isLight={codeFlow.isLight} elseItem={elseItem}>
                      {renderingCodeFlow(codeFlow.child, trackingId, width, height)}
                    </ElseBox>
                  </CodeFlowItem>
                </motion.div>
              </AnimatePresence>
            );
          case "variable":
            const variableItem = codeFlow as CodeFlowVariableItem;
            return (
              <div key={variableItem.id}>
                <CodeFlowVariableBox
                  key={variableItem.id}
                  codeFlowVariableItem={variableItem}
                  isTracking={isTracking}
                  width={width}
                  height={height}
                />
              </div>
            );
          case "list":
            const listItem = codeFlow as CodeFlowListItem;
            return (
              <div key={listItem.id} style={{ width: "fit-content" }}>
                <CodeFlowListWrapper codeFlowListItem={listItem} isTracking={isTracking} />
              </div>
            );
          case "while":
            const whileItem = codeFlow as WhileItem;
            return (
              <div key={whileItem.id}>
                <CodeFlowItem key={index} codeFlow={codeFlow} isTracking={isTracking} width={width} height={height}>
                  <WhileBox key={index} whileItem={whileItem}>
                    {renderingCodeFlow(codeFlow.child, trackingId, width, height)}
                  </WhileBox>
                </CodeFlowItem>
              </div>
            );
          default:
            throw new Error(`${codeFlow.type} is unexpected type`);
        }
      })}
    </>
  );
};
