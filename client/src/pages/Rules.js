import React from 'react';
import './Rules.css';

const Rules = () => {
  return (
    <div className="rules-page">
      <h1>Game Rules</h1>
      
      <div className="rules-content">
        <section className="rules-section">
          <h2>Core Mechanics</h2>
          <div className="rule-card">
            <h3>Dice Rolling</h3>
            <p>
              Midnight Nation uses a d20 system for most checks. Roll a 20-sided die and 
              add relevant modifiers based on your character's stats and abilities.
            </p>
          </div>
          
          <div className="rule-card">
            <h3>Character Stats</h3>
            <p>
              Each character has six core stats: Strength, Dexterity, Constitution, 
              Intelligence, Wisdom, and Charisma. These stats range from 1-20 and 
              affect various aspects of gameplay.
            </p>
          </div>

          <div className="rule-card">
            <h3>Combat</h3>
            <p>
              Combat is turn-based. Roll for initiative at the start of combat to 
              determine turn order. On your turn, you can move and take one action 
              (attack, cast spell, use ability, etc.).
            </p>
          </div>
        </section>

        <section className="rules-section">
          <h2>Character Creation</h2>
          <div className="rule-card">
            <h3>Starting Level</h3>
            <p>
              New characters start at level 1 with base stats of 10 in each attribute. 
              You receive 6 points to distribute among your stats as you see fit.
            </p>
          </div>

          <div className="rule-card">
            <h3>Races & Classes</h3>
            <p>
              Choose from various races and classes, each providing unique abilities 
              and bonuses. Your choices will affect your playstyle and role in the party.
            </p>
          </div>
        </section>

        <section className="rules-section">
          <h2>Progression</h2>
          <div className="rule-card">
            <h3>Experience & Leveling</h3>
            <p>
              Earn experience by completing quests, defeating monsters, and achieving 
              story goals. Level up to gain new abilities and improve your stats.
            </p>
          </div>

          <div className="rule-card">
            <h3>Abilities</h3>
            <p>
              As you level up, you unlock new abilities. Passive abilities are always 
              active, active abilities require an action to use, and reactions can be 
              used in response to specific triggers.
            </p>
          </div>
        </section>

        <section className="rules-section">
          <h2>Campaigns</h2>
          <div className="rule-card">
            <h3>Playing with Others</h3>
            <p>
              Join campaigns to adventure with other players. The gamemaster (GM) 
              creates and narrates the story while players make decisions for their 
              characters.
            </p>
          </div>

          <div className="rule-card">
            <h3>Role of the GM</h3>
            <p>
              The GM is responsible for creating the world, narrating the story, 
              controlling NPCs and monsters, and adjudicating rules. They guide 
              the narrative while allowing player agency.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rules;
