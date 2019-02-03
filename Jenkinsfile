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
        sh 'docker run --rm -p 8080:80 -e NPM_TOKEN=${NPM_TOKEN} -v "$(pwd)"/.:/app/. node:8 bash -c "cd /app; npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN && npm install -g yarn@^1.13.0; yarn test --colors"'
        // sh 'docker run --rm -p 8080:80 -v "$(pwd)"/.:/app/. node:8 cd app; yarn test'
        // sh 'docker-compose up -d --force-recreate --build'
        // sh 'docker-compose ps'
        // sh 'sudo apt-get install software-properties-common'
        // sh 'sudo add-apt-repository ppa:tmate.io/archive'
        // sh 'sudo apt-get update'
        // sh 'sudo apt-get install tmate -y'
        // sh 'tmate -S /tmp/tmate.sock new-session -d'
        // sh 'tmate -S /tmp/tmate.sock wait tmate-ready'
        // sh "tmate -S /tmp/tmate.sock display -p '#{tmate_ssh}'"
        // sh 'ping cnn.com'
        // // sh 'sleep 10'
        // sh 'docker ps -a'
        // sh 'docker logs $(docker ps -a -q)'
        // sh 'docker rm $(docker ps -a -q)'
        // sh 'docker ps -a'
        // sh 'docker-compose ps --services'
        // sh 'docker-compose exec -T $(docker-compose ps --services) kpm tests'
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
