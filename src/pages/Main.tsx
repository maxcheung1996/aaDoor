import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import "./Main.css";
import { home, library, settings } from "ionicons/icons";
import Home from "./Home";
import MyActivity from "./MyActivity";
import Setting from "./Setting";
import { IonReactRouter } from "@ionic/react-router";

const Main: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/main" to="/main/home" />
          <Route path="/main/home" component={Home} />
          <Route path="/main/myactivity" component={MyActivity} />
          <Route path="/main/setting" component={Setting} />

        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/main/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="myactivity" href="/main/myactivity">
            <IonIcon icon={library} />
            <IonLabel>My Activities</IonLabel>
          </IonTabButton>
          <IonTabButton tab="setting" href="/main/setting">
            <IonIcon icon={settings} />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Main;
