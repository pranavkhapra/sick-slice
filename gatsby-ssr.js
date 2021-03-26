/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element, props }) => (
  <OrderProvider>{element}</OrderProvider>
);
