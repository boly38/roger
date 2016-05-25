#!/bin/bash
WEBAPPRUNNER=module_webapp/target/dependency/webapp-runner.jar
# AUTH=--enable-basic-auth
java $JAVA_OPTS -jar $WEBAPPRUNNER $AUTH module_webapp/target/roger
