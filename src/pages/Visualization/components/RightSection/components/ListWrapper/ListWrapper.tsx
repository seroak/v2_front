import styles from "./ListWrapper.module.css";
import { ListBlock } from "./components/ListBlock";
import { DataStructureListItem } from "@/pages/Visualization/types/dataStructuresItem/dataStructureListItem";
type Props = {
  listItem: DataStructureListItem;
};
function ListWrapper({ listItem }: Props) {
  const { expr, isLight, name } = listItem;
  return (
    <li>
      <span>{name}</span>
      <div className={styles.wrapper}>
        {expr?.map((exprItem, index) => {
          return (
            <ListBlock
              key={index}
              exprItem={exprItem}
              isLight={isLight}
              isLightCheck={listItem.idx.start <= index && index <= listItem.idx.end}
              index={index}
            />
          );
        })}
      </div>
    </li>
  );
}

export default ListWrapper;
