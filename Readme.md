## Club Management Application
Android Application for managing a particular club in a college.

### Setting Up
Follow https://reactnative.dev/docs/environment-setup for setting up general react-native environment. After setting up, follow these steps:
1. Run `npm i` to install all the required dependencies.
2. Set up react-native firebase as per the instructions in https://rnfirebase.io/#2-android-setup
3. Update the following values as per your needs (not to be left blank)
    * [logo.png](./assets/logo.png)
    * "name" and "displayName" in [app.json](./app.json)
    * "app_name" in [strings.xml](./android/app/src/main/res/values/strings.xml)
    * "ic_launcher_round.png" and "ic_launcher.png" in [1](./android/app/src/main/res/mipmap-hdpi), [2](./android/app/src/main/res/mipmap-mdpi), [3](./android/app/src/main/res/mipmap-xhdpi), [4](./android/app/src/main/res/mipmap-xxhdpi), [5](./android/app/src/main/res/mipmap-xxxhdpi)
    * Give correct path for 'client_id' of "'client_type'=3" from [google-services.json](./android/app/google-services.json) in [googleSignIn](./firebase/googleSignIn.js)
    * Add "key=FCM_KEY" in [notifications.js](./firebase/notifications.js).

### Running in development mode
1. Run `npx react-native start` in terminal.
2. In another terminal window, run `npx-react-native run-android`.

### Running in production mode
Follow this guide https://reactnative.dev/docs/signed-apk-android for more detailed info.
1. Generate new production keystore and add follow firebase setup again as in step 2 of [setting up](#setting-up)
2. Run `cd android && ./gradlew assembleRelease` .

### Usage Guidelines
1. Secretary role is to be provided by the developer.
2. For smooth functioning, ensure that there is only 1 secretary present in the club.


