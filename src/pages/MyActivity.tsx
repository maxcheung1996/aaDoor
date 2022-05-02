import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Footer } from "../components/footer";
import "./MyActivity.css";

const MyActivity: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Activity</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Activity</IonTitle>
          </IonToolbar>
        </IonHeader>
        My Activity
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default MyActivity;
