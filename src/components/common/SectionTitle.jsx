import Link from "next/link";

const SectionTitle = ({ title, btnText, btnUrl, pClass }) => {
    const linkUrl = btnText === 'सभी वीडियो' ? "https://www.youtube.com/@Hastakshepnews" : btnUrl || "#";
    const target = btnText === 'सभी वीडियो' ? "_blank" : "_self";
    const label = btnText || <></>; // Ensure btnText is never empty

    return (
        <div className={`section-title ${pClass ?? "m-b-xs-40"}`}>
            <h2 className="axil-title">{title}</h2>
            <Link href={linkUrl}>
                <a className="btn-link" target={target} aria-label={label}>
                    {btnText || <></>}  {/* Ensure there is always text */}
                </a>
            </Link>
        </div>
    );
}

export default SectionTitle;
