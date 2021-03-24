import React from 'react';
import Link from "next/link";
import User from "../../components/User";

const authIndexPage = () => (
    <div>
        <h1>The Auth Main Page</h1>
        <User name="Test" age={33} />
        <p>Go to <Link href="/">Main Page</Link></p>
    </div>
);

export default authIndexPage;