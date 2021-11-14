import React from "react";
import loadingLogo from "../images/loading1.gif";
import notFound from "../images/notfound.png";

const Cards = ({ cards, loading }) => {
  if (loading) {
    return <img className="loading" src={loadingLogo} alt="loading" />;
  }
  if (cards.length === 0) {
    return <img className="loading" src={notFound} alt="page not found" />;
  }

  return (
    <div className="right_list_company_outer">
      {cards.map((card) => (
        <div key={card[0]} className="right_single_card">
          <img
            alt="company"
            src={`https://storage.googleapis.com/account_logos/original/${card[0]}`}
          />
          <div className="right_cards_details_outer">
            <h4>{card[1].Name}</h4>
            <div className="right_details_infos">
              <ul className="right_details">
                <li>Country</li>
                <li>{card[1].HQ_Country__c}</li>
              </ul>
              <ul className="right_details">
                <li>Industry</li>
                <li>{card[1].Industry_Verticals__c}</li>
              </ul>
              <ul className="right_details">
                <li>Year</li>
                <li>{card[1].Year_of_Establishment__c}</li>
              </ul>
            </div>
            <p>{card[1].Short_Description__c}. </p>
            <p>Website: {card[1].Website}.</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
