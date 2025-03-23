**Simple Blog App**

Welcome to the Simple Blog App! This application allows users to create, view, edit, and delete blog posts. It's built with a React front-end and an Express.js back-end, connected to a MongoDB database.

**Features**

    Create Blog Posts: Users can add new blog entries with a title and description.
    
    View Blog Posts: Display a list of all blog entries.
    
    Edit Blog Posts: Modify existing blog entries.
    
    Delete Blog Posts: Remove blog entries from the list.


**Technologies Used**

_Front-end_

    React
    
    Axios
    
    React Icons

_Back-end_

    Express.js
    
    Mongoose
    
    MongoDB

Prerequisites
    
    Node.js installed on your machine.
    
    MongoDB instance running locally or a MongoDB Atlas account.
    
    Git installed on your machine.

**Installation**

Clone the repository:

    git clone https://github.com/magwach/simple-blog-app.git
    cd simple-blog-app
    
Install dependencies for the server:

    cd server
    npm install
    
Install dependencies for the client:

    cd ../client
    npm install

**Running the Application**

Set up environment variables:

In the server directory, create a .env file with the following content:

    MONGO_URI=your_mongodb_connection_string
    PORT=5000

Replace your_mongodb_connection_string with your actual MongoDB connection string.

Start the server:

    cd server
    npm start
  
The server will start on http://localhost:5000.

Start the client:

    cd ../client
    npm start
    
The client will start on http://localhost:3000.


Contributing:
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License:
This project is licensed under the MIT License.

