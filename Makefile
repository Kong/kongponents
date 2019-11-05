build:
	docker-compose up --build

unit:
	docker-compose run kongponents bash -c "kpm test"

clean-up:
	-docker-compose down
	-docker-compose rm -f

# Grabs previous build status on master for failure/recovery notifications
notify-on-recovery-status:
	bash build/.get-build-status.sh evaluate_build_status_and_notify

slack-notify:
	bash build/.get-build-status.sh slack_notify
