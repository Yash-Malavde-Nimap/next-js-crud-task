// import { emailRegex, passwordRegex } from "@/library/utility";
// import "./login.css";
// import { PORTAL } from "@/server-info";
// import axios from "axios";
// import { useRouter } from "next/router";

// export default function Login({data}) {
//   const router = useRouter();

//   console.log(data);

//   const findUser = (user) => {
//     // return data.find();
//   };

//   const handleForm = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);

//     let email = formData.get("email");
//     let password = formData.get("password");
//     const role = formData.get("role");

//     if (!emailRegex.test(email)) {
//       alert("Enter a valid email address");
//       email = "";
//       return;
//     }

//     if (!passwordRegex.test(password)) {
//       alert("Enter a valid password");
//       password = "";
//       return;
//     }

//     const payload = {
//       id: Math.floor(Math.random() * 100000),
//       email,
//       password: btoa(password),
//       role,
//       description:"This DATA IS FROM NEXT.js"
//     };
//     console.log(payload);

//     try {
//       await axios.post(`${PORTAL.api_url}/users`, payload);
//       if (!localStorage.getItem("authToken")) {
//         localStorage.setItem("authToken", JSON.stringify(payload));
//       }
//       router.push("/");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="main-body">
//       <form onSubmit={handleForm} className="form-container">
//         <p className="text-white text-2xl text-center">Login</p>
//         <div className="form-input">
//           <label htmlFor="email">Enter Email</label>
//           <input type="text" name="email" autoComplete="off" />
//         </div>
//         <div className="form-input">
//           <label htmlFor="password">Enter Password</label>
//           <input type="password" name="password" autoComplete="off" />
//         </div>

//         <div className="form-input">
//           <label htmlFor="password">Select Role</label>
//           <select name="role">
//             <option value="" disabled>
//               Select Role
//             </option>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         <div className="form-button">
//           <button type="submit">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// }
// export async function getServerSideProps(context) {
//   let url = PORTAL.api_url + "/users";
//   let res = await axios.get(url);

//   console.log(res);

//   let data = res.data;
//   return { props: { data } };
// }

import { emailRegex, passwordRegex } from "@/library/utility";
import "./login.css";
import { PORTAL } from "@/server-info";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Login({ users }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(users);

  // const findUser = (user) => {
  //   // Placeholder for any user search logic if needed
  //   // return data.find();
  // };

  const handleForm = async (formData) => {
    const { email, password, role } = formData;

    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Enter a valid password");
      return;
    }

    const payload = {
      id: "" + Math.floor(Math.random() * 100000),
      email,
      password: btoa(password),
      role,
      description: "This DATA IS FROM NEXT.js",
    };

    try {
      const user = users.find((user) => user.email === email);

      if (user && user.email) {
        if (atob(user.password) !== password) {
          alert("Wrong Password, Please try Again");
          return;
        }

        if (!localStorage.getItem("authToken")) {
          localStorage.setItem("authToken", JSON.stringify(payload));
          router.push("/");
        }
        return;
      } else {
        let confirmed = confirm("No such user, you must create a new Account");

        if (confirmed) {
          router.push("/register");
        }

        // localStorage.setItem("authToken", JSON.stringify(payload));
        // await axios.post(`${PORTAL.api_url}/users`, payload);
        // router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-body">
      <form onSubmit={handleSubmit(handleForm)} className="form-container">
        <p className="heading">Login</p>

        {/* Email Input */}
        <div className="form-input">
          <label htmlFor="email">Enter Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            autoComplete="off"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className="form-input">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            autoComplete="off"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        {/* Role Select */}
        <div className="form-input">
          <label htmlFor="role">Select Role</label>
          <select
            name="role"
            {...register("role", { required: "Role is required" })}
          >
            <option value="user">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="error-text">{errors.role.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="form-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  let url = PORTAL.api_url + "/users";
  let res = await axios.get(url);
  console.log(res.data)
  // if (!res.ok) {
  //   throw new Error(`Failed to fetch data, status code: ${res.status}`);
  // }
  
  let users = res.data;
  return { props: { users } };
}
