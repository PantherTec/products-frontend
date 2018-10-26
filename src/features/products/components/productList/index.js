import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

const TableStyle = {
  marginLeft: "40px",
  marginRight: "40px",
  marginTop: "60px"
};
class ProductList extends React.Component {
  state = { products: [] };

  componentDidMount() {
    this.getProducts();
  }
  getProducts() {
    fetch(`http://localhost:3000/products/`, {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
      .then(results => results.json())
      .then(results => this.setState({ products: results }));
  }
  render() {
    const { products } = this.state;
    console.log("products", products);
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text, products) => <Link to={"/" + products.id}>{text}</Link>
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      }
    ];

    return (
      <Table dataSource={products.data} columns={columns} style={TableStyle} />
    );
  }
}
export default ProductList;
