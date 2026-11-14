// ============================================================================
// PROJETO HOTEL NEBULA - PARTE 3: CONSULTAS E OPERAÇÕES NO MONGODB
// ============================================================================

// Garante que estamos utilizando o banco de dados correto
use('hotel_nebula');

// ----------------------------------------------------------------------------
// 1. FILTRO SIMPLES (Recepção)
// Objetivo: Listar todos os quartos atualmente disponíveis para check-in imediato.
// ----------------------------------------------------------------------------
db.quartos.find(
  { status: "disponivel" },
  { numero: 1, tipo: 1, preco_diaria: 1, capacidade: 1, _id: 0 }
);


// ----------------------------------------------------------------------------
// 2. FILTRO EM ARRAY + OPERADOR DE COMPARAÇÃO NUMÉRICA (Decimal128)
// Objetivo: Buscar quartos disponíveis que possuam "banheira" nas características
// e tenham valor de diária menor ou igual a R$ 500,00.
// ----------------------------------------------------------------------------
db.quartos.find({
  status: "disponivel",
  caracteristicas: "banheira",
  preco_diaria: { $lte: NumberDecimal("500.00") }
});


// ----------------------------------------------------------------------------
// 3. CONSULTA EM SUBDOCUMENTOS ANINHADOS (Dot Notation)
// Objetivo: Buscar todas as reservas realizadas pelo hóspede "Rafael Mendes"
// utilizando a notação de ponto para acessar o objeto embutido 'hospede'.
// ----------------------------------------------------------------------------
db.reservas.find({
  "hospede.nome": "Rafael Mendes"
});


// ----------------------------------------------------------------------------
// 4. AGREGAÇÃO FINANCEIRA ($group)
// Objetivo: Calcular o faturamento estimado total e a quantidade de reservas
// agrupados por status (confirmada, em_andamento, concluida, cancelada).
// ----------------------------------------------------------------------------
db.reservas.aggregate([
  {
    $group: {
      _id: "$status_reserva",
      total_reservas: { $sum: 1 },
      faturamento_estimado: { $sum: "$valor_total_estimado" }
    }
  },
  {
    $sort: { faturamento_estimado: -1 }
  }
]);


// ----------------------------------------------------------------------------
// 5. RELATÓRIO GERENCIAL COM JUNÇÃO ENTRE COLEÇÕES ($lookup)
// Objetivo: Cruzar as hospedagens ativas com os dados cadastrais completos
// dos hóspedes na coleção 'hospedes' para gerar o relatório de ocupação atual.
// ----------------------------------------------------------------------------
db.hospedagens.aggregate([
  {
    $match: { status: "ativa" }
  },
  {
    $lookup: {
      from: "hospedes",
      localField: "hospede_id",
      foreignField: "_id",
      as: "dados_hospede"
    }
  },
  {
    $unwind: "$dados_hospede"
  },
  {
    $project: {
      _id: 0,
      quarto: "$quarto_numero",
      hospede: "$dados_hospede.nome",
      telefone: "$dados_hospede.telefone",
      cidade_origem: "$dados_hospede.endereco.cidade",
      checkin_realizado: "$data_checkin_real",
      total_servicos_consumidos: { $size: "$servicos_consumidos" }
    }
  }
]);


// ----------------------------------------------------------------------------
// 6. ATUALIZAÇÃO DE DOCUMENTO E ARRAY ($push)
// Objetivo: Registrar um novo consumo de frigobar na hospedagem ativa da
// Suíte Presidencial (Quarto 501) sem sobrescrever os itens anteriores.
// ----------------------------------------------------------------------------
db.hospedagens.updateOne(
  { quarto_numero: 501, status: "ativa" },
  {
    $push: {
      servicos_consumidos: {
        servico: "Frigobar",
        item: "Suco de Laranja Natural",
        quantidade: Int32(1),
        valor_unitario: NumberDecimal("14.00"),
        data: new Date()
      }
    }
  }
);