#!/bin/bash

source ./credentials.sh prifina-123 eu-west-1

node testing-revert.js
node delete-prifina-session.js 
node testing-init-ddb.js 
pushd ../packages/app-testing

export USERNAME=testing-1
export PASSWORD='Testing12!#'
export TEST_URL='http://localhost:3000'

# running jest script... 
node_modules/.bin/jest __tests__/0.10/home.test.js 

popd
