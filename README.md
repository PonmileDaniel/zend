# Zend — The Future of Finance

**Zend is a fintech banking application built to explore the engineering behind modern digital financial services.**

The project focuses on building a secure, reliable, and maintainable backend for core banking experiences, including authentication, account management, balances, and money transfers.

Beyond the banking application, Zend is the foundation for a larger vision: **Zend Laboratory** — an environment where developers can experiment with distributed systems, performance, scalability, and resilience by building, testing, and deliberately challenging applications.

The goal is not simply to build a banking interface. It is to understand the engineering systems that make financial applications work reliably.

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [Vision and Mission](#vision-and-mission)
- [What Zend Is Intended to Become](#what-zend-is-intended-to-become)
- [Current Features](#current-features)
- [Technology Stack](#technology-stack)
- [Engineering Principles](#engineering-principles)
- [Roadmap](#roadmap)
- [Getting Started](#getting-started)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)

---

## Overview

Digital financial products appear simple from the user's perspective. A user signs in, checks their balance, sends money, and receives confirmation.

Behind that experience are complex engineering problems:

- How do we protect accounts from unauthorized access?
- How do we prevent a transfer from being processed twice?
- What happens when multiple transfers attempt to modify the same balance simultaneously?
- How should an application behave when its database or another dependency becomes unavailable?
- How do we identify performance bottlenecks before they affect users?
- How can an application remain reliable when traffic increases unexpectedly?

Zend provides a practical environment for exploring these problems while developing a functional fintech application.

The project begins with core banking functionality and will progressively explore the infrastructure, testing strategies, and architectural decisions required to build reliable systems.

## The Problem

Learning backend engineering through isolated examples is valuable, but real-world systems introduce challenges that are difficult to understand through small exercises alone.

A money transfer, for example, is more than an API request. It involves authentication, authorization, validation, concurrent operations, database consistency, transaction records, and appropriate handling of failures.

Similarly, adding a cache, load balancer, or monitoring tool does not automatically make an application reliable. Engineers must understand how components interact, how failures propagate, and how to measure the effects of architectural decisions.

Zend aims to bridge the gap between building applications and understanding the systems behind them.

## Vision and Mission

### Vision

To evolve Zend into a practical environment for building, testing, and understanding reliable financial applications and distributed systems.

### Mission

To develop a fintech application that provides a foundation for experimenting with backend engineering, financial transaction correctness, performance optimization, observability, and system resilience.

Through Zend and the planned Zend Laboratory, the project aims to make complex engineering concepts easier to explore through practical implementation and measurable experiments.

## What Zend Is Intended to Become

Zend has two connected parts.

### 1. Zend Banking Application

The banking application is the core product.

It provides a foundation for implementing and studying common financial workflows, including:

- User registration and authentication.
- Account and balance management.
- Transaction history.
- Recipient lookup.
- Money transfers.
- Transaction PIN verification.
- Transaction receipts and status reporting.

The focus is on correctness, security, maintainability, and a user experience that makes financial activity easy to understand.

### 2. Zend Laboratory

Zend Laboratory is the planned evolution of Zend into a hands-on systems engineering environment.

It is intended to help developers understand how applications behave under realistic operating conditions, including high traffic, concurrent requests, component failures, and slow dependencies.

Potential capabilities include:

- **Load and performance testing:** Simulate increasing traffic and measure latency, throughput, and error rates.
- **Observability:** Use metrics, logs, and dashboards to investigate application behaviour and identify bottlenecks.
- **Resilience experiments:** Explore timeouts, retries, dependency failures, and recovery strategies.
- **Distributed systems:** Experiment with load balancing, caching, asynchronous processing, and communication between services.
- **Financial consistency testing:** Investigate concurrent transfers, duplicate requests, balance integrity, and database transaction boundaries.
- **Scenario-based learning:** Run controlled experiments, observe results, and compare different architectural approaches.

The objective is to make systems engineering tangible. Developers should be able to change an implementation, run an experiment, observe what happens, and understand why.

These Laboratory capabilities represent the planned direction of the project and should not be interpreted as features already implemented.

## Current Features

The current application is being developed around the following capabilities:

- **Authentication:** User registration and login using Spring Security and BCrypt password hashing.
- **Session management:** Redis-backed session infrastructure for authenticated requests.
- **Account management:** User-linked bank accounts and account numbers.
- **Dashboard:** Account information, balance, and recent transactions.
- **Transaction history:** Display transaction amounts, types, timestamps, and counterparties where available.
- **Recipient lookup:** Retrieve recipient details using an account number.
- **Money transfers:** A developing transfer workflow with transaction PIN verification.
- **Welcome demo funds:** Simulated funds for demonstrating account balances and transaction history.
- **Frontend integration:** A React and TypeScript interface communicating with the Spring Boot backend.

Features and implementation details may change as development progresses.

## Technology Stack

| Technology | Purpose |
|---|---|
| Java | Backend programming language |
| Spring Boot | Backend application framework |
| Spring Security | Authentication and authorization |
| BCrypt | Password hashing |
| Redis | Session infrastructure |
| PostgreSQL | Persistent application and transaction data |
| React | Frontend user interface |
| TypeScript | Frontend type safety |
| Tailwind CSS | Interface styling |
| Maven | Backend dependency management and builds |
| Docker | Containerization and development environments |

## Engineering Principles

### 1. Correctness Before Complexity

Financial operations must preserve data integrity. A simple, well-tested implementation is more valuable than a complex architecture that cannot guarantee correct outcomes.

### 2. Security by Design

Authentication, authorization, input validation, account ownership, and safe handling of sensitive information must be considered throughout development.

### 3. Observable Behaviour

Applications should provide enough information to explain what happened during a request or transaction. Logging, metrics, and tests should support investigation rather than relying on guesswork.

### 4. Test Failure, Not Just Success

Successful requests represent only one part of system behaviour. The project should also test invalid inputs, insufficient balances, duplicate requests, concurrent operations, and unavailable dependencies.

### 5. Measure Before Optimizing

Performance improvements should be guided by evidence. Load testing and observability should help identify bottlenecks before architectural changes are introduced.

### 6. Learn Through Experimentation

Every new infrastructure component should solve a clear problem and be accompanied by tests or experiments that demonstrate its value.

## Roadmap

The roadmap is organized into stages so that the application can grow without introducing unnecessary complexity too early.

### Phase 1: Core Banking Experience

- [x] Establish the Spring Boot backend and React frontend.
- [x] Implement foundational authentication and session handling.
- [x] Connect users to bank accounts.
- [x] Build the account dashboard and transaction history.
- [x] Implement recipient lookup.
- [ ] Complete and verify transfer correctness and transaction PIN handling.
- [ ] Complete the transaction receipt experience.
- [ ] Expand automated tests for core workflows.

### Phase 2: Financial Correctness and Security

- [ ] Verify atomic balance updates and transaction persistence.
- [ ] Test concurrent transfers and prevent inconsistent balances.
- [ ] Introduce idempotency for operations where duplicate requests could be harmful.
- [ ] Improve error handling and transaction status reporting.
- [ ] Strengthen authorization and account-ownership tests.
- [ ] Document security assumptions and known limitations.

### Phase 3: Observability and Performance

- [ ] Introduce structured application logging.
- [ ] Add metrics and monitoring.
- [ ] Integrate k6 for load testing.
- [ ] Explore Grafana dashboards and suitable metrics infrastructure.
- [ ] Establish baseline latency, throughput, and error rates.
- [ ] Investigate performance bottlenecks using measured results.

### Phase 4: Zend Laboratory

- [ ] Define repeatable experiments and configurable scenarios.
- [ ] Simulate traffic spikes and concurrent user activity.
- [ ] Explore service timeouts, dependency failures, and recovery.
- [ ] Experiment with caching, load balancing, and asynchronous processing.
- [ ] Record experiment results and compare architectural approaches.
- [ ] Develop a workflow that helps developers run and understand experiments.

### Phase 5: Production-Inspired Systems

- [ ] Improve deployment automation and environment configuration.
- [ ] Evaluate container orchestration and scaling strategies where appropriate.
- [ ] Introduce more advanced distributed systems experiments.
- [ ] Document architecture decisions, trade-offs, and measured outcomes.

> Roadmap items describe development goals. Update the checklist as features are implemented and verified.

## Getting Started

### Prerequisites

Install the following tools:

- Java Development Kit compatible with the project's configured Java version.
- Maven, or the project's Maven Wrapper if available.
- Node.js and npm.
- PostgreSQL.
- Redis.
- Docker, if using the containerized development setup.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-directory>
```

Replace the placeholders with your actual repository URL and directory name.

### 2. Configure the Backend

Set up PostgreSQL and Redis, then configure the application's database connection and required environment variables.

Do not commit database passwords, session secrets, or other credentials to the repository.

### 3. Start the Backend

If the repository contains the Maven Wrapper, run:

```bash
./mvnw spring-boot:run
```

Otherwise, run:

```bash
mvn spring-boot:run
```

### 4. Start the Frontend

Navigate to the frontend directory:

```bash
cd <frontend-directory>
npm install
npm run dev
```

The exact directory names, environment variable names, ports, and startup commands should be updated to match the repository's current configuration.

## Testing

Testing is a fundamental part of Zend's development.

The intended test coverage includes:

- Authentication and access control.
- Account ownership and recipient lookup.
- Valid and invalid transfers.
- Insufficient-balance handling.
- Transaction persistence and balance consistency.
- Concurrent and repeated transfer requests.
- API error handling.
- Performance under increasing request volume.

The long-term objective is to verify not only that endpoints return the expected responses, but also that the system preserves its critical invariants under failure and concurrency.

## Project Status

Zend is an evolving fintech application and systems engineering project.

The core banking experience is being developed first. Financial correctness, automated testing, observability, performance testing, and the broader Zend Laboratory vision will be introduced incrementally.

The project is intended for development, experimentation, and learning. It has not been established as a production-ready banking platform, and real-money banking capabilities should not be assumed.

## Contributing

Contributions, feedback, and technical discussions are welcome.

Useful contributions include:

- Improving backend correctness and test coverage.
- Identifying security weaknesses.
- Improving API design and documentation.
- Designing meaningful load and failure experiments.
- Documenting architectural trade-offs.
- Sharing reproducible performance measurements.

For substantial changes, explain the problem being addressed, the proposed approach, and how the change can be tested.

## Disclaimer

Zend is an independent development and learning project. It is not a licensed bank, payment institution, or substitute for a regulated financial service.

Balances and welcome funds are for demonstration purposes. Do not use the application to store real financial information or process real-money transactions.

---

**Zend — Build the financial experience. Understand the systems behind it. Built for Resilence**