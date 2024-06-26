import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import "./widget.css";

const Widget = (props) => {
  const { inventory } = props;

  const visibleInventory = inventory?.filter((item) => item.isVisible);

  const TotalProduct = visibleInventory?.length;
  const storeValue = visibleInventory
    ?.reduce((acc, curr) => acc + parseInt(curr.value.replace("$", "")), 0)
    .toLocaleString();

  let outOfStocks = 0;
  visibleInventory?.forEach((item) => {
    if (item.quantity === 0) outOfStocks++;
  });

  const distinctCategories = new Set(
    visibleInventory?.map((item) => item.category.toLowerCase())
  );

  const widgetObject = [
    { name: "Total Product", icon: <ShoppingCartIcon />, value: TotalProduct },
    {
      name: "Total Store Value",
      icon: <CurrencyExchangeIcon />,
      value: storeValue,
    },
    {
      name: "Out of stocks",
      icon: <RemoveShoppingCartIcon />,
      value: outOfStocks,
    },
    {
      name: "No of Category",
      icon: <CategoryIcon />,
      value: distinctCategories.size,
    },
  ];
  return (
    <Grid container spacing={2}>
      {widgetObject.map((item, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Grid className='widget-container'>
            <Grid>{item.icon}</Grid>
            <Grid className='widget-content'>
              <Typography>{item.name}</Typography>
              <Typography>{item.value}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Widget;
