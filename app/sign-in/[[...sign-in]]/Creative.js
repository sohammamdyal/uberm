import React from 'react';
import Lottie from 'lottie-react';
import bannerImage from './../../../public/mapv.json'
import { SignIn } from "@clerk/nextjs";

function Creative() {
    return (
        <div>
        <Lottie animationData={bannerImage} width={900} height={1000}
        className="object-contain h-full w-full"/>
        <div className=" absolute top-20 right-0">
        <SignIn/>

</div>
</div>
 );
}
export default Creative;