import { useShoppingCart } from "use-shopping-cart";

const CheckoutBtn = () => {
  const handleCheckout = async () =>{
    try{
      const res = await redirectToCheckout()
      if(res?.error){
        console.log(res)
      }
    }catch (error){
      console.log(error)
    }
  };
  const { redirectToCheckout } = useShoppingCart();

  return (
    <button className="flex w-full bg-primary/95 text-white justify-center  items-center rounded-full h-14 " onClick={handleCheckout}>
      <div className="flex bg-primary"></div>
      <div className="items-center justify-center">Proceed to checkout</div>
    </button>
  );
};

export default CheckoutBtn;
