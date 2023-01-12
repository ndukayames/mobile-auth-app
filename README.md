# mobile-auth-app
A ionic/angular mobile that integrates my <a href ="https://github.com/ndukayames/user-management-service-nodejs">nodejs user management server </a>
<br>
Figma designs from figma community
- <a href="https://www.figma.com/file/Mick7lMqRgnmfQkNB9hzSc/Login-%26-SignUp-(Community)?t=S4L9kHlJ5nKq2Vsd-0"> Login and Signup screen </a>
- <a href="https://www.figma.com/file/NqRcnzYM6jl84d9GNI5S30/User-Interface-profile-(Community)?node-id=10%3A128&t=S4L9kHlJ5nKq2Vsd-0"> Dashboard and Profile details screen </a>
<br>
To run app
- ensure you have ionic and angular installed globally.
- clone repo and run `ionic build` via terminal.
- run `ionic capacitor add ios` if you're running on iOS or `ionic capacitor add android` if you're running on an android device.
- run `ionic capacitor copy ios` to create the ios project which can be used with Xcode or `ionic capacitor copy android` to create the android project which can be used with the android sdk.
- run `ionic capacitor run ios -l --external` to run the project on ios with livereload enabled or `ionic capacitor run android -l --external` to run on android with livereload enabled.

If you plan to make changes or you encounter any error in this process, please read the ionic documentation on development for <a href="https://ionicframework.com/docs/developing/android"> ios </a> or <a href="https://ionicframework.com/docs/developing/android"> android </a>.
