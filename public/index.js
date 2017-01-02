(function () {
    const txtEmail = document.getElementById("exampleInputEmail1");
    const txtPassword = document.getElementById("exampleInputPassword1");
    const btnLogIn = document.getElementById("login-btn");
    const btnSignUp = document.getElementById("sign-up-button");
    const btnLogOut = document.getElementById("log-out-button");

    btnLogIn.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
       if(firebaseUser) {
           console.log(firebaseUser);
       } else {
           console.log("not logged in");
       }
    });

})();
