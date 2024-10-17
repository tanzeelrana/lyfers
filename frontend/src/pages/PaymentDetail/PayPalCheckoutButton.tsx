import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import baseUrl from '../../config/apiConfig';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the interface for the PayPal onApprove data
interface PayPalOnApproveData {
  orderID: string;
}

const PayPalCheckoutButton: React.FC = () => {
  const [orderID, setOrderID] = useState<string | null>(null);
  // Create order function
  const createOrder = async (): Promise<string> => {
    try {
        const response = await axios.post(`${baseUrl}/api/create-order`);
      const data = await response.data;

      if (!data.id) {
       toast.error("Order ID is missing from the response.");
      }

      setOrderID(data.id);
      return data.id;
    } catch (error) {
      toast.error("Error creating order:", );
      throw error;  
    }
  };

  // On approval function
  const onApprove = async (data: PayPalOnApproveData): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/api/capture-order`, {
        method: 'POST',
        body: JSON.stringify({
          orderID: data.orderID
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      toast.error("Order capture result:", result); 
    } catch (error) {
      toast.error("Error capturing order:");
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: 'AQzhITg9UuWXVNAvZC7a5SHpSULaK_7zs7ShJnhRia4KkxELJrVjDPAPT7PMQOXjQXHv7MFfcNg9HUyC' || "" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: 'vertical', color: 'blue', shape: 'pill', label: 'pay' }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckoutButton;
