pipeline {
  agent {
    node {
      label 'docker-compose'
    }
  }
  options {
    timeout(time: 30, unit: 'MINUTES')
  }
  environment {
    DOCKER_CREDENTIALS = credentials('dockerhub')
    NPM_TOKEN = credentials('NPM_TOKEN')
    DOCKER_HOST = 'unix:///var/run/docker.sock'
    COMPOSE_PROJECT_NAME = "${env.GIT_COMMIT}"
    GITHUB_TOKEN = credentials('GITHUB_TOKEN')
    SLACK_WEBHOOK = credentials('SLACK_WEBHOOK')
    JENKINS_CREDENTIALS = credentials('JENKINS_API_CREDS')
  }
  stages {
    stage('Tests') {
      when {
        anyOf {
          branch 'master'
          changeRequest target: 'master'
        }
      }
      steps {
        sh script: "make build", label: "start container and install dependencies"
        sh script: "make lint", label: "run linter test"
        sh script: "make unit", label: "run unit tests"
      }
    }
  }
  post {
    always {
      sh script: "make clean-up", label: "clean up assets"
    }
    failure {
      sh script: 'STAGE_STATUS=failure make slack-notify', label: "notify team that Tests stage has failed"
    }
    success {
      sh script: 'make notify-on-recovery-status', label: "notify slack on recovery state, depending on previous master status"
    }
  }
}
