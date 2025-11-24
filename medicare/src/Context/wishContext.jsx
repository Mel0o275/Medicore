// wishContext
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const WishContext = createContext();

const API = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function WishProvider({ children }) {
    const [count, setCount] = useState(0);
    const [wishItems, setWishItems] = useState([]);
    const [likedItems, setLikedItems] = useState(() => {
        const stored = localStorage.getItem("likedItems");
        return stored ? JSON.parse(stored) : [];
    });

    async function getUserWish() {
        try {
            const { data } = await axios.get(`${API}/wish`, {
                headers: { Authorization: token }
            });

            const res = data.products || [];
            setWishItems(res);

            let sum = 0;
            res.forEach(item => sum += item.count);
            setCount(sum);
            const ids = res.map(item => item._id);
            setLikedItems(ids);
            localStorage.setItem("likedItems", JSON.stringify(ids));

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
    
            setLikedItems(prev => {
                const updated = prev.filter(itemId => itemId !== id);
                localStorage.setItem("likedItems", JSON.stringify(updated));
                return updated;
            });
    
        } catch (err) {
            console.error(err);
        }
    }
    

    function toggleLike(id) {
        setLikedItems(prev => {
            let updated;
            if (prev.includes(id)) {
                updated = prev.filter(itemId => itemId !== id);
            } else {
                updated = [...prev, id];
            }
            localStorage.setItem("likedItems", JSON.stringify(updated));
            return updated;
        });
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
                likedItems,
                setLikedItems,
                toggleLike,
                getUserWish,
                deleteItem
            }}
        >
            {children}
        </WishContext.Provider>
    );
}
