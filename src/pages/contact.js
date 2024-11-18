import Link from "next/link";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import ContactInfo from "../components/contact/ContactInfo";
import HeadMeta from "../components/common/HeadMeta";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetSocialShare from "../components/widget/WidgetSocialShare";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetInstagram from "../components/widget/WidgetInstagram";
import AdSenseSidebar from "../components/common/AdSenseSidebar";
import AdSenseSidebar2 from "../components/common/AdSenseSidebar2";

const ContactPage = ({ allPosts }) => {
    return (
        <>
            <HeadMeta metaTitle="Contact Us" />
            <Header />
            <Breadcrumb aPage="Contact Us" />
            <BreadcrumbBanner pageTitle="Contact Us" />
            <div className="axil-contact-us section-gap-top p-b-xs-20">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="about-us-content">
                                <ul className="footer-nav">
                                    <ContactInfo />
                                </ul>

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

export default ContactPage;





