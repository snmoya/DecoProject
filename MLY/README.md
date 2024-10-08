## System Requirements

- Homebrew:
Run the following command in the terminal to install Homebrew:
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
*if you have problems with this instalation visit the website https://brew.sh.

Verify that Homebrew is installed correctly:
```shell
brew -v
```
you should get something like this Homebrew 4.3.24. (the version can be different)

- Node.js, Watchman:
```shell
brew install node
brew install watchman
```
Verify that are installed correctly:
```shell
node -v
watchman -v
```
* Make sure it is Node 18.18 or newer.

Verify that npm was installed as part of node.js:
```shell
npm -v
``` 

- Xcode and Xcode’s Command Line Tools.
Please use the latest version of Xcode.

Command Line Tools:
Open Xcode, and on the menu bar on top,then press Xcode > Settings (or Preferences) > Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

Installing iOS Simulator:
Xcode > Settings (or Preferences) > Components (or Platform) > "+" (plus button at the bottom) > Select iOS.. > Choose a simulator, the latest would be iOS 18.0. 

- CocoaPods: 
Install CocoaPods for managing iOS dependencies.
```shell
sudo gem install cocoapods
```


## Clone the repository

In a new directory run the following command:
```shell
git clone https://github.com/snmoya/DecoProject.git
```
This will clone the complete project (Web + Mobile).


## Running the project

Once all dependencies are installed, you can run the app on an iPhone simulator by following these steps:

1. Open Xcode

2. Run the App on Simulator:

- Get into the project directory were you cloned the github code:
```shell
cd /clonePath
```
*replace "/clonePath" with the actual path of the repository clone.

Move into the Mobile app directory:
```shell
cd DecoProject/MLY
```

- In the project directory, run:

```shell
npm install
```
this will install all the necessary dependencies. 

- Then is necessary to install the dependencies for iOS.
```shell
cd ios
pod install
```
*This might take a while...

- After that, back to the mobile app directory:
```shell
cd ..
```

Finally you can run the project:
```shell
npx react-native run-ios
```

This command automatically will:
- Open a new terminal. (Do not do anything in there).
- Open the iPhone simulator. 
    (Maybe you can get a pop-up window telling that the simulator need to boot, that is ok).
- Your current command line is going to be building the app: "Building the app....." (This takes a while)
- After this, the app should open in the simulator. 
- If by any reason you installed more than one simulator, you can specify a particular one.
```shell
npx react-native run-ios --simulator="iPhone 14"
```


## Problems
If you have any problems in the process please contact the developer team of MLY developers. 


## OPTIONAL: Run the App on a Physical iPhone

1. **Connect your iPhone to your Mac**:
   - Use a USB cable to connect your iPhone to the Mac.
   - Open Xcode and ensure your iPhone appears as a recognized device.

2. **Trust Your Mac on the iPhone**:
   - When prompted, tap **"Trust"** on your iPhone to allow it to connect to the Mac.

3. **Open the Project in Xcode**:
   - Navigate to the `ios` folder and open the `.xcworkspace` file:
     ```shell
     open ios/your_project_name.xcworkspace
     ```

4. **Select Your iPhone as the Build Target**:
   - In Xcode, use the device dropdown in the top toolbar to select your connected iPhone.

5. **Set up a Development Team**:
   - Go to the **"Signing & Capabilities"** tab in Xcode and select a development team.
   - You can use your free Apple ID or a paid developer account.

6. **Trust the Developer on the iPhone**:
   - On your iPhone, go to **Settings** > **General** > **Device Management**.
   - Find your developer account and tap **Trust**.

7. **Build and Run the App**:
   - Press the **Play** button in Xcode to build the app. The app will install on your iPhone.

8. **Troubleshooting**:
   - If you encounter any issues, ensure the development team is correctly set and your Apple ID is valid.
   - You may need to reset the trust settings on your iPhone by going to **Settings** > **General** > **Device Management** and trusting your developer profile again.


