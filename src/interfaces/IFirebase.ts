export type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">="
  | ">"
  | "array-contains"
  | "in"
  | "array-contains-any"
  | "not-in";

export type TQueryWhere = null | {
  field: string;
  op: WhereFilterOp;
  value: string | number | boolean;
};
