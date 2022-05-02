import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Route } from "react-router";
import { Footer } from "../components/footer";
import Activities from "./Activities";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow class="logo_padding">
            <IonCol>
              <IonImg
                src="assets/img/SOCAM_Logo.jpg"
                class="socam_logo"
              ></IonImg>
            </IonCol>
          </IonRow>
          <IonRow class="home_menu_text">
            <IonCol>
              <IonText>Main Menu</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard
                type="button"
                class="ionCard"
                button={true}
                routerDirection="forward"
                href="/main/home/activities"
              >
                <IonImg
                  class="ionCardImg"
                  src="assets/img/door.jpg"
                  style={{ width: 100 }}
                />
                <IonCardHeader>
                  <IonCardTitle class="home_card_title">
                    Door Inspection
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              {/* <IonCard class="ionCard" button={true}>
                <IonImg
                  class="ionCardImg"
                  src="assets/img/celling.png"
                  style={{ width: 100 }}
                />
                <IonCardHeader>
                  <IonCardTitle class="home_card_title">Celling</IonCardTitle>
                </IonCardHeader>
              </IonCard> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Home;
