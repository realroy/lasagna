source .env

echo "CREATE DATABASE ${DATABASE_NAME}_development;" | psql -U $DATABASE_USER
echo "CREATE DATABASE ${DATABASE_NAME}_test;" | psql -U $DATABASE_USER