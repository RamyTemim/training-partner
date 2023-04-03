import React, { useState } from "react";
import Header from "../../ElementsFixe/BarreTop/head";
import TabBord from "../../ElementsFixe/TableauDeBord/TabBord";
import FormSeance from "./FormSeance/FormSeance";
import SelectSport from "./FormSeance/SelectSport/SelectSport";
import Seance from "./Seance/Seance";
import SportsList from "./Sport/Sport";

function PageActivite(){
    return (
        <div>
           <Seance/>
           <SportsList/>
           <SelectSport/>
           <FormSeance/>
        </div>
    )
}

export default PageActivite;