import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider, { CartContext } from './Context/cartContext.jsx'




createRoot(document.getElementById('root')).render(

   
    <CartProvider>
    <App />
    </CartProvider>

)
