import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
const NSignup = () => {
  const navigate = useNavigate();
  const URL = config.URL;
  useEffect(() => {
    window.otpless = (otplessUser) => {
      console.log(otplessUser);
      axios
        .post(`${URL}/otpless/signup`, otplessUser)
        .then((result) => {
          console.log("post made");
          if (result.data.moreinfoneeded) {
            const sd = {
              reqd: result.data.reqd,
              tbs: result.data.tbs,
            };
            console.log(sd);
            navigate("/login", { state: sd });
          } else {
            console.log(result.data.userinfo);
            localStorage.setItem(
              "userinfo",
              JSON.stringify(result.data.userinfo)
            );
            navigate("/dashboard/properties");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, [navigate]);
  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          id="otpless-sdk"
          src="https://otpless.com/v2/auth.js"
          data-appid="ZSUSUY2QOK5MET8L8ATE"
        ></script>
      </Helmet>
      <div id="otpless-login-page" />
    </>
  );
};

export default NSignup;



























// import React, { useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import config from "../../config";

// const Signup = () => {
//   const navigate = useNavigate();
//   const URL = config.URL; 

//   useEffect(() => {
   
//     const script = document.createElement('script');
//     script.src = 'https://otpless.com/auth.js';
//     script.async = true;
//     document.head.appendChild(script);

//     window.otpless = (otplessUser) => {
//       console.log(otplessUser);
//       axios.post(`${URL}/otpless/signup`, otplessUser)
//         .then((result) => {
//           console.log('post made');
//           if (result.data.moreinfoneeded) {
//             const sd = {
//               reqd: result.data.reqd,
//               tbs: result.data.tbs,
//             };
//             console.log(sd);
//             navigate('/signup', { state: sd });
//           } else {
//             console.log(result.data.userinfo);
//             localStorage.setItem("userinfo", JSON.stringify(result.data.userinfo));
//             navigate('/dashboard/properties');
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };

//     return () => {
      
//       document.head.removeChild(script);
//     };
//   }, [navigate, URL]);

//   return (
//     <>
//       <Helmet>
//         <script type="text/javascript" id="otpless-sdk"  src="https://otpless.com/auth.js" data-appid="ZSUSUY2QOK5MET8L8ATE"></script>
//       </Helmet>

//       <div id="otpless-signup-page" />
//     </>
//   );
// };

// export default Signup;
