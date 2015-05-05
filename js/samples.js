"use strict";


var stateNames=['sitting', 'talking', 'running', 'kissing', 'following'];

var statesJson=[
    {
        name:"sitting",
        image:null,
        active:true,
    },
    {
        name:"talking",
        image:null,
        active:false,
    },
    {
        name:"running",
        image:null,
        active:false,
    },
    {
        name:"kissing",
        image:null,
        active:false,
    },
    {
        name:"following",
        image:null,
        active:false,
    }
];

var samples=[
	{
		name:'calm',
		transition: [
			[0.8, 0.1, 0.02, 0.2, 0.1], //sitting
			[0.1, 0.8, 0.02, 0.2, 0.1], //talking
			[0.01, 0.39, 0.5, 0.1, 0.1], //running
			[0.3, 0.3, 0.1, 0.8, 0.5], //kissing
			[0.2, 0.3, 0.2, 0.3, 0.7] //following
		]
	},
	{
		name:'excited',
		transition: [
			[0.7, 0.2, 0.1, 0.1, 0.2], //sitting
			[0.2, 0.7, 0.1, 0.1, 0.2], //talking
			[0.1, 0.2, 0.7, 0.1, 0.2], //running
			[0.1, 0.2, 0.7, 0.1, 0.2], //kissing
			[0.1, 0.2, 0.7, 0.1, 0.2] //following
		]
	},
	{
		name:'agitated',
		transition: [
			[0.1, 0.1, 0.8, 0.2, 0.4], //sitting
			[0.1, 0.1, 0.8, 0.2, 0.1], //talking
			[0.2, 0.05, 0.4, 0.2, 0.3], //running
			[0.01, 0.4, 0.6, 0.2, 0.3], //kissing
			[0.2, 0.1, 0.6, 0.3, 0.3] //following
		]
	}
];