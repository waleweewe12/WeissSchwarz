import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCEKMI1X-UqVRpTiM5eBDj9LZRhKqTqrgs",
    authDomain: "weissschwarz-f48e0.firebaseapp.com",
    projectId: "weissschwarz-f48e0",
    storageBucket: "weissschwarz-f48e0.appspot.com",
    messagingSenderId: "459669214377",
    appId: "1:459669214377:web:d7e71360525a7617b245b8",
    measurementId: "G-DNRTRQZFX4"
}

firebase.initializeApp(firebaseConfig)

export default firebase