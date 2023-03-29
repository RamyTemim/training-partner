import React, { useState } from "react";
import Header from "../../ElementsFixe/BarreTop/head";
import TabBord from "../../ElementsFixe/TableauDeBord/TabBord";
import FormSeance from "./FormSeance/FormSeance";
import SelectSport from "./FormSeance/SelectSport/SelectSport";
import Seance from "./Seance/Seance";
import SportsList from "./Sport/Sport";

const Activite : React.FC =()=>{
    return (
        <div>
           <TabBord/>
           <Seance/>
           <SportsList/>
           <SelectSport/>
           <FormSeance/>
           <Header/>
        </div>
    )
}

export default Activite;