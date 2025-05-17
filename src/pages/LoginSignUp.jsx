import React, { useEffect, useState, useContext } from 'react'
import './CSS/Loginsignu.css'
import { useNavigate } from 'react-router-dom';
import { ShopContext} from '../context/ShopContext';

const LoginSignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [signOrLogin , setSignOrLogin] = useState("Login");
    const navigate = useNavigate();
    const { handleLogin } = useContext(ShopContext); // Assuming you have a context for managing login state 


    useEffect(()=> {
      setTimeout(function(){
        setMsg("");
      }, 15000);
    }, [msg]);
    
    const handleInputChange = (e, type) => {
      switch (type) {
          case "fullName":
              setError("");
              const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and white spaces
              setFullName(e.target.value);
              if (e.target.value === "") {
                  setError("Full name cannot be empty");
              } else if (!nameRegex.test(e.target.value)) {
                  setError("Full name can only contain letters and white spaces");
              }
              break;
  
          case "email":
              setError("");
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email validation regex
              setEmail(e.target.value);
              if (e.target.value === "") {
                  setError("Email cannot be empty");
              } else if (!emailRegex.test(e.target.value)) {
                  setError("Invalid email format");
              }
              break;
  
          case "password":
              setError("");
              const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least one capital letter, one small letter, one number, and minimum 8 characters
              setPassword(e.target.value);
              if (e.target.value === "") {
                  setError("Password cannot be empty");
              } else if (!passwordRegex.test(e.target.value) && signOrLogin === 'signUp') {
                  setError("Password must contain  a capital & small letter, number, and be at least 8 characters long");
              }
              break;
  
          default:
              break;
      }
  };
  
  const handleSignUpSubmit = async () => {
      const fullNamePart = fullName.trim().split(" ");
  
      if (fullNamePart.length > 1) {
          const firstName = fullNamePart[0];
          const lastName = fullNamePart[1];
  
          if (firstName && lastName && email && password) {
              const nameRegex = /^[a-zA-Z\s]+$/;
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
              if (!nameRegex.test(fullName)) {
                  setError("Full name can only contain letters and white spaces");
                  return;
              }
  
              if (!emailRegex.test(email)) {
                  setError("Invalid email format");
                  return;
              }
  
              if (!passwordRegex.test(password)) {
                  setError("Password must contain capital & small letter,  number, and be at least 8 characters long");
        
                      setPassword("");
                  return;
              }
  
              const url = "https://poultryfarms.liveblog365.com/proxy.php";
              const headers = {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              };
              const data = {
                  fName: firstName,
                  lName: lastName,
                  email,
                  password,
              };
  
              try {
                  const response = await fetch(url, {
                      method: "POST",
                      headers: headers,
                      body: JSON.stringify(data),
                      mode: "cors",
                  });
  
                  const result = await response.json().catch(() => {
                      setError("Invalid response from server.");
                      return null; // Return null or handle accordingly
                  });
  
                  if (result && response.ok) {
                      setMsg(result[0].result); // Adjust based on your backend response
                      // Reset fields only on success
                      setFullName("");
                      setEmail("");
                      setPassword("");
                      handleLogin(); // Notify ShopContext of successful login
                      navigate("/"); // Redirect to the Meat category page
                  } else {
                    setError(result && result[0] ? result.result : "An error occurred during signup.");
                    setFullName("");
                      setEmail("");
                      setPassword("");
                  }
              } catch (err) {
                  setError("Network error: " + err.message);
                  console.error(err);
              }
          } else {
              setError("All fields are required");
          }
      } else {
          setError("Write the full name");
      }
  };

  const handleLoginSubmit = async () => {
    if (email && password) {
        const url = "http://localhost/poultry/login.php";
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        const data = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                credentials: "include", // Include cookies for session handlin
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonResponse = await response.json();

            // Access the result field directly
            if (jsonResponse.result === "Login successful!") {
                setMsg(jsonResponse.result); // Show success message
                setEmail("");
                setPassword("");
                handleLogin(); // Notify ShopContext of successful login
                navigate('/meat'); // Redirect to the Meat category page
            } else {
                setError(jsonResponse.result || "An error occurred during login.");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            setError("Network error: " + err.message);
            console.error(err);
        }
    } else {
        setError("All fields are required!");
    }
};


   
  return (
    <div className='loginsignup'>
      <div className="loginsignup_container">
       {signOrLogin === "SignUp"? <h1>Sign Up</h1> : <h1> Login </h1>} 
        <p>
          {
            msg !== "" ?
            <span className="succesmsg">{msg}</span> :
            <span className="errormsg">{error}</span>            
          }
        </p>
        <div className="loginsignup_fields">
          {signOrLogin === "SignUp" ?  <input type="text" name='fName' placeholder='Full name' value={fullName} 
            onChange={(e) => handleInputChange(e, "fullName")}/> : <p/>}
         
          <input type="email" name='email' placeholder='Email Address' value={email}
             onChange={(e) => handleInputChange(e, "email")}/>
          <input type="password" name='password' placeholder='password' value={password}
             onChange={(e) => handleInputChange(e, "password")}/>
        </div>
        <button onClick={() => { signOrLogin === "SignUp"? handleSignUpSubmit() : handleLoginSubmit()  } }>Continue</button>
        <p className="loginsignup_login">
          {signOrLogin === "SignUp"?
            <p>Already have an Account? <span onClick={() => setSignOrLogin("Login")}>Login here</span></p>:
            <p>Haven't an Account? <span onClick={() => setSignOrLogin("SignUp")}>Click here</span></p>
          }
          
        </p>
        <div className="loginsignup_agree">
          <input type="checkbox" id='' name='' />
          <p>By continuing, I agree to the terms of use privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignUp
