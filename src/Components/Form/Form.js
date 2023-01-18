import React, { useState, useEffect } from "react";
import { createMembres, readMembres } from "../../firebase.config";
import "./Form.css";

function Form() {
  // Initialisez un état pour stocker les données entrées
  const [name, setName] = useState("");
  // Initialisez un état pour stocker la visibilité du message d'erreur
  const [showError, setShowError] = useState(false);
  // Initialiser l'état pour stocker les données de Firebase
  const [membres, setMembres] = useState([]);

  // Gérer la soumission du formulaire
  function handleSubmit(e) {
    e.preventDefault();
    if(name.trim() !==''){
      // Ajoutez les données à Firebase si l'entrée n'est pas vide
      createMembres(name);
      setName('');
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  // utiliser useEffect pour lire les données de Firebase
  useEffect(() => {
    readMembres("membres").then((membres) => {
      setMembres(membres);
      // Trier les données par la propriété "name" dans l'ordre croissant
      membres.sort((a, b) => (a.name > b.name) ? 1 : -1);
      setMembres(membres);
    });
  }, [name]);

  return (
    <>
      {/* Nouveau formulaire de membre */}
      <h2>Ajouter un(e) Argonaute</h2>
      <form className="new-member-form">
        <label htmlFor="name">Nom de l&apos;Argonaute</label>
        <div className="searchbox">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Charalampos"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            <span>Envoyer</span>
          </button>
        </div>
        {showError && <p>Veuillez entrer un nom</p>}
      </form>

      {/* Liste de membre */}
      <h2>Membres de l'équipage</h2>
      <section className="member-list">
        {membres.map((item, index) => (
          <div className="member-item" key={index}>
            {item.name}
          </div>
        ))}
      </section>
    </>
  );
};

export default Form;
