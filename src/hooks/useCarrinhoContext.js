import { useContext } from "react";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(
      (produto) => produto.id === novoProduto.id
    );

    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((produto) => {
        if (produto.id === novoProduto.id) produto.quantidade++;
        return produto;
      })
    );
  }

  function removerProduto(id) {
    const produto = carrinho.find((produto) => produto.id === id);
    const ehOUltimo = produto.quantidade === 1;

    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((produto) => produto.id !== id)
      );
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((produto) => {
        if (produto.id === id) produto.quantidade--;
        return produto;
      })
    );
  }

  return { carrinho, setCarrinho, adicionarProduto, removerProduto };
};
