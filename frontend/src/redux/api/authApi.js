import axios from "axios";

// SignUp user
const signUp = async ({ data, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/register`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    return await axios.post(`http://localhost:5000/students/register`, data);
  }
};
// login Teacher
const login = async ({ email, password, cin, codeMassar, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/login`, {
      email,
      password,
    });
  } else {
    return await axios.post(`http://localhost:5000/students/login`, {
      cin,
      codeMassar,
      password,
    });
  }
};

const forgetPassword = async ({ email, cin, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/forgetPassword`, {
      email,
    });
  } else {
    return await axios.post(`http://localhost:5000/students/forgetpassword`, {
      cin,
    });
  }
};
const verifyCode = async ({ verifyCode, _id, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(`http://localhost:5000/teachers/verifyCode`, {
      verifyCode,
      teacherId: _id,
    });
  } else {
    return await axios.post(`http://localhost:5000/students/verifyCode`, {
      verifyCode,
      studentId: _id,
    });
  }
};

export { signUp, login, forgetPassword, verifyCode };
