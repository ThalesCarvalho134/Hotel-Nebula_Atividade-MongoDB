\# Parte 3: Resultados, Análise e Consultas Práticas (Hotel Nebula)



\## 1. Visão Geral da Análise

Esta etapa valida a eficácia da modelagem híbrida NoSQL adotada para o \*\*Hotel Nebula\*\* através da execução de consultas reais no MongoDB Compass. O objetivo foi demonstrar como a tipagem estrita BSON (`ObjectId`, `Decimal128`, `Int32`, `ISODate`) e a escolha estratégica entre dados embutidos (denormalização) e referenciados (normalização) suportam consultas operacionais, financeiras e gerenciais.



\---



\## 2. Detalhamento e Análise das Consultas Executadas



\### Consulta 1: Filtro Operacional Simples (Recepção)

\* \*\*Objetivo:\*\* Listar todos os quartos com status `"disponivel"` para atendimento imediato aos clientes no balcão.

\* \*\*Abordagem Técnica:\*\* Utilização de `find()` com projeção de campos específicos para otimizar o tráfego de rede e exibir apenas informações essenciais (número, tipo, preço e capacidade).

\* \*\*Resultado Prático:\*\* Retorna instantaneamente os quartos livres, provando a eficiência dos índices básicos na coleção `quartos`.



\### Consulta 2: Filtro Avançado em Array e Comparação Numérica

\* \*\*Objetivo:\*\* Encontrar quartos disponíveis que possuam `"banheira"` nas características e diária máxima de R$ 500,00.

\* \*\*Abordagem Técnica:\*\* Combinação de operador de igualdade em array multiavulso com o operador de comparação numérica `NumberDecimal` (`$lte`), garantindo precisão estrita em valores financeiros.

\* \*\*Resultado Prático:\*\* Retorna apenas os quartos que cumprem rigorosamente os requisitos de comodidade e teto orçamentário do cliente.



\### Consulta 3: Consulta em Subdocumentos Aninhados (Dot Notation)

\* \*\*Objetivo:\*\* Resgatar o histórico de reservas de um hóspede específico (`"Rafael Mendes"`).

\* \*\*Abordagem Técnica:\*\* Uso de notação de ponto (`"hospede.nome"`) para navegar diretamente nos campos do subdocumento embutido dentro da coleção `reservas`, sem a necessidade de junções complexas.

\* \*\*Resultado Prático:\*\* Demonstra a alta performance do modelo denormalizado para leituras rápidas do perfil de reservas.



\### Consulta 4: Agregação Financeira e Faturamento (`$group`)

\* \*\*Objetivo:\*\* Calcular o faturamento estimado total e a volumetria de reservas segmentadas por status (`confirmada`, `em\_andamento`, `concluida`, `cancelada`).

\* \*\*Abordagem Técnica:\*\* Uso do framework de agregação (`aggregate`) com o estágio `$group`, operando com somatórios em campos do tipo `Decimal128` e ordenação decrescente (`$sort`).

\* \*\*Resultado Prático:\*\* Fornece um panorama gerencial financeiro imediato para a diretoria do hotel, essencial para projeção de receita.



\### Consulta 5: Relatório de Ocupação Cruzada (`$lookup`)

\* \*\*Objetivo:\*\* Gerar um relatório completo cruzando as hospedagens ativas com os cadastros detalhados de hóspedes.

\* \*\*Abordagem Técnica:\*\* Utilização do estágio `$lookup` para simular um "Join" relacional usando os `ObjectId` (`hospede\_id`), seguido de `$unwind` para desenhar o objeto resultante e `$project` para formatar a saída.

\* \*\*Resultado Prático:\*\* Evidencia que, embora o NoSQL favoreça o armazenamento autônomo, a integridade referencial por `ObjectId` permite cruzar dados com precisão absoluta quando necessário.



\### Consulta 6: Mutação de Dados e Manipulação de Arrays (`$push`)

\* \*\*Objetivo:\*\* Registrar dinamicamente um novo consumo de frigobar na hospedagem ativa da Suíte Presidencial (Quarto 501).

\* \*\*Abordagem Técnica:\*\* Operação de atualização atômica `updateOne()` combinada com o operador `$push`, inserindo um novo subdocumento estruturado (`Int32` para quantidade e `Decimal128` para valor unitário) em um array existente.

\* \*\*Resultado Prático:\*\* Atualiza a conta corrente do hóspede em tempo real sem reescrever o documento inteiro, mantendo a performance transacional.



\---



\## 3. Conclusão da Implementação

O projeto do \*\*Hotel Nebula\*\* comprovou com sucesso que a arquitetura NoSQL com MongoDB atende perfeitamente a cenários hoteleiros complexos. A combinação de subdocumentos para acesso rápido (como dados de hóspedes em reservas) com referências limpas por `ObjectId` e rigor tipológico BSON garantiu um sistema escalável, flexível e pronto para produção.

