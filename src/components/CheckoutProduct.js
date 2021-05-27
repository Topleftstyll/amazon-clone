import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../slices/basketSlice'

const CheckoutProduct = ({ id, title, price, description, category, image, hasPrime, rating }) => {
    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));
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

            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button onClick={() => removeItemFromBasket()} className="button">Remove From Basket</button>
            </div>
        </div>
    );
};

export default CheckoutProduct
