import React, { useState } from "react";
import Header from "../../ElementsFixe/BarreTop/head";
import TabBord from "../../ElementsFixe/TableauDeBord/TabBord";
import FormSeance from "./FormSeance/FormSeance";
import Seance from "./Seance/Seance";
import SportsList from "./Sport/Sport";

function PageActivite(){
    return (
        <div>
           <Seance/>
           <SportsList/>
           <FormSeance/>
        </div>
    )
}

export default PageActivite;