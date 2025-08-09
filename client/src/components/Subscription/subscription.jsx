import { useState } from "react";
import "./subscription.css";

export default function Subscription() {
  const plans = [
    { id: 1, name: "Monthly", duration: "1 month", price: "$30" },
    { id: 2, name: "Quarterly", duration: "3 months", price: "$80" },
    { id: 3, name: "Semi-Annual", duration: "6 months", price: "$150" },
    { id: 4, name: "Annual", duration: "12 months", price: "$280" },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);

  if (selectedPlan) {
    return (
      <div className="selectedContainer">
        <h2>Now you Have a {selectedPlan.name} Subscription</h2>
        <div className="selectedInformation">
          <p>
            <strong>it will be for </strong> {selectedPlan.duration}
          </p>
          <p>
            {selectedPlan.price} per {selectedPlan.duration}
          </p>
        </div>

        <button onClick={() => setSelectedPlan(null)} className="backToPlan">
          Back to Plans
        </button>
      </div>
    );
  }

  return (
    <div className="subscriptionContainer">
      <h1>Subscription Plans</h1>
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => setSelectedPlan(plan)}
          className="subscriptionInformation"
        >
          <h2>{plan.name}</h2>
          <p>Duration: {plan.duration}</p>
          <p>Price: {plan.price}</p>
        </div>
      ))}
    </div>
  );
}
