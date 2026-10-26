import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({cartItems}) {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-2 space-y-4 ">
        {
          cartItems && cartItems.length > 0 ?
          cartItems.map(item => <UserCartItemsContent cartItems={item}/>) : null
        }
      </div>
      <div className="p-5">
        <div className="mt-2 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">$1000</span>
          </div>
        </div>

        <Button className="w-full mt-5">Checkout</Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
