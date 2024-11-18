import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import HeadMeta from "../components/common/HeadMeta";
import SectionTitleTwo from "../components/common/SectionTitleTwo";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetSocialShare from "../components/widget/WidgetSocialShare";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetInstagram from "../components/widget/WidgetInstagram";
import AdSenseSidebar from "../components/common/AdSenseSidebar";
import AdSenseSidebar2 from "../components/common/AdSenseSidebar2";

const Disclaimer = ({ allPosts }) => {
    return (
        <>
            <HeadMeta metaTitle="Disclaimer" />
            <Header />
            <Breadcrumb aPage="disclaimer" />
            <BreadcrumbBanner pageTitle="वैधानिक | Disclaimer" />
            <div className="axil-disclaimer section-gap-top p-b-xs-20">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="disclaimer-content">
                                <div><p>
                                    सर्वाधिकार सुरक्षित @ हस्तक्षेप.कॉम
                                </p></div>
                                <div><p>
                                    हस्तक्षेप.कॉम कुछ वरिष्ठ पत्रकारों का स्वैच्छिक संयुक्त प्रयास है. यह समसामयिक मुद्दों, राजनीतिक, आर्थिक व सामाजिक मुद्दों पर खुली बहस को विभिन्न विरोधी विचारों को बहस के लिए आमंत्रित करता है इसलिए यहाँ <b> प्रकाशित आलेख में विचार लेखकों के अपने हैं </b> और इसके लिए सभी जिम्मेदारियां भी उनकी हैं, <b>लेखकों के विचार से हस्तक्षेप.कॉम का सहमत होना जरूरी नहीं है. </b>चूंकि यह स्वस्थ एवं गंभीर बहस के लिए एक खुला मंच है इसलिए हम विभिन्न विचारों को एक मंच पर लाने के लिए अन्य स्थानों जैसे ब्लोग्स, समाचार पत्र इत्यादि से भी आलेख पोस्ट करते हैं, लेकिन ऐसे लेखों पर मूल सोर्स का उल्लेख भी करते हैं एवं साभार भी लिखते हैं. इसलिए हम भी चाहते हैं कि <b>जो समाचार पत्र या अन्य माध्यम हमारे आलेख का प्रकाशन करते हैं वे भी सोर्स के रूप में हस्तक्षेप.कॉम का उल्लेख अवश्य करें.</b>
                                </p></div>
                                <div><p>
                                    हस्तक्षेप.कॉम पर प्रकाशित किसी भी विज्ञापन की सूचनाओं की जिम्मेदारी विज्ञापनदाता की है, हस्तक्षेप.कॉम की नहीं इसलिए किसी भी विज्ञापन पर पहली पूरी जानकारी स्वयं कर लें एवं सत्यता की जांच स्वयं करें.
                                </p></div>
                                <div><p>
                                    इस साइट पर अन्य साइट्स के लिंक भी हैं तो केवल संदर्भ के रूप में हैं उनकी विषयवस्तु (कंटेंट) व वहां प्रदत्त सूचनाओं से हस्तक्षेप का कोई लेना देना नहीं है।
                                </p></div>
                                <div><p>
                                    यदि आपको लगता है कि हस्तक्षेप.कॉम पर प्रकाशित किसी विज्ञापन या लेख में कोई भ्रामक जानकारी है अथवा वह तथ्यों से परे है तो amalendu.upadhyay@gmail.com पर सूचित करें
                                </p></div>
                                <div><p>
                                    किसी भी विवाद की स्थिति में नोएडा न्यायालय ही न्याय क्षेत्र होगा.
                                </p></div>
                                <div><p>
                                    अधिकांश फोटो गूगल के सौजन्य से है। हम हमारी वेबसाइट और हमारे फेसबुक पेज पर प्रदर्शित होने वाली तस्वीरों के लिए किसी प्रकार का दावा नहीं करते। इन तस्वीरों को भिन्न-भिन्न स्रोतों से लिया जाता है, जिन पर इनके मालिकों का अपना कॉपीराइट है। यदि आपको लगता है कि हमारे द्वारा इस्तेमाल की गई कोई भी तस्वीर कॉपीराइट का उल्लंघन करती है तो आप amalendu.upadhyay@gmail.com पर अपनी आपत्ति दर्ज करा सकते हैं
                                </p></div>
                                <div><h2>
                                    Disclaimer
                                </h2>

                                </div>
                                <div><p>
                                    All rights reserved @ Hastakshep.com
                                </p></div>
                                <div><p>
                                    Hastakshep.com is a Voluntary joint venture of some senior journalists. We invite open and contradictory debate on various contemporary political, economic and social issues. Therefore, the views expressed in the articles published here are the views of the respective authors and they alone are responsible for this. Hastakshep.com need not subscribe to the views published in these articles.
                                    Since this is an open platform for sound and serious debate, we publish articles from other sources as well, such as blogs, newspapers etc. in order to make them available at one platform. However, we mention their original source by courtesy of——. Hence, we also want other newspapers or media to mention Hastakshep.com as source, whenever they publish our articles.
                                </p></div>
                                <div>
                                    <p>
                                        Hastakshep.com is not responsible for any advertising information published on it. It is the exclusive responsibility of the advertiser. So please verify the genuineness of the advertisement yourself.
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        If you find any misleading or fictitious information, please bring into the notice of its editor via mail to amalendu.upadhyay(at)gmail.com.
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Noida Court shall have exclusive jurisdiction in the event of any dispute. Most of the photos by courtesy of Google.
                                    </p>
                                    <p>amalendu.upadhyay(at)gmail.com</p>
                                    <h3>AMALENDU UPADHYAYA</h3>
                                    <p>Editor</p>
                                    <p>+91-9312873760 </p>
                                </div>
                            </div>

                        </div>
                        {/* End of .col-lg-8 */}
                        <div className="col-lg-4">
                            <aside className="post-sidebar">
                                <AdSenseSidebar />
                                <WidgetNewsletter />
                                <AdSenseSidebar2 />
                                <WidgetPost dataPost={allPosts} />
                                <WidgetInstagram />
                            </aside>
                        </div>
                    </div>

                </div>
            </div >

            <Footer />
        </>
    );
}

export default Disclaimer;





