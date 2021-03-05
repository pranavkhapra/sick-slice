/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Layout from './src/components/Layout';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
