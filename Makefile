build:
	docker-compose up --build

unit:
	docker-compose run kongponents bash -c "kpm test"

clean-up:
	-docker-compose down
	-docker-compose rm -f
