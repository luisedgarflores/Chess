import React from "react";
import { Button, Grid } from "@material-ui/core";

const BasicButton = ({
  handleClick,
  variant = "contained",
  fullWidth = false,
  children,
  type = "button",
}) => {
  const decideAction = () => {
    if (type === "button") {
      handleClick();
    }
  };

  return (
    <Grid item xs={12}>
      <Button
        onClick={decideAction}
        variant={variant}
        fullWidth={fullWidth}
        type={type}
      >
        {children}
      </Button>
    </Grid>
  );
};

export default BasicButton;
