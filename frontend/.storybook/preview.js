// .storybook/preview.js
import { ConfigProvider } from 'antd';

import '../src/styles/index.scss';
import { customTheme } from '../src/Theme';
import { BrowserRouter } from 'react-router-dom';

export const decorators = [
  Story => (
    <ConfigProvider theme={customTheme}>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </ConfigProvider>
  ),
];
