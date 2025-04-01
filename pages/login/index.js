import { emailRegex, passwordRegex } from "@/library/utility";
import "./login.css";
import { PORTAL } from "@/server-info";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login({data}) {
  const router = useRouter();

  console.log(data);

  const findUser = (user) => {
    // return data.find();
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let email = formData.get("email");
    let password = formData.get("password");
    const role = formData.get("role");

    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      email = "";
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Enter a valid password");
      password = "";
      return;
    }

    const payload = {
      id: Math.floor(Math.random() * 100000),
      email,
      password: btoa(password),
      role,
    };
    console.log(payload);

    try {
      await axios.post(`${PORTAL.api_url}/users`, payload);
      if (!localStorage.getItem("authToken")) {
        localStorage.setItem("authToken", JSON.stringify(payload));
      }
      // e.target.reset();
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-body">
      <form onSubmit={handleForm} className="form-container">
        <p className="text-white text-2xl text-center">Login</p>
        <div className="form-input">
          <label htmlFor="email">Enter Email</label>
          <input type="text" name="email" autoComplete="off" />
        </div>
        <div className="form-input">
          <label htmlFor="password">Enter Password</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="form-input">
          <label htmlFor="password">Select Role</label>
          <select name="role">
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

// now the value of the email and password must be set to "" after the login button is clicked and dont add comments in the code'
export async function getServerSideProps(context) {
  let url = PORTAL.api_url + "/users";
  let res = await axios.get(url);

  console.log(res);

  let data = res.data;
  return { props: { data } };
}
