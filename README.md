# Log Management Tool

## Brief Overview

The project consists of frontend and server folders.
For every filter change an API call is made with a delay
There is no Apply or Filter button used.
Tailwind is used to style the components.
Most of the components are native except for a few which can be complex.

**Note - Please install node version 20.19.x to run the project. **

## How to run

1. Go to [Project](https://github.com/Vishal0Prasad/logs-tool)
2. ```
   git clone https://github.com/Vishal0Prasad/logs-tool.git
   ```

Run the frontend and server into 2 separate terminals

## Server

1. ```
   cd server
   ```

2. ```
   yarn install
   ```

3. ```
   yarn dev
   ```

## Frontend

1. ```
   cd frontend
   ```

2. ```
   yarn install
   ```

3. ```
   yarn dev
   ```

## Following libraries being used

### Frontend

1. `axios` for API calls
2. `lodash` optimization like debounce
3. `react-datepicker` for lightweight date picker component
4. `react-select` for multiselect picker

### Server

1. `chalk` for colored messages
2. `cors` for cors management

## Add a new Log

While there are 10 log entries already, user can still add a new log after running the server with the help of following POST request

```
curl -X POST http://localhost:3000/logs \
  -H "Content-Type: application/json" \
  -d '{
    "level": "error",
    "message": "Failed to connect to database.",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "parentResourceId": "server-5678"
    }
  }'
```
