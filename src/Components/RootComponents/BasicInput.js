import React from "react";

import { TextField, Typography, Grid } from "@material-ui/core";


const BasicInput = ({
  value,
  dispatchValue,
  name,
  errorText,
  label,
  placeholder = "",
  type = "text",
}) => {
  const handleChange = (event) => {
    dispatchValue({
      type: "update",
      name,
      value: event.target.value,
    });
  };
  const error = errorText ? true : false;

  return (
    <Grid item xs={12} container>
      <TextField
        variant="outlined"
        value={value}
        onChange={handleChange}
        name={name}
        error={error}
        label={label}
        placeholder={placeholder}
        fullWidth
        type={type}
      />
      <Typography color="error">{errorText}</Typography>
    </Grid>
  );
};

export default BasicInput;
