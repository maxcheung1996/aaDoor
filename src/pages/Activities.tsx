import {
  IonApp,
  IonButton,
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
  IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import { home } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Route } from "workbox-routing";
import { Footer } from "../components/footer";
import { activityList } from "../database/Utils/sampleJson";
import { doRefresh } from "../Helpers/HelperFunction";
import { MyActivityModal } from "../model/activity";
import "./Activities.css";

const users = [
  {
    id: 1,
    first: "Alice",
    last: "Smith",
  },
  {
    id: 2,
    first: "Bob",
    last: "Davis",
  },
  {
    id: 3,
    first: "Charlie",
    last: "Rosenburg",
  },
];

type User = typeof users[number];

const compareWith = (o1: User, o2: User) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const Activities: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [activity, setActivity] = useState<MyActivityModal[]>([]);
  const [dataStatus, setDataStatus] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSearch, setFilteredSearch] = useState<MyActivityModal[]>([
    {
      activityGuid: "",
      category: "",
      woNo: "",
      activityId: "",
      locationCode: "",
      locationDesc: "",
      startDatetime: "",
      endDatetime: "",
      isDeleted: "",
      createdBy: "",
      createdTimestamp: "",
      updatedBy: "",
      updatedTimestamp: "",
    },
  ]);

  const fetchActivity = async () => {
    let url = "https://dev.socam.com/aahkapi/api/AahkActivity";
    let res: MyActivityModal[] = [];
    await fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        res = resp;
      })
      .catch((error) => {
        //alert("fetchActivity fail: " + error);
      });
    res = activityList;
    setActivity(res);
    setFilteredSearch(res);
    setDataStatus(true);

    //alert(JSON.stringify(activity));
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  useEffect(() => {
    let tempSearchResult: MyActivityModal[] = activity.filter((ele) =>
      ele.activityId.includes(searchQuery)
    );
    setFilteredSearch([...tempSearchResult]);
  }, [searchQuery]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonRow>
            <IonTitle class="ion-text-center">Main</IonTitle>
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
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Activities</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar
          value={searchQuery}
          onIonChange={(e) => setSearchQuery(e.detail.value!)}
        ></IonSearchbar>
        <IonSelect
          class="activities_select"
          placeholder="Select a Staff for your inspection..."
          compareWith={compareWith}
          value={selectedUsers}
          multiple
          onIonChange={(e) => setSelectedUsers(e.detail.value)}
        >
          {users.map((user) => (
            <IonSelectOption key={user.id} value={`${user.first} ${user.last}`}>
              {user.first} {user.last}
            </IonSelectOption>
          ))}
        </IonSelect>
        {dataStatus ? (
          <IonList>
            {filteredSearch.map((v, i) => {
              return (
                <IonItem
                  key={i}
                  button={true}
                  detail={true}
                  routerDirection="forward"
                  href={`/main/home/activities/door/${v.activityId},${v.activityGuid},staff=${selectedUsers}`}
                >
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonText>{v.activityId}</IonText>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonText>
                          <IonText>Door Inspection Check List</IonText>
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
                            {v.startDatetime.replace("T00:00:00", "")}
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
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Activities;
