import React from "react";
import { Helmet } from "react-helmet";

export type ComponentProps = {
  /**
   * Children component
   */
  children?: React.ReactElement;
  /**
   * Title page
   */
  title?: string;
};

export const Metadata: React.FC<ComponentProps> = ({ title, children }) => (
  <Helmet>
    <title>{title ? `${title} | ` : ""} Sanble</title>
    {children}
  </Helmet>
);
