import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [shipmentInfo, setShipmentInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleShipmentChange = (e) => {
    const { name, value } = e.target;
    setShipmentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = () => {
    if (
      shipmentInfo.fullName &&
      shipmentInfo.address &&
      shipmentInfo.city &&
      shipmentInfo.phone
    ) {
      setStep(2); // Move to the payment step
    } else {
      alert("Please fill in all shipment details.");
    }
  };

  const handlePaymentSubmit = () => {
    if (paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv) {
      alert("Payment successful! Thank you for your order.");
      // Reset the form and go back to step 1
      setShipmentInfo({ fullName: "", address: "", city: "", phone: "" });
      setPaymentInfo({ cardNumber: "", expiryDate: "", cvv: "" });
      setStep(1);
    } else {
      alert("Please fill in all payment details.");
    }
  };

  return (
    <div className="payment-page">
      {step === 1 && (
        <div className="shipment-form">
          <h2>Step 1: Shipment Information</h2>
          <form>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={shipmentInfo.fullName}
                onChange={handleShipmentChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shipmentInfo.address}
                onChange={handleShipmentChange}
                placeholder="Enter your address"
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={shipmentInfo.city}
                onChange={handleShipmentChange}
                placeholder="Enter your city"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={shipmentInfo.phone}
                onChange={handleShipmentChange}
                placeholder="Enter your phone number"
              />
            </div>
            <button
              type="button"
              className="proceed-button"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="payment-form">
          <h2>Step 2: Payment Information</h2>
          <form>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                placeholder="Enter your card number"
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                placeholder="Enter CVV"
              />
            </div>
            <button
              type="button"
              className="submit-button"
              onClick={handlePaymentSubmit}
            >
              Submit Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;