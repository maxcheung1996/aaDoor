export type MyDoorModal = {
  activityDetailGuid: string;
  activityGuid: string;
  locationCode: string;
  locationDesc: string;
  doorNo: string;
  doorUnit: string;
  isDeleted: string;
  createdBy: string;
  createdTimestamp: string;
  updatedBy: string;
  updatedTimestamp: string;
};

export type MyDoorStatusModal = {
  issue: number;
  completed: number;
  progress: number;
};
