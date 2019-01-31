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
    stage('Build') {
      steps {
        sh 'docker-compose pull'
        sh 'docker-compose build'
      }
    }
    stage('Tests') {
      steps {
        sh 'docker-compose up --force-recreate --no-build -d kongponents'
        sh 'docker ps -a'
        sh 'docker-compose ps'
        sh 'docker-compose exec -T kongponents_kongponents_1 kpm tests'
      }
      post {
        always {
          sh 'docker-compose stop'
          sh 'docker-compose rm -f || true'
        }
      }
    }
  }
  post {
    always {
      sh 'echo "we did it"'
    }
  }
}
