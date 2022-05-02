import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const SubFormModel = ({ data }: any) => {
  return (
    <IonContent>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle class="ion-text-center">跟進</IonTitle>
          {/* 
          <IonButtons slot="end">
            <IonButton onClick={data}>Close</IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      {data}
    </IonContent>
  );
};
