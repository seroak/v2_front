import styles from "./ListDiv.module.css";
import ListBox from "./ListBox";
import { VizListItem } from "@/types/vizListItem";
type Props = {
  listItem: VizListItem;
};
function ListDiv({ listItem }: Props) {
  const { expr, isLight, name } = listItem;

  const exprArray = expr?.split(",");
  console.log(exprArray);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className={styles.listName}>{name}</span>
      <div style={{ display: "flex" }}>
        {exprArray?.map((exprItem, index) => {
          return (
            <ListBox
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

export default ListDiv;
