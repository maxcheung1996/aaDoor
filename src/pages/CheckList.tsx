import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFab,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import {
  addOutline,
  camera,
  cameraOutline,
  library,
  settings,
} from "ionicons/icons";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextFieldTypes } from "@ionic/core";
import "./CheckList.css";
import React, { useEffect, useState } from "react";
import { IonSlides, IonSlide } from "@ionic/react";
import { Footer } from "../components/footer";
import { SubFormModel } from "./SubFormModel";
import { checkListDetail, doorStatusList, sampleFormData } from "../database/Utils/sampleJson";
import { MyDoorStatusModal } from "../model/door";

// Optional parameters to pass to the swiper instance.
// See https://swiperjs.com/swiper-api for valid options.
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const CheckList: React.FC = (props: any) => {
  const [open, setOpen] = useState(false);
  const [doorStatus, setDoorStatus] = useState<MyDoorStatusModal | null>();
  const [dataStatus, setDataStatus] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const fetchStatus = async () => {
    let activityGuid = `8A70D31A-1ABE-417E-A14B-55EBE09008F3`;
    let url = `https://dev.socam.com/aahkapi/api/EformResults/EformResultStatusCount?eresultid=${activityGuid}`;
    let res: MyDoorStatusModal | null = null;
    await fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        res = resp;
      });
    res = doorStatusList;
    setDoorStatus(res);
    setDataStatus(true);
  };

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

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonRow>
            <IonTitle class="ion-text-center">
              {props.match.params.doorNo}
            </IonTitle>
            <IonItem
              color="primary"
              button={true}
              href={`/main/home/activities/door/checkList/takephoto/${props.match.params.doorNo}`}
              routerDirection="forward"
            >
              <IonIcon icon={camera} />
            </IonItem>
          </IonRow>
          {/* 
                    <IonItem button={true} href="" routerDirection="forward"><IonIcon name={camera} /></IonItem> */}
        </IonToolbar>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol onClick={() => { }} class="ion-text-center">
                <IonLabel color="medium">{doorStatus?.issue}</IonLabel>
                <br></br>
                <IonLabel color="medium">檢查及清潔</IonLabel>
              </IonCol>
              <IonCol onClick={() => { }} class="ion-text-center">
                <IonText color="medium">{doorStatus?.progress}</IonText>
                <br></br>
                <IonText color="medium">已跟進/待修</IonText>
              </IonCol>
              <IonCol onClick={() => { }} class="ion-text-center">
                <IonText color="medium">{doorStatus?.completed}</IonText>
                <br></br>
                <IonText color="medium">待跟進</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle class="ion-text-center gobal_text">門檢查</IonTitle>
        <IonToolbar class="gobal_text" color="primary">
          <IonText >一般資料</IonText>
        </IonToolbar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonGrid>
            <IonLabel className="input-label" position="stacked">
              門牌號
            </IonLabel>
            <Controller
              name="doorNo"
              control={control}
              defaultValue=""
              rules={{
                required: false,
                pattern: undefined,
              }}
              render={({ field }) => (
                <IonInput
                  className="text-input"
                  type="text"
                  value={field.value}
                  onIonChange={(e) =>
                    setValue("doorNo", e.detail.value!)
                  }
                  readonly={true}
                  placeholder={undefined}
                  clearInput={false}
                />
              )}
            />
          </IonGrid>
          <IonGrid>
            <IonLabel className="input-label" position="stacked">
              日期
            </IonLabel>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              rules={{
                required: false,
                pattern: undefined,
              }}
              render={({ field }) => (
                <IonInput
                  className="text-input"
                  type="date"
                  value={field.value}
                  onIonChange={(e) =>
                    setValue("date", e.detail.value!)
                  }
                  readonly={false}
                  placeholder={undefined}
                  clearInput={false}
                />
              )}
            />
          </IonGrid>
          <IonGrid>
            <IonLabel className="input-label" position="stacked">
              檢查人員姓名
            </IonLabel>
            <Controller
              name="staff"
              control={control}
              defaultValue=""
              rules={{
                required: false,
                pattern: undefined,
              }}
              render={({ field }) => (
                <IonInput
                  className="text-input"
                  type="text"
                  value=""
                  onIonChange={(e) =>
                    setValue("staff", e.detail.value!)
                  }
                  readonly={true}
                  placeholder={undefined}
                  clearInput={false}
                />
              )}
            />
          </IonGrid>
          <IonGrid>
            <IonLabel className="input-label" position="stacked">
              檢查結果
            </IonLabel>
            <Controller
              name="inspresult"
              control={control}
              defaultValue=""
              rules={{
                required: false,
                pattern: undefined,
              }}
              render={({ field }) => (
                <IonInput
                  className="text-input"
                  type="text"
                  value=""
                  onIonChange={(e) =>
                    setValue("inspresult", e.detail.value!)
                  }
                  readonly={true}
                  placeholder={undefined}
                  clearInput={false}
                />
              )}
            />
          </IonGrid>
          <IonGrid>
            <IonLabel className="input-label" position="stacked">
              位置
            </IonLabel>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{
                required: false,
                pattern: undefined,
              }}
              render={({ field }) => (
                <IonInput
                  className="text-input"
                  type="text"
                  value=""
                  onIonChange={(e) =>
                    setValue("location", e.detail.value!)
                  }
                  readonly={true}
                  placeholder={undefined}
                  clearInput={false}
                />
              )}
            />
          </IonGrid>
          <IonGrid>
            <IonLabel className="input-label" position="stacked">
              隊伍
            </IonLabel>
            <Controller
              name="team"
              control={control}
              defaultValue=""
              rules={{
                required: false,
                pattern: undefined,
              }}
              render={({ field }) => (
                <IonInput
                  className="text-input"
                  type="text"
                  value=""
                  onIonChange={(e) =>
                    setValue("team", e.detail.value!)
                  }
                  readonly={true}
                  placeholder={undefined}
                  clearInput={false}
                />
              )}
            />
          </IonGrid>
          <IonGrid>
            <IonLabel className="input-label" position="stacked">
              審查員姓名
            </IonLabel>
            <Controller
              name="approver"
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
                    setValue("approver", e.detail.value)
                  }
                >
                  {/* {fields.option.map((options, i) => {
                              return (
                                <IonSelectOption value={options}>
                                  {options}
                                </IonSelectOption>
                              );
                            })} */}
                  <IonSelectOption value={"approver1"}>
                    {"approver1"}
                  </IonSelectOption>
                  <IonSelectOption value={"approver2"}>
                    {"approver2"}
                  </IonSelectOption>
                </IonSelect>
              )}
            />
          </IonGrid>
          <IonList>
            {checkListDetail.map((v, i) => {
              if (v.formType1 === "SECTION") {
                return (
                  <IonToolbar class="gobal_text" color="primary">
                    <IonText >{v.sectionTitle}</IonText>
                  </IonToolbar>
                )
              } else if (v.formType1 === "CHECKBOX") {
                return (
                  <>
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonLabel className="input-label" position="stacked">
                            {v.header1}
                          </IonLabel>
                        </IonCol>
                        <Controller
                          name={v.eformResultDetailGuid}
                          control={control}
                          defaultValue={v.ans1}
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
                                      v.eformResultGuid,
                                      e.detail.checked
                                    );
                                  }}
                                />
                              </IonCol>
                              {v.ansOption1 !== "" ? <IonCol>
                                <IonButton
                                  id={"trigger-button-" + i.toString()}
                                >
                                  跟進
                                </IonButton>
                                <IonModal
                                  isOpen={open}
                                  breakpoints={[0.1, 0.5, 1]}
                                  initialBreakpoint={0.5}
                                  backdropBreakpoint={0.2}
                                  onDidDismiss={closeModal}
                                  trigger={"trigger-button-" + i.toString()}
                                >
                                  <SubFormModel
                                    data={"Sub Form No." + i.toString()}
                                  />
                                </IonModal>
                              </IonCol> : <><IonCol></IonCol></>}
                            </>
                          )}
                        />
                      </IonRow>
                    </IonGrid>
                  </>

                )
              } else if (v.formType1 === "TEXT") {
                return (
                  <>
                    <IonGrid>
                      <IonLabel className="input-label" position="stacked">
                        {v.header1}
                      </IonLabel>
                      <Controller
                        name={v.eformResultDetailGuid}
                        control={control}
                        defaultValue={v.ans1}
                        rules={{
                          required: undefined,
                          pattern: undefined,
                        }}
                        render={({ field }) => (
                          <IonInput
                            className="text-input"
                            type="text"
                            value={field.value}
                            onIonChange={(e) =>
                              setValue(v.eformResultDetailGuid, e.detail.value!)
                            }
                            readonly={false}
                            placeholder=""
                            disabled={false}
                            clearInput={true}
                          />
                        )}
                      />
                    </IonGrid>
                  </>
                )
              }
            })}
          </IonList>
          <IonFab
            class="checklist_btn"
            vertical="bottom"
            horizontal="end"
            slot="fixed"
          >
            {/* type="submit" */}
            <IonButton type="submit" className="fab-button" >
              <IonIcon className="fab-icon" icon={addOutline} />
            </IonButton>
          </IonFab>
        </form>

      </IonContent>
      {/* <Footer /> */}
    </IonPage>
  );
};

export default CheckList;
