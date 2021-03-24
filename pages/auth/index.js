import React from 'react';
import Link from "next/link";
import User from "../../components/User";

const authIndexPage = (props) => (
    <div>
        <h1>The Auth Main Page - {props.appName}</h1>
        <User name="Test" age={33} />
        <p>Go to <Link href="/">Main Page</Link></p>
    </div>
);

authIndexPage.getInitialProps = (context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                appName: 'Super App (Auth)'
            })
        }, 3000);
    });

    return promise;
};

export default authIndexPage;