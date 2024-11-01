export interface AppendDto {
  variable: {
    id: number;
    expr: string;
    name: string;
    code: string;
    type: string;
  };
  callStackName: string;
  type: string;
}

export const isAppendDto = (item: any): item is AppendDto => {
  return (
    typeof item.variable === "object" &&
    typeof item.variable.id === "number" &&
    typeof item.variable.expr === "string" &&
    typeof item.variable.name === "string" &&
    typeof item.variable.code === "string" &&
    typeof item.variable.type === "string" &&
    typeof item.callStackName === "string" &&
    typeof item.type === "string"
  );
};
