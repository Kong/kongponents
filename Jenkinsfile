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
        // sh 'docker-compose down'
        // sh 'docker-compose rm -f || true'
        sh 'docker-compose up -d'
        sh 'docker-compose ps'
        sh 'sleep 10'
        sh 'docker ps -a'
        // sh 'docker-compose exec $(docker-compose ps --services) kpm tests'
      }
    }
  }
  post {
    always {
      // sh 'docker-compose down'
      // sh 'docker-compose rm -f || true'
      sh 'echo "we did it"'
      deleteDir()
    }
  }
}
