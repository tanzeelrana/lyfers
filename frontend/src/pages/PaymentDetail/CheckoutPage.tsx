import PayPalCheckoutButton from './PayPalCheckoutButton';

const CheckoutPage = () => {
  return (
    <div>
      <h1>Checkout</h1>
      {/* Other checkout details like cart items, total price */}
      
      <h2>Payment</h2>
      <PayPalCheckoutButton />
    </div>
  );
};

export default CheckoutPage;
