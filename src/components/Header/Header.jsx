import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import "./header.css";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#e5fd72",
    "&:hover": {
      backgroundColor: alpha("#e5fd72", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#e5fd72",
  },
}));

const Header = (props) => {
  const { userMode, setUserMode } = props;

  const handleChange = (event) => {
    setUserMode(event.target.checked);
  };

  return (
    <Grid className='admin-toggle'>
      <Typography className='toggle-label'>Admin</Typography>
      <CustomSwitch
        checked={userMode}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography className='toggle-label'>User</Typography>
      <span className='icon-seperator'>|</span>
      <LogoutIcon className='logout-icon' />
    </Grid>
  );
};

export default Header;
