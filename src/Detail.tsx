import { Stack } from "@mui/material";
import { ReactNode } from "react";
import _ from "lodash";

interface DetailRow<T> {
  prop: string[]; //[keyof T];
  render: (value: any, setValue: (value: any) => void) => ReactNode;
}

interface DetailProps<T> {
  value: T;
  onChange?: (value: T) => void;
  rows: DetailRow<T>[];
}

const Detail = <T extends {}>({ value, rows, onChange }: DetailProps<T>) => {
  return (
    <Stack spacing={3}>
      {rows.map((row) =>
        row.render(_.get(value, row.prop), (a) =>
          onChange?.(_.setWith(_.clone(value), row.prop, a, _.clone))
        )
      )}
    </Stack>
  );
};

export default Detail;
