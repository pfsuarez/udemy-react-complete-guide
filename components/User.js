import React from 'react';
// import Link from "next/link";
// import Router from "next/router";

const user = (props) => (
    <div>
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
    </div>
);

export default user;