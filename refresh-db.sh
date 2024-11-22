
# # Undo Migrations and seeders
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all

# Migrations and seeders
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
