import react from 'react';
import Formulaire from '../../Containers/Formulaire/Formulaire';
import Header from '../ElementsFixe/BarreTop/head';
import TabBord from '../ElementsFixe/TableauDeBord/TabBord';

function PageChart(){
    return (
    <div>
        <Header />
        <TabBord />
        <Formulaire />
    </div>)
}

export default PageChart;