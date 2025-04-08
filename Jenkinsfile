pipeline {
    agent any
    tools{
        nodejs "NodeJS"
    }
    
    environment {
        NODE_VERSION = '18' // Ensure correct Node.js version
    }

    stages {
        stage('Cloning to git') {
            steps {
                git 'https://github.com/IvyKathambi/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps{
                sh 'npm run build --if-present'
            }
        }
        stage ('Test'){
            steps{
         sh 'npx mocha --exit --timeout 15000 test/*.js --color'
            }
        }
        stage('Deploy to Render') {
            steps {
                sh 'node server.js' // Start the server
            }
        }
    }
}
