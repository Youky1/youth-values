import React from 'react';
import {HashRouter as Router, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@/store';
import renderRoutes from '@/routes';
import routes from '@/routes/routes';
import Header from '@/layout/header';
import Footer from '@/layout/footer';

import 'antd/dist/antd.css';
function App() {
  return (
    <div
      className="App"
      style={{height: '100vh', display: 'flex', flexDirection: 'column'}}
    >
      <Provider store={store}>
        <Router>
          <Header />
          <div style={{flex: 1}}>
            <Routes>{renderRoutes(routes)}</Routes>
          </div>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
