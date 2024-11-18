import Link from "next/link";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/common/HeadMeta";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetInstagram from "../components/widget/WidgetInstagram";
import AdSenseSidebar from "../components/common/AdSenseSidebar";
import AdSenseSidebar2 from "../components/common/AdSenseSidebar2";


const AboutUs = ({ allPosts }) => {

    return (
        <>
            <HeadMeta metaTitle="About Us" />
            <Header />
            <Breadcrumb aPage="About Us" />
            <BreadcrumbBanner pageTitle="About Us" />
            <div className="axil-about-us-live section-gap-top p-b-xs-20">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="about-us-content">
                                <ul className="footer-nav" style={{ listStyle: "none" }}>
                                    <li><Link href={`https://www.hastakshep.com/`}>Hastakshep.com</Link></li>
                                    <li>Deshbandhu Complex, Ramsagar Para</li>
                                    <li><i className="fa fa-map" style={{ color: "rgb(0, 110, 229)" }}></i> c/o Deshbandhu
                                        C 56/12 Sector-62 NOIDA(UP)</li>
                                    <li> <i className="fa fa-whatsapp" style={{ color: "rgb(0, 110, 229)" }}></i>Whatsapp only +91-9312873760</li>

                                    <li><i className="fa fa-envelope" style={{ color: "rgb(0, 110, 229)" }}></i>  <a href="mailto:rajeevrsri@gmail.com">amalendu.upadhyay@gmail.com</a></li>

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

export default AboutUs;





