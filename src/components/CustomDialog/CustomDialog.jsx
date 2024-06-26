import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Dialog, Grid, Button, InputLabel } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import "./custom-dialog.css";

const CustomDialog = (props) => {
  const {
    formValues,
    selectedRow,
    setFormValues,
    inventory,
    setInventory,
    handleClose,
    open,
  } = props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedInventory = inventory.map((item) =>
      item.name === selectedRow.name
        ? {
            ...item,
            category: formValues.category,
            price: `$${formValues.price}`,
            quantity: parseInt(formValues.quantity, 10),
            value: `$${formValues.value}`,
          }
        : item
    );

    setInventory(updatedInventory);

    handleClose();
  };

  return (
    <Dialog className='dialogue-root' open={open}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContentText>{formValues.name}</DialogContentText>
      <CancelPresentationIcon onClick={handleClose} />
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor='category'>
                Category
              </InputLabel>
              <TextField
                required
                margin='dense'
                id='category'
                name='category'
                type='text'
                fullWidth
                value={formValues.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor='price'>
                Price
              </InputLabel>
              <TextField
                required
                margin='dense'
                id='price'
                name='price'
                type='number'
                fullWidth
                value={formValues.price}
                onChange={handleInputChange}
                InputProps={{
                  inputProps: {
                    className: "no-spinners",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor='quantity'>
                Quantity
              </InputLabel>
              <TextField
                required
                margin='dense'
                id='quantity'
                name='quantity'
                type='number'
                fullWidth
                value={formValues.quantity}
                onChange={handleInputChange}
                InputProps={{
                  inputProps: {
                    className: "no-spinners",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor='value'>
                Value
              </InputLabel>
              <TextField
                required
                margin='dense'
                id='value'
                name='value'
                type='number'
                fullWidth
                value={formValues.value}
                onChange={handleInputChange}
                InputProps={{
                  inputProps: {
                    className: "no-spinners",
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className='cancel-button' onClick={handleClose}>
            Cancel
          </Button>
          <Button className='submit-button' type='submit'>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomDialog;
