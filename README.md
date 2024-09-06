In here you can find a `WebMLY` folder for the website and `MLY` for the mobile application.

# How to run each the applications:

## Version check before starting
**To ensure everyone using the same version of Node.js, please do this before running the backend.**

```shell
node -v     # If it's not 19.9.0, please do below steps

nvm install 19.9.0
nvm use 19.9.0
nvm alias default 19.9.0    # Set 19.9.0 as the default version
```

## Website
The website is just a template to work on now, you can try to interact and understand this.

### Setting up
You only need to do this at the first time, or after anything changes in `package.json` and `package-lock.json`

```shell
cd WebMLY/

cd backend/     # install dependencies for the backend
npm install

cd frontend/    # install dependencies for the frontend
npm install
```

### Running the web app 
```shell
cd WebMLY/

cd backend/     # run the backend
node index.js

cd frontend/    # run the frontend
npm start
```

## Mobile
The application is also working and is just the screens that we prototyped. Because I already set up my environment for Iphone, for a course that I did before, Is ready to be tested on Iphone, so if you have Mac, you need to install Xcode and you can run the application and if you have Iphone you can even download it in there and use it in the phone. 

After the presentation Im going to set up the permissions to use it in Android. In the mean time, you guys should download Android Studio and set up a demo android phone. This can be done in Mac and Windows.

```shell
cd MLY/
npm install     # only need at the first time or after changes in `package.json` and `package-lock.json`
npm react-native run-ios
```

This should open Xcode and run an iPhone in your Macbook (Later will be `npx react-native run-android`)

If you get some errors for missing libraries, install them like for example `npm install @react-navigation/native` or `npm install library_name`.
