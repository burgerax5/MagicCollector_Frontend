import Header from './components/Header/Header';
import { JSX } from "react";

type Props = {
    children: JSX.Element
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Layout;