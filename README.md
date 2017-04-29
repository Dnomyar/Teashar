# Teashar


## Before run, setup firebase
To setup firebase : 

- go to [https://console.firebase.google.com/](https://console.firebase.google.com/),
- add a project,
- click on `add firebase to your web app` and copy the JS object,
- copy and rename `src/app/app.firebase.conf.ts.default` to `src/app/app.firebase.conf.ts` (remove `.default`) and fill in the file with the copied object. 

### Authorization (for dev phase only)
You also have to update security rules (for dev phase only). Go to tab `Database` > `Rules` update JSON array to :
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

