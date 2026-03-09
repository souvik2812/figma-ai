export default function ContactMe() {
  return (
    <section id="Contact" className="contact--section">
      <div>
        <p className="sub--title">Get In Touch</p>
        <h2>Contact Me</h2>
        <p className="text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, odit.
        </p>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50922.73654499116!2d87.11013724464543!3d23.60783929008587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f711c07b254413%3A0xeaca094200cd0455!2sPANCHMUKHI%20HANUMAN%20TEMPLE!5e1!3m2!1sen!2sin!4v1719785884491!5m2!1sen!2sin"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>


      <div className="container">
        <div className="contact--section">
          <form
            action="https://formspree.io/f/mjkbvkwb"
            method="POST"
            className="contact--form--container"
          >
            <div className="container">
              <label htmlFor="first-name" className="contact--label">
                <span className="text-md">Name</span>
                <input
                  type="text"
                  className="contact--input text-md"
                  name="username"
                  id="first-name"
                  placeholder="username"
                  required
                />
              </label>

              <label htmlFor="email" className="contact--label">
                <span className="text-md">Email</span>
                <input
                  type="email"
                  className="contact--input text-md"
                  name="Email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </label>
            </div>

            <label htmlFor="message" className="contact--label">
              <span className="text-md">Message</span>
              <textarea
                className="contact--input text-md"
                id="message"
                name="message"
                cols="30"
                rows="8"
                placeholder="Type your message..."
              />
            </label>
            <div>
              <input
                className="btn btn-primary contact--form--btn"
                type="submit"
                value="send"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
