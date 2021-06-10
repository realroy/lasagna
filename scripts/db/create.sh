source .env

echo "CREATE DATABASE ${DATABASE_USER}_development" | psql -U $DATABASE_USER
echo "CREATE DATABASE ${DATABASE_USER}_test" | psql -U $DATABASE_USER