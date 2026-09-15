// Import Firebase scripts for the Service Worker
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js');

// Initialize Firebase in the background
const firebaseConfig = {
    apiKey: "AIzaSyAp8tKgVyc6PC-yt0Nv4nOOtH8B8jCaSYE",
    authDomain: "medpyq-elearning.firebaseapp.com",
    databaseURL: "https://medpyq-elearning-default-rtdb.firebaseio.com",
    projectId: "medpyq-elearning",
    messagingSenderId: "851775924721",
    appId: "1:851775924721:web:7d40eb80e421df7ebefc50"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// This runs when the browser is CLOSED and the server sends a push
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title || 'MedPYQ Alert';
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2913/2913008.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/2913/2913008.png',
        data: { url: payload.data ? payload.data.url : 'https://medpyq.github.io/' }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
