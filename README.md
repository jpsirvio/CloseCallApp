# CloseCallApp
## Introduction
CloseCall is mobile device application to track near-Earth Objects (NEOs) in relative close proximity. The application uses open NASA NeoWs API to fetch current day NEOs and lists object details. Application User can store single NEOs in the application for later follow ups.
## Installation
Fork and initialize the code in command line with following commands:
```
git clone https://github.com/jpsirvio/CloseCallApp
cd CloseCallApp
npm install
npm run start
```
To run the application npm and several modules are required. Install these with following commands:
```
npm install react-navigation @react-navigation/native @react-navigation/bottom-tabs axios expo-sqlite react-native-elements
```
NASA API key is required for the application to work. Add .env file with following contents to the root folder:
```
NASA_API_KEY=DEMO_KEY
```
Personal NASA API Key can be generated by registering at (api.nasa.gov)[https://api.nasa.gov/]
## Technical details
This application uses React Native, SQLite and Firebase. Modules used by the application are react-navigation/native and react-navigation/bottom-tabs for navigation, axios for API calls, expo-sqlite for database operations, react-native-elements for UI layout and firebase/app, firebase/auth for authentication.
## Known bugs
Navigating to NEO details screen in Saved NEOs highlights Current NEOs icon.
Navigating back from Current NEOs screen to Current NEOs returns to the NEO details screen if one was open, instead of the Current NEOs screen.
## To do
* Code cleanup
