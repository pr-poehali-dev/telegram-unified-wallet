-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE NOT NULL,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    balance DECIMAL(10, 2) DEFAULT 0.00,
    daily_limit DECIMAL(10, 2) DEFAULT 5000.00,
    monthly_limit DECIMAL(10, 2) DEFAULT 50000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица нейросетей и AI-сервисов
CREATE TABLE ai_services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(10),
    plan_type VARCHAR(100),
    cost_description VARCHAR(100),
    monthly_cost DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица связи пользователей и подключенных сервисов
CREATE TABLE user_services (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    service_id INTEGER REFERENCES ai_services(id),
    is_connected BOOLEAN DEFAULT false,
    connected_at TIMESTAMP,
    UNIQUE(user_id, service_id)
);

-- Таблица транзакций
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    service_id INTEGER REFERENCES ai_services(id),
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('payment', 'deposit', 'refund', 'subscription')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    category VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации запросов
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_service_id ON transactions(service_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_user_services_user_id ON user_services(user_id);

-- Вставка примеров AI-сервисов
INSERT INTO ai_services (name, logo, plan_type, cost_description, monthly_cost) VALUES
('ChatGPT', '🤖', 'Plus', '20$/мес', 20.00),
('Midjourney', '🎨', 'Pro', '30$/мес', 30.00),
('Claude', '💬', 'API', 'По факту', NULL),
('Stable Diffusion', '🖼️', 'Basic', '10$/мес', 10.00),
('Runway ML', '🎬', 'Standard', '15$/мес', 15.00);