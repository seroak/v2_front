import styles from "./VariableBox.module.css";
import cx from "classnames";
import ListBox from "./ListBox";
import { VisListItem } from "@/types/visListItem";
type Props = {
  listItem: VisListItem;
};
function ListDiv({ listItem }: Props) {
  const { expr, highlights, isLight, name, type } = listItem;

  const exprArray = expr?.split(",");
  console.log(exprArray);
  return (
    <div>
      {exprArray?.map((exprItem, index) => {
        return <ListBox exprItem={exprItem} />;
      })}
    </div>
  );
}

export default ListDiv;
