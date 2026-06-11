# Tech Stack: O11y-First-Microservices-Template (2026 Edition)

Esta é a lista de tecnologias e bibliotecas essenciais para o seu projeto. Como você vai configurar manualmente, aqui está o "mapa da mina" para garantir a senioridade do projeto.

---

## 1. Runtime & Core
*   **Node.js 22+ (LTS):** Utilize as novas APIs nativas (como o Test Runner nativo se preferir, ou as melhorias de ESM).
*   **TypeScript 5.x:** Configurado com `strict: true` e `skipLibCheck: true`.
*   **tsx:** Para execução rápida em desenvolvimento (sucessor do ts-node).

## 2. Web Framework (Performance)
*   **Fastify:** Muito mais rápido que Express e com suporte nativo a JSON Schema.
*   **@fastify/autoload:** Para organização automática de rotas.
*   **@fastify/swagger & @fastify/swagger-ui:** Para documentação automática.

## 3. Observabilidade (A Alma do Projeto)
*   **@opentelemetry/api:** A interface básica.
*   **@opentelemetry/sdk-node:** O SDK para configurar o rastreio.
*   **@opentelemetry/auto-instrumentations-node:** Para capturar métricas de DB, HTTP e Redis automaticamente.
*   **@opentelemetry/exporter-trace-otlp-http:** Para enviar os traces para o Jaeger/Collector.
*   **pino & pino-pretty:** Logger estruturado de alta performance.

## 4. Resiliência & Mensageria
*   **opossum:** A biblioteca padrão para Circuit Breaker em Node.js.
*   **amqplib:** Para integração com RabbitMQ (ou `bullmq` se preferir filas via Redis).
*   **zod:** Para validação de contratos e Schemas (crítico para resiliência de dados).

## 5. Ferramentas de Apoio
*   **Docker & Docker Compose:** Você precisará subir imagens do:
    *   `otel/opentelemetry-collector`
    *   `jaegertracing/all-in-one`
    *   `prom/prometheus`
    *   `grafana/grafana`

---

## 🛠️ Dica para seus primeiros 30 minutos:
Comece instalando as dependências de **Logging (Pino)** e **OpenTelemetry**. Tente fazer um "Hello World" onde o Log do Pino já saia com um campo vazio de `trace_id` preparado.

Isso vai te dar a base para a próxima etapa: **Context Propagation**.
