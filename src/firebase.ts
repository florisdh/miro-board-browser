import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBr1RiyLGGN-JX9-4bYt7WqBnZVsSS5BN8",
    authDomain: "miro-board-browser.firebaseapp.com",
    projectId: "miro-board-browser",
    storageBucket: "miro-board-browser.appspot.com",
    messagingSenderId: "956785279403",
    appId: "1:956785279403:web:96b1708afa04b932ca52ee",
    measurementId: "G-05HZSDDXJS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export const sendMetricBoardOpened = () => {
//     analytics.
// }

// export sendMetricBoardEmbedded = () => {

// }
