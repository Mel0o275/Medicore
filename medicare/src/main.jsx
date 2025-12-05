import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider, { CartContext } from './Context/cartContext.jsx'
import WishProvider from './Context/wishContext.jsx'




createRoot(document.getElementById('root')).render(

   <WishProvider>
    <CartProvider>
    <App />
    </CartProvider>
   </WishProvider>
    

)
