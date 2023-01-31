import Card from "../../components/Card/Card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, cleanPokemons } from "../../redux/actions";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../../components/Loading/Loading";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  //Paginado acá abajo
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const [order, setOrder] = useState(""); //Para modificar el estado local y me ayude al renderizado
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(cleanPokemons(dispatch));
    dispatch(getPokemons());
  };

  return (
    <div>
      {allPokemons.length > 0 ? (
        <div>
          <NavBar />
          <div className={styles.home}>
            <div className={styles.filters}>
              <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />

              <button
                className={styles.btn}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Clear filters
              </button>
            </div>
            <div>
              <div>
                <Pagination
                  pokemonsPerPage={pokemonsPerPage}
                  allPokemons={allPokemons.length}
                  pagination={pagination}
                />
              </div>
              <div className={styles.cards}>
                {currentPokemons?.map((e, k) => {
                  return (
                    <div key={k} className={styles.card}>
                      <Card
                        key={e.id}
                        id={e.id}
                        name={e.name}
                        image={e.img}
                        types={e.types}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
