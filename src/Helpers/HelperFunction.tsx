import { RefresherEventDetail } from "@ionic/react";

export function _uuid() {
  var d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getStatusText(Status: string) {
  switch (Status) {
    case "IN_PROGRESS":
      return "In Progress";
    case "PROCESSING":
      return "Processing";
    case "REJECT":
      return "Reject";
    case "WF_IN_PROGRESS":
      return "Workflow In Progress";
    default:
      return "";
  }
}

export function getStatusColor(Status: string) {
  switch (Status) {
    case "IN_PROGRESS":
      return "primary";
    case "PROCESSING":
      return "success";
    case "REJECT":
      return "danger";
    case "WF_IN_PROGRESS":
      return "warning";
    default:
      return "";
  }
}

export function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log("Begin async operation");

  setTimeout(() => {
    console.log("Async operation has ended");
    event.detail.complete();
  }, 2000);
}
