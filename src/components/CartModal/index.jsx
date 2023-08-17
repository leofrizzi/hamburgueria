import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./styles.module.scss";

export const CartModal = ({ cartList, removeProduct, removeAll, setIsCartModalOpen, addToCart, decrementProductQuantity }) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price * product.quantity;
   }, 0);

   const modalReference = useRef(null);
   useEffect(() => {
      const handleOutClick = (event) => {
         if (!modalReference.current?.contains(event.target)) {
            setIsCartModalOpen(false);
         }
      }
      window.addEventListener("mousedown", handleOutClick);
      return () => {
         window.removeEventListener("mousedown", handleOutClick);
      }
   }, []);

   const buttonReference = useRef(null);
   useEffect(() => {
      const handleKeyDown = (event) => {
         if (event.key === "Escape") {
            buttonReference.current?.click();
         }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      }
   })

   return (
      <div className={styles.MainDiv} role="dialog">
         <div className={styles.Div2} ref={modalReference}>
            <div className={styles.Div3}>
               <h2 className={styles.H2}>Carrinho de compras</h2>
               <button className={styles.ButtonFechar} ref={buttonReference} aria-label="close" title="Fechar" onClick={() => setIsCartModalOpen(false)}>
                  <MdClose size={21} />
               </button>
            </div>
            <div className={styles.Div4}>
               <ul className={styles.Ul}>
                  {cartList.map((product) => (
                     <CartItemCard decrementProductQuantity={decrementProductQuantity} addToCart={addToCart} removeProduct={removeProduct} key={product.id} product={product} />
                  ))}
               </ul>
            </div>
            <div className={styles.Div1Span}>
               <div className={styles.Div2Span}>
                  <span className={styles.Span1}>Total</span>
                  <span className={styles.Span2}>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
               </div>
               <button className={styles.ButtonRemover} onClick={() => removeAll()} >Remover todos</button>
            </div>
         </div>
      </div>
   );
};
