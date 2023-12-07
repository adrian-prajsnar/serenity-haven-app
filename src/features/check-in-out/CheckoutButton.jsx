import { useCheckout } from '../check-in-out/useCheckout';

import Button from '../../ui/Button';

function CheckoutButton({ bookingId, width }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
      style={{ width: `${width}` }}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
