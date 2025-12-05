// cartContext


import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const API = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function CartProvider({ children }) {
    const [count, setCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    async function getUserCart() {
        if (!token) {
            console.log("User not logged in — Skip request");
            setCartItems([]);
            setCount(0);
            return; 
        }
        try {
            const { data } = await axios.get(`${API}/cart`, {
                headers: {
                    Authorization: token
                }
            });

            const res = data.products || [];
            setCartItems(res);
            let sum = 0;
            res.forEach(item => {
                sum += item.count;
            });
            setCount(sum);

        } catch (err) {
            console.error(err);
        }
    }

    async function deleteItem(id) {
        try {
            await axios.delete(`${API}/cart/${id}`, {
                headers: { Authorization: token }
            });
            await getUserCart();

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUserCart();
    }, []);

    return (
        <CartContext.Provider 
            value={{
                count,
                setCount,
                cartItems,
                setCartItems,
                getUserCart,
                deleteItem
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
