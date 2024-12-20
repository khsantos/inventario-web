import { db } from "../db.js";

export const insertItensOrdersS = (
  produtoNome,
  data_adicao,
  produtoValor,
  produtoId,
  pedidoId
) => {
  try {
    const sql =
      "INSERT INTO itens_order (produtoNome, data_adicao, produtoValor, produtoId, pedidoId) VALUES (?, ?, ?, ?, ?)";
    db.prepare(sql).run(
      produtoNome,
      data_adicao,
      produtoValor,
      produtoId,
      pedidoId
    );

    updateValueOrderS(pedidoId);

    return true;
  } catch (error) {
    console.log("Erro ao inserir item do pedido:", error.message);
    return false;
  }
};

export const listItensOrdersS = (pedidoId) => {
  try {
    const sql = `
            SELECT 
                i.id,
                i.produtoId,
                i.pedidoId,
                p.nome AS produtoNome,
                p.preco AS produtoValor,
                i.data_adicao AS data_adicao
            FROM itens_order i
            JOIN product p ON i.produtoId = p.id
            JOIN orders o ON i.pedidoId = o.id
            WHERE i.pedidoId = ?
        `;
    const itensOrders = db.prepare(sql).all(pedidoId);
    return itensOrders;
  } catch (error) {
    console.error("Erro ao listar itens de pedido:", error);
    throw new Error("Erro ao listar itens de pedido");
  }
};

export const deleteItensOrdersS = (id) => {
  try {
    const getPedidoIdSql = `SELECT pedidoId FROM itens_order WHERE id = ?`;
    const result = db.prepare(getPedidoIdSql).get(id);

    if (!result) {
      console.log("Item não encontrado para exclusão");
      return false;
    }

    const { pedidoId } = result;

    const sql = "DELETE FROM itens_order WHERE id = ?";
    db.prepare(sql).run(id);

    updateValueOrderS(pedidoId);

    return true;
  } catch (error) {
    console.log("Erro ao deletar item de pedido:", error.message);
    return false;
  }
};

export const deleteAllItensOrders = (pedidoId) => {
  try {
    const sql = "DELETE FROM itens_order WHERE pedidoId = ?";
    db.prepare(sql).run(pedidoId);
    return true;
  } catch (error) {
    console.error("Erro ao deletar todos os itens do pedido:", error.message);
    return false;
  }
};

export const updateValueOrderS = (pedidoId) => {
  try {
    const sql = `
            SELECT SUM(produtoValor) AS total
            FROM itens_order
            WHERE pedidoId = ?
        `;

    const result = db.prepare(sql).get(pedidoId);
    const totalPedido = result ? result.total : 0;

    const updateSql = `
            UPDATE orders
            SET total = ?
            WHERE id = ?
        `;
    db.prepare(updateSql).run(totalPedido, pedidoId);

    return totalPedido;
  } catch (error) {
    console.error("Erro ao atualizar valor do pedido:", error.message);
    throw new Error("Erro ao atualizar valor do pedido");
  }
};
