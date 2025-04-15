import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux';
import { store } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './index.css'

import App from './App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
       <App />
    </Provider>
  </StrictMode>,
)
