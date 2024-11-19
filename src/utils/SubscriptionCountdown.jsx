import React from "react";
import Countdown from "react-countdown";

const SubscriptionCountdown = ({ subscription }) => {
  const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
  };

  const CompletionMessage = () => <span className="text-red-500">Expired</span>;

  const countdownRenderer = ({ days, hours, minutes, completed }) => {
    if (completed) {
      return <CompletionMessage />;
    } else {
      return (
        <div className="bg-[#dedce4]  text-dark text-xl">
          Expires: {days}d {hours}h {minutes}m
        </div>
      );
    }
  };

  const expiryDate = subscription?.expiryDate;

  console.log(subscription);
  return (
    <div className="bg-[#dedce4] px-2 rounded-md shadow-md py-3  ">
      <p>subscription: {subscription?.subscriptionId?.name}</p>
      {isValidDate(expiryDate) ? (
        <Countdown date={expiryDate} renderer={countdownRenderer} />
      ) : (
        <span className="text-gray-600">Invalid date</span>
      )}
    </div>
  );
};

export default SubscriptionCountdown;
