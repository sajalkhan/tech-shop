import { useState, useEffect } from 'react';
import { Rule } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, UploadFile, message } from 'antd';
import { nameRules, emailRules, passwordRules, confirmRules } from './validation-rules';

type RegisterFrom = {
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
};

const RegistrationForm = ({ onSubmit, isGetResponse }: RegisterFrom) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (isGetResponse) {
      form.resetFields();
      setFileList([]);
    }
  }, [form, isGetResponse]);

  const beforeUpload = (file: any) => {
    if (file.size > 400 * 1024) {
      message.error('File size must be less than 400KB');
      return false;
    }

    setFileList([file]);
    return false; // Prevent default upload behavior
  };

  const handleImageChange = ({ file, fileList }: { file: any; fileList: UploadFile[] }) => {
    if (file.size > 400 * 1024) return;
    setFileList(fileList);
  };

  const onFinish = (value: any) => {
    delete value.confirm;
    const avatarImage = fileList[0]?.thumbUrl || '';
    onSubmit({ avatarImage, ...value });
  };

  return (
    <div className="registrationForm-wrapper">
      <div className="registration-text">
        <h2>Register Now</h2>
        <p>Enhance your tech adventure with our premium accessories</p>
      </div>

      <Form form={form} labelCol={{ span: 7 }} onFinish={onFinish}>
        <Form.Item label="name" name="username" rules={nameRules}>
          <Input placeholder="Please Enter name" />
        </Form.Item>

        <Form.Item label="email" name="email" rules={emailRules as Rule[]}>
          <Input placeholder="Please Enter email" />
        </Form.Item>

        <Form.Item label="password" name="password" rules={passwordRules}>
          <Input.Password placeholder="Please enter password" />
        </Form.Item>

        <Form.Item label="confirm" name="confirm" rules={confirmRules}>
          <Input.Password placeholder="Please enter confirm password" />
        </Form.Item>

        <Form.Item>
          <Upload.Dragger
            listType="picture"
            accept=".png,.jpeg,.jpg"
            iconRender={() => <UploadOutlined style={{ fontSize: 50 }} rev={undefined} />}
            progress={{
              size: 3,
              strokeColor: {
                '0%': '#f0f',
                '100%': '#ff0',
              },
              style: { top: 12 },
            }}
            beforeUpload={beforeUpload}
            onChange={handleImageChange}
            fileList={fileList}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined rev={undefined} style={{ fontSize: 30 }} />
            </p>
            <p className="ant-upload-text" style={{ fontSize: 14 }}>
              Upload Profile Picture
            </p>
            <p className="ant-upload-hint" style={{ fontSize: 12 }}>
              Support for PNG, JPEG, and JPG files
            </p>
          </Upload.Dragger>
        </Form.Item>

        <div className="regBtn-wrapper">
          <Button type="primary" htmlType="submit" size="large" className="regBtn-wrapper__submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;
