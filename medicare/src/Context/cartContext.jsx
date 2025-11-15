import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
//create cartContext
export const CartContext = createContext();

// to check api link
const API = import.meta.env.VITE_API_URL;
console.log(API);

const token = localStorage.getItem("token");

export default function CartProvider({ children }) {
    const [count, setCount] = useState(0);

    async function getUserCart() {
        try {
            //get user data from the cart
            const { data } = await axios.get(`${API}/cart`,{
                headers: {
                    Authorization: token
                }
            });
            console.log(data);
            let res = data.products;

            //if there is no problem then set sum & total
            if (res) {
                console.log(res);
                let sum = 0;

                res.forEach((item) => {
                    sum += item.count;
                });

                setCount(sum);
            }
        } catch (err) {
            console.error(err);
        }
    }

    //for each render of the app
    useEffect(() => {
        getUserCart();
    }, []);

    //provider for children
    return (
        <CartContext.Provider value={{ count, setCount }}>
            {children}
        </CartContext.Provider>
    );
}
