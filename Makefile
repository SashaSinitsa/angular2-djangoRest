clean:
	rm -f ./db.sqlite3

create_database:
	./manage.py makemigrations --noinput
	./manage.py migrate --noinput
	./manage.py createsuperuser --username=root --email=ukr@mail.ru --noinput

make_fixtures:
	./manage.py create_users
#	./manage.py create_posts
#	./manage.py create_photos

all: clean create_database make_fixtures
