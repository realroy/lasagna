source .env

echo "DROP DATABASE ${DATABASE_NAME}_development;" | psql -U $DATABASE_USER
echo "DROP DATABASE ${DATABASE_NAME}_test;" | psql -U $DATABASE_USER