import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-card">

          <h2>Send Message</h2>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
            ></textarea>

            <button>
              Send Message
            </button>

          </form>

        </div>

        <div className="contact-card">

          <h2>Developer Contact</h2>

          <p>👨‍💻 Pramod</p>
          <p>📧 pramuprashi123@gmail.com</p>
          <p>📍 Bengaluru, India</p>
          <p>💼 LinkedIn: www.linkedin.com/in/pramod0710</p>
          <p>💻 GitHub: https://github.com/Pramod-7056</p>

        </div>

      </div>

    </div>
  );
}

export default Contact;