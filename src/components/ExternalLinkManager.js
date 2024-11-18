import { useEffect } from 'react';

const ExternalLinkManager = () => {
    useEffect(() => {
       
        const externalLinks = document.querySelectorAll('.external-link');

       
        const enableLinks = () => {
            externalLinks.forEach(link => {
                const href = link.getAttribute('data-href');
                if (href) {
                    link.setAttribute('href', href); 
                }
            });
        };

        externalLinks.forEach(link => {
            const href = link.getAttribute('href'); 
            if (href) {
                link.setAttribute('data-href', href);
                link.removeAttribute('href'); 
            }
        });

       
        const timer = setTimeout(enableLinks, 5000);

      
        return () => clearTimeout(timer);
    }, []);

    return null; 
};

export default ExternalLinkManager;
