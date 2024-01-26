import React from 'react';
import { Rate } from 'antd';

interface ShowAverageProps {
  product: any;
  size?: 'small' | 'medium' | 'large';
  color?: 'orange' | 'gray' | 'red';
}

const ShowAverage: React.FC<ShowAverageProps> = ({ product, size = 'large', color = 'orangered' }) => {
  const { ratings } = product || {};

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '18px';
      case 'medium':
        return '25px';
      case 'large':
        return '40px';
      default:
        return '25px'; // Default to medium size
    }
  };

  const calculateAverage = () => {
    if (ratings && ratings.length > 0) {
      const total = ratings.reduce((acc: any, rating: any) => acc + (rating.star || 0), 0);
      const length = ratings.length;
      const highest = length * 5;
      return (total * 5) / highest;
    }
    return 0;
  };

  const averageRating = calculateAverage();

  return (
    <div className="a-averageRating">
      {averageRating ? (
        <>
          <Rate disabled allowHalf value={averageRating} style={{ fontSize: getFontSize(), color: color }} />
          <span style={{ marginLeft: '5px' }}>{`(${ratings?.length})`}</span>
        </>
      ) : (
        'No rating yet'
      )}
    </div>
  );
};

export default ShowAverage;
