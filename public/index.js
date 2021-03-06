(function () {
    const txtEmail = document.getElementById("exampleInputEmail1");
    const txtPassword = document.getElementById("exampleInputPassword1");
    const btnLogIn = document.getElementById("login-btn");
    const btnSignUp = document.getElementById("sign-up-button");
    const btnLogOut = document.getElementById("log-out-button");
    const logTitle = document.getElementById("logTitle");
    const loginPane = document.getElementById("loginPane");
    const bioDiv = document.getElementById("bioDiv");
    const txtDB = document.getElementById("bio");

    btnLogIn.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => {
            console.log(e.message)
            alert("User does not exist!");
        });
    });

    btnSignUp.addEventListener('click', e => {
        // TODO: Validate Email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    var uid;

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            uid = firebaseUser.uid;
            console.log(firebaseUser);
            btnLogOut.classList.remove("hide");
            logTitle.innerHTML = "Welcome, " + firebaseUser.email;
            loginPane.classList.add("hide");
            bioDiv.classList.remove("hide");
            const dbRefObject = firebase.database().ref().child("users/" + uid + "/bio");
            dbRefObject.on('value', snap => {
                console.log(snap.val());
                txtDB.innerHTML = snap.val();
            });

        } else {
            console.log("not logged in");
            btnLogOut.classList.add("hide");
            logTitle.innerHTML = "Login";
            loginPane.classList.remove("hide");
            bioDiv.classList.add("hide");
        }
    });









})();
