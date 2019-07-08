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
  }
  stages {
    stage('Tests') {
      steps {
        sh script: "make build", label: "start container and install dependencies"
        sh script: "make unit", label: "run unit tests"
      }
    }
    stage('Publish') {
      when {
        branch 'master'
      }
      steps {
        sh 'docker-compose exec -T kongponents kpm test'
      }
    }
  }
  post {
    always {
      sh 'docker-compose down'
      sh 'docker-compose rm -f || true'
      sh 'echo "we did it"'
    }
  }
}
