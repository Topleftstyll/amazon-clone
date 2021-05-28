import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { removeFromBasket, addQuantity, minusQuantity } from '../slices/basketSlice'

const CheckoutProduct = ({ id, title, price, description, category, image, hasPrime, rating, quantity }) => {
    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));
    }

    const increaseQuantity = () => {
        dispatch(addQuantity({ id }));
    }

    const decreaseQuantity = () => {
        if(quantity === 1) {
            alert('Quantity cant be lower than 1. Please remove item if needed.');
        } else {
            dispatch(minusQuantity({ id }));
        }
    }

    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain"/>

            <div className="col-span-3 mx-5">
                <p className="line-clamp-1 md:line-clamp-none">{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                </div>

                <p className="line-clamp-2 text-xs my-2 md:line-clamp-3">{description}</p>
                <Currency quantity={price} currency="CAD" />

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img className="w-12" loading="lazy" src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500">Free Next-day Delivery</p>
                    </div>
                    
                )}
            </div>
            
            {/* MD Screen size and bigger Button Layout */}
            <div className="hidden md:flex flex-col space-y-2 my-auto justify-self-end">
                <div className="text-xs md:text-sm md:flex items-center justify-between">
                    <button onClick={() => decreaseQuantity()} className="button text-xs md:text-sm w-8">-</button>
                    <p> Quantity: {quantity} </p>
                    <button onClick={() => increaseQuantity()} className="button text-xs md:text-sm w-8">+</button>
                </div>
                <button onClick={() => removeItemFromBasket()} className="button">Remove From Basket</button>
            </div>

            {/* Mobile Button Layout */}
            <div className="flex md:hidden flex-col space-y-2 my-auto justify-self-end">
                <div className="items-center justify-between">
                    <div className="flex">
                        <button onClick={() => decreaseQuantity()} className="button text-xs w-3/6">-</button>
                        <button onClick={() => increaseQuantity()} className="button text-xs w-3/6">+</button>
                    </div>
                </div>
                <p className="text-xs"> Quantity: {quantity} </p>
                <button onClick={() => removeItemFromBasket()} className="button">Remove From Basket</button>
            </div>
        </div>
    );
};

export default CheckoutProduct
