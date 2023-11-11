import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@/pages/App';
import { customTheme } from './Theme';
import './styles/index.scss';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <ConfigProvider theme={customTheme}>
        <App />
      </ConfigProvider>
    </Router>
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById('root')
);
