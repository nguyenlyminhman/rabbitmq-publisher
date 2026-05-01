# 🐰 RabbitMQ Publisher

A lightweight RabbitMQ publisher built for sending messages to queues using Node.js. This project demonstrates how to implement a simple message producer following AMQP protocol.

---

## 🚀 Features

- 📤 Publish messages to RabbitMQ queue
- ⚡ Simple & clean structure
- 🔌 Easy integration with other services (microservices)
- 🧩 Suitable for learning & real-world usage

---

## 📦 Tech Stack

- Node.js
- RabbitMQ (AMQP protocol)
- amqplib (or similar library)

---

## 📁 Project Structure

```
rabbitmq-publisher/
│── src/
│   ├── publisher.js
│   ├── config.js
│── package.json
│── README.md
```

---

## ⚙️ Installation

```bash
git clone https://github.com/nguyenlyminhman/rabbitmq-publisher.git
cd rabbitmq-publisher
npm install
```

---

## 🐳 Run RabbitMQ (Docker)

```bash
docker run -d \
  --hostname rabbitmq \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management
```

Dashboard: http://localhost:15672  
Default login: guest / guest

---

## 🛠️ Configuration

```js
module.exports = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest',
};
```

---

## 📤 Usage

```bash
node src/publisher.js
```

---

## 🧠 How It Works

Producer → Exchange → Queue → Consumer

---

## 📌 Use Cases

- Microservices communication
- Background jobs
- Event-driven architecture
- Logging / analytics pipeline

---

## 📄 License

MIT

---

## 👨‍💻 Author

Mẫn Nguyễn  
https://github.com/nguyenlyminhman
