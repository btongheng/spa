const urlPageTitle = "JS Single Page";

document.addEventListener("click", (e) => {
    const { target } = e;
    if(!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    urlRoute();
})


const urlRoutes = {
    404: {
		template: "/pages/404.html",
		title: "404 | " + urlPageTitle,
		description: "Page not found",
	},
	"/": {
		template: "/pages/index.html",
		title: "Home | " + urlPageTitle,
		description: "This is the home page",
	},
	"/about": {
		template: "/pages/about.html",
		title: "About Us | " + urlPageTitle,
		description: "This is the about page",
	},
	"/contact": {
		template: "/pages/contact.html",
		title: "Contact Us | " + urlPageTitle,
		description: "This is the contact page",
	},
}

const urlRoute = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    if (location.length == 0) {
        location = "/";
    }

    // get the route object from the urlRoutes object
	const route = urlRoutes[location] || urlRoutes["404"];
	// get the html from the template
	const html = await fetch(route.template).then((response) => response.text());
	// set the content of the content div to the html
	document.getElementById("content").innerHTML = html;
	// set the title of the document to the title of the route
	document.title = route.title;
    // set the description of the document to the description of the route
	document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};


// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();