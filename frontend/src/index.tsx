import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import App from 'pages/App';
import { customTheme } from './Theme';
import './styles/index.scss';

ReactDOM.render(
  <Router>
    <ConfigProvider theme={customTheme}>
      <App />
    </ConfigProvider>
  </Router>,
  document.getElementById('root')
);
