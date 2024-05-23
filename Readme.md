## Clone the repository:

```bash
git clone https://github.com/sammy429b/Backend-Task.git
```

### Navigate to the client directory:

```bash
cd Backend-Task\client
```

### Install dependencies:

```bash
npm install
```
or
```bash
yarn install
```

### Start the development server:

```bash
npm run dev
```
or

```bash
yarn run dev
```

### Open the app in your browser:
```bash
http://localhost:5173/
```

# Backend Configuration
Before running the server, you need to configure certain settings. 

### Environment Variables
Create a `.env` file in the root directory of your project and add the following variables:

```plaintext
PORT = 3000
MONGO_URI = "YOUR_MONGODB_URI"
TRANSCATION_API = "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
```

### Running the Server
To run the Express server, follow these steps:
1. Open a command line or terminal window.
2. Navigate to the project directory if you haven't already done so.
    ``` 
    cd Backend-Task\server
    ```
3. Install dependencies by running the following command:
    ```
    npm install
    ```
4. Once the dependencies are installed, start the development server by running the following command:
    ```
    npm run dev
    ```
    or

    Start the production server by running the following command:
     ```
    npm run start
    ```

5. If the server starts successfully, you should see a message indicating that the server is running and listening on a specific port.