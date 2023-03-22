import './styles.css'
import React from 'react'
export function Home(){
    return (
      <div className="home-container">
        <h1 className="home-title">Dive into Ricky & Morty World!</h1>
        <span className='home-subtitle'>
          Get ready for a wild ride through multiple dimensions with Rick and
          Morty! Follow the adventures of the eccentric scientist and his
          hapless grandson as they encounter strange creatures and navigate
          their dysfunctional family life. Meet the quirky characters and visit
          unforgettable locations. With hilarious episodes, Rick and Morty is a
          must-watch for any fan of sci-fi and comedy.
        </span>

        <div className="background-image"></div>
      </div>
    );
}