import styles from "./styles.module.scss";

export const ProductCard = ({ product, addProduct }) => {
    return (
        <li className={styles.Li}>
            <img className={styles.Img} src={product.img} alt={product.name} />
            <div className={styles.DivLi}>
                <h3 className={styles.H3}>{product.name}</h3>
                <span className={styles.Span1}>{product.category}</span>
                <span className={styles.Span2}>{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                <button className={styles.ButtonAdicionar} onClick={() => addProduct(product)}>Adicionar</button>
            </div>
        </li>
    )
}