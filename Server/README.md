# Zend

A simple digital banking backend built with **Spring Boot** that simulates core banking operations such as account creation, deposits, transfers, transaction history, and account management.

This project was built to learn backend development with Java, Spring Boot, Spring Data JPA, and PostgreSQL while following a layered architecture.

---

## Features

- Create bank accounts
- Automatically generate account numbers
- Deposit funds into an account
- Transfer money between accounts
- View account statements
- View account holder details
- Persist transactions in PostgreSQL
- Transaction history for every account
- RESTful API design
- Layered architecture (Controller → Service → Repository)

---

## Tech Stack

- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven
- Hibernate

---

## Project Structure

```
src
└── main
    ├── controller
    │   └── BankController
    │
    ├── dto
    │   ├── CreateAccountRequest
    │   ├── DepositRequest
    │   └── TransferRequest
    │
    ├── model
    │   ├── BankAccount
    │   ├── Transaction
    │   └── InsufficientFundsException
    │
    ├── repository
    │   └── BankAccountRepository
    │
    └── service
        └── BankService
```

---

## Architecture

The application follows a layered architecture.

```
HTTP Request
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
PostgreSQL
```

### Controller

Responsible for handling HTTP requests and responses.

### Service

Contains the business logic such as:

- Deposits
- Transfers
- Account creation
- Balance updates
- Transaction recording

### Repository

Communicates with PostgreSQL using Spring Data JPA.

---

## Current Endpoints

### Create Account

```
POST /api/accounts
```

Request

```json
{
    "holderName": "Daniel"
}
```

---

### Deposit Funds

```
POST /api/accounts/{accountNumber}/deposit
```

Request

```json
{
    "amount": 5000
}
```

---

### Transfer Funds

```
POST /api/accounts/transfer
```

Request

```json
{
    "from": "ACC1",
    "to": "ACC2",
    "amount": 1000
}
```

---

### Get All Accounts

```
GET /api/accounts
```

---

### Get Account Statement

```
GET /api/accounts/{accountNumber}/statement
```

---

### Get Account Holder

```
GET /api/accounts/{accountNumber}/holder
```

---

## Database

### BankAccount

| Field | Description |
|--------|-------------|
| id | Primary key |
| accountNumber | Unique account number |
| holderName | Account owner's name |
| balance | Current account balance |

---

### Transaction

| Field | Description |
|--------|-------------|
| id | Primary key |
| description | Deposit or withdrawal description |
| amount | Transaction amount |
| timestamp | Time of transaction |
| bankAccount | Associated account |

---

## Business Rules

- Deposit amount must be greater than zero.
- Withdrawal amount cannot exceed available balance.
- Every successful deposit creates a transaction record.
- Every successful transfer records both the debit and credit transactions.
- Account numbers are unique.

---

## Future Improvements

Planned features include:

- User authentication
- Sign up and login
- Password hashing using BCrypt
- Spring Security
- Redis session management
- Session-based authentication
- Withdraw endpoint
- Account deletion
- Transaction references
- Global exception handling
- Request validation
- Pagination
- API documentation using Swagger/OpenAPI
- Unit and integration testing

---

## Running the Project

Clone the repository

```bash
git clone https://github.com/yourusername/zend.git
```

Navigate into the project

```bash
cd zend
```

Configure PostgreSQL in

```
application.properties
```

Run the project

```bash
mvn spring-boot:run
```

The API will be available at

```
http://localhost:8081
```

---

## Learning Goals

This project focuses on learning:

- Spring Boot
- REST API development
- Spring Data JPA
- Hibernate relationships
- Layered architecture
- Transaction management
- Exception handling
- Backend best practices
- PostgreSQL integration

---

## License

This project is intended for learning and educational purposes.