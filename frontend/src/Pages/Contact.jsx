import { FaMapMarkerAlt, FaPhoneAlt, FaFax, FaEnvelope } from "react-icons/fa";
import React , {useState} from "react";
import axios from "axios";
import "./Contact.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





const Contact = () => {


const [formData, setFormData] = useState({
  type: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  hospital: "",
  message: "",
});

const [errors, setErrors] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


const validate = () => {
  let newErrors = {};

  if (!formData.type) newErrors.type = "Please select the type of feedback";
  if (!formData.firstName) newErrors.firstName = "Please enter first name";
  if (!formData.phone) newErrors.phone = "Please enter mobile number";
  if (!formData.email) newErrors.email = "Please enter email id";
  if (!formData.hospital) newErrors.hospital = "Please select hospital";

  return newErrors;
};



const handleSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitted(true);

  const validationErrors = validate();
  setErrors(validationErrors);

  // ❌ Stop if validation fails
  if (Object.keys(validationErrors).length > 0) return;

  try {
    const payload = {
      type: formData.type,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      hospital: formData.hospital,
      message: formData.message,
    };

    console.log("SENDING DATA:", payload); // ✅ DEBUG

    const { data } = await axios.post(
      "http://localhost:5000/api/v1/feedback/send",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true,
      }
    );

    console.log("SUCCESS RESPONSE:", data);
toast.success(data.message || "Feedback submitted successfully");
    // ✅ Reset form after success
    setFormData({
      type: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      hospital: "",
      message: "",
    });

    setIsSubmitted(false);
    setErrors({});

  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR RESPONSE:", error.response);

    // ❌ Error toast
    toast.error(
      error.response?.data?.message || "Error submitting form"
    );
  }
};


  return (
    <>
      {/* HERO SECTION */}
      <div className="contact-hero">
        <div className="contact-overlay">

          <div className="contact-hero-box">
            <h2>Contact us</h2>
            <p>For all types of queries</p>
          </div>
        </div>
      </div>

   {/* FLOATING CONTACT CARD */}
<div className="contact-container">
  <div className="contact-card">

    <div className="contact-header">
  <img src="/fortis-logo.png" alt="logo" className="contact-logo" />
  <h3>Fauget Medical Ltd.</h3>
</div>

    <hr />


{/* CONTACT DETAILS FIRST */}
<div className="contact-details">

  <div className="contact-row">
    <FaMapMarkerAlt className="contact-icon" />
    <p> Tower A, Unitech Business Park, Block - F, Gurgaon</p>
  </div>

  <div className="contact-row">
    <FaPhoneAlt className="contact-icon" />
    <p>For Appointment Related Queries - 9205 010 100</p>
  </div>

  <div className="contact-row">
    <FaFax className="contact-icon" />
    <p>Corporate Office - +91-124-4921021</p>
  </div>

</div>

<hr />

{/* EMAIL SECTION AFTER */}
<div className="contact-email-section">

  <div className="email-box">
    <FaEnvelope className="contact-icon" />
    <div>
      <p>For feedback/complaints please write to:</p>
      <span>feedback@fortishealthcare.com</span>
    </div>
  </div>

  <div className="email-box">
    <FaEnvelope className="contact-icon" />
    <div>
      <p>For general/business related queries contact:</p>
      <span>reachus@fortishealthcare.com</span>
    </div>
  </div>

  <div className="email-box">
    <FaEnvelope className="contact-icon" />
    <div>
      <p>For investors related queries contact:</p>
      <span>investor.relations@fortishealthcare.com</span>
    </div>
  </div>

</div>

<div className="contact-email-bottom">
  <p>For international patient queries contact:</p>
  <span>ips@fortishealthcare.com</span>
</div>
</div>

</div>

{/* GET IN TOUCH FORM */}
{/* GET IN TOUCH FORM */}
<div className="get-in-touch">

  <h2>Get in touch</h2>

  <div className="tabs">
    <div className="tab active">Feedback/ Complaints</div>
   
  </div>

  <form className="contact-form" onSubmit={handleSubmit}>

    {/* TYPE */}
    <div className="form-group">
      <label>Type of Feedback <span>*</span></label>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="">Select Type of Feedback</option>
        <option value="Complaint">Complaint</option>
        <option value="Suggestion">Suggestion</option>
      </select>
      {isSubmitted && errors.type && <p className="error">{errors.type}</p>}
    </div>

    {/* NAME */}
    <div className="form-row">
      <div>
        <label>First Name <span>*</span></label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {isSubmitted && errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>

      <div>
        <label>Last Name <span>*</span></label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* PHONE + EMAIL */}
    <div className="form-row-3">
      <div>
        <label>Country Code</label>
        <input type="text" value="+91" readOnly />
      </div>

      <div>
        <label>Mobile Number <span>*</span></label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {isSubmitted && errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div>
        <label>Email <span>*</span></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {isSubmitted && errors.email && <p className="error">{errors.email}</p>}
      </div>
    </div>

    {/* HOSPITAL */}
    <div className="form-group">
      <label>Hospitals <span>*</span></label>
      <select name="hospital" value={formData.hospital} onChange={handleChange}>
        <option value="">Select Hospital</option>
        <option>Fauget Heart Institute, Defence Colony, New Delhi</option>
        <option>Fauget Medical Centre, Chirag Enclave, New Delhi</option>
        <option>Fauget Medical Centre, Mohali</option>
        <option>Fauget La Femme, Shalimar Bagh, New Delhi</option>
        <option>Fauget Hospital Mall Road, Ludhiana</option>
        <option>Fauget Medical Centre, Bathinda</option>
        <option>Fauget Medical Centre, Gurgaon</option>
        <option>Fauget Hospital, Faridabad</option>
        <option>Fauget Medical Centre, Panipat</option>
      </select>
      {isSubmitted && errors.hospital && <p className="error">{errors.hospital}</p>}
    </div>

    {/* MESSAGE */}
    <div className="form-group">
      <label>Feedback</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
    </div>

    <button type="submit" className="submit-btn">Submit</button>

  </form>
</div>


    </>
  );
};

export default Contact;