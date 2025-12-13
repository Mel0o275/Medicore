// wishContext.js
import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const WishContext = createContext();

const API = import.meta.env.VITE_API_URL;

export default function WishProvider({ children }) {
    const [count, setCount] = useState(0);
    const [wishItems, setWishItems] = useState([]);
    const [likedItems, setLikedItems] = useState([]);

    const token = localStorage.getItem("token");

    const getUserWish = async () => {
        if (!token) {
            setWishItems([]);
            setLikedItems([]);
            setCount(0);
            return;
        }

        try {
            const { data } = await axios.get(`${API}/wish`, {
                headers: { Authorization: token }
            });

            const products = data.products || [];

            setWishItems(products);
            setLikedItems(products.map(item => item._id || item.product_id));
            setCount(products.length);
        } catch (err) {
            console.error(err);
            setWishItems([]);
            setLikedItems([]);
            setCount(0);
        }
    };

    const toggleLike = async (id) => {
        if (!token) return;

        const isLiked = likedItems.includes(id);

        setLikedItems(prev =>
            isLiked ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
        setCount(prev => (isLiked ? prev - 1 : prev + 1));

        if (isLiked) {
            setWishItems(prev => prev.filter(item => {
                const itemId = item._id || item.product_id;
                return itemId !== id;
            }));
        }

        try {
            if (!isLiked) {
                await axios.post(
                    `${API}/wish`,
                    { _id: id },
                    { headers: { Authorization: token } }
                );
                await getUserWish();
            } else {
                await axios.delete(`${API}/wish/${id}`, {
                    headers: { Authorization: token }
                });
            }
        } catch (err) {
            console.error(err);
            setLikedItems(prev =>
                isLiked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
            setCount(prev => (isLiked ? prev + 1 : prev - 1));
            await getUserWish();
        }
    };

    useEffect(() => {
        getUserWish();
    }, [token]);

    return (
        <WishContext.Provider
            value={{
                count,
                wishItems,
                likedItems,
                toggleLike,
                getUserWish
            }}
        >
            {children}
        </WishContext.Provider>
    );
}
