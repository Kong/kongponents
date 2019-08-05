#!/bin/bash

set -e

# If the previous build failed and the current build succeeds, we should notify the relevant Slack channel
function evaluate_build_status_and_notify {
  # Get previous build status
  PREVIOUS_BUILD_STATUS=$(curl -s ${JENKINS_URL}job/kongponents/job/master/lastCompletedBuild/api/json --user ${JENKINS_CREDENTIALS_USR}:${JENKINS_CREDENTIALS_PSW} | jq .result)
  # Strip quotations for equality evaluation
  PREVIOUS_BUILD_STATUS=$(echo $PREVIOUS_BUILD_STATUS | tr -d '"')
  # In the event that we can't get the status, we should handle the error and not block the build
  if [[ -z "$PREVIOUS_BUILD_STATUS" ]]; then
    echo "failed to retrieve Jenkins build status";
    exit 0;
  fi

  if [[ $PREVIOUS_BUILD_STATUS != SUCCESS ]]; then
    echo "The previous build on master failed with a status of $PREVIOUS_BUILD_STATUS; this has recovered. We're notifying Slack.";
    STAGE_STATUS=recovery
    slack_notify
  else
    echo "The previous build on master was a success. So is this one. Nothing to do here."
  fi
}

function call_slack {
  curl -X POST -H 'Content-type: application/json' --data '{"text": '"'$JOB_NAME #$BUILD_NUMBER. Result: $STAGE_STATUS on $GIT_BRANCH during stage $STAGE_NAME.'"'}' ${SLACK_WEBHOOK}
}

# run this only on master
function slack_notify {
  if [[ ${GIT_BRANCH} == master ]]; then
    call_slack
  else
    echo "Currently on ${GIT_BRANCH} branch, not master. Nothing to do here."
  fi
}

"$@"
