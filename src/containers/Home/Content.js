import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

export default class Content extends Component {
  state = {
    modal: false,
    products: [],
    cart: [],
  }

  componentDidMount = () => {
    this.getProductList();
  }

  getProductList = () => {
    axios.get('https://demojson.herokuapp.com/cart')
      .then((response) => {
        this.setState({
          products: response.data,
        });
      });
  }

  addToCart = (product) => {
    const cart = this.state.cart;
    cart.push(product);

    this.setState({
      cart,
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { modal, products, cart } = this.state;

    return (
      <div>
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <Jumbotron>
                <h1 className="display-3">改車工坊</h1>
                <p className="lead">
                  我們專營國內外改裝精品買賣及銷售安裝、網路五年以上經驗
                </p>
                <p className="lead">
                  奇摩 100% + 超過3000個正面評價 露天破1500次正評~
                </p>
                <p className="lead">
                  實體店面備有二輪專用升降台
                </p>
                <p className="lead">
                  及Snap-on專業工具組進行安裝
                </p>
                <hr className="my-2" />
                <p className="lead">
                  <Button color="primary" onClick={this.toggle}>購物車({cart.length})</Button>
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            {
              products.map(product =>
                <Col sm={6} md={4} className="mb-3">
                  <Card>
                    <CardImg width={'100%'} src={product.img} />
                    <CardBlock className="text-center">
                      <CardTitle>{product.title}</CardTitle>
                      <CardSubtitle>價格：{product.price}</CardSubtitle>
                      <CardText>{product.desc}</CardText>
                      <Button
                        disabled={cart.find(item => item.id === product.id)}
                        color="secondary"
                        onClick={() => this.addToCart(product)}
                      >
                        購買
                      </Button>
                    </CardBlock>
                  </Card>
                </Col>
              )
            }
          </Row>

          <Modal isOpen={modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>購物車</ModalHeader>
            <ModalBody>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>品項</th>
                    <th>價格</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cart.map((item, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td width="250">{item.title}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>結帳</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>取消</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}
