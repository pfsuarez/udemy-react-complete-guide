import React from 'react';
import Link from "next/link";

const authIndexPage = () => (
    <div>
        <h1>The Auth Main Page</h1>
        <p>Go to <Link href="/">Main Page</Link></p>
    </div>
);

export default authIndexPage;