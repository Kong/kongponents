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
        sh 'apt-get install software-properties-common'
        sh 'add-apt-repository ppa:tmate.io/archive'
        sh 'apt-get update'
        sh 'apt-get install tmate'
        // sh 'docker-compose down'
        // sh 'docker-compose rm -f || true'
        sh 'docker-compose up -d --force-recreate'
        sh 'docker-compose ps'
        sh 'tmate -S /tmp/tmate.sock new-session -d'
        sh 'tmate -S /tmp/tmate.sock wait tmate-ready'
        sh "tmate -S /tmp/tmate.sock display -p '#{tmate_ssh}'"
        sh 'ping cnn.com'
        sh 'sleep 10'
        sh 'docker ps -a'
        sh 'docker logs $(docker ps -a -q)'
        sh 'docker rm $(docker ps -a -q)'
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
