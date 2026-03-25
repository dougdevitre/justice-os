# ⚖️ Justice OS — The Linux of Justice Tech

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/dougdevitre/justice-os/pulls)

**Open-source modular platform for building justice applications.**

---

## The Problem

Justice tech is fragmented. Courts, legal aid organizations, and nonprofits are stuck with siloed systems that don't talk to each other. Expensive proprietary platforms lock out small orgs that need the tools most. There is no interoperability, no shared standards, and no way for the broader community to contribute.

The result: millions of people fall through the cracks of a system that was supposed to protect them.

## The Solution

Justice OS is a modular plugin architecture where any organization can build, share, and deploy justice tools. Think of it as the Linux of justice tech — a shared foundation that anyone can extend.

Build a case manager. Plug in a document generator. Add a timeline builder. Share it with every legal aid org in the country. That's Justice OS.

---

## Architecture

```mermaid
graph TD
    subgraph Plugin System
        P1[Community Plugins]
        P2[Custom Integrations]
    end

    subgraph Core Engine
        CM[Case Manager]
        DG[Doc Generator]
        TB[Timeline Builder]
        ET[Evidence Tagger]
        RD[Role Dashboard]
    end

    subgraph Data Layer
        DB[(DynamoDB / Postgres)]
    end

    subgraph API Gateway
        AG[REST + GraphQL API]
    end

    P1 --> CM
    P2 --> CM
    CM --> DB
    DG --> DB
    TB --> DB
    ET --> DB
    RD --> DB
    AG --> CM
    AG --> DG
    AG --> TB
    AG --> ET
    AG --> RD
```

---

## Who This Helps

| Audience | How Justice OS Helps |
|---|---|
| **Legal aid orgs** | Deploy a full case management stack without vendor lock-in |
| **Courts** | Modernize operations with modular, interoperable tools |
| **Nonprofits** | Access free, production-ready justice software |
| **Self-represented litigants** | Benefit from better tools built by the community |
| **Justice tech startups** | Build on a shared platform instead of starting from scratch |

---

## Features

- [ ] Plugin system with hot-reload support
- [ ] Case Manager — track parties, events, deadlines, and outcomes
- [ ] Doc Generator — assemble court documents from templates
- [ ] Timeline Builder — visualize case history and key dates
- [ ] Evidence Tagger — organize and tag exhibits
- [ ] Role Dashboard — judge, attorney, clerk, and litigant views
- [ ] REST and GraphQL API
- [ ] Multi-tenancy support
- [ ] Audit logging

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Runtime | Node.js |
| API | Express / tRPC |
| Database | DynamoDB + Postgres |
| Testing | Vitest |
| Linting | ESLint + Prettier |
| Build | tsc |

---

## Quick Start

```bash
git clone https://github.com/dougdevitre/justice-os.git
cd justice-os
npm install
npm run dev
```

---

## Justice OS Ecosystem

| Repo | Description |
|---|---|
| [justice-os](https://github.com/dougdevitre/justice-os) | Core platform (you are here) |
| [mobile-court-access](https://github.com/dougdevitre/mobile-court-access) | Mobile-first court access kit |
| [vetted-legal-ai](https://github.com/dougdevitre/vetted-legal-ai) | RAG engine with citation validation |
| [court-doc-engine](https://github.com/dougdevitre/court-doc-engine) | Document automation for legal filings |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE).
