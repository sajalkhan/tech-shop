// .storybook/preview.js
import { ConfigProvider } from 'antd';

import '../src/styles/index.scss';
import { customTheme } from '../src/Theme';

export const decorators = [
  Story => (
    <ConfigProvider theme={customTheme}>
      <Story />
    </ConfigProvider>
  ),
];
