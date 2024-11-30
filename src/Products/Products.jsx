import "./Product.css";
import { Row, Col, Card } from 'antd';

const Products = ({ result }) => {
  return (
    <Row gutter={[16, 16]} className="card-container">
      {result && result.map((item, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={index}>
          <Card hoverable>
            {item}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Products;