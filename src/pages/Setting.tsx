import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../auth/authContext";
import { Footer } from "../components/footer";
import "./Setting.css";

const Setting: React.FC = () => {
  let { authInfo, logOut } = useAuth()!;
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid class="setting_grid">
          <IonRow class="logo_padding">
            <IonCol>
              <IonImg
                src="assets/img/SOCAM_Logo.jpg"
                class="socam_logo"
              ></IonImg>
            </IonCol>
          </IonRow>
          <IonRow class="setting_user_logo">
            <IonCol>
              <IonImg src="assets/img/user_logo.png" class="user_logo"></IonImg>
            </IonCol>
          </IonRow>
          <IonRow class="setting_user_text">
            <IonCol>
              <IonText>{authInfo.user.email}</IonText>
            </IonCol>
          </IonRow>
          <IonRow class="setting_logout_row">
            <IonButton
              class="setting_logout_btn"
              color="danger"
              onClick={async () => {
                await logOut();
              }}
            >
              Logout
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Setting;
