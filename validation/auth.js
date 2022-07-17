function signUpValidation (name, lastName, email, password){
    if (!name || !lastName || !password || !email){
        return false ;
    }
    else{
        return true;
    }
}

function signInValidation(email, password) {
    if(!email || !password){
        return false;
    }
    else
    {
        return true;
    }
}

module.exports = {signUpValidation, signInValidation};