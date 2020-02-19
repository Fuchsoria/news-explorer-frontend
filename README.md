# Graduate work news-explorer

## Description
Frontend infrastructure of graduate work and layouts of news application, infrastructure uses webpack configuration and layouts uses BEM methodology.
#### Server Test Link:
[https://news-explorer.fuchsoria.dev](https://news-explorer.fuchsoria.dev)
#### Link to testing in development mode npm run dev:
 (The functionality of the site in development mode will be available only at this link, since cookie assignment is used and CORS permission for domain and subdomains fuchsoria.dev. Link refers to 127.0.0.1. ONLY http protocol, in case of error ssl clear site files / cache in a browser or open in another browser)
[http://test.fuchsoria.dev:8080/](http://test.fuchsoria.dev:8080/)

## Installation
To install, you must have installed nodejs and npm. If installation is carried out on **linux или mac** you may need an installed library **libXi.so.6 (libxi6 libgconf-2-4)**.

Save the project to your computer:

    git clone https://github.com/Fuchsoria/news-explorer-frontend.git

In the root of the project, through the console / terminal, run the command:

    npm install
### After successful installation, the commands become available.:
Raising a local server with development mode:

    npm run dev
Production Version Build:

    npm run build

Deploy on gh-pages:

    npm run deploy
Deploy to the server:

    npm run deploy-scp


