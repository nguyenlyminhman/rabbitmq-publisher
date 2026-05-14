# 🐰 RabbitMQ Publisher

A **NestJS**-based message producer that demonstrates all four core RabbitMQ exchange types. This service exposes REST endpoints (via Swagger) to publish messages through **Direct**, **Fanout**, **Topic**, and **Headers** exchanges — designed as the sender half of a publisher/subscriber study project.

> 📌 Pair this with [rabbitmq-subcriber](https://github.com/nguyenlyminhman/rabbitmq-subcriber) to see the full message flow in action.

---

## 🔄 How It Works

```
HTTP Request → NestJS Controller → RbmqExchangeService → RabbitMQ Exchange → Queue → [Subscriber consumes]
```

On startup, `SeederRabbitMQService` automatically declares all exchanges and binds queues so you never have to configure them manually in the RabbitMQ dashboard.

---

## 🚀 Exchange Types Covered

| Exchange | Module | Routing Behaviour |
|---|---|---|
| **Direct** | `src/modules/direct` | Routes to queues whose binding key exactly matches the routing key |
| **Fanout** | `src/modules/fanout` | Broadcasts to **all** bound queues, ignoring routing keys |
| **Topic** | `src/modules/topic` | Pattern-based routing using `*` (one word) and `#` (zero or more words) wildcards |
| **Headers** | `src/modules/headers` | Routes based on message header attributes instead of the routing key |

---

## 📦 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: NestJS 10
- **Message Broker**: RabbitMQ (AMQP 0-9-1)
- **AMQP Client**: `amqplib` via `@golevelup/nestjs-rabbitmq`
- **API Docs**: Swagger (`@nestjs/swagger`)
- **Language**: TypeScript
- **Config**: `@nestjs/config` + `.env`

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── direct/        # Direct exchange – controller, service, module
│   ├── fanout/        # Fanout exchange – controller, service, module
│   ├── topic/         # Topic exchange  – controller, service, module
│   └── headers/       # Headers exchange – controller, service, module
│
├── rbmq/
│   ├── rbmq.module.ts          # Registers RabbitMQ connection
│   ├── rbmq.service.ts         # Low-level publish helpers
│   └── rbmqExchange.service.ts # Exchange-aware publish logic
│
├── objects/
│   ├── configs/swagger.ts      # Swagger setup
│   ├── enums/                  # Exchange names, queue names, routing keys
│   └── exchange/               # Queue-binding definitions per exchange type
│
└── shared/
    ├── app-config.service.ts       # Typed env config
    ├── seeding-rabbitmq.service.ts # Auto-declares exchanges & queues on boot
    └── shared.module.ts
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/nguyenlyminhman/rabbitmq-publisher.git
cd rabbitmq-publisher
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
APP_PORT=3000
```

### 3. Start RabbitMQ (Docker)

```bash
docker run -d \
  --hostname rabbitmq \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management
```

Management UI: [http://localhost:15672](http://localhost:15672) — default credentials: `guest / guest`

### 4. Run the publisher

```bash
# Development
npm run start:dev

# Production
npm run build && npm run start:prod
```

Swagger UI available at: [http://localhost:3000/api](http://localhost:3000/api)

---

## 📤 Publishing Messages

Use Swagger or any HTTP client to trigger each exchange type:

### Direct Exchange
```
POST /direct/send
Body: { "routingKey": "direct.key", "message": "Hello Direct!" }
```

### Fanout Exchange
```
POST /fanout/send
Body: { "message": "Broadcast to all!" }
```

### Topic Exchange
```
POST /topic/send
Body: { "routingKey": "order.created.vn", "message": "New order!" }
```

### Headers Exchange
```
POST /headers/send
Body: { "headers": { "type": "report", "format": "pdf" }, "message": "Monthly report" }
```

---

## 🧠 Key Concepts

**SeederRabbitMQService** — runs at application boot to assert all exchanges and bind queues. This ensures RabbitMQ topology is always in sync with code definitions in `src/objects/exchange/`.

**Exchange definition files** (`src/objects/exchange/*.ts`) — each file exports queue binding configs for one exchange type, making it easy to add new queues or routing keys.

**Enums** (`src/objects/enums/`) — centralize all exchange names, queue names, and routing keys as constants to avoid magic strings across the codebase.

---

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Coverage report
npm run test:cov
```

---

## 👨‍💻 Author

**Mẫn Nguyễn** — [github.com/nguyenlyminhman](https://github.com/nguyenlyminhman)

## 📄 License

MIT
