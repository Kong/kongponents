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
        sh 'echo "running tests"'
        sh 'docker-compose up -d'
        // sh 'docker run --rm -p 8080:80 -e NPM_TOKEN=${NPM_TOKEN} -v "$(pwd)"/.:/app/. node:8 bash -c "cd /app; npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN && npm install -g yarn@^1.13.0; yarn install; yarn test --colors"'
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
