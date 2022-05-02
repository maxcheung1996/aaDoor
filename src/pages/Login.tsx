import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  useIonToast,
  IonImg,
  IonCard,
  IonCol,
  IonRow,
  IonGrid,
  IonText,
} from "@ionic/react";
import React from "react";
// Auth
import { RouteComponentProps } from "react-router";
import { useAuth } from "../auth/authContext";
import { Footer } from "../components/footer";
import "./Login.css";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  let { logIn } = useAuth()!;
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [present, dismiss] = useIonToast();

  return (
    <IonPage>
      <IonContent>
        <IonGrid class="login_grid">
          <IonRow class="logo_padding">
            <IonCol>
              <IonImg
                src="assets/img/SOCAM_Logo.jpg"
                class="socam_logo"
              ></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText class="login_cmms" color="danger">
                CMMS
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow class="login_sign-in_row">
            <IonCol>
              <IonText class="login_sign-in">Sign in</IonText>
            </IonCol>
          </IonRow>
          <IonRow class="login_input_row login_input_first_row">
            <IonCol>
              <IonInput
                type="text"
                class="login-input-border"
                placeholder="User Name"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                clearInput={true}
              />
            </IonCol>
          </IonRow>
          <IonRow class="login_input_row">
            <IonCol>
              <IonInput
                type="password"
                class="login-input-border"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                clearInput={true}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                class="login_btn"
                color="danger"
                onClick={async () => {
                  let res = await logIn(email, password);
                  console.log("res:", res);
                  if (res) {
                    history.replace("/main");
                  } else {
                    present("Authentication Fail! Please try again.", 2000);
                  }
                }}
              >
                Sign In
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow class="login-footer-first">
            <IonCol>
              <IonText>©2020. Socam Development</IonText>
            </IonCol>
          </IonRow>
          <IonRow class="login-footer-sec">
            <IonCol>
              <IonText>Limited All Rights Reserved.</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
