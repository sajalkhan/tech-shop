import { Spin } from 'antd';
import { Link } from 'react-router-dom';

type TCategoryList = {
  isLoading: boolean;
  categories: [];
  message: string;
  path: string;
};

const CategoryList = ({ path, isLoading, message, categories }: TCategoryList) => {
  return (
    <div className="category-list">
      <h4 className="category-list__heading">{message}</h4>
      <div className="category-list__items">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          categories?.map((category: any) => (
            <Link key={category._id} to={`/${path}/${category.name}`} className="category-list__items--name">
              {category.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
