#
# Makefile
#

#set default ENV based on your username and hostname
APP_DIR=app
TEST_DIR=tests
#get name of GIT branchse => remove 'feature/' if exists and limit to max 20 characters
GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD | sed -r 's/[\/]+/-/g' | sed -r 's/feature-//g' | cut -c 1-20)
ENV ?= $(GIT_BRANCH)
AWS_DEFAULT_REGION ?= ap-southeast-1

#==========================================================================
# Test and verify quality of the app
serverless:
	#install serverless framework for Continous Deployment
	# npm install -g serverless@1.51.0 || true
	npm install -g serverless
	serverless plugin install -n serverless-plugin-cloudwatch-dashboard
	serverless plugin install -n serverless-python-requirements
	touch $@


requirements: serverless
	pip install -r requirements.txt
	pip install -r tests/test-requirements.txt
	pip install -r load-tests/test-requirements.txt
	touch $@

unittest: requirements
	python -m unittest discover ${TEST_DIR}

coverage: requirements
	python -m coverage --version
	python -m coverage run --source ${APP_DIR} --branch -m unittest discover -v 
	python -m coverage report -m
	python -m coverage html

lint: requirements
	python -m pylint --version
	python -m pylint ${APP_DIR}

security:
	python -m bandit --version
	python -m bandit ${APP_DIR}

code-checks: lint security

deploy:
	@echo "======> Deploying to env $(ENV) <======"
ifeq ($(FUNC),)
	serverless deploy --stage $(ENV) --verbose --region $(AWS_DEFAULT_REGION)
else
	serverless deploy --stage $(ENV) -f $(FUNC) --verbose --region $(AWS_DEFAULT_REGION)
endif

smoke-run:
	@echo "======> Running app on env $(ENV) <======"
	serverless invoke --stage $(ENV) -f getCandidate

smoke-local-run:
	@echo "======> Running app on locally <======"
	python app/candidate.py

sleep:
	sleep 8

logs:
	@echo "======> Getting logs from env $(ENV) <======"
	serverless logs --stage $(ENV) -f getCandidate
	#serverless logs --stage $(ENV) -f postCandidate

run-and-logs: smoke-run sleep logs

e2e-tests: run-and-logs

load-tests:
	ENV=$(ENV) python -m locust -f load-tests/locusttest.py --config load-tests/locust.conf

destroy:
	@echo "======> DELETING in env $(ENV) <======"
	serverless remove --stage $(ENV) --verbose --region $(AWS_DEFAULT_REGION)

ci: code-checks unittest coverage
cd: ci deploy e2e-tests load-tests

.PHONY: e2e-test deploy destroy unittest coverage lint security code-checks smoke-run logs destroy load-tests
