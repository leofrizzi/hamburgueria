import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import styles from "./styles.module.scss";
import "../../styles/globalStyles.scss";
import { MdSearch, MdShoppingCart } from "react-icons/md";



export const Header = ({ setIsCartModalOpen, setSearch, cartListLength }) => {
   const [value, setValue] = useState("");

   const submit = (event) => {
      event.preventDefault();
      setSearch(value);
      setValue("");
   }

   return (
      <header className={styles.Header}>
         <img src={Logo} alt="Logo Kenzie Burguer" />
         <div className={styles.DivHeader}>
            <button className={styles.ButtonModal} onClick={() => setIsCartModalOpen(true)}>
               <MdShoppingCart className={styles.svg1} size={21} />
               <span className={styles.Span}>{cartListLength}</span>
            </button>
            </div>
            <form className={styles.Form} onSubmit={submit}>
               <input className={styles.Input}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Digitar Pesquisa"
               />
               <button className={styles.ButtonSearch} type="submit">
                  <MdSearch size={21} />
               </button>
            </form>
      </header>
   );
};
