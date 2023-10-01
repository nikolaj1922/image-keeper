# image-keeper
InterWeb Lab. test task

Для запуска приложения необходимо: 
1) Установить зависимости в папках backend и frontend с помощью команды npm i
2) Сгенерировать клиент Prisma в папке backend с помощью команды npx prisma generate
3) Создать файл .env в папках backend и frontend и скопировать туда содержимое из файла .env.example из соответствующих папок
4) Запустить сервер из папки backend с помощью команды npm run start
5) Запустить фронтенд приложение из папки frontend с помощью команды npm run dev
6) Если в backend возникает такая ошибка: Environment variable not found: DATABASE_URL.
  -->  schema.prisma:7
   |
 6 |   provider = "postgresql"
 7 |   url      = env("DATABASE_URL")

НУЖНО ПОВТОРИТЬ ШАГ 2.
