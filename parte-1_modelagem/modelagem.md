\# Parte 1: Origem do Sistema — Modelagem NoSQL (Hotel Nebula)



\## 1. Visão Geral e Núcleos de Informação

Para organizar os dados dispersos do Hotel Nebula em um banco de dados não relacional (MongoDB), foram definidas \*\*5 coleções principais\*\*:

\- \*\*`hospedes`\*\*: Cadastro de clientes e seus dados de contato e endereço.

\- \*\*`quartos`\*\*: Inventário de acomodações, diárias, capacidade e comodidades.

\- \*\*`reservas`\*\*: Agendamentos prévios vinculando hóspedes e quartos.

\- \*\*`hospedagens`\*\*: Registro da estadia ativa ou concluída, incluindo consumo interno e pagamentos.

\- \*\*`avaliacoes`\*\*: Feedbacks e notas deixadas pelos clientes após a estadia.



\## 2. Decisões de Modelagem e Justificativas



\- \*\*Reserva (Hóspede e Quarto embutidos ou referenciados?):\*\*

&#x20; Adotamos o \*\*modelo híbrido\*\*. Guardamos os `ObjectId` de referência (`hospede.id` e `quarto.id`) para manter a integridade, mas embutimos dados essenciais (`nome`, `telefone`, `numero`, `tipo`) dentro da reserva. Isso evita consultas complexas (`$lookup`) na recepção durante o check-in.

\- \*\*Avaliações (Dentro do quarto ou coleção própria?):\*\*

&#x20; Ficam em uma \*\*coleção própria (`avaliacoes`)\*\*. Como um quarto recebe centenas de avaliações ao longo dos anos, embuti-las dentro do documento do quarto faria o registro crescer indefinidamente, correndo o risco de atingir o limite de 16MB por documento do MongoDB.

\- \*\*Serviços Consumidos (Dentro da hospedagem?):\*\*

&#x20; Ficam \*\*embutidos (`embedded`)\*\* em um array (`servicos\_consumidos`) dentro da coleção `hospedagens`. Como esses consumos (frigobar, room service, lavanderia) pertencem exclusivamente àquela estadia e têm quantidade limitada, mantê-los juntos facilita o fechamento da conta no check-out.

\- \*\*Histórico e Flexibilidade:\*\*

&#x20; O uso de arrays e subdocumentos permite registrar novos serviços ou características de quartos sem precisar alterar o esquema do banco (schema-less).



\## 3. Esquema Inicial e Tipagem das Coleções

\- \*\*Identificadores (`\_id` e referências):\*\* `ObjectId`

\- \*\*Textos gerais (`nome`, `email`, `status`, `tipo`):\*\* `String`

\- \*\*Valores inteiros (`numero`, `capacidade`, `quantidade`, `nota`):\*\* `Int32`

\- \*\*Valores monetários (`preco\_diaria`, `valor\_total`, `valor\_unitario`):\*\* `Decimal128` (para precisão financeira exata)

\- \*\*Datas e horários (`data\_cadastro`, `criada\_em`, `data\_checkin\_real`):\*\* `Date`

\- \*\*Listas e agrupamentos:\*\* `Array` (ex: `caracteristicas`) e `Object` (ex: `endereco`, `pagamento`).

