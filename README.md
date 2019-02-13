# MazeApp

# Prerequisites

Latest version of nodejs
https://nodejs.org/en/download/

# Run Options

Pull/download source code locally.

## Docker

Open docker terminal and navigate to the root directory of the code.

Run following commands:

`docker build -t something-clever .`

## Development server

Open command line and navigate to directory and run following commands:

`npm install`
`npm install -g @angular/cli@7.3.1`

Once all installed

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## IIS

Run `ng build --prod --base-href='./mazeapp'` to build the project. 
The build artifacts will be stored in the `dist-iis/maze-app` directory.
Copy content to application under IIS, app name should be mazeapp.

Then local IIS can be navigated using following url:

http://localhost/mazeapp
