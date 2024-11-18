import { useState } from 'react';
import { subscribeToNewsletter } from '../../api/subscribeNewsLatter';
import { Form, Modal, Button } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

const WidgetNewsletter = () => {
  const [emailInput, setEmailInput] = useState('');
  const [message, setMessage] = useState('');
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput) {
      setMessage('Please enter a valid email');
      setTimeout(() => {
        setMessage('');
      }, 1000);
      return;
    }
    if (!recaptchaValue) {
      setShowRecaptcha(true);
      return;
    }
    try {
      const data = await subscribeToNewsletter(emailInput);
      if (data?.retval === '1') setMessage('Subscribed Successfully');
      else if (data?.retval === '-2' || data?.retval === null) setMessage('उपयोगकर्ता पहले ही सदस्यता ले चुका है');
      setEmailInput('');
      setRecaptchaValue(null);
      setTimeout(() => {
        setMessage('');
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecaptchaVerify = () => {
    setShowRecaptcha(false);
    handleSubmit(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const handleSubscribeClick = () => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setMessage('Please enter a valid email');
      setTimeout(() => {
        setMessage('');
      }, 1000);
    } else {
      setShowRecaptcha(true);
    }
  };

  return (
    <div className="newsletter-widget weekly-newsletter bg-grey-light-three m-b-xs-40 shadow" style={{ width: '365px' }}>
      <div className="newsletter-content">
        <div className="section-title">
          <h3 className="axil-title">हमारे न्यूज़लेटर की सदस्यता लें!</h3>
          <p className="mid m-t-xs-10 m-b-xs-20">
            विशेष ऑफ़र और नवीनतम समाचार प्राप्त करने वाले पहले व्यक्ति बनें
          </p>
        </div>
        <div className="subscription-form-wrapper">
          <form onSubmit={handleSubmit} className="subscription-form">
            <Form.Control
              type="email"
              className="mb-3"
              onChange={(e) => setEmailInput(e.target.value)}
              value={emailInput}
              required
              placeholder="ईमेल दर्ज करें"
            />
            <div className="m-b-xs-0" style={{ marginTop: '10px' }}>
              <Button type="button" className="btn btn-primary btn-small" onClick={handleSubscribeClick}>
                अब सदस्यता लें
              </Button>
            </div>
          </form>
        </div>
        {message && <div className={`alert ${message.includes('error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
      </div>

      <Modal show={showRecaptcha} onHide={() => setShowRecaptcha(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verify you are human</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReCAPTCHA
            sitekey="6LdgCtsSAAAAABcv2ew00FuBVkezreiDAuuEEaby"
            onChange={handleRecaptchaChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRecaptchaVerify} disabled={!recaptchaValue}>
            Verify and Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WidgetNewsletter;
