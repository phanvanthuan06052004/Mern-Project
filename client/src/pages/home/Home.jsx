import React from 'react'
import Banner from './Banner'
import BestSeller from './BestSeller'
import Recomment from './Recomment'
import News from './News'

const Home = () => {
    return (
        <div>
            <Banner />
            <BestSeller />
            <Recomment />
            <News />
        </div>
    )
}

export default Home
