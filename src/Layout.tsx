import Header from './components/Header/Header';
import { JSX } from "react";
import Footer from './components/Footer';

type Props = {
    children: JSX.Element
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;