import { AllObjectItem } from '@/pages/Home/types/allObjectItem';
import { PrintItem } from '@/pages/Home/types/printItem';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement } from 'react';
import PrintBox from './components/PrintBox/PrintBox';
import ForBox from './components/ForBox/ForBox';
import IfBox from './components/IfBox/IfBox';
import ElseBox from './components/ElseBox/ElseBox';
import ElifBox from './components/ElifBox/ElifBox';

// type import
import { ElseItem } from '@/pages/Home/types/elseItem';
import { ForItem } from '@/pages/Home/types/forItem';
import { ConditionItem } from '@/pages/Home/types/conditionItem';
import { CodeFlowVariableItem } from '@/pages/Home/types/codeFlow/codeFlowVariableItem';
import CodeFlowVariableBox from './components/CodeFlowVariableBox/CodeFlowVariableBox';

export const renderingCodeFlow = (codeFlows: AllObjectItem[]): ReactElement => {
  return (
    <>
      {codeFlows.map((codeFlow, index) => {
        switch (codeFlow.type) {
          case 'print': {
            const printItem = codeFlow as PrintItem;
            return (
              <div key={index}>
                <PrintBox key={index} printItem={printItem} />
                {renderingCodeFlow(printItem.child)}
              </div>
            );
          }
          case 'for': {
            const forItem = codeFlow as ForItem;
            return (
              <div key={index}>
                <ForBox key={index} forItem={forItem}>
                  {renderingCodeFlow(forItem.child)}
                </ForBox>
              </div>
            );
          }
          case 'if':
            const ifItem = codeFlow as ConditionItem;
            return (
              <AnimatePresence key={ifItem.id} mode="wait">
                <motion.div key={ifItem.id} layout>
                  <IfBox isLight={codeFlow.isLight} ifItem={ifItem}>
                    {renderingCodeFlow(codeFlow.child)}
                  </IfBox>
                </motion.div>
              </AnimatePresence>
            );
          case 'elif':
            const elifItem = codeFlow as ConditionItem;
            return (
              <AnimatePresence key={elifItem.id} mode="wait">
                <motion.div key={elifItem.id} layout>
                  <ElifBox isLight={codeFlow.isLight} elifItem={elifItem}>
                    {renderingCodeFlow(codeFlow.child)}
                  </ElifBox>
                </motion.div>
              </AnimatePresence>
            );
          case 'else':
            const elseItem = codeFlow as ElseItem;
            return (
              <AnimatePresence key={elseItem.id} mode="wait">
                <motion.div key={elseItem.id} layout>
                  <ElseBox isLight={codeFlow.isLight} elseItem={elseItem}>
                    {renderingCodeFlow(codeFlow.child)}
                  </ElseBox>
                </motion.div>
              </AnimatePresence>
            );
          case 'variable':
            const variableItem = codeFlow as CodeFlowVariableItem;
            return (
              <div key={variableItem.id}>
                <CodeFlowVariableBox key={index} codeFlowVarialbeItem={variableItem} />
              </div>
            );

          default:
            throw new Error(`${codeFlow.type} is unexpected type`);
        }
      })}
    </>
  );
};
