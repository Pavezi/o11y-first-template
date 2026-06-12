# Projeto O11y-First Microservices Template

Este documento contém as instruções fundamentais e fluxos de trabalho para o desenvolvimento deste projeto. O Gemini CLI deve seguir estas regras rigorosamente.

## 🚀 Fluxo de Desenvolvimento
- **Estratégia de Branching:** Nunca faça commits diretamente na `main` para novas funcionalidades. 
  - Crie sempre uma branch `feat/nome-da-feature`.
  - Após o sucesso e validação (testes funcionais), as mudanças devem ser commitadas e feito o merge para a `main`.
- **Automação Proativa:** O agente deve tentar executar comandos de terminal (instalação, docker, testes) proativamente usando `run_shell_command`. Caso encontre erros de permissão ou de ambiente (ex: Docker desligado), deve reportar e pedir orientação.
- **Git & Segurança:** 
  - Todos os commits devem ser assinados usando a chave **GPG** configurada (`A39644815ED69B27`).
  - O acesso remoto ao GitHub é feito via **SSH**.
  - O e-mail do autor deve ser sempre `pavezivinicius@gmail.com`.

## 🛠️ Padrões Tecnológicos
- **Runtime:** Node.js 22+ (ESM puro).
- **TypeScript:** Configuração estrita, targets modernos, imports devem usar extensão `.js`.
- **Observabilidade (O11y):** 
  - Usar o Logger customizado em `src/core/logger.ts`. Proibido o uso de `console.log`.
  - O OpenTelemetry deve ser inicializado antes de qualquer outro módulo via flag `--import`.
- **Framework:** Fastify.

## 🏗️ Infraestrutura Local
- O stack de observabilidade (Jaeger, Prometheus, etc.) deve ser gerenciado via `docker-compose.yml`.
- **Docker Desktop (Linux):** Para iniciar o daemon via CLI, usar `systemctl --user start docker-desktop`.
- **Registry Issues:** Se encontrar erros de autenticação ao baixar imagens públicas, tente `docker logout` para operar anonimamente.

## 🐛 Troubleshooting & Aprendizados
- **OpenTelemetry v2.x:** A classe `Resource` não é exportada como construtor. Usar a factory `resourceFromAttributes` do pacote `@opentelemetry/resources`.
- **Dependencies:** Ignorar avisos de `glob` depreciado por enquanto (dependência indireta do `tsx`).
- **Git Hygiene:** Sempre verificar se `node_modules` não está sendo rastreado após manipulações no `.gitignore`.
