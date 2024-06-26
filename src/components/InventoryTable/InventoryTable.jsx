import React, { useState, memo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./inventory-table.css";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomDialog from "../CustomDialog/CustomDialog";
import { TABLE_ROWS } from "../../constants";
import Chip from "@mui/material/Chip";

const InventoryTable = (props) => {
  const { inventory, setInventory, userMode } = props;

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    value: "",
  });

  if (!inventory) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (item) => {
    setSelectedRow(item);
    setFormValues({
      name: item.name,
      category: item.category,
      price: item.price.replace("$", ""),
      quantity: item.quantity,
      value: item.value.replace("$", ""),
    });
    setOpen(true);
  };

  const handleDelete = (item) => {
    setInventory((prevInventory) =>
      prevInventory.filter((i) => i.name !== item.name)
    );
  };

  const handleVisibilityToggle = (item) => {
    setInventory((prevInventory) =>
      prevInventory.map((i) =>
        i.name === item.name
          ? {
              ...i,
              isVisible: !i.isVisible,
            }
          : i
      )
    );
  };

  return (
    <Grid className={userMode ? "table-root user-table-root" : "table-root"}>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_ROWS.map((row, index) => (
              <TableCell key={index} align={index === 0 ? "left" : "center"}>
                <Chip label={row} className='table-title' />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory?.map((item) => (
            <TableRow
              key={item.name}
              className={item.isVisible ? "" : "grey-text-row"}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component='th' scope='row'>
                {item.name}
              </TableCell>
              <TableCell align='center'>{item.category}</TableCell>
              <TableCell align='center'>{item.value}</TableCell>
              <TableCell align='center'>{item.quantity}</TableCell>
              <TableCell align='center'>{item.price}</TableCell>
              <TableCell align='center'>
                <Grid className='icon-grid'>
                  <EditIcon
                    sx={{
                      color: userMode || !item.isVisible ? "grey" : "green",
                      marginRight: "10px",
                      cursor:
                        userMode || !item.isVisible ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!userMode && item.isVisible) {
                        handleEditClick(item);
                      }
                    }}
                  />
                  {item.isVisible ? (
                    <VisibilityIcon
                      sx={{
                        color: userMode ? "grey" : "#c597d4",
                        marginRight: "10px",
                        cursor: userMode ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (!userMode) {
                          handleVisibilityToggle(item);
                        }
                      }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      sx={{
                        color: userMode ? "grey" : "#c597d4",
                        marginRight: "10px",
                        cursor: userMode ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (!userMode) {
                          handleVisibilityToggle(item);
                        }
                      }}
                    />
                  )}
                  <DeleteIcon
                    sx={{
                      color: userMode ? "grey" : "red",
                      marginRight: "10px",
                      cursor: userMode ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!userMode) {
                        handleDelete(item);
                      }
                    }}
                  />
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomDialog
        formValues={formValues}
        selectedRow={selectedRow}
        setFormValues={setFormValues}
        inventory={inventory}
        setInventory={setInventory}
        handleClose={handleClose}
        open={open}
      />
    </Grid>
  );
};

export default memo(InventoryTable);
