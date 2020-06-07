import React from 'react';
import { Main } from './main/Main';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';

export function Layout(){
    return(
        <div className="layout">
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
        </div>
    );
}