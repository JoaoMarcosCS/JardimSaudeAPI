import { Shopping } from "../../../entities/Shopping";
import { shoppingData } from "./data/ShoppingData";

const shoppings = <Shopping[]>[];

for (let i = 0; i < shoppingData.length; i++) {
  const shopping = new Shopping();
  shopping.nome = shoppingData[i].nome;
  shopping.descricao = shoppingData[i].descricao;
  shopping.peso = shoppingData[i].peso;
  shopping.quantidade = shoppingData[i].quantidade;
  shopping.valor_unitario = shoppingData[i].valor_unitario;
  shopping.tipo = shoppingData[i].tipo;
  shopping.codigo = i;

  shoppings.push(shopping);
}

export { shoppings };
