import React from "react";
import { useLocation } from "react-router-dom";

function PaymentIframe() {
  const location = useLocation();
  const url = location.state?.url;

  console.log(url);

  return (
    <div>
      <iframe
        src={url}
        frameborder="0"
        height={800}
        width={"100%"}
        className=" rounded-md "
      ></iframe>
    </div>
  );
}

export default PaymentIframe;
