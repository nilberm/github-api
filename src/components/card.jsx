import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./card.css";

const Card = () => {
  const nameUser = document.getElementById("inputText");

  const [errorState, setErrorState] = useState(false);
  const [userDate, setUserDate] = useState({});

  useEffect(() => {
    setUserDate({});
  }, []);
  async function getGithubProfile() {
    try {
      const resp = await fetch(
        "https://api.github.com/users/" + nameUser.value
      );
      const data = await resp.json();
      setUserDate(data);
    } catch (err) {
      setErrorState(true);
      console.log(err);
      window.alert("Enter an existing user please!");
    }
  }

  function nameProfile() {
    if (userDate.name === undefined || errorState === true) {
      return "Search GitHub Profile";
    } else if (userDate.name === null) {
      return "This person has not registered their name.";
    } else {
      return userDate.name;
    }
  }
  function imageProfile() {
    if (userDate.avatar_url === undefined || errorState === true) {
      return "https://git-hub-api-nu.vercel.app/profile.svg";
    } else {
      console.log(userDate);
      return `https://avatars.githubusercontent.com/u/${userDate.id}?v=4`;
    }
  }

  return (
    <div id="container">
      <div id="card">
        <p id="nameUser">{nameProfile()}</p>
        <img src={imageProfile()} alt="Profile" loading="lazy" />
        <form action="#">
          <input
            id="inputText"
            type="text"
            placeholder="Enter your GitHub profile"
          />
          <button id="btn" onClick={getGithubProfile}>
            Search
          </button>
        </form>
      </div>
      <div id="social-medias">
        <FontAwesomeIcon
          className="social-icons"
          icon={faLinkedin}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="social-icons"
          icon={faGithub}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="social-icons"
          icon={faEnvelope}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="social-icons"
          icon={faPhone}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Card;
