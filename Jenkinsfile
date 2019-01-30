pipeline {
  agent {
    node {
      label 'build-kongponents'
    }
  }
  options {
    timeout(time: 30, unit: 'MINUTES')
  }
  stages {
    stage('Debug') {
      steps {
        sh 'ls -la .'
        sh 'printenv'
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
