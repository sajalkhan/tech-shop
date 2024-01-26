import { Modal } from 'antd';
import React, { useState } from 'react';
import { ROUTES } from '@/routes/constant';
import { useNavigate } from 'react-router-dom';
import { StarOutlined } from '@ant-design/icons';

interface IRatingModal {
  user: any;
  children: React.ReactNode;
  handleSubmit: () => void;
}

const RatingModal: React.FC<IRatingModal> = ({ children, user, handleSubmit }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    user?.token ? setModalVisible(true) : navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined /> <br />
        {user.token ? 'Leave rating' : 'Login to leave rating'}
      </div>

      <Modal
        centered
        title="Leave your rating"
        open={modalVisible}
        onOk={() => {
          handleSubmit();
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
