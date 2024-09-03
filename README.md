In here you can find a folder for the website and another for the application.



The website is just a template to work on, Im not good a design so I just did a basic one so we can start to make some changes to it.



The application is also working and is just the screens that we prototyped. Because I already set up my environment for Iphone, for a course that I did before, Is ready to be tested on Iphone, so if you have Mac, you need to install Xcode and you can run the application and if you have Iphone you can even download it in there and use it in the phone. 



After the presentation Im going to set up the permissions to use it in Android. In the mean time, you guys should download Android Studio and set up a demo android phone. This can be done in Mac and Windows.



Again, the code for both is just the front-end, so you can move through the screen and press some buttons, but there is still no back-end linked to this. 



# How to run each the applications:

## Website
```
cd WebMLY/
npm install
npm start
```

## Mobile
```
cd MLY/
npm install
npm react-native run-ios
```

This should open Xcode and run an iPhone in your Macbook (Later will be `npx react-native run-android`)


*I dont know if this will work at first, I wonder if you need to install all the libraries in your computer or the libraries are already in the repository. If you get some errors for missing libraries, install them like for example `npm install @react-navigation/native` or `npm install library_name`.
