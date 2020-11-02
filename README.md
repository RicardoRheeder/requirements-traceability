# Requirements Traceability
This project is a tool that allows for a team to collaboratively work on a software requirements document and be able to see and how the document changes over time. This software allows for users to make high level requirements that can be broken down into low level requirements, then design, and then source code in such a way that the relationship between each of these components is apparent. A key component of this project is a versioning system to ensure that history of the requirements is preserved and that their is a versioning identifier to track changes that the document has gone through. In addition every component (High level requirement, low level requirements, etc) should have a unique identifier.
## Front-end (REACT) Usage

Ensure that you have Node.js installed on your local machine: https://treehouse.github.io/installation-guides/windows/node-windows.html.

Clone the repository to your local machine.

`git clone https://git.cs.usask.ca/CMPT371-01-2020/requirements-traceability.git`

Using terminal application for command-line users (e.g. git bash), navigate to the cloned repository.

Change directory to "**client**".

`cd client`

**Important**: The front-end will not run if you do not have the '.env' file within the '**client**' folder. The '.env' file IS NOT pushed to the repository - it contains sensitive config info. Instead, it is pinned on the 'front-end' chat on Discord.

- Download the pinned env file from the front-end chat in Discord.
- Move the downloaded env to the **client** folder.
  - (the env file should be in the same directory as the package.json file)
- Rename the env file to '.env'

Download and install the project's dependencies defined in the package.json file and generates a node_modules folder with the installed modules.

`npm install`

Run the application.

`npm start`

The localhost URL will be visually displayed within the terminal window (http://localhost:9090/ by default). 

Navigate to the localhost URL.

## Back-end Usage

Change directory to "**backend**" 

`cd backend`

**Important**: The back-end will not run if you do not have the '.env' file within the '**backend**' folder. The '.env' file IS NOT pushed to the repository - it contains sensitive config info. Instead, it is pinned on the 'back-end' chat on Discord.

- Download the pinned env file from the back-end chat in Discord.
- Move the downloaded env to the **backend** folder.
  - (the env file should be in the same directory as the package.json file)
- Rename the env file to '.env'

Download and install the project's dependencies defined in the package.json file and generates a node_modules folder with the installed modules.

`npm install` 

Run the application 

`node server` 

Open your preferred browser and go to (http://localhost:5000)