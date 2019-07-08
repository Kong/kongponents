build:
	docker-compose up --build

unit:
	docker-compose run kongponents bash -c "kpm test"
