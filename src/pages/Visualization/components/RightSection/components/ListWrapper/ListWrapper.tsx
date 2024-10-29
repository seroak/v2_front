import styles from "./ListWrapper.module.css";
import { ListBlock } from "./components/ListBlock";
import { DataStructureListItem } from "@/pages/Visualization/types/dataStructuresItem/dataStructureListItem";
type Props = {
  listItem: DataStructureListItem;
};
function ListWrapper({ listItem }: Props) {
  const { expr, isLight, name } = listItem;
  const exprArray = expr?.slice(1, -1).split(",");
  return (
    <li>
      <span>{name}</span>
      <div className={styles.wrapper}>
        {exprArray?.map((exprItem, index) => {
          return <ListBlock key={index} exprItem={exprItem} isLight={isLight} index={index} />;
        })}
      </div>
    </li>
  );
}

export default ListWrapper;
