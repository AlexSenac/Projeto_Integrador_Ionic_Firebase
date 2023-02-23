// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  correiosWS: 'http://viacep.com.br/ws',
  firebase: {
    projectId: 'cleantech-72d62',
    appId: '1:445082585349:web:39edf226a4c19510484f6c',
    storageBucket: 'cleantech-72d62.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyA0WmG-SYwt327s4l45x1a79PChh0Z6kEQ',
    authDomain: 'cleantech-72d62.firebaseapp.com',
    messagingSenderId: '445082585349',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
