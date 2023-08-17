import { useEffect } from "react";
import { useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../Services/api";
import { toast } from "react-toastify"

export const HomePage = () => {
   const storedCartList = localStorage.getItem("@KenzieBurguer:cartList");

   const [productList, ListProducts] = useState([]);
   const [cartList, setCartList] = useState(storedCartList !== null ? JSON.parse(storedCartList) : []);
   const [setLoading, Loading] = useState(false);
   const [isCartModalOpen, setIsCartModalOpen] = useState(false);
   const [search, setSearch] = useState("");

   const cartListLength = cartList.length;
   const products = productList;

   useEffect(() => {
      const callProducts = async () => {
         try {
            Loading(true);
            const { data } = await api.get("/products");
            const ListaDeProdutos = data.map(product => ({ ...product, quantity: 1 }));
            ListProducts(ListaDeProdutos);
         } catch (error) {
            toast("erro.");
         }
      }
      callProducts();
   }, []);

   useEffect(() => {
      localStorage.setItem("@KenzieBurguer:cartList", JSON.stringify(cartList));
   }, [cartList]);

   const addToCart = (productSelected) => {
      const productInCart = cartList.find(product => product.id === productSelected.id);
      if (!productInCart) {
         productSelected.quantity = 1;
         setCartList([...cartList, productSelected]);
         toast.success("Item adicionado ao carrinho");
      } else {
         const modifiedCartList = cartList.map((product) => {
            if (product.id === productSelected.id) {
               return {
                  ...product,
                  quantity: product.quantity + 1
               };
            }
            return product;
         });
         setCartList(modifiedCartList);
      }
   }

   const decrementProductQuantity = (productSelected) => {
      if (productSelected.quantity > 1) {
         const modifiedCartList = cartList.map((product) => {
            if (product.id === productSelected.id) {
               return {
                  ...product,
                  quantity: product.quantity - 1
               };
            }
            return product;
         });
         setCartList(modifiedCartList);
      }
   }

   const removeProduct = (productSelectedId) => {
      const updatedCartList = cartList.filter(product => product.id !== productSelectedId);
      setCartList(updatedCartList);
      toast.success("Produto removido.");
   }

   const removeAll = () => {
      if (cartList.length === 0) {
         toast.warn("Sem produtos adicionados.");
      } else {
         setCartList([]);
         toast.success("Todos os produtos foram removidos.");
      }
   }

   return (
      <>
         <Header cartListLength={cartListLength} setSearch={setSearch} setIsCartModalOpen={setIsCartModalOpen} />
         <main>
            <ProductList products={products} addProduct={addToCart}
            />
            {isCartModalOpen
               ? <CartModal
                  decrementProductQuantity={decrementProductQuantity}
                  addToCart={addToCart}
                  setCartList={setCartList}
                  cartList={cartList}
                  removeAll={removeAll}
                  removeProduct={removeProduct}
                  setIsCartModalOpen={setIsCartModalOpen}
               />
               : null}
         </main>
      </>
   );
};
