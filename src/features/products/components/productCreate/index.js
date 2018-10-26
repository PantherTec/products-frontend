import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Form, Input } from "antd";
import axios from "axios";
import update from "immutability-helper";

const FormItem = Form.Item;
const boxStyle = {
  marginLeft: "70px",
  marginRight: "70px"
};
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap"
};
const colStyle = {
  marginBottom: "16px"
};
const gutter = 8;

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageUrls: [],
      formLayout: "horizontal",
      product: {}
    };
  }
  static defaultProps = {};
  selectImages = event => {
    let images = [];
    for (var i = 0 < event.target.files.length; i++; ) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/));
    let message = `${images.length} valid image selected`;
  };
  uploadImages = () => {
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);

      // Make an AJAX upload request using Axios
      return axios
        .post("http://localhost:products/uploads", data)
        .then(response => {
          this.setState({
            imageUrls: [response.data.imageUrl, ...this.state.imageUrls]
          });
        });
    });

    // Once all the files are uploaded
    axios
      .all(uploaders)
      .then(() => {
        console.log("done");
      })
      .catch(err => alert(err.message));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handlePost();
  };
  handleInputChange = event => {
    const {
      dataset: { key },
      value
    } = event.target;
    let [segment, property] = key.split("-");
    if (!property) {
      property = segment;
      segment = "data";
    }

    this.setState(
      update(this.state, {
        product: {
          $merge: {
            [property]: value
          }
        }
      })
    );
  };
  handlePost = async () => {
    const { product } = this.state;
    console.log(product);
    const formData = Object.assign(
      {},
      {
        ...product,
        image: `https://www.crowneurocars.com/assets/stock/expanded/white/640/2018mbc890002_640/2018mbc890002_640_05.jpg`
      }
    );
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(formData)
    };
    const request = new Request("http://localhost:4321/products/", options);
    const response = await fetch(request);
    console.log(response);
    const status = await response.status;
    console.log("the status is", status);
    if (status === 200) {
      alert("product has been created");
      window.location.replace("http://localhost:3000/");
    } else {
      alert("product was not succesfully created, check you inputed values");
    }
  };
  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === "horizontal"
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
          }
        : null;
    const buttonItemLayout =
      formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : null;

    return (
      <div className="form-body">
        <header>
          <span style={{ float: "left" }}>Add Product</span>
        </header>
        <div style={boxStyle}>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <div title="New Product">
                <Form onSubmit={this.handleSubmit} layout={formLayout}>
                  <div>
                    <div
                      size="large"
                      style={{ marginBottom: "15px", width: "100%" }}
                    >
                      <Col span="12">
                        <FormItem {...formItemLayout} label="Name" hasFeedback>
                          <Input
                            name="name"
                            id="name"
                            data-key="name"
                            value={this.state.product.name}
                            onChange={this.handleInputChange}
                          />
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem
                          {...formItemLayout}
                          label="Description"
                          hasFeedback
                        >
                          <Input
                            name="description"
                            id="description"
                            data-key="description"
                            value={this.state.product.description}
                            onChange={this.handleInputChange}
                          />
                        </FormItem>
                      </Col>
                    </div>
                    <div size="large" style={{ marginBottom: "15px" }}>
                      <Col span="12">
                        <FormItem
                          {...formItemLayout}
                          label="Category"
                          hasFeedback
                        >
                          <Input
                            name="category"
                            id="category"
                            data-key="category"
                            value={this.state.product.category}
                            onChange={this.handleInputChange}
                          />
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem {...formItemLayout} label="price" hasFeedback>
                          <Input
                            name="price"
                            id="price"
                            data-key="price"
                            value={this.state.product.price}
                            onChange={this.handleInputChange}
                          />
                        </FormItem>
                      </Col>
                    </div>
                    <div size="large" style={{ marginBottom: "15px" }}>
                      <Col span="12">
                        <FormItem {...formItemLayout} label="color" hasFeedback>
                          <Input
                            name="color"
                            id="color"
                            data-key="color"
                            value={this.state.product.color}
                            onChange={this.handleInputChange}
                          />
                        </FormItem>
                      </Col>
                      <Col span="12" style={{ marginTop: "50px" }}>
                        <FormItem {...buttonItemLayout}>
                          <button
                            type="primary"
                            htmltype="submit"
                            className="form-submit-button"
                          >
                            Save
                          </button>
                        </FormItem>
                      </Col>
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default ProductForm;
