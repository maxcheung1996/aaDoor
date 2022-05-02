import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import { home } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { doorList, doorStatusList } from "../database/Utils/sampleJson";
import { MyDoorModal, MyDoorStatusModal } from "../model/door";

function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log("Begin async operation");
  setTimeout(() => {
    console.log("Async operation has ended");
    event.detail.complete();
  }, 2000);
}

const elements = ["one", "two", "three"];

const Door: React.FC = (props: any) => {
  const [door, setDoor] = useState<MyDoorModal[]>([]);
  const [doorStatus, setDoorStatus] = useState<MyDoorStatusModal | null>();
  const [dataStatus, setDataStatus] = useState(false);

  const fetchDoor = async () => {
    // let url = `https://dev.socam.com/aahkapi/api/AahkActivityDetail?activityGuid=${props.match.params.activityId}`;
    // let res: MyDoorModal[] = [];
    // await fetch(url)
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     res = resp;
    //   });

    let res: MyDoorModal[] = [];
    res = doorList;

    await fetchStatus();
    setDoor(res);
    setDataStatus(true);
  };

  const fetchStatus = async () => {
    let activityGuid = `8A70D31A-1ABE-417E-A14B-55EBE09008F3`;
    let url = `https://dev.socam.com/aahkapi/api/EformResults/EformResultStatusCount?eresultid=${activityGuid}`;
    let res: MyDoorStatusModal | null = null;
    // await fetch(url)
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     res = resp;
    //   });
    res = doorStatusList;
    setDoorStatus(res);
  };

  useEffect(() => {
    fetchDoor();
  }, []);

  if (!dataStatus) {
    return (
      <IonApp>
        <IonLoading isOpen={true} />
      </IonApp>
    );
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonRow>
              <IonTitle class="ion-text-center">
                {props.match.params.activityId}
              </IonTitle>
              <IonItem
                color="primary"
                button={true}
                href="/main/home"
                routerDirection="root"
              >
                <IonIcon icon={home} />
              </IonItem>
            </IonRow>
          </IonToolbar>
          <IonToolbar>
            <IonGrid>
              <IonRow>
                <IonCol onClick={() => { }} class="ion-text-center">
                  <IonLabel color="medium">{doorStatus?.issue}</IonLabel>
                  <br></br>
                  <IonLabel color="medium">未檢查</IonLabel>
                </IonCol>
                <IonCol onClick={() => { }} class="ion-text-center">
                  <IonText color="medium">{doorStatus?.progress}</IonText>
                  <br></br>
                  <IonText color="medium">進行中</IonText>
                </IonCol>
                <IonCol onClick={() => { }} class="ion-text-center">
                  <IonText color="medium">{doorStatus?.completed}</IonText>
                  <br></br>
                  <IonText color="medium">已完成</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonSearchbar></IonSearchbar>
          {dataStatus ? (
            <IonList>
              {door.map((v, i) => {
                return (
                  <IonItem
                    key={i}
                    button={true}
                    detail={true}
                    routerDirection="forward"
                    href={`/main/home/activities/door/checkList/${v.doorNo},${v.activityDetailGuid},staff=${props.match.params.selectedUsers}`}
                  >
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonText>{v.doorNo}</IonText>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonText>
                            <IonText>Location: {v.locationCode}</IonText>
                          </IonText>
                        </IonCol>
                        <IonCol>
                          <IonText>
                            <IonText>Description: {v.locationDesc}</IonText>
                          </IonText>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonText>
                            <IonText color="medium">Max Cheung Wai Man</IonText>
                          </IonText>
                        </IonCol>
                        <IonCol>
                          <IonText>
                            <IonText color="medium">
                              {v.createdTimestamp.split("T")[0]}
                            </IonText>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                );
              })}
            </IonList>
          ) : (
            <IonApp>
              <IonLoading isOpen={true} />
            </IonApp>
          )}
          <IonList></IonList>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }
};

export default Door;
