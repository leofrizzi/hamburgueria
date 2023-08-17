import { MdDelete } from "react-icons/md";
import styles from "./styles.module.scss";

export const CartItemCard = ({ product, removeProduct, addToCart, decrementProductQuantity }) => {
   return (
      <li className={styles.Li}>
         <div className={styles.DivLi}>
            <img src={product.img} alt={product.name} />
            <div className={styles.Div2Li}>
               <h3 className={styles.H3}>{product.name}</h3>
               <div className={styles.Div3Li}>
                  <button className={styles.ButtonDiv3Li} onClick={() => decrementProductQuantity(product)}>-</button>
                  <span className={styles.Span}>{product.quantity}</span>
                  <button className={styles.ButtonDiv3Li} onClick={() => addToCart(product)}>+</button>
               </div>
            </div>
         </div>
         <button className={styles.ButtonRemover} aria-label="delete" title="Remover item">
            <MdDelete size={21} onClick={() => removeProduct(product.id)} />
         </button>
      </li>
   );
};
