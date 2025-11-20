// wishContext
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const WishContext = createContext();

const API = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function WishProvider({ children }) {
    const [count, setCount] = useState(0);
    const [wishItems, setWishItems] = useState([]);

    async function getUserWish() {
        try {
            const { data } = await axios.get(`${API}/wish`, {
                headers: {
                    Authorization: token
                }
            });

            const res = data.products || [];
            setWishItems(res);
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
            await axios.delete(`${API}/wish/${id}`, {
                headers: { Authorization: token }
            });
            await getUserWish();

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUserWish();
    }, []);

    return (
        <WishContext.Provider 
            value={{
                count,
                setCount,
                wishItems,
                setWishItems,
                getUserWish,
                deleteItem
            }}
        >
            {children}
        </WishContext.Provider>
    );
}
