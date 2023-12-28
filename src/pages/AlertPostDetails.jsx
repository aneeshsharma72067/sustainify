import React from "react";
import { useParams } from "react-router-dom";

function AlertPostDetails() {
  const params = useParams();
  const alertPostID = params.alertPostID;
  return <div>{alertPostID}</div>;
}

export default AlertPostDetails;
