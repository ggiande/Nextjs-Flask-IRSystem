import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import reactAndFlask from "../public/reactandflask.svg";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchDataSearch();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("id: ", id);
    if (query && id == "search") {
      fetchDataSearch();
      console.log("Query: ", query);
    } else if (id == "lucky") {
      fetchDataLucky();
    }
  };

  async function fetchDataSearch() {
    const res = await fetch("http://127.0.0.1:5000/" + query).catch((err) => {
      console.log(err);
    });
    const data = await res.json();
    // data = Array.from(data);
    setResponse(data);
    console.log("fetchDataSearch -> : ", data);
  }

  async function fetchDataLucky() {
    const res = await fetch("http://127.0.0.1:5000/lucky").catch((err) => {
      console.log(err);
    });
    const data = await res.json();
    // data = Array.from(data);
    setResponse(data);
    console.log("fetchDataLucky -> : ", data);
  }

  const listDocuments = Object.values(response._list_relevant_docs || {});

  function ListItem(props) {
    return (
      <div className={styles["list-docs"]}>
        <p>{props.value}</p>
      </div>
    );
  }

  const newListDocuments = listDocuments.map((doc, index) => (
    <ListItem key={index} value={doc} />
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Flask Query</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.jumbotron}>
        <Image
          src={reactAndFlask}
          alt="Image of react and flask"
          id={styles.jumboImage}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.greetings}>
        <h2>Welcome to Qry Flask!</h2>
        <p>
          This page is made using Python&apos;s Flask and NextJS. Flask is a
          micro web framework written in Python. It is classified as a
          microframework because it does not require particular tools or
          libraries. Next.js is an open-source web development framework built
          on top of Node.js enabling React-based web applications
          functionalities such as server-side rendering and generating static
          websites. NextJS is the React Framework for Production and this page
          may be hosted on Vercel.
        </p>
        <h2>What is QryFlask?</h2>
        <p>
          QryFlask is a web app that can take input and makes web requests to a
          Python Flask back end application. The flask application then sends a
          query via a controller to the service layer of a python app that
          implemented an inverted index data structure and uses an information
          retrieval system that returns results.
        </p>
        <h2>How to use QryFlask</h2>
        <p>
          To use QryFlask, place a phrase or a word into the search bar and the
          app will render components of cards detailing the search results from
          the python application. By default, upon the loading of this page, an
          example request and render is executed at build time using an effect
          hook from react.
        </p>
      </div>

      <div className={styles.query}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          noValidate
          autoComplete="off"
        >
          <h1>QryFlask</h1>
          <input
            className={styles.input}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search.."
          />
          <div className={styles["search-bar"]}>
            <button
              className={styles.button}
              type="submit"
              onClick={(e) => setId(e.target.id)}
              id="search"
            >
              QryFlask Search
            </button>
            <button
              className={styles.button}
              type="submit"
              onClick={(e) => setId(e.target.id)}
              id="lucky"
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
        </form>

        {/* {response.map(() => ( */}
        <div className={styles.card}>
          {/* parseFloat(0.0009999999.toFixed(4)); */}
          <h2>{response._text_string}</h2>
          <p>
            Frequency of word in all documents:{" "}
            {parseFloat(response._frequency).toFixed(4)}
          </p>

          <p>List of Documents where your query can be found:</p>
          {newListDocuments}
        </div>
      </div>
    </div>
  );
}
