import Head from "next/head";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home(results) {
  const intialState = results;
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState(intialState.characters);
  
  console.log(intialState)
  return (
    <div >
 

      <footer>
        Powered by Energy Drinks 🥫 and YouTube Subscribers.
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              name
              id
            }
            image
            origin {
              name
              id
            }
            episode {
              id
              episode
              air_date
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}