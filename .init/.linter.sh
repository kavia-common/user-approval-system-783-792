#!/bin/bash
cd /tmp/kavia/workspace/code-generation/user-approval-system-783-792/dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

