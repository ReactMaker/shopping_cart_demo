import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardImg, CardBlock, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Product extends React.Component {
  static propTypes = {
    product: PropTypes.object,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }

  render() {
    const {product, disabled, onClick} = this.props;
    return (
      <Col sm={6} md={4} className="mb-3">
        <Card>
          <CardImg width={'100%'} src={product.img} />
          <CardBlock className="text-center">
            <CardTitle>{product.title}</CardTitle>
            <CardSubtitle>價格：{product.price}</CardSubtitle>
            <CardText>{product.desc}</CardText>
            <Button disabled={disabled} color="secondary" onClick={() => onClick(product)}>
              購買
            </Button>
          </CardBlock>
        </Card>
      </Col>
    );
  }
}
