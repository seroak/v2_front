import styles from "./TupleWrapper.module.css";
import { TupleBlock } from "./components/TupleBlock.tsx";
import { DataStructureListItem } from "@/pages/Visualization/types/dataStructuresItem/dataStructureListItem";

type Props = {
  listItem: DataStructureListItem;
};

function TupleWrapper({ listItem }: Props) {
  const { expr, isLight, name } = listItem;
  return (
    <li>
      <p>{name}</p>
      <div className={styles.wrapper}>
        <div className={styles["direction-column"]}>
          <img src="/image/img_lock.png" alt="자물쇠" className={styles["tuple-lock"]}></img>
          <div style={{display: "flex"}}>
            {expr?.map((exprItem, index) => {
              return (
                <TupleBlock
                  key={index}
                  exprItem={exprItem}
                  isLight={isLight}
                  isLightCheck={listItem.idx?.start <= index && index <= listItem.idx?.end}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </li>
  );
}

export default TupleWrapper;
