# riddleweb
Description :

RiddleWeb is a fun and interactive web application that presents users with random riddles fetched from a public API. Users can think of an answer and then click a button to reveal the correct answer. The app provides an engaging way to challenge your mind with different riddles.

Features :
 1. Random Riddles: Fetches a random riddle from a public API each time the page is loaded.
 2. Check Answer: Allows users to reveal the answer to the current riddle.
 3. Next Riddle: Users can proceed to the next riddle by clicking a button.
 4. Session Management: Utilizes session state to store the current riddle and answer, ensuring a seamless user experience even when navigating between pages.

Session State Management :
 Session Setup: The application uses express-session middleware to manage session state. A secret key ensures the session data is secure.
 
 Riddle Fetching: When a user visits the site, a middleware function checks if a riddle is already stored in the session. If not, it fetches a new riddle from the API and stores it in the session.
 
 Persistent State: The session keeps track of the current riddle and its answer, allowing users to check the answer or fetch a new riddle without losing the current state.

Technologies Used :
Node.js
Express.js
Axios
EJS (Embedded JavaScript Templating)
HTML
CSS

How to run :
1. npm install
2. npm i node express ejs axios express-session
3. node index.js or nodemon index.js
