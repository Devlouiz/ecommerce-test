import { Link } from "react-router-dom"
import { AiOutlineShopping } from "react-icons/ai"
import useStates from "../hooks/useStates"
import Cart from "./Cart"

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities} = useStates()
  return (
    <>
    <nav
        className="bg-gray-100 text-black w-full h-16 flex 
        justify-between align-middle items-center px-4"
      >
        <Link to={'/'} className="text-gray-900">
            <h2 className="font-bold text-2xl">LoudKicks</h2>
        </Link>
        <button className="cart-icon" onClick={() => setShowCart(true)}>
            <AiOutlineShopping/>
            <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </nav>
      {showCart && <Cart/>}
    </>
  )
}

export default Navbar