import React from 'react';
import { Card, Skeleton } from 'antd';

interface LoadingCardProps {
  count: number;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ count }) => {
  const cards = () => {
    const totalCards: JSX.Element[] = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card key={i} className="a-loadingCard__card">
          <Skeleton active />
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="a-loadingCard">{cards()}</div>;
};

export default LoadingCard;
