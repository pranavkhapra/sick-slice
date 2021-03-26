import React, { useState } from 'react';

// Creating a order context
const OrderContext = React.createContext();

/// we need to stuck the state in the provider
export function OrderProvider({ children }) {
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
