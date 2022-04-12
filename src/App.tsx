import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@/redux';
import Pages from '@/routes';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import './style/main.scss';

import 'antd/dist/antd.css';
function App() {
  return (
    <div className="App" style={{overflow: 'hidden'}}>
      <Provider store={store}>
        <Router>
          <Header />
          <div style={{flex: 1, minHeight: '80vh'}}>
            <Pages />
          </div>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
