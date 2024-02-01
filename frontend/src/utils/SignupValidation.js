function Validation (values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if(values.name == '') {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if(values.reg_no === '') {
        error.reg_no = "Reg-no should not be empty"
    }
    else {
        error.reg_no = ""
    }

    if(values.email == '') {
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email didn't match."
    }
    else {
        error.email = ""
    }

    if(values.password === '') {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Password didn't match."
    }
    else {
        error.password = ""
    }

    if(values.mobile == '') {
        error.mobile = "Phone Number should not be empty"
    }
    else {
        error.mobile = ""
    }

    if(values.city == '') {
        error.city = "City should not be empty"
    }
    else {
        error.city = ""
    }

    return error;

}
export default Validation;