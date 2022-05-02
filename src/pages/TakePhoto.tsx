import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./TakePhoto.css";
import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";
import { add, camera, close, textSharp, time } from "ionicons/icons";
import { sqlite } from "../App";
import { sqlExecuteStatement, sqlQuery } from "../../src/database/Utils/sqlite";
import { createComFileTablesNoEncryption } from "../database/Utils/sql";
import { _uuid } from "../Helpers/HelperFunction";
import { TakePhotoOtherField } from "./TakePhotoOtherField";

const PHOTO_STORAGE = "photos";

interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

interface PhotoObject {
  id: string;
  fileName: string;
  base64: string;
  last_modified: string;
}

interface photoListInterface {
  row: string;
  uuid_A: string;
  fileName_A: string;
  description_A: string;
  base64_A: string;
  uuid_B: string;
  fileName_B: string;
  description_B: string;
  base64_B: string;
  uuid_C: string;
  fileName_C: string;
  description_C: string;
  base64_C: string;
}

const TakePhoto: React.FC = (props: any) => {
  const [resultList, SetResultList] = useState<Array<PhotoObject>>();
  const [loadDataStatus, SetLoadDataStatus] = useState<Boolean>(false);
  const fileName = new Date().getTime() + ".jpeg";
  const [roomDoorTagImg, setRoomDoorTagImg] = useState<string>("");
  const [frontView, setFrontView] = useState<string>("");
  const [rearView, setRearView] = useState<string>("");
  const [otherPhotoList, setOtherPhotoList] = useState<
    Array<photoListInterface>
  >([]);

  const takeOtherPhoto = async (gp: string, uuid: string) => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      correctOrientation: true,
    });
    await savePicture(photo, fileName, uuid, true, gp);
  };

  const setDescValue = async (gp: string, uuid: string, value: string) => {
    const newOtherPhotoList = otherPhotoList.slice();
    let index: number = -1;
    switch (gp) {
      case "A":
        index = newOtherPhotoList.findIndex((item) => item.uuid_A === uuid);
        break;
      case "B":
        index = newOtherPhotoList.findIndex((item) => item.uuid_B === uuid);
        break;
      case "C":
        index = newOtherPhotoList.findIndex((item) => item.uuid_C === uuid);
        break;
    }

    if (index >= 0) {
      switch (gp) {
        case "A":
          newOtherPhotoList[index].description_A = value;
          break;
        case "B":
          newOtherPhotoList[index].description_B = value;
          break;
        case "C":
          newOtherPhotoList[index].description_C = value;
          break;
      }
    }
    setOtherPhotoList([...newOtherPhotoList]);
  };

  const deletePhoto = async (gp: string, uuid: string) => {
    const newOtherPhotoList = otherPhotoList.slice();
    let index: number = -1;
    switch (gp) {
      case "A":
        index = newOtherPhotoList.findIndex((item) => item.uuid_A === uuid);
        break;
      case "B":
        index = newOtherPhotoList.findIndex((item) => item.uuid_B === uuid);
        break;
      case "C":
        index = newOtherPhotoList.findIndex((item) => item.uuid_C === uuid);
        break;
    }

    if (index >= 0) {
      switch (gp) {
        case "A":
          newOtherPhotoList[index].base64_A = "";
          break;
        case "B":
          newOtherPhotoList[index].base64_B = "";
          break;
        case "C":
          newOtherPhotoList[index].base64_C = "";
          break;
      }
    }
    setOtherPhotoList([...newOtherPhotoList]);
  };

  const getPhoto = async () => {
    try {
      await sqlExecuteStatement("aahk", createComFileTablesNoEncryption);
      let resp = await sqlQuery("aahk", `SELECT * FROM com_file;`);
      SetResultList(resp.values);
      SetLoadDataStatus(true);
    } catch (error) {
      alert(error);
    }
  };

  const addOtherPhotoField = () => {
    let newPhotoRow: photoListInterface = {
      row: (otherPhotoList.length + 1).toString(),
      uuid_A: _uuid(),
      description_A: "",
      fileName_A: "",
      base64_A: "",
      uuid_B: _uuid(),
      description_B: "",
      fileName_B: "",
      base64_B: "",
      uuid_C: _uuid(),
      description_C: "",
      fileName_C: "",
      base64_C: "",
    };
    otherPhotoList.push(newPhotoRow);
    // otherPhotoList;
    setOtherPhotoList([...otherPhotoList]);
  };

  useEffect(() => {
    getPhoto();
  }, []);

  const deleteFixedPhoto = async (photoView: string) => {
    switch (photoView) {
      case "roomDoorTagImg":
        setRoomDoorTagImg("");
        break;
      case "frontView":
        setFrontView("");
        break;
      case "rearView":
        setRearView("");
        break;
      default:
        break;
    }
  };

  const takePhoto = async (view: string) => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      correctOrientation: true,
    });
    await savePicture(photo, fileName, view, false, "");

    // getPhoto();
  };

  const savePicture = async (
    photo: Photo,
    fileName: string,
    view: string,
    otherPhoto: Boolean,
    gp: string
  ): Promise<UserPhoto> => {
    const base64Data = await base64FromPath(photo.webPath!);
    let isDBConnected = await sqlite.isConnection("aahk");
    if (isDBConnected.result) {
      await sqlExecuteStatement(
        "aahk",
        `INSERT INTO com_file (fileName, base64, type, remark) VALUES ("${fileName}","${base64Data}","${view}", "");`
      );
    }
    if (view != "" && !otherPhoto) {
      switch (view) {
        case "roomDoorTagImg":
          setRoomDoorTagImg(base64Data);
          break;
        case "frontView":
          setFrontView(base64Data);
          break;
        case "rearView":
          setRearView(base64Data);
          break;
        default:
          break;
      }
    } else if (otherPhoto) {
      const newOtherPhotoList = otherPhotoList.slice();
      let index: number = -1;
      switch (gp) {
        case "A":
          index = newOtherPhotoList.findIndex((item) => item.uuid_A === view);
          break;
        case "B":
          index = newOtherPhotoList.findIndex((item) => item.uuid_B === view);
          break;
        case "C":
          index = newOtherPhotoList.findIndex((item) => item.uuid_C === view);
          break;
      }

      if (index >= 0) {
        switch (gp) {
          case "A":
            newOtherPhotoList[index].base64_A = base64Data;
            break;
          case "B":
            newOtherPhotoList[index].base64_B = base64Data;
            break;
          case "C":
            newOtherPhotoList[index].base64_C = base64Data;
            break;
        }
      }
      setOtherPhotoList([...newOtherPhotoList]);
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };

  const base64FromPath = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("method did not return a string");
        }
      };
      reader.readAsDataURL(blob);
    });
  };

  if (!loadDataStatus) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonLoading isOpen={true} />
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle class="ion-text-center">
              {props.match.params.doorNo}
            </IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonTitle color="medium">詳情</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonTitle class="ion-text-center">相片</IonTitle>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonCol class="ion-text-center">
                <IonText>Room/Door Tag</IonText>
                <IonContent
                  class="photo_grid_three"
                  onClick={() => takePhoto("roomDoorTagImg")}
                >
                  {roomDoorTagImg != "" ? (
                    <IonImg src={roomDoorTagImg} />
                  ) : (
                    <IonImg
                      class="take_photo_img"
                      src="assets/img/takePictures.png"
                    />
                  )}
                </IonContent>
                <IonButton
                  onClick={() => deleteFixedPhoto("roomDoorTagImg")}
                  class="photo_del"
                  color="danger"
                  shape="round"
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonCol>
              <IonCol class="ion-text-center">
                <IonText>Front View</IonText>
                <IonContent
                  class="photo_grid_three"
                  onClick={() => takePhoto("frontView")}
                >
                  {frontView != "" ? (
                    <IonImg src={frontView} />
                  ) : (
                    <IonImg
                      class="take_photo_img"
                      src="assets/img/takePictures.png"
                    />
                  )}
                </IonContent>
                <IonButton
                  onClick={() => deleteFixedPhoto("frontView")}
                  color="danger"
                  shape="round"
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonCol>
              <IonCol class="ion-text-center">
                <IonText>Rear View</IonText>
                <IonContent
                  class="photo_grid_three"
                  onClick={() => takePhoto("rearView")}
                >
                  {rearView != "" ? (
                    <IonImg src={rearView} />
                  ) : (
                    <IonImg
                      class="take_photo_img"
                      src="assets/img/takePictures.png"
                    />
                  )}
                </IonContent>
                <IonButton
                  onClick={() => deleteFixedPhoto("rearView")}
                  color="danger"
                  shape="round"
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonTitle class="more_photo_background">
                <IonText color="light">待跟進項目</IonText>
              </IonTitle>
              <IonItem
                color="primary"
                button={true}
                onClick={() => addOtherPhotoField()}
              >
                <IonIcon icon={add} />
              </IonItem>
            </IonRow>
            <IonList>
              <TakePhotoOtherField
                addOtherPhotoField={addOtherPhotoField}
                otherPhotoList={otherPhotoList}
                deletePhoto={deletePhoto}
                takeOtherPhoto={takeOtherPhoto}
                setDescValue={setDescValue}
              />
            </IonList>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
};

export default TakePhoto;
