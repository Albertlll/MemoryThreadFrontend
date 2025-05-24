# Используем официальный Node.js образ
FROM node:23-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Создаем директорию для SSL сертификатов
RUN mkdir -p /app/ssl

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# RUN npm run build
# Явно указываем порт для Vite preview
ENV PORT=3000
EXPOSE 3000

# Запуск Vite preview с правильными параметрами
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]