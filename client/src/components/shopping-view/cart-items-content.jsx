import { Minus, Plus, Trash } from "lucide-react";

function UserCartItemsContent({ cartItems }) {
  return (
    <div className="flex items-center space-x-4 ml-5">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end ">
        <p className="font-semibold">${((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}</p>
        <Trash className="cursor-pointer mt-1 " size={20} />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
