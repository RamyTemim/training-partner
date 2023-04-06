import React, { useState } from "react";
import Header from "../../ElementsFixe/BarreTop/head";
import TabBord from "../../ElementsFixe/TableauDeBord/TabBord";
import Calendrier from "./FormSeance/Calendrier/Calendrier";
import FormSeance from "./FormSeance/FormSeance";
import SelectSport from "./FormSeance/SelectSport/SelectSport";
import Seance from "./Seance/Seance";
import SportsList from "./Sport/Sport";

function PageActivite(){
    return (
        <div>

           <FormSeance/>
  
        </div>
    )
}

export default PageActivite;