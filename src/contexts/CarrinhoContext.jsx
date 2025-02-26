import { useState, createContext, useMemo, useReducer, useEffect } from "react";
import { carrinhoReducer } from "@/reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const { totalTemp, quantidadeTemp } = useMemo(() => {
    return carrinho.reduce(
      (contador, produto) => ({
        quantidadeTemp: contador.quantidadeTemp + produto.quantidade,
        totalTemp: contador.totalTemp + produto.preco * produto.quantidade,
      }),
      {
        totalTemp: 0,
        quantidadeTemp: 0,
      }
    );
  }, [carrinho]);

  useEffect(() => {
    setQuantidade(quantidadeTemp);
    setValorTotal(totalTemp);
  });

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
