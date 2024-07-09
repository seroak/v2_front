import styles from "./ListWrapper.module.css";
import { ListBlock } from "./components/ListBlock";
import { VizListItem } from "@/types/vizListItem";
type Props = {
  listItem: VizListItem;
};
function ListWrapper({ listItem }: Props) {
  const { expr, isLight, name } = listItem;
  const exprArray = expr?.slice(1, -1).split(",");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className={styles.list_name}>{name}</span>
      <div style={{ display: "flex" }}>
        {exprArray?.map((exprItem, index) => {
          return (
            <ListBlock
              key={index}
              exprItem={exprItem}
              isLight={isLight}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ListWrapper;
