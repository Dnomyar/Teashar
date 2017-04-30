# Teashar

Teashar (contraction of Teacher and share) is very basic Ionic 2 app. The goal of this app is to enable teachers to upload a media for their students. 

I used Firebase to store data and media. 


## The app
Here is what it's looks like : 
![Picture of what it looks like](/teashar.png?raw=true)

It is also possible to remove a entry : 
![Picture that shows the options to apply to a entry](/show_option.PNG?raw=true)

This is the student view :  
![Picture that shows the student view](/student_view.PNG?raw=true)


## Before run
### Setup firebase
To setup firebase : 

- go to [https://console.firebase.google.com/](https://console.firebase.google.com/),
- add a project,
- click on `add firebase to your web app` and copy the JS object,
- copy and rename `src/app/app.firebase.conf.ts.default` to `src/app/app.firebase.conf.ts` (remove `.default`) and fill in the file with the copied object. 

#### Authorization (for dev phase only)
##### In database section
You also have to update security rules (for dev phase only). Go to tab `Database` > `Rules` update JSON array to :
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

##### In storage section
It is the same for the storage section.  Go to tab `Storage` > `Rules` update JSON array to :
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```
### Install npm dependancies
Run `npm i`

## How to run ...

### ... in web browser (restricted mode)
To test in browser, run `$ ionic serve`

### ... in the emulator
`$ ionic emulate ios`

### ... in an iPhone 
After having run `$ ionic emulate ios`, you can open `./platforms/ios` with Xcode and run the project. 

You may have to add a team (more explanation here : [https://forum.ionicframework.com/t/ionic-package-ios-build-fails/65033/13](https://forum.ionicframework.com/t/ionic-package-ios-build-fails/65033/13))
