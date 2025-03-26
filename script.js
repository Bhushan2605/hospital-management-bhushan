// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, sendPasswordResetEmail, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-VoVtqXZ3BILqWcjSthfSD-Dff-dIhRQ",
    authDomain: "hospital-management-b850a.firebaseapp.com",
    projectId: "hospital-management-b850a",
    storageBucket: "hospital-management-b850a.appspot.com",
    messagingSenderId: "894878469846",
    appId: "1:894878469846:web:f4526756889120b0a1c377",
    measurementId: "G-VHBLK493CT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to toggle Authentication Modal
window.toggleAuth = function () {
    let authContainer = document.getElementById("authContainer");
    authContainer.style.display = (authContainer.style.display === "block") ? "none" : "block";
};

// Register User
window.register = function () {
    let name = document.getElementById("registerName").value.trim();
    let age = document.getElementById("registerAge").value.trim();
    let email = document.getElementById("registerEmail").value.trim();
    let password = document.getElementById("registerPassword").value.trim();

    if (!name || !age || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("User Registered Successfully! Welcome " + name);
            document.getElementById("authContainer").style.display = "none"; // Hide modal
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

// Login User
window.login = function () {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful! Welcome " + userCredential.user.email);
            document.getElementById("authContainer").style.display = "none"; // Hide modal
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

// Logout User
window.logout = function () {
    signOut(auth).then(() => {
        alert("User Logged Out!");
    }).catch((error) => {
        alert("Error: " + error.message);
    });
};

// Password Reset
window.resetPassword = function () {
    let email = document.getElementById("resetEmail").value.trim();

    if (!email) {
        alert("Please enter your email for password reset.");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset link sent! Check your email.");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

// Auth State Change Listener
document.addEventListener("DOMContentLoaded", () => {
    const authLink = document.getElementById("authLink");
    const bookBtn = document.getElementById("bookAppointmentBtn");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            authLink.textContent = "Logout";
            authLink.style.color = "red";
            authLink.onclick = logout;

            // Enable Appointment Booking
            if (bookBtn) {
                bookBtn.addEventListener("click", () => {
                    window.location.href = "appointment.html";
                });
            }
        } else {
            authLink.textContent = "Login/Register";
            authLink.style.color = "blue";
            authLink.onclick = toggleAuth;

            // Restrict Appointment Booking
            if (bookBtn) {
                bookBtn.addEventListener("click", () => {
                    alert("You must be logged in to book an appointment.");
                    toggleAuth();
                });
            }
        }
    });
});
