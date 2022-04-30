import {Spin} from 'antd';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {failTip} from '../util';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

// 当前正在请求的数量
let requestCount = 0;

// 显示loading
const showLoading = () => {
  if (requestCount === 0) {
    const dom = document.createElement('div');
    dom.setAttribute('id', 'loading');
    document.body.appendChild(dom);
    ReactDOM.render(<Spin tip="加载中..." size="large" />, dom);
  }
  requestCount++;
};

// 隐藏loading
const hideLoading = () => {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading') as Node);
  }
};

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading();
    return config;
  },
  error => {
    failTip(error);
    hideLoading();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    hideLoading();
    if (response.data.status) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data.msg);
    }
  },
  error => {
    hideLoading();
    failTip(error);
    return Promise.reject(error);
  }
);

export default instance;
