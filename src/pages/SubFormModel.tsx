import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { checkListSubDetail } from "../database/Utils/sampleJson";
import { subModal } from "../model/checklist";
import "./SubFormModel.css";

interface Props {
  data: subModal[];
}

export const SubFormModel: React.FC<Props> = ({ data }) => {
  const {
    setValue,
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {

    alert("submit");
    alert(JSON.stringify(data));
  };

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle class="ion-text-center">跟進</IonTitle>
        </IonToolbar>
      </IonHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonList>
          {data.map((v, i) => {
            if (v.subFormType1 === "SECTION") {
              return (
                <IonToolbar class="gobal_text" color="primary">
                  <IonText >{v.sectionSubtitle}</IonText>
                </IonToolbar>
              )
            } else if (v.subFormType1 === "CHECKBOX") {
              return (
                <>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonLabel className="input-label" position="stacked">
                          {v.subHeader1}
                        </IonLabel>
                      </IonCol>
                      <Controller
                        name={v.eformResultSubDetailGuid}
                        control={control}
                        defaultValue={v.subAns1}
                        rules={{
                          required: undefined,
                          pattern: undefined,
                        }}
                        render={({ field }) => (

                          <>
                            <IonCol>
                              <IonCheckbox

                                checked={field.value}
                                onIonChange={(e) => {
                                  setValue(
                                    v.eformResultSubDetailGuid,
                                    e.detail.checked
                                  );
                                }}
                              />
                            </IonCol>
                            {v.subAnsOption1 !== "" ? <IonCol>
                              <IonButton>
                                {v.subAnsOption1}
                              </IonButton>

                            </IonCol> : <><IonCol></IonCol></>}
                          </>
                        )}
                      />
                    </IonRow>
                  </IonGrid>
                </>

              )
            } else if (v.subFormType1 === "SELECT") {
              return (
                <>
                  <IonGrid>
                    <IonLabel className="input-label" position="stacked">
                      {v.subHeader1}
                    </IonLabel>
                    <Controller
                      name={v.eformResultSubDetailGuid}
                      control={control}
                      defaultValue=""
                      rules={{
                        required: false,
                        pattern: undefined,
                      }}
                      render={({ field }) => (
                        <IonSelect
                          class="checkListSelect_border"
                          placeholder=""
                          value={field.value}
                          onIonChange={(e) =>
                            setValue(v.eformResultSubDetailGuid, e.detail.value)
                          }
                        >
                          {[...Array(10)].map((v, i) => {
                            return (
                              <IonSelectOption value={i}>
                                {i}
                              </IonSelectOption>
                            );
                          })}
                        </IonSelect>
                      )}
                    />
                  </IonGrid>
                </>
              )
            }
          })}
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton color="primary" type="submit">儲存</IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="danger">刪除</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonList>
      </form>
    </IonContent>
  );
};
