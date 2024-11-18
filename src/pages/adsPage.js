import fs from 'fs';

export async function getServerSideProps(context) {
    // Read the content of your ads.txt file
    const adsTxtContent = fs.readFileSync('/public/ads.txtt', 'utf-8');

    // Return the content as props
    return {
        props: {
            adsTxtContent,
        },
    };
}

export default function AdsTxt({ adsTxtContent }) {
    return <pre>{adsTxtContent}</pre>;
}
