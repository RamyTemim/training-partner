import React, {useState} from 'react';

import TabBord from '../../ElementsFixe/TableauDeBord/TabBord';
import Header from '../../ElementsFixe/BarreTop/head';
import Formulaire from '../../../Containers/Formulaire/Formulaire';
function ChartCreate(){
    return (
        <div id="main">
            <TabBord/>
            <Header/>
            <Formulaire/>
        </div>
    );

}


export default ChartCreate;