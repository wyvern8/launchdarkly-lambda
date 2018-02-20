# LaunchDarkly Lambda
<!--

[![npm version](https://badge.fury.io/js/launchdarkly-lambda.svg)](https://badge.fury.io/js/launchdarkly-lambda)
[![Build Status](https://travis-ci.org/wyvern8/launchdarkly-lambda.svg?branch=master)](https://travis-ci.org/wyvern8/launchdarkly-lambda)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/wyvern8/launchdarkly-lambda.svg)](https://codeclimate.com/github/wyvern8/launchdarkly-lambda)
[![Test Coverage](https://codeclimate.com/github/wyvern8/launchdarkly-lambda/badges/coverage.svg)](https://codeclimate.com/github/wyvern8/launchdarkly-lambda/coverage)
[![Greenkeeper badge](https://badges.greenkeeper.io/wyvern8/launchdarkly-lambda.svg)](https://greenkeeper.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?clear)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
 -->


Automate LaunchDarkly flag updates from AWS events.

## Why?
This is a proof of concept.  The idea is that when certain services are not available
we may want to turn off related features automatically.

## How?
An AWS Lambda function is configured to listen to AWS CloudWatch events, and toggle flags accordingly.
At this stage a single flag is toggled based on EC2 instance state.

## Install
You will need to have configured https://serverless.com/ framework and aws sdk.

1. clone this repo
1. run `npm install`
1. configure a `.env` file based on `.envExample`
1. run `npm run sls-deploy`
1. stop and start the instance you configured in `.env` and confirm the LaunchDarkly flag toggles on and off.

You can tail the Lambda logs while stopping and starting using `npm run sls-logs`

## Config
As this is an initial prototype, it currently supports one flag toggled off when a single instance is
not in 'running' state, and back on when it is running.   This could be expanded to cater for a configurable list of events and associated flags (TODO).
Event types: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/EventTypes.html

Note that a couple of workarounds for loading swagger.yaml in Lambda are currently in place - this will be tidied up.