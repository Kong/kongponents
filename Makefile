build:
	docker-compose up --build

unit:
	docker-compose run kongponents bash -c "kpm test"

clean-up:
	-docker-compose down
	-docker-compose rm -f

# run this only on master
slack-notify:
ifeq ($(GIT_BRANCH), master)
	$(MAKE) slack-notify-stage-check
endif

# nest a separate target because nested conditionals in make is not great
slack-notify-stage-check:
	curl -X POST -H 'Content-type: application/json' --data '{"text": "${JOB_NAME} #${BUILD_NUMBER}. Result: ${STAGE_STATUS} on ${GIT_BRANCH} during stage ${STAGE_NAME}."}' ${SLACK_WEBHOOK}

# Grabs previous build status on master for failure/recovery notifications
notify-on-recovery-status:
	$(eval PREVIOUS_BUILD_STATUS=$(shell ./get-build-status.sh return_previous_build_status ${JENKINS_URL} ${JENKINS_CREDENTIALS_USR} ${JENKINS_CREDENTIALS_PSW}))
	@if [[ $(PREVIOUS_BUILD_STATUS) != SUCCESS ]]; then\
		echo "The previous build on master failed; this has recovered. We are letting the TI team know.";\
		$(MAKE) STAGE_STATUS=recovery slack-notify;\
	else\
		echo "The previous build on master was a success. So is this one. Nothing to do here.";\
	fi
