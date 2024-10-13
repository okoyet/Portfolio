/*
Name:  Tochukwu Collins Okoye
Assignment:  Assignment 5
Date:  11/16/2023

Page Description: It contains some contants that are used on all pages of the application
Files: index.html, main.css, labels.json, planets.json
*/

"use strict";

let planets = null;
let prompts = null;
let images = [];

// fetch prompts and store in prompts variable
function fetchPrompts() {
    fetch("./data/labels.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            prompts = data;
        })
        .catch((error) => console.error(error));
}
fetchPrompts();

// fetch planets and store in planets variable, then create buttons for each planet that will display planet data when clicked or hovered over
function fetchPlanets() {
    fetch("./data/planets.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            planets = data;

            // loop through planets array and create a button for each planet
            for (let i = 0; i < planets.length; i++) {
                const navElem = document.querySelector("nav");
                const buttonElem = document.createElement("button");
                buttonElem.type = "button";
                buttonElem.textContent = planets[i].name;
                buttonElem.addEventListener("mouseover", planetData);
                buttonElem.addEventListener("click", planetData);
                // add buttons to nav element
                navElem.appendChild(buttonElem);
            }
        })
        .catch((error) => console.error(error));
}

// display the buttons when the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchPlanets);

// display planet data when a button is clicked or hovered over
let planetData = {
    handleEvent: function (event) {
        const divElem = document.querySelector("div");
        const selectedPlanet = planets.find(
            (selected) => selected.name === event.target.textContent
        );

        // clear the div element and replace with the selected planet's data every time a button is clicked or hovered over
        divElem.innerHTML = "";

        for (let i = 0; i < Object.keys(selectedPlanet).length; i++) {
            const container = document.createElement("div");

            const label = document.createElement("span");
            label.classList.add("lbl");
            label.textContent = prompts[Object.keys(selectedPlanet)[i]] + ": ";

            const planetInfo = document.createElement("span");

            // handle cases for name, url, and img properties
            switch (Object.keys(selectedPlanet)[i]) {
                case "name":
                    const link = document.createElement("a");
                    link.href = selectedPlanet.url;
                    link.textContent = selectedPlanet.name;
                    link.target = "planetUrl";
                    planetInfo.appendChild(link);
                    container.appendChild(label);
                    container.appendChild(planetInfo);
                    break;
                case "url":
                    // don't display url property
                    continue;
                case "img":
                    const planetImg = document.createElement("img");
                    planetImg.src = `images/${selectedPlanet.img}`;
                    planetImg.alt = `Picture of ${selectedPlanet.name}`;
                    container.appendChild(planetImg);
                    break;
                default:
                    planetInfo.textContent =
                        selectedPlanet[Object.keys(selectedPlanet)[i]];
                    container.appendChild(label);
                    container.appendChild(planetInfo);
                    break;
            }

            divElem.appendChild(container);
        }
    },
};
