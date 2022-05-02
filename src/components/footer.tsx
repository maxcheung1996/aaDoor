import {
  IonCol,
  IonFooter,
  IonGrid,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";

export const Footer: React.FC = () => {
  return (
    <IonFooter className="ion-no-border" collapse="fade">
      <IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText color="medium">©2020. Socam Development</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText color="medium">Limited All Rights Reserved.</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};
