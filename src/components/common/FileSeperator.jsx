import Image from 'next/image'
import React from 'react'

const FileSeperator = () => {
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <img src="/images/bottm-shadow.webp" alt="separator" style={{ width: '100%', height: '25px' }} loading = "lazy"/>
            </div>
        </>
    )
}

export default FileSeperator;