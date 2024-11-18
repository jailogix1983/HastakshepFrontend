import React from 'react'
import HeadMeta from '../../components/common/HeadMeta'
import Header from '../../components/header/Header'
import Breadcrumb from '../../components/common/Breadcrumb'
import Footer from '../../components/footer/Footer'
import DbLiveVideoSection from '../../components/home/dblive-video/DbLiveVideoSection'


const DbVideo = () => {
    return (
        <>
            <HeadMeta metaTitle="Video Page" />
            <Header />
            <Breadcrumb aPage="video" />
            <DbLiveVideoSection />
            <Footer />

        </>

    )
}

export default DbVideo