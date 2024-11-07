export interface CreateCallStackDto {
  id: number;
  args: [
    {
      expr: string;
      name: string;
      type: string;
      idx: { start: number; end: number };
    }
  ];
  callStackName: string;
  code: string;
  type: string;
}
export const isCreateCallStackDto = (item: any): item is CreateCallStackDto => {
  return (
    typeof item.args === "object" &&
    typeof item.callStackName === "string" &&
    typeof item.code === "string" &&
    typeof item.type === "string"
  );
};
