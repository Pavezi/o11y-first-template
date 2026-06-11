# 🚀 O11y-First Microservices Template (Node.js)

**The Gold Standard for Resilient & Observable Distributed Systems.**

---

## 📖 Overview

In 2026, building a microservice is easy; building a *maintainable, observable, and resilient* distributed system is the real challenge. Most templates focus on "features" first. This template flips the script: **Observability and Resilience are first-class citizens.**

This is a production-ready boilerplate for Node.js microservices designed to give you 100% visibility from Day 1.

## ✨ Key Features (The "Core 4")

1.  **Automatic Context Propagation:** Uses `AsyncLocalStorage` to ensure Trace IDs are propagated across HTTP, RabbitMQ, and Redis without manual "drilling".
2.  **Standardized Resilience:** Pre-configured Circuit Breakers (Opossum) and Retry strategies with OTel attributes instrumentation.
3.  **Structured O11y:**
    *   **Logs:** JSON logging (Pino) with auto-injected Trace IDs.
    *   **Metrics:** Prometheus metrics for "Golden Signals" (Latency, Errors, Traffic, Saturation).
    *   **Traces:** OpenTelemetry integration with auto-instrumentation for popular libraries.
4.  **Error Excellence:** A centralized `ErrorFactory` that ensures every error is observable, categorized, and traceable.

## 🛠️ Tech Stack (2026+ Ready)

*   **Runtime:** Node.js 22+
*   **Language:** TypeScript (Strict Mode)
*   **Web Framework:** Fastify (High Performance)
*   **Telemetria:** OpenTelemetry (OTLP)
*   **Messaging:** RabbitMQ / BullMQ
*   **Observability:** Prometheus, Grafana, Jaeger

## 🚦 Getting Started

### Prerequisites
*   Docker & Docker Compose
*   Node.js 22+

### Installation
```bash
git clone https://github.com/viniciuspavezi/o11y-first-template.git
cd o11y-first-template
npm install
```

### Running the Demo (O11y Stack)
```bash
docker-compose up -d
npm run dev
```
Visit `localhost:16686` for Jaeger Traces and `localhost:3000` for Grafana Dashboards.

---

## 📂 Project Structure

```text
├── src/
│   ├── api/            # Routes & Controllers
│   ├── core/           # O11y & Resilience Logic (The Magic)
│   ├── providers/      # DB, Messaging, External Services
│   ├── shared/         # ErrorFactory, DTOs, Utils
│   └── app.ts          # Fastify Setup
├── config/             # Environment & OTel Config
├── tests/              # Integration & Resilience Tests
└── docker-compose.yml  # O11y Stack (Jaeger, Prom, Grafana)
```

## 🤝 Contributing

This is an open-source project. Feel free to open issues or PRs to improve the resilience patterns or OTel integrations.

---

**Built with ❤️ by [Vinicius Pavezi](https://linkedin.com/in/vinicius-pavezi-53976b162/)**
