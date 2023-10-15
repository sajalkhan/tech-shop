import { Button, Space } from 'antd';

const Text = () => {
  return (
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button className="default-button">Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
  );
};

export default Text;
