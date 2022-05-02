import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Main from "./pages/Main";
import Activities from "./pages/Activities";
import { useEffect, useState } from "react";
import { useSQLite } from "react-sqlite-hook";
import Door from "./pages/Door";
import CheckList from "./pages/CheckList";
import TakePhoto from "./pages/TakePhoto";
import { useAuth } from "./auth/authContext";
import LoginPage from "./pages/Login";
import Login from "./pages/Login";
import { Network } from "@capacitor/network";

setupIonicReact();

Network.addListener("networkStatusChange", (status) => {
  //alert("Network status changed: " + status);
});

// Singleton SQLite Hook
export let sqlite: any;
// Existing Connections Store
export let existingConn: any;

const App: React.FC = () => {
  const { authInfo, initialize } = useAuth()!;
  const [iniDBStatus, setiniDBStatus] = useState<Boolean>(false);
  const [existConn, setExistConn] = useState(false);
  existingConn = { existConn: existConn, setExistConn: setExistConn };

  const {
    echo,
    getPlatform,
    createConnection,
    closeConnection,
    retrieveConnection,
    retrieveAllConnections,
    closeAllConnections,
    addUpgradeStatement,
    importFromJson,
    isJsonValid,
    copyFromAssets,
    isConnection,
    isAvailable,
    checkConnectionsConsistency,
  } = useSQLite();

  sqlite = {
    echo: echo,
    getPlatform: getPlatform,
    createConnection: createConnection,
    closeConnection: closeConnection,
    retrieveConnection: retrieveConnection,
    retrieveAllConnections: retrieveAllConnections,
    closeAllConnections: closeAllConnections,
    addUpgradeStatement: addUpgradeStatement,
    importFromJson: importFromJson,
    isJsonValid: isJsonValid,
    copyFromAssets: copyFromAssets,
    isConnection: isConnection,
    checkConnectionsConsistency: checkConnectionsConsistency,
    isAvailable: isAvailable,
  };

  useEffect(() => {
    !authInfo?.initialized && (async () => await initialize())();
  }, [authInfo, initialize]);

  // useEffect(() => {
  //   let initDB = async () => {
  //     try {
  //       let encryption = "no-encryption";
  //       let dbName = "aahk";
  //       let isConnect = await sqlite.isConnection(dbName);

  //       if (isConnect.result) {

  //         //
  //       } else {
  //         let isConnect2 = await sqlite.isConnection(dbName);
  //         await sqlite.closeAllConnections();
  //         await sqlite.createConnection(dbName, false, encryption, 1);
  //         let isConnect3 = await sqlite.isConnection(dbName);
  //       }
  //       setiniDBStatus(true);
  //     } catch (error) {
  //     }
  //   };
  //   initDB();
  // }, []);

  if (!authInfo || !authInfo.initialized || iniDBStatus) {
    return (
      <IonApp>
        <IonLoading isOpen={true} />
      </IonApp>
    );
  } else {
    return (
      <IonApp>
        {authInfo?.loggedIn === true ? (
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/main" component={Main} />
              <Route
                exact
                path="/main/home/activities"
                component={Activities}
              />
              <Route
                exact
                path="/main/home/activities/door/:activityId,:activityGuid,:selectedUsers"
                component={Door}
              />
              <Route
                exact
                path="/main/home/activities/door/checkList/:doorNo,:activityDetailGuid,:selectedUsers"
                component={CheckList}
              />
              <Route
                exact
                path="/main/home/activities/door/checkList/takephoto/:doorNo"
                component={TakePhoto}
              />
              <Redirect exact from="/main/home" to="/main" />
              <Redirect exact from="/" to="/main" />
            </IonRouterOutlet>
          </IonReactRouter>
        ) : (
          <IonReactRouter>
            <Route path="/login" component={Login} exact />
            <Redirect from="/" to="/login" exact />
          </IonReactRouter>
        )}
      </IonApp>
    );
  }
};

export default App;
