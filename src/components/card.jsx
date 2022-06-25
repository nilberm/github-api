import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./card.css";

const Card = () => {
  const [errorState, setErrorState] = useState(false);
  const [userDate, setUserDate] = useState({});
  const [nameUser, setNameUser] = useState("");

  useEffect(() => {
    setUserDate({});
  }, []);

  async function getGithubProfile() {
    try {
      const resp = await fetch(`https://api.github.com/users/${nameUser}`);
      const data = await resp.json();
      setUserDate(data);
      if (data.message === "Not Found") {
        window.alert("Enter an existing user please!");
      }
    } catch (err) {
      setErrorState(true);
      window.alert("This is not supposed to happen");
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
            onChange={(e) => setNameUser(e.target.value)}
          />
          <button id="btn" onClick={getGithubProfile}>
            Search
          </button>
        </form>
      </div>
      <div id="social-medias">
        <a
          href="https://www.linkedin.com/in/nilberm/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="social-icons"
            icon={faLinkedin}
          ></FontAwesomeIcon>
        </a>
        <a href="https://github.com/nilberm/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon
            className="social-icons"
            icon={faGithub}
          ></FontAwesomeIcon>
        </a>
        <a href="mailto:nilber16@outlook.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon
            className="social-icons"
            icon={faEnvelope}
          ></FontAwesomeIcon>
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=+5585989493607&text=Olá! Gostaria de entrar em contato."
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="social-icons"
            icon={faPhone}
          ></FontAwesomeIcon>
        </a>
      </div>
    </div>
  );
};

export default Card;
