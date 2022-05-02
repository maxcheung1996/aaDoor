import React from "react";
import { sqlExecuteStatement } from "../database/Utils/sqlite";

// Class object for authInfo(user login data info)
type UserDataInterface = { initialized: boolean; loggedIn: boolean; user: any };

// Interface for AuthContext Method eg. login()
type MyContextInterface = {
  authInfo: UserDataInterface;
  initialize: () => Promise<boolean>;
  logOut: () => Promise<boolean>;
  logIn: (email: string, password: string) => Promise<boolean>;
};

// create the context
export const AuthContext = React.createContext<MyContextInterface | undefined>(
  undefined
);

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...
type Props = {
  children: React.ReactNode;
};
export const AuthProvider: React.FC = (props: any) => {
  // the reactive values
  const [authInfo, setAuthInfo] = React.useState<UserDataInterface>();

  const logOut = () => {
    return new Promise((resolve) => {
      window.localStorage.removeItem("AUTH");
      setAuthInfo({ initialized: true, loggedIn: false, user: null });
      setTimeout(() => {
        return resolve(true);
      }, 1000);
    });
  };

  const fetchUserToken = async (email: string, password: string) => {
    let data = {
      Username: email,
      Password: password,
    };

    let userDetails = {
      token: "",
      user: "",
    };

    let url = `https://dev.socam.com/aahkapi/api/Authenticate/login`;
    alert(data);
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        userDetails.token = data.token;
        userDetails.user = email;
      });

    return userDetails;
  };

  const logIn = async (email: string, password: string) => {
    let userLoginAuth: Boolean = false;
    //let res = await fetchUserToken(email, password);
    userLoginAuth =
      email === "itadmin" && password == "Abcd.1234" ? true : false;
    if (userLoginAuth) {
      return new Promise((resolve) => {
        let v = {
          initialized: true,
          loggedIn: true,
          user: { email, id: new Date().getTime() + "" },
        };
        setAuthInfo(v);
        window.localStorage.setItem(
          "AUTH",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaXRhZG1pbiIsImp0aSI6ImU0YjYwOTA4LTAxMzctNDg5NS1iMmMxLWIzNzIzNmVlYjBlMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJBZG1pbiIsIlVzZXIiXSwiZXhwIjoxNjUxMDMyNTY4LCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.IAMzKO9x76snYv7SOwdqbAVXOxVL-ggzvxq7ImIz73Q"
        );
        window.localStorage.setItem("User", JSON.stringify(v.user));
        setTimeout(() => {
          return resolve(true);
        }, 1000);
      });
    } else {
      return new Promise((resolve) => {
        setAuthInfo({ initialized: true, loggedIn: false, user: null });
        setTimeout(() => {
          return resolve(false);
        }, 1000);
      });
    }
  };

  const initialize = () => {
    let response = window.localStorage.getItem("AUTH") || null;
    let responseUser = window.localStorage.getItem("User") || null;
    if (responseUser !== null) {
      setAuthInfo({
        initialized: true,
        loggedIn: true,
        user: JSON.parse(responseUser),
      });
    } else {
      setAuthInfo({
        initialized: true,
        loggedIn: false,
        user: null,
      });
    }
  };

  let v = {
    authInfo,
    logOut: logOut,
    logIn: logIn,
    initialize,
  };

  return <AuthContext.Provider value={v} {...props} />;
};

export const useAuth = () => React.useContext(AuthContext);
