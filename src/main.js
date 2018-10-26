import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductList from "./features/products/components/productList";
import MainPanel from "./features/products/components/profileDetails";
import ProductForm from "./features/products/components/productCreate";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={ProductList} />
      <Route path="/create" component={ProductForm} />
      <Route path="/:product_id" component={MainPanel} />
    </Switch>
  </main>
);
export default Main;
