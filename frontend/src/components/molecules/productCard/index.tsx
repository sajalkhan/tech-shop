import React from 'react';
import { Card, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import ShowAverage from '@/components/atoms/averageRating';
import { EyeOutlined, ShoppingCartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

type item = {
  _id: string;
  title: string;
  description: string;
  images: string[];
};

interface IProductCard {
  item: item;
  handleEdit?: (item: item) => void;
  handleDelete?: (id: string) => void;
  userRole: 'admin' | 'user';
}

const ProductCard: React.FC<IProductCard> = ({ item, handleEdit, handleDelete, userRole }) => {
  const { title, description, images, _id } = item;

  const actions =
    userRole === 'admin'
      ? [
          <EditOutlined key="edit" className="m-productCard__edit" onClick={() => handleEdit && handleEdit(item)} />,
          <Popconfirm
            key="delete"
            title="Delete this item"
            placement="top"
            description="Are you sure to delete this Product?"
            onConfirm={() => handleDelete && handleDelete(_id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="m-productCard__delete" />
          </Popconfirm>,
        ]
      : [
          <Link key="view" className="m-productCard__view" to={`/product/${_id}`}>
            <EyeOutlined />
            <p>View Product</p>
          </Link>,
          <div key="shopping" className="m-productCard__shopping">
            <ShoppingCartOutlined />
            <p>Add To Cart</p>
          </div>,
        ];

  return (
    <div className="m-productCard">
      <ShowAverage product={item} size="small" />
      <Card
        cover={<img src={images[0]} alt={title} draggable={false} />}
        className="m-productCard__item"
        actions={actions}
      >
        <Card.Meta
          title={title}
          description={description && description.length > 40 ? `${description.substring(0, 40)}...` : description}
        />
      </Card>
    </div>
  );
};

export default ProductCard;
