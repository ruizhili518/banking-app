'use client'
import CountUp from "react-countup";

const AnimatedCounter = ({amount} : {amount : number}) => {
    return (
        <div>
            <CountUp end={amount} prefix='$' decimals={2} duration={1.25} />
        </div>
    );
};

export default AnimatedCounter;