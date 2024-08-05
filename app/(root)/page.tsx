import React from 'react';
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import {getLoggedInUser} from "@/lib/actions/user.actions";

const Home = async () => {
    const loggedIn = await getLoggedInUser();
    return (
        <div className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox type="greeting" title="Welcome"
                               user={loggedIn?.name || 'Guest'}
                               subtext="Manage your account in just a few clicks and do everything."
                    />
                    <TotalBalanceBox accounts={[]} totalBanks={1}
                                     totalCurrentBalance={1412.96}
                    />
                </header>
                Recent TRANS
            </div>
            <RightSidebar user={loggedIn}
                transactions={[]} banks={[{currentBalance: 123.4},{currentBalance: 321.2}]}
            />
        </div>
    );
};

export default Home;