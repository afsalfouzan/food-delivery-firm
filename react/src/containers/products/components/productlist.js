import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import "../products.css";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonGroup } from "@mui/material";

function Productlist(props) {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const navigate = useNavigate();
  const products = props.products;
  const dispatch = useDispatch();
  let c = 0;

  let [count, setCounter] = useState(0);
  let [productsss, setProducts] = useState([]);

  const [cookies, setCookie] = useCookies(["auth_cookie"]);

  useEffect(() => {
    let params = { user_id: cookies.auth_cookie.users.id };

    async function listCartItems() {
      const cartitems = await dispatch.cartmodel.cartview(params);
      if (products && cartitems.cart.rows) {
        products.forEach((item) => {
          cartitems.cart.rows.forEach((cartitem) => {
            if (
              item.id == cartitem.product_id &&
              cartitem.user_id == cookies.auth_cookie.users.id
            ) {
              item.count = cartitem.count;
            }
          });
        });
        setProducts(products);
      } else {
        setProducts(products);
      }
      if (cartitems.cart.count > 0) {
        cartitems.cart.rows.map((item, index) => {
          c = c + item.count;
          return setCounter(c);
        });
      } else {
        setCounter(0);
      }
    }

    listCartItems();
  }, [products]);

  const decrementCount = async (index, item) => {
    let productCopy = [...products];
    const itemCount = productCopy[index].count;
    productCopy[index].count = itemCount ? (itemCount - 1) : 0;
    setProducts(productCopy);
    setCounter(count - 1);
    let productcart = {
      product_id: item.id,
      product_name: item.name,
      count: -1,
      user_id: cookies.auth_cookie.users.id,
    };
    await dispatch.cartmodel.addcart(productcart);
  };
  let incrementCount = async (index, item) => {
    let productCopy = [...products];
    const itemCount = productCopy[index].count;
    productCopy[index].count = itemCount ? itemCount + 1 : 1;
    setProducts(productCopy);
    setCounter(count + 1);
    let productcart = {
      product_id: item.id,
      product_name: item.name,
      count: 1,
      user_id: cookies.auth_cookie.users.id,
    };
    await dispatch.cartmodel.addcart(productcart);
  };

  const Additem = async (item) => {
    item.count = 1;
    if (!item.count) {
      setCounter(count + 1);
    } else {
      let productcart = {
        product_id: item.id,
        product_name: item.name,
        count: 1,
        user_id: cookies.auth_cookie.users.id,
      };
      setCounter(count + item.count);
      await dispatch.cartmodel.addcart(productcart);
    }
  };
  return (
    <div>
      <nav className="navv">
        <Badge color="secondary" badgeContent={count} className="cart_divv">
          <ShoppingCartIcon
            className="cart_d"
            onClick={() => navigate("/products/cartlist")}
            sx={{ fontSize: 50 }}
          />
          {""}
        </Badge>
      </nav>
      <div className="main_div">
        {productsss.map((item, index) => (
          <div className="mapping_customer">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                src={`http://localhost:9000/${item.image}`}
                alt={item.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontSize={"20px"}
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <h6>Amount: {item.price}</h6>
              </CardContent>
              {!item.count ? (
                <div className="button_div">
                  <ButtonGroup
                    className="buttongroup"
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      className="addcart"
                      id={item.id}
                      onClick={() => {
                        Additem(item);
                      }}
                    >
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </div>
              ) : (
                <div className="button_div">
                  <ButtonGroup
                    className="buttongroup"
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button onClick={() => decrementCount(index, item)}>
                      -
                    </Button>
                    <Button>
                      {" "}
                      <input
                        type="text"
                        className="input_count"
                        id={item.id}
                        value={item.count ? item.count : 0}
                      ></input>
                    </Button>
                    <Button onClick={() => incrementCount(index, item)}>
                      +
                    </Button>
                  </ButtonGroup>
                </div>
              )}
              <br />
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productlist;
