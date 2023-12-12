// "use client";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";

// const Form = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // console.log("submitted");
//     try {
//       await signIn("credentials", {
//         email,

//         redirect: false,
//       });
//       console.log("sign in result", email);
//     } catch (error) {
//       console.log("error during Authentication", error);
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-2 mx-auto max-w-md mt-10"
//       >
//         <input
//           type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           className="border border-black text-black"
//         />

//         <button type="submit"> Login</button>
//       </form>
//     </div>
//   );
// };

// export default Form;
"use client";
import React, { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  //   const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    console.log(email);

    if (!email.trim()) {
      setError(true);
    } else {
      const payload = { email };
      const response = await signIn("credentials", {
        ...payload,
        redirect: false,
        callbackUrl: "http://localhost:3000",
      });
      console.log("response", response);
      if (!response?.error) {
        const session = await getSession();
        console.log("session", session);
        router.push(`/`);
      }
    }
  };

  return (
    <div>
      <div>
        <input
          className="border border-black text-black"
          type="text"
          placeholder="Email"
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>{error && !email.trim() && <small>Email is required</small>}</div>
      {/* <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
      </div> */}
      {/* <div>
        {error && !password.trim() && <small>Password is required</small>}
      </div> */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
