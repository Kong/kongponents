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
    stage('Debug') {
      steps {
        sh 'ls -la .'
        sh 'ls -la /var/run/docker.sock'
        sh 'whoami'
        sh 'id'
        sh 'printenv'
        sh 'docker info'
        sh 'docker version'
        sh 'docker-compose version'
      }
    }
    stage('Build') {
      steps {
        sh 'kpm --help'
      }
    }
    stage('Tests') {
      when {
        anyOf {
          branch 'master'
          changeRequest target: 'master'
          buildingTag()
        }
      }
      steps {
        sh 'kpm tests'
      }
    }
  }
  post {
    always {
      sh 'echo "we did it"'
    }
  }
}
