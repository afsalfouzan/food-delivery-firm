import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Navbar from "./components/customernavbar";
import "./products.css";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

export default function OrdersList() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["auth_cookie"]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let params = { user_id: cookies.auth_cookie.users.id };
    async function orderfetch() {
      const orderlist = await dispatch.cartmodel.getorders(params);
      setOrders(orderlist);
    }
    orderfetch();
  }, []);

  return (
    <div className="oder_div">
      <div className="side_nav">
        <Navbar />
      </div>
      <div className="list_order">
        {orders.map((data, index) => (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="left">
              <ListItemAvatar>
                <Avatar
                  src={`http://localhost:9000/${data.product.image}`}
                  alt={data.product.name}
                />
              </ListItemAvatar>
              <ListItemText
                primary={data.product.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Quantity: {data.item_count}
                      <h6 style={{ fontWeight: "bold" }}>
                        Amount: {data.amount}
                      </h6>
                      {data.product.description}
                    </Typography>
                    <br />
                    {data.reference_id}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}
      </div>
    </div>
  );
}
