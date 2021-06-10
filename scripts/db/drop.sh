source .env

echo "DROP DATABASE ${DATABASE_USER}_development" | psql -U $DATABASE_USER
echo "DROP DATABASE ${DATABASE_USER}_test" | psql -U $DATABASE_USER