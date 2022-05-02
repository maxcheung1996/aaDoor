import {
  IonRow,
  IonCol,
  IonContent,
  IonImg,
  IonButton,
  IonIcon,
  IonInput,
} from "@ionic/react";
import { add, close, textSharp } from "ionicons/icons";
import "./TakePhoto.css";

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

interface Props {
  otherPhotoList: Array<photoListInterface>;
  addOtherPhotoField: any;
  deletePhoto: any;
  takeOtherPhoto: any;
  setDescValue: any;
}

const otherPhotoList: Array<photoListInterface> = [];

export const TakePhotoOtherField: React.FC<Props> = ({
  otherPhotoList,
  addOtherPhotoField,
  deletePhoto,
  takeOtherPhoto,
  setDescValue,
}) => {
  return (
    <>
      {otherPhotoList != []
        ? otherPhotoList.map((v, i) => {
            return (
              <IonRow>
                <IonCol class="ion-text-center">
                  <IonContent
                    class="photo_grid_three"
                    onClick={() => takeOtherPhoto("A", v.uuid_A)}
                  >
                    {v.base64_A != "" ? (
                      <IonImg src={v.base64_A} />
                    ) : (
                      <IonImg
                        class="take_photo_img"
                        src="assets/img/takePictures.png"
                      />
                    )}
                  </IonContent>
                  <IonInput
                    onIonChange={(e) => {
                      setDescValue("A", v.uuid_A, e.detail.value);
                    }}
                    class="desc_input"
                    value={v.description_A}
                  ></IonInput>
                  <IonButton
                    onClick={() => deletePhoto("A", v.uuid_A)}
                    class="photo_del"
                    color="danger"
                    shape="round"
                  >
                    <IonIcon icon={close} />
                  </IonButton>
                </IonCol>
                <IonCol class="ion-text-center">
                  <IonContent
                    class="photo_grid_three"
                    onClick={() => takeOtherPhoto("B", v.uuid_B)}
                  >
                    {v.base64_B != "" ? (
                      <IonImg src={v.base64_B} />
                    ) : (
                      <IonImg
                        class="take_photo_img"
                        src="assets/img/takePictures.png"
                      />
                    )}
                  </IonContent>
                  <IonInput
                    onIonChange={(e) => {
                      setDescValue("B", v.uuid_B, e.detail.value);
                    }}
                    class="desc_input"
                    value={v.description_B}
                  ></IonInput>
                  <IonButton
                    onClick={() => deletePhoto("B", v.uuid_B)}
                    color="danger"
                    shape="round"
                  >
                    <IonIcon icon={close} />
                  </IonButton>
                </IonCol>
                <IonCol class="ion-text-center">
                  <IonContent
                    class="photo_grid_three"
                    onClick={() => takeOtherPhoto("C", v.uuid_C)}
                  >
                    {v.base64_C != "" ? (
                      <IonImg src={v.base64_C} />
                    ) : (
                      <IonImg
                        class="take_photo_img"
                        src="assets/img/takePictures.png"
                      />
                    )}
                  </IonContent>
                  <IonInput
                    onIonChange={(e) => {
                      setDescValue("C", v.uuid_C, e.detail.value);
                    }}
                    class="desc_input"
                    value={v.description_C}
                  ></IonInput>
                  <IonButton
                    onClick={() => deletePhoto("C", v.uuid_C)}
                    color="danger"
                    shape="round"
                  >
                    <IonIcon icon={close} />
                  </IonButton>
                </IonCol>
              </IonRow>
            );
          })
        : ""}
    </>
  );
};
