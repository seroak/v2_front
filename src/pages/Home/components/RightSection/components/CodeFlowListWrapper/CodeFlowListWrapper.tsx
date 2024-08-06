import styles from "./ListWrapper.module.css";
import { CodeFlowListBlock } from "./components/CodeFlowListBlock";
import { DataStructureListItem } from "@/pages/Home/types/dataStructureListItem";
type Props = {
  listItem: DataStructureListItem;
};
function ListWrapper({ listItem }: Props) {
  const { expr, isLight, name } = listItem;
  const exprArray = expr?.slice(1, -1).split(",");

  return (
    <div>
      <span>{name}</span>
      <div className={styles.wrapper}>
        {exprArray?.map((exprItem, index) => {
          return <CodeFlowListBlock key={index} exprItem={exprItem} isLight={isLight} index={index} />;
        })}
      </div>
    </div>
  );
}

export default ListWrapper;
