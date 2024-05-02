### README: Fuelight360


### Prerequisites

Before you begin, ensure you have the following software installed on your local machine:

- **Node.js**: [Download Node.js](https://nodejs.org/) (includes npm) or `brew install node`, required for the React frontend and Azure Functions backend.
- **Azure Functions Core Tools v4**: This allows local development of Azure Functions. [Installation guide](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-javascript#install-the-azure-functions-core-tools)
- **MySQL**: We will leverage docker to run a local instance of MySQL. [Download Docker](https://www.docker.com/get-started)

### VSCode
It is highly recommeded to leverage VSCode for development of Fuelight360 due to the Azure stack we will leverage.  The stack includes Azure Function and Azure Static Web Apps with JS and we recommend you install this packages to your VSCode to assit in development:
    - [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
    - [Azure Tools extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)

---

### Setting Up the Project

1. **Install Dependencies**
   - For the frontend (React):
     ```
     cd ui
     npm install
     ```
   - For the backend (Azure Functions):
     ```
     cd api
     npm install
     ```

2. **Set Up Local Development Database**


    **Start MySQL Container**:
   - Navigate to the root directory of the project where the `docker-compose.yml` file is located and run the following command to start the MySQL server:
        ```bash
        npm run start:db
        ```
        This command will initiate a MySQL instance running in a Docker container.

    **Environment Configuration**:
   - Ensure your local (`api/src/config/config.json`) environment variables for database connections match those specified in the `docker-compose.yml`.



3. **Configure Environment Variables and Function Settings**
   - Create `.env.local` in the `ui` root with the following content:
     ```
     REACT_APP_API_URL=http://localhost:7071/api
     ```
   - Create the `local.settings.json` in the `api` root  for Azure Functions:
     ```json
     {
       "IsEncrypted": false,
       "Values": {
         "AzureWebJobsStorage": "UseDevelopmentStorage=true",
         "FUNCTIONS_WORKER_RUNTIME": "node"
       },
       "Host": {
         "CORS": "http://localhost:3000",
         "CORSCredentials": true
       }
     }
     ```

4. **Run the db migration**
    - From the `api/src/db` folder Apply migrations to update the database schema:
        ```bash
        npx sequelize-cli db:migrate
        ```
    This command applies all pending migrations to the local MySQL database.

5. **Start the Development Servers**
    - Start the Azure Functions locally:
        ```
        cd api
        npm start
        ```
        This will run the backend on `http://localhost:7071`.  
        
   - Start the React application:
     ```
     cd ui
     npm start
     ```
     This will run the frontend on `http://localhost:3000`.
   


---

### Managing Database Migrations with Sequelize

#### Setup

- Install Sequelize CLI and MySQL driver **if not already installed**:
  ```bash
  npm install --save sequelize sequelize-cli mysql2
  ```

#### Creating Migrations

- To create a new migration (e.g., for a new table), run:
  ```bash
  npx sequelize-cli migration:generate --name create-example
  ```
  Replace `create-example` with a descriptive name for your migration. This command creates a new file in the `migrations` directory.

#### Running Migrations

- Apply migrations to update the database schema:
  ```bash
  npx sequelize-cli db:migrate
  ```
  This command applies all pending migrations to the local MySQL database.

#### Creating Models

- To create a new model, use:
  ```bash
  npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
  ```
  Customize the command parameters to fit the model you are creating.


---
### Development Practices

- It is easy to add new functions to the API. From `api/` root, run the following command `func new --name <FUNCTION_NAME> --template "HTTP trigger" --authlevel anonymous`. Replace FUNCTION_NAME with the name of the function you want. `--authlevel anonymous` is a setting for local development *only*

---

### Troubleshooting

- **CORS Issues**: Ensure the CORS settings in `local.settings.json` are correct. The frontend URL should be allowed to make cross-origin requests to the Azure Functions.
- **React Router v6**: Make sure that all route definitions use `<Routes>` and `<Route element={}>` as described in the React Router documentation.
- **JSON Parsing Errors**: Verify that the backend correctly returns JSON-formatted responses. Use `JSON.stringify()` for any non-object response bodies or set the correct headers.
