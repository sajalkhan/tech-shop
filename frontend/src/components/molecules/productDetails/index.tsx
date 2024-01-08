import React from 'react';
import { Card, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

type item = {
  _id: string;
  title: string;
  description: string;
  images: string[];
};

interface IProductDetails {
  item: item;
  handleEdit: (item: item) => void;
  handleDelete: (id: string) => void;
}

const ProductDetails: React.FC<IProductDetails> = ({ item, handleEdit, handleDelete }) => {
  const { title, description, images, _id } = item;

  return (
    <Card
      cover={<img src={images[0]} alt={title} draggable={false} />}
      className="productDetails"
      actions={[
        <EditOutlined key="edit" className="productDetails__edit" onClick={() => handleEdit(item)} />,

        <Popconfirm
          key="delete"
          title="Delete this item"
          placement="top"
          description="Are you sure to delete this Product?"
          onConfirm={() => handleDelete(_id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined className="productDetails__delete" />
        </Popconfirm>,
      ]}
    >
      <Card.Meta
        title={title}
        description={description && description.length > 40 ? `${description.substring(0, 40)}...` : description}
      />
    </Card>
  );
};

export default ProductDetails;
