import React from 'react';
import Link from "next/link";

const errorPage = (props) => (
    <div>
        <h1>Ooops!! Something went wrong</h1>
        <p>Try <Link href="/">going back</Link></p>
    </div>
);

export default errorPage;