"use strict";


var samples={
	calm:[
	    {
	        name:"sitting",
	        transitionProbabilities:{
	            sitting:0.8,
	            talking:0.1,
	            running:0.02,
	            kissing:0.2,
	            following:0.1
	        }
	    },
	    {
	        name:"talking",
	        transitionProbabilities:{
	            sitting:0.1,
	            talking:0.8,
	            running:0.02,
	            kissing:0.2,
	            following:0.1
	        }
	    },
	    {
	        name:"running",
	        transitionProbabilities:{
	            sitting:0.01,
	            talking:0.39,
	            running:0.5,
	            kissing:0.1,
	            following:0.1
	        }
	    },
	    {
	        name:"kissing",
	        transitionProbabilities:{
	            sitting:0.3,
	            talking:0.3,
	            running:0.1,
	            kissing:0.8,
	            following:0.5
	        }
	    },
	    {
	        name:"following",
	        transitionProbabilities:{
	            sitting:0.2,
	            talking:0.3,
	            running:0.2,
	            kissing:0.3,
	            following:0.7
	        }
	    }
	],
	// bipolar:[
	//     {
	//         name:"sitting",
	//         transitionProbabilities:{
	//             sitting:0.3,
	//             talking:0.02,
	//             running:0.48,
	//             kissing:0.4,
	//             following:0.3
	//         }
	//     },
	//     {
	//         name:"talking",
	//         transitionProbabilities:{
	//             sitting:0.45,
	//             talking:0.1,
	//             running:0.2,
	//             kissing:0.4,
	//             following:0.1
	//         }
	//     },
	//     {
	//         name:"running",
	//         transitionProbabilities:{
	//             sitting:0.48,
	//             talking:0.02,
	//             running:0.5,
	//             kissing:0.2,
	//             following:0.1
	//         }
	//     },
	//     {
	//         name:"kissing",
	//         transitionProbabilities:{
	//             sitting:0.01,
	//             talking:0.39,
	//             running:0.6,
	//             kissing:0.2,
	//             following:0.1
	//         }
	//     },
	//     {
	//         name:"following",
	//         transitionProbabilities:{
	//             sitting:0.01,
	//             talking:0.39,
	//             running:0.6,
	//             kissing:0.2,
	//             following:0.1
	//         }
	//     }
	// ],
	excited:[
	    {
	        name:"sitting",
	        transitionProbabilities:{
	            sitting:0.2,
	            talking:0.1,
	            running:0.3,
	            kissing:0.6,
	            following:0.1
	        }
	    },
	    {
	        name:"talking",
	        transitionProbabilities:{
	            sitting:0.4,
	            talking:0.3,
	            running:0.2,
	            kissing:0.1,
	            following:0.3
	        }
	    },
	    {
	        name:"running",
	        transitionProbabilities:{
	            sitting:0.02,
	            talking:0.2,
	            running:0.3,
	            kissing:0.3,
	            following:0.4
	        }
	    },
	    {
	        name:"kissing",
	        transitionProbabilities:{
	            sitting:0.3,
	            talking:0.1,
	            running:0.6,
	            kissing:0.5,
	            following:0.2
	        }
	    },
	    {
	        name:"following",
	        transitionProbabilities:{
	            sitting:0.1,
	            talking:0.3,
	            running:0.6,
	            kissing:0.2,
	            following:0.5
	        }
	    }
	],
	agitated:[
	    {
	        name:"sitting",
	        transitionProbabilities:{
	            sitting:0.1,
	            talking:0.1,
	            running:0.8,
	            kissing:0.2,
	            following:0.4
	        }
	    },
	    {
	        name:"talking",
	        transitionProbabilities:{
	            sitting:0.1,
	            talking:0.1,
	            running:0.8,
	            kissing:0.2,
	            following:0.1
	        }
	    },
	    {
	        name:"running",
	        transitionProbabilities:{
	            sitting:0.2,
	            talking:0.05,
	            running:0.4,
	            kissing:0.2,
	            following:0.3
	        }
	    },
	    {
	        name:"kissing",
	        transitionProbabilities:{
	            sitting:0.01,
	            talking:0.39,
	            running:0.6,
	            kissing:0.2,
	            following:0.3
	        }
	    },
	    {
	        name:"following",
	        transitionProbabilities:{
	            sitting:0.2,
	            talking:0.1,
	            running:0.6,
	            kissing:0.3,
	            following:0.3
	        }
	    }
	]
};