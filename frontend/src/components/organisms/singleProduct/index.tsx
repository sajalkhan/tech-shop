import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ProductListItems from '@/components/molecules/ProductListItems';

interface ISingleProduct {
  product: any;
}

const { TabPane } = Tabs;

const SingleProduct: React.FC<ISingleProduct> = ({ product }) => {
  const { images, title, description } = product;
  return (
    <div className="o-singleProduct">
      <div className="o-singleProduct__imagePreview">
        <Carousel autoPlay infiniteLoop interval={8000}>
          {images && images.map((item: string, indx: number) => <img src={item} key={indx} />)}
        </Carousel>

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="o-singleProduct__details">
        <h1 className="o-singleProduct__details--title">{title}</h1>
        <Card
          actions={[
            <div key="add">
              <ShoppingCartOutlined />
              <br />
              Add to Cart
            </div>,
            <Link key="view" to="/">
              <HeartOutlined />
              <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
