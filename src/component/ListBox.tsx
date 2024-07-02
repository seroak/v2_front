import styles from "./VariableBox.module.css";
import cx from "classnames";

import { VisListItem } from "@/types/visListItem";
type Props = {
  exprItem: string;
};
function ListBox({ exprItem }: Props) {
  return <div>{exprItem}</div>;
}

export default ListBox;
