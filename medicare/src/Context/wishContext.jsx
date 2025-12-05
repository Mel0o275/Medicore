// wishContext.js
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const WishContext = createContext();

const API = import.meta.env.VITE_API_URL;

export default function WishProvider({ children }) {
    const [count, setCount] = useState(0);
    const [wishItems, setWishItems] = useState([]);
    const [likedItems, setLikedItems] = useState(() => {
        const stored = localStorage.getItem("likedItems");
        return stored ? JSON.parse(stored) : [];
    });

    const token = localStorage.getItem("token");

    const getUserWish = async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${API}/wish`, {
                headers: { Authorization: token }
            });

            const res = data.products || [];
            setWishItems(res);

            const sum = res.reduce((acc, item) => acc + item.count, 0);
            setCount(sum);

            const ids = res.map(item => item._id);
            setLikedItems(ids);
            localStorage.setItem("likedItems", JSON.stringify(ids));
        } catch (err) {
            console.error(err);
        }
    };

    const toggleLike = async (id) => {
        if (!token) return;

        const isLiked = likedItems.includes(id);
        setLikedItems(prev => {
            const updated = isLiked ? prev.filter(itemId => itemId !== id) : [...prev, id];
            localStorage.setItem("likedItems", JSON.stringify(updated));
            return updated;
        });

        setCount(prev => isLiked ? prev - 1 : prev + 1);

        try {
            if (!isLiked) {
                await axios.post(`${API}/wish`, { _id: id }, { headers: { Authorization: token } });
            } else {
                await axios.delete(`${API}/wish/${id}`, { headers: { Authorization: token } });
            }
        } catch (err) {
            console.error(err);
            setLikedItems(prev => {
                const reverted = isLiked ? [...prev, id] : prev.filter(itemId => itemId !== id);
                localStorage.setItem("likedItems", JSON.stringify(reverted));
                return reverted;
            });
            setCount(prev => isLiked ? prev + 1 : prev - 1);
        }
    };

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
                likedItems,
                setLikedItems,
                toggleLike,
                getUserWish
            }}
        >
            {children}
        </WishContext.Provider>
    );
}
