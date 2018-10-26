import React from "react";
import "./style.scss";
let data;
class Avatar extends React.Component {
  render() {
    const image = this.props.image;
    const style = {
      width: this.props.width || 50,
      height: this.props.height || 50
    };
    if (!image) return null;
    return (
      <div className="avatar" style={style}>
        <img src={this.props.image} alt="none" />
      </div>
    );
  }
}
class MainPanel extends React.Component {
  state = { product: {} };
  componentDidMount() {
    const {
      match: {
        params: { product_id: productId }
      }
    } = this.props;
    this.getProduct(productId);
  }
  getProduct(productId) {
    fetch(`http://localhost:3000/products/${productId}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
      .then(results => results.json())
      .then(results => this.setState({ product: results }));
  }

  render() {
    const { data } = this.state.product;
    if (!data) return null;
    const color = {
      background: `${data.color}`
    };
    return (
      <div className="detailBox">
        <div className="left">
          <Avatar
            image="https://www.crowneurocars.com/assets/stock/expanded/white/640/2018mbc890002_640/2018mbc890002_640_05.jpg"
            width={100}
            height={100}
          />
        </div>
        <div className="right">
          <h4>Description: {data.description}</h4>
          <h4>Name: {data.name}</h4>
          <h4>Category: {data.description}</h4>
          <h4>Category: {data.description}</h4>
          <h4>
            <div className="color" style={color} /> {data.color}
          </h4>
        </div>
      </div>
    );
  }
}
export default MainPanel;
