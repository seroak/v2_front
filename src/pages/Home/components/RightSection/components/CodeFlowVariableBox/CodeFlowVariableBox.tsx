import styles from './CodeFlowVariableBox.module.css';
import cx from 'classnames';
import { CodeFlowVariableItem } from '@/pages/Home/types/codeFlow/codeFlowVariableItem';
type Props = {
  codeFlowVarialbeItem: CodeFlowVariableItem;
};
function CodeFlowVariableBox({ codeFlowVarialbeItem }: Props) {
  return (
    <div className={styles.variable}>
      <div className={cx(styles.variable_box, codeFlowVarialbeItem.isLight && styles.highlight)}>
        <span className={styles.text}>{codeFlowVarialbeItem.expr}</span>
      </div>
    </div>
  );
}

export default CodeFlowVariableBox;
