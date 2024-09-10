The application is also working and is just the screens that we prototyped. Because I already set up my environment for Iphone, for a course that I did before, Is ready to be tested on Iphone, so if you have Mac, you need to install Xcode and you can run the application and if you have Iphone you can even download it in there and use it in the phone. 

After the presentation Im going to set up the permissions to use it in Android. In the mean time, you guys should download Android Studio and set up a demo android phone. This can be done in Mac and Windows.

```shell
cd MLY/
npm install     # only need at the first time or after changes in `package.json` and `package-lock.json`
npm react-native run-ios
```

This should open Xcode and run an iPhone in your Macbook (Later will be `npx react-native run-android`)

If you get some errors for missing libraries, install them like for example `npm install @react-navigation/native` or `npm install library_name`.