# AWS Lambda & Serverless Framework

This repository contains AWS Lambda functions that have been deployed via Serverless Framework and utilized in Amazon Connect

## Live Demo

Amazon Connect Demo with Lambda functions deployed: 
- +1-213-328-4877

## Technologies Used

- Serverless Framework
- AWS Lambda
- AWS Identity and Access Management (IAM)
- Amazon API Gateway
- Amazon Connect
- serverless-dotenv-plugin
- Node.js

## Development

### System Requirements

- Node.js
- npm
- Serverless Framework

### Getting Started

If you have not already, please setup an AWS account and configure your AWS credentials with Serverless Framework. This [documentation](https://www.serverless.com/framework/docs/providers/aws/guide/installation/) can help you get started.

1. Clone the repository:
    ```shell
    git clone https://github.com/felix-chin/aws-lambda.git
    cd aws-lambda
    ```
2. Install npm dependencies:
    ```shell
    npm install
    ```
3. Setup environment variables:
    
    - Request an API key from https://openweathermap.org/
    - Create a .env file in the root of this repo and enter the following:
    
        ```shell
        WEATHER_KEY={your_openweathermap_API_key}
        EMAIL={youremail@email.com}
        ```
4. Deploy AWS Lambda functions via Serverless:
    ```shell
    serverless deploy
    ```
## Amazon Connect

### Setup

Setting up and configuring an Amazon Connect instance for these Lambda functions to be deployed to is not included in this readme. To learn more about how to setup Amazon Connect, please read the official [documentation](https://docs.aws.amazon.com/connect/).

If you would like to export the contact flows from the Amazon Connect instance that these Lambda functions were developed for, please follow these steps:

1. Login to the Amazon Connect instance:
   Login link:
   - https://felixchin.awsapps.com/connect/login
   
   Guest login credentials:
   - Username: guestUser
   - Password: Password1
   
2. Starting from the navbar on the left hand side, navigate to `Routing`, then to `Contact flows`.

3. Select `Cat Facts contact flow`, then click the `Export flow` button at the top right.

4. Repeat steps 2 & 3 for the following contact flows:
  - `Cat Facts music queue flow with callback flow - English`
  - `Cat Facts music queue flow with callback flow - Spanish`
  
### Features

- Three contact flows created:
  - One primary contact flow to handle the majority of the functionality
  - Two queue flows to handle hold music and callback queues
- Checks hours of operation and ends call if out of hours
- Multilanguage support for English and Spanish
- Several branching DTMF menus that allow the user to use the keypad to choose how to proceed
- Hold music while in the queue, interrupts every 10 sec with the option to enter a callback queue instead
- Implements loop contact blocks to loop through a flow a set amount of times before ending call upon completion of the loop
- Invokes three Lambda functions
  - catFacts: Calls the Cat Facts API to retrieve and return a random cat fact
  - getWeather: Takes a zipcode entered via keypad by the user as an input, calls the Open Weather Map API, and then returns the current weather for that location
  - translateText: Takes English text as an input, translates the text to Spanish via the MyMemory translator API, and returns the translated text
- Lambda functions were created, tested, and deployed using Serverless Framework
