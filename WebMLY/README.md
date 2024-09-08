The website is just a template to work on now, you can try to interact and understand this.

# Setting up
I wrote some scripts helping you to install dependencies and run both frontend and backend with single command. You need to make these scripts *executable*.

```shell
chmod +x install.sh
chmod +x run.sh
```

You only need to do this at the first time, or after anything changes in `package.json` and `package-lock.json`

```shell
cd WebMLY/
./install.sh
```

# Running the web app 
```shell
cd WebMLY/
./run.sh
```

It'll auto open our website on your browser. If not, visit [this link](localhost:3000) to see it.

You can read the `/logs` folder for any outputs/errors from the backend and frontend.

# Errors
If you faced DevServer related error while starting the web, try to add `.env` file inside this `WebMLY` folder:
```shell
DANGEROUSLY_DISABLE_HOST_CHECK=true
```