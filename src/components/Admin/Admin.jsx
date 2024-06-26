import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./admin.css";
import Widget from "../widget/Widget";
import InventoryTable from "../InventoryTable/InventoryTable";
import { Typography } from "@mui/material";
import Header from "../Header/Header";
import { INVENTORY_API_URL, APP_TITLE } from "../../constants";

const Admin = () => {
  const [inventory, setInventory] = useState(null);
  const [userMode, setUserMode] = useState(false);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  async function fetchInventoryData() {
    try {
      const response = await fetch(INVENTORY_API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setInventory(
        data?.map((item) => ({
          ...item,
          isVisible: true,
        }))
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <Grid className='admin-root'>
      <Header userMode={userMode} setUserMode={setUserMode} />
      <Typography variant='h4' className='admin-title'>
        {APP_TITLE}
      </Typography>
      <Widget inventory={inventory} />
      <InventoryTable
        inventory={inventory}
        setInventory={setInventory}
        userMode={userMode}
      />
    </Grid>
  );
};

export default Admin;
