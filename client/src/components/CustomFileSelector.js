// components/CustomFileSelector.tsx
'use client'
import classNames from "classnames";
import React, { ComponentPropsWithRef } from "react";

const CustomFileSelector = (props) => {
  return (
    <input
      {...props}
      type="file"
      multiple

    />
  );
};

export default CustomFileSelector;
