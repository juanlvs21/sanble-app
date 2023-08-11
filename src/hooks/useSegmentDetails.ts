import { useState } from "react";

export const useSegmentDetails = (defaultValue = 0) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (index: number) => setValue(index);

  return {
    value,
    handleChange,
  };
};
