import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card, Rate, Tabs, TabsProps } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ProductListItems from '@/components/molecules/ProductListItems';
import RatingModal from '@/components/molecules/rating-modal';
import ShowAverage from '@/components/atoms/averageRating';

interface ISingleProduct {
  product: any;
  star: number;
  user: any;
  handleRating: (value: number) => void;
}

const SingleProduct: React.FC<ISingleProduct> = ({ product, user, star, handleRating }) => {
  const [rating, setRating] = useState(star);
  const { images, title, description } = product;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: description,
    },
    {
      key: '2',
      label: 'More',
      children: 'Call us on xxxx xxx xxx to learn more about this product.',
    },
  ];

  useEffect(() => {
    if (product.ratings && user?.token) {
      const existingRatingObject = product.ratings.find(
        (ele: any) => ele?.postedBy?.toString() === user._id?.toString()
      );
      existingRatingObject?.star && setRating(existingRatingObject.star);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    handleRating(rating);
  };

  return (
    <div className="o-singleProduct">
      <div className="o-singleProduct__imagePreview">
        <Carousel autoPlay infiniteLoop interval={8000}>
          {images && images.map((item: string, indx: number) => <img src={item} key={indx} />)}
        </Carousel>

        <Tabs type="card" items={items}></Tabs>
      </div>

      <div className="o-singleProduct__details">
        <h1 className="o-singleProduct__details--title">{title}</h1>
        <ShowAverage product={product} />

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
            <RatingModal key="rating" user={user} handleSubmit={handleSubmit}>
              <Rate
                value={rating}
                onChange={value => setRating(value)}
                style={{ fontSize: '50px', color: 'orangered' }}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
