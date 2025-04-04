pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18' // Ensure correct Node.js version
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-username/repository-name.git'
            }
        }

        stage('Set Up Environment') {
            steps {
                sh 'curl -fsSL https://deb.nodesource.com/setup_18.x | bash -'
                sh 'sudo apt install -y nodejs'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'node server.js' // Start the server
            }
        }
    }
}
