
//changing body background for different pages
let paths = window.location.href.split('/');
if (paths[paths.length - 1] === 'signup' || paths[paths.length - 1] === 'login') {
    document.body.style.background = "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
    document.body.style.minHeight = "100vh";
}

// function that is executed on submitting signup form
async function SignupSubmit() {

    document.getElementById('loader').style.display = 'block';
    document.getElementById('verifybtn').style.display = 'none';

    const form = document.getElementById('signupform');
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const name = form.elements['name'].value;

    //fetching response with entered details
    const response = await fetch(`http://localhost:3000/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    let json = await response.json();
    
    if (json.success) {
        localStorage.setItem('token', json.authtoken);
        form.submit();
        document.getElementById('errormsg').innerHTML = " ";
        document.getElementById('errormsg').style.color = "rgb(9 241 0)";
    }else {
            document.getElementById('verifybtn').style.display = 'block';
            document.getElementById('loader').style.display = "none";
        document.getElementById('errormsg').innerHTML = json.message;
    }
}

async function LoginSubmit() {

    document.getElementById('loader').style.display = 'block';
    document.getElementById('verifybtn').style.display = 'none';

    const form = document.getElementById('loginform');
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;

    const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    let json = await response.json();
    
    if (json.success) {
        localStorage.setItem('token', json.authtoken);
        document.getElementById('errormsg').innerHTML = "";
        document.getElementById('errormsg').style.color = "rgb(9 241 0)";
        window.location.replace("http://localhost:3000");
    }
    else {
        document.getElementById('verifybtn').style.display = 'block';
        document.getElementById('loader').style.display = "none";
        document.getElementById('errormsg').innerHTML = json.message;
    }
}

// function for creating a blog
async function CreateBlog() {

    // getting form and authtoken
    const form = document.getElementById('createform');
    const authtoken = localStorage.getItem('token');

    // getting user id through fetch
    let response = await fetch(`http://localhost:3000/auth/getuserid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authtoken': authtoken
        }
    });
    let json = await response.json();

    // appending userID to form and submitting
    const ID = document.createElement('input');
    ID.setAttribute('type', 'text');
    ID.setAttribute('value', json.id);
    ID.style.display = "none";
    ID.setAttribute('name', 'id');
    form.appendChild(ID);
    form.submit();
}

// function to show preive image in forms
function showimage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imgupload').setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
