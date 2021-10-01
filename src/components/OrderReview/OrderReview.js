import React from 'react';
import { useHistory } from 'react-router';
import useProducts from '../../Hooks/UseProducts';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../Review Item/ReviewItem';
import useCart from '../UseCart/UseCart';


const OrderReview = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory();

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }
    const handlePlaceOrder = () => {
        history.push('/placeorder');
        setCart([]);
        clearTheCart();
    }
    return (
        <div className="shop-container">
            <div className="product-container">

                {
                    cart.map(product => <ReviewItem
                        product={product}
                        key={product.key}
                        handleRemove={handleRemove}
                    ></ReviewItem>)
                }


            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-regular">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;