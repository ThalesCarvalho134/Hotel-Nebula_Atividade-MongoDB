\#Projeto Hotel Nebula — Banco de Dados NoSQL (MongoDB)



Repositório oficial do projeto \*\*Hotel Nebula\*\*, desenvolvido para demonstrar a modelagem, implementação e consulta de um banco de dados NoSQL orientado a documentos utilizando o \*\*MongoDB\*\* e o \*\*MongoDB Compass\*\*.



\---



\##Estrutura do Repositório



O projeto está dividido em três etapas fundamentais da engenharia de dados:



\- \*\*`parte-1-modelagem/`\*\*: Contém a concepção do modelo conceitual, diagramas e a definição híbrida das coleções (normalização por referências `ObjectId` e denormalização por subdocumentos).

\- \*\*`parte-2-implementacao/`\*\*: Contém o documento de arquitetura e tipagem (`arquitetura.md`) e a pasta \*\*`dados-exportados/`\*\* com os arquivos `.json` populados no MongoDB Compass.

\- \*\*`parte-3-consultas/`\*\*: Contém o script de consultas práticas em MongoDB (`consultas.js`) e a análise detalhada dos resultados gerenciais e operacionais (`resultados-e-analise.md`).



\---



\##Coleções do Sistema

1\. \*\*`hospedes`\*\*: Cadastro de clientes (com suporte a campos dinâmicos como empresa e programa de fidelidade).

2\. \*\*`quartos`\*\*: Inventário de acomodações, preços (`Decimal128`), capacidades (`Int32`) e características (arrays).

3\. \*\*`reservas`\*\*: Agendamentos vinculados a hóspedes e quartos por referências reais e dados embutidos.

4\. \*\*`hospedagens`\*\*: Estadias ativas/concluídas, contendo o array de serviços consumidos (frigobar, room service) e dados de pagamento.

5\. \*\*`avaliacoes`\*\*: Feedback e notas deixadas pelos hóspedes sobre as estadias.



\---



\##Tecnologias e Padrões Utilizados

\- \*\*Banco de Dados\*\*: MongoDB / MongoDB Compass

\- \*\*Tipagem BSON Estrita\*\*: `ObjectId`, `Decimal128` (para valores monetários), `Int32` (para contadores e números) e `ISODate` (para datas).

\- \*\*Linguagem de Consulta\*\*: MongoDB Shell / JavaScript (Aggregations, `$lookup`, `$group`, `$push`).

