import { useEffect, useState } from 'react';
import Script from 'next/script';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha = ({ setRecaptchaValue }) => {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    const handleLoaded = () => {
      console.log('ReCAPTCHA script loaded');
      setRecaptchaLoaded(true);
    };

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = handleLoaded;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!recaptchaLoaded) {
    return null;
  }

  return (
    <ReCAPTCHA
      sitekey="6LdgCtsSAAAAABcv2ew00FuBVkezreiDAuuEEaby"
      onChange={(value) => setRecaptchaValue(value)}
    />
  );
};

export default Recaptcha;
