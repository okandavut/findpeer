import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/globalStyles";
import { lightTheme, darkTheme } from "../components/Themes";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
    const [theme, setTheme] = useState("light");

    const themeToggler = () => {
        const ls_theme = localStorage.getItem("theme");
        if (ls_theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    };

    useEffect(() => {
        const ls_theme = localStorage.getItem("theme");
        if (ls_theme) {
            ls_theme === "light" ? setTheme("light") : setTheme("dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <header>
                <Link style={{ marginTop: "21px" }} href='/'>
                    <h3>Find Your Peer</h3>
                </Link>
                {theme === "light" ? (
                    <img onClick={themeToggler} src="/static/light-mode.png" />
                ) : (
                    <img
                        onClick={themeToggler}
                        src="/static/dark-mode.png"
                        style={{ width: "40px" }}
                    />
                )}
            </header>

            <GlobalStyles />
            <Head>
                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta content="#da532c" name="theme-color" />
                <meta content="#ffffff" name="msapplication-TileColor" />
                <meta
                    content="/favicons/browserconfig.xml"
                    name="msapplication-config"
                />
                <meta content="5e41b2275db646a5" name="yandex-verification" />
                <meta
                    content="t28Kl2fGmZjIEgh6q3mGsf-7gGb8115VMQm1qbMMIKc"
                    name="google-site-verification"
                />
            </Head>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
