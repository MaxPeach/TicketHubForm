import { useState } from 'react';

function TicketForm() {
  const [formData, setFormData] = useState({
    Name: '', Email: '', Phone: '', Quantity: 1,
    CreditCard: '', Expiration: '', SecurityCode: '',
    Address: '', City: '', Province: '', PostalCode: '', Country: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validate = () => {
    const e = {};

    if (!formData.Name) e.Name = "Name is required";
    if (formData.Name && formData.Name.length > 100) e.Name = "Name should be less than 100 characters";

    if (!/\S+@\S+\.\S+/.test(formData.Email)) e.Email = "Invalid email address";
    if (!formData.Email) e.Email = "Email is required";

    if (!formData.Phone) e.Phone = "Phone number is required";
    const phoneRegex = /^[2-9]{1}[0-9]{2}[2-9]{1}[0-9]{6}$/;
    if (formData.Phone && !phoneRegex.test(formData.Phone)) e.Phone = "Invalid phone number";

    if (!formData.Quantity || formData.Quantity < 1) e.Quantity = "Quantity must be greater than zero";

    const cardRegex = /^\d{16}$/; // Regex to only allow exactly 16 digits
    const cleanedCard = formData.CreditCard.replace(/\D/g, ''); // Removing all non-numeric characters
    if (!formData.CreditCard) e.CreditCard = "Credit card is required";
    if (cleanedCard && !cardRegex.test(cleanedCard)) e.CreditCard = "Credit card must be 16 digits";
    
    if (!formData.Expiration) e.Expiration = "Expiration date is required";

    if (!/^\d{3}$/.test(formData.SecurityCode)) e.SecurityCode = "Security code must be 3 digits";
    if (!formData.SecurityCode) e.SecurityCode = "Security code is required";

    if (!formData.Address) e.Address = "Address is required";
    if (formData.Address && formData.Address.length > 200) e.Address = "Address is too long";

    if (!formData.City) e.City = "City is required";
    if (formData.City && formData.City.length > 100) e.City = "City name is too long";

    if (!formData.Province) e.Province = "Province is required";
    if (formData.Province && formData.Province.length > 100) e.Province = "Province name is too long";

    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    if (!formData.PostalCode) e.PostalCode = "Postal code is required";
    if (formData.PostalCode && !postalCodeRegex.test(formData.PostalCode)) e.PostalCode = "Invalid postal code format (A1A 1A1)";

    if (!formData.Country) e.Country = "Country is required";
    if (formData.Country && formData.Country.length > 100) e.Country = "Country name is too long";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const cleanedCard = formData.CreditCard.replace(/\D/g, '');  // Remove non-numeric characters

    const data = {
      ConcertId: 123,  // Example concert ID, modify as needed
      Name: formData.Name,
      Email: formData.Email,
      Phone: formData.Phone,
      Quantity: formData.Quantity,
      CreditCard: cleanedCard,
      Expiration: formData.Expiration,
      SecurityCode: formData.SecurityCode,
      Address: formData.Address,
      City: formData.City,
      Province: formData.Province,
      PostalCode: formData.PostalCode,
      Country: formData.Country,
    };

    console.log("📦 Sending Data to API:", JSON.stringify(data, null, 2));

    try {
      const res = await fetch('https://nscc-0468750-tickethub-api-f2d7brczgedzbkfh.canadacentral-01.azurewebsites.net/api/Ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log(`✅ Ticket submitted successfully! Status: ${res.status}`);
        setSuccess(true);
        // Show popup on successful submission
        alert(`Enjoy the show, ${formData.Name}! 🎉`);
      } else {
        const errorText = await res.text();
        console.error(`❌ Ticket failed. Status: ${res.status}, Message: ${errorText}`);
        setSuccess(false);
        alert("❌ There was a problem submitting the ticket. Please check your info.");
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      setSuccess(false);
      alert("❌ Network error. Please try again later.");
    }
  };

  return (
    <div className="ticket-form">
      <h2>Submit Your Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          {Object.entries(formData).map(([key, val]) => (
            <div key={key} className="form-group">
              <label>{key}</label>
              <input
                name={key}
                placeholder={key}
                value={val}
                onChange={handleChange}
              />
              {errors[key] && <small className="error">{errors[key]}</small>}
            </div>
          ))}
        </div>
        <button type="submit" className="submit-btn">Submit Ticket</button>
      </form>
      {success && <p className="success">Ticket submitted successfully! 🎉</p>}
    </div>
  );
}

export default TicketForm;
