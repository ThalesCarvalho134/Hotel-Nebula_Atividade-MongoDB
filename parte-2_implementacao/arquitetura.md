\# Parte 2: Implementação e Padrões de Tipagem BSON (Hotel Nebula)



\## 1. Visão Geral da Implementação

Nesta etapa, o modelo conceitual desenvolvido na Parte 1 foi efetivamente implementado no banco de dados NoSQL utilizando o \*\*MongoDB\*\* e gerenciado através do \*\*MongoDB Compass\*\*. O foco principal foi garantir a integridade referencial entre as entidades, a flexibilidade estrutural típica de bancos orientados a documentos e a precisão estrita de tipos de dados (BSON Types).



\## 2. Padronização de Tipos de Dados (BSON)

Para evitar problemas comuns de tipagem em aplicações reais e garantir cálculos financeiros e temporais corretos, adotamos a seguinte convenção de tipos em todas as coleções do Hotel Nebula:



\- \*\*Identificadores (`\_id` e chaves estrangeiras):\*\* Utilização estrita do tipo \*\*`ObjectId`\*\* gerado pelo nativo do MongoDB. Isso garante unicidade global e permite o relacionamento limpo entre coleções (`hospedes`, `quartos`, `reservas`, `hospedagens` e `avaliacoes`).

\- \*\*Valores Monetários (`preco\_diaria`, `valor\_total\_estimado`, `valor\_pago`):\*\* Utilização do tipo \*\*`Decimal128`\*\*. Evita os clássicos erros de arredondamento de ponto flutuante (Float/Double) em transações financeiras e faturamento de hospedagens.

\- \*\*Identificadores Numéricos e Quantidades (`numero` de quarto, `capacidade`, `quantidade`):\*\* Padronizados como \*\*`Int32`\*\* para manter a integridade de contadores e numeração lógica.

\- \*\*Datas e Horários (`data\_cadastro`, `criada\_em`, `data\_checkin\_real`):\*\* Armazenadas no formato padrão \*\*`ISODate`\*\* (`Date`), permitindo consultas baseadas em intervalos temporais, relatórios de ocupação e ordenação cronológica precisa.

\- \*\*Textos e Atributos Gerais (`nome`, `email`, `status`, `tipo`):\*\* Utilização de \*\*`String`\*\*.

\- \*\*Listas e Agrupamentos Complexos:\*\* Uso de \*\*`Array`\*\* para listas flexíveis (como `caracteristicas` dos quartos ou `servicos\_consumidos` na hospedagem) e \*\*`Object`\*\* para subdocumentos estruturados (como `endereco` do hóspede e dados de `pagamento`).



\## 3. Organização do Repositório de Dados

Os dados populados e testados no ambiente local foram exportados para a pasta \*\*`dados-exportados/`\*\*, contendo os arquivos JSON correspondentes a cada coleção do sistema:

\- `hospedes.json`

\- `quartos.json`

\- `reservas.json`

\- `hospedagens.json`

\- `avaliacoes.json`



\## 4. Justificativa de Flexibilidade (Schema-less)

Durante a implementação, demonstrou-se a vantagem do modelo NoSQL ao inserir campos opcionais e específicos em documentos pontuais sem quebrar a estrutura geral da coleção — como o campo `empresa` e `programa\_fidelidade` em hóspedes específicos, e o array `servicos\_inclusos` em categorias superiores de quartos.

