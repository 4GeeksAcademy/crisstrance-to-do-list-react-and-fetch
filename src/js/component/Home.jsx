import React, { useEffect, useState } from "react";
import List from "./List.jsx";
import Footer from "./Footer.jsx";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const footerData = [
	{
		githubURL: "https://github.com/crisstrance",
		name: "Cristian Aravena"
	},
];

const Home = () => {
	return (
		<div className="text-center" >
			<h1 className="title text-light">ToDo List</h1>
			<List />
			<Footer properties={footerData}/>
		</div>
	);
};

export default Home;
