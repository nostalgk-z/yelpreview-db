# yelpreview-db
A Nodejs, Express, and PostgreSQL backend for managing a Yelp review web service.
## Dependencies
First things first, we need to download and install all required dependencies.

  - `brew install posgresql` or [Download Installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
  - `brew install node` or [Linux Install Node](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)
  - `npm install` in workspace directory after cloning the repo.
## Start The Server
  __Local__:    
1. Create your own DB using postgres CLI [here](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)   
2. In root workspace directory create `config.js` file with your PostgreSQL user credentials.       
  _config.js template_ .      
```
export const user = 'zanep';     
export const password = 'password'; 
export const database = 'yelpreview';  
export const host = 'localhost';  
export const port = 5432;    
```
3. Go to workspace directory and run `npm start`
