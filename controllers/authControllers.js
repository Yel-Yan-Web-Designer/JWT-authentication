// controller action 

const signup_get = (req, res) =>{
    res.render("sign up get")
}

const login_get = (req, res) => {
    res.send("login get");
}

const signup_post =  (req, res) => {
    const { email, password} = req.body;
    console.log(email, password);
    res.send("new sign up");
}

const login_post = (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.send("login post")
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}