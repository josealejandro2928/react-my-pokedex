/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PokemonDetails.module.scss';
import { useParams } from 'react-router';
import { getPokemonById } from '../../services/pokemon';
import Loader from '../../components/Loader/Loader';
import SliderImagesPokemon from '../../components/SliderImages/SliderImagesPokemon';
import usePokedex from '../../hooks/usePokedex';
const cx = classNames.bind({ ...styles });

function PokemonDetails(): JSX.Element {
  const [error, setError] = useState<null | undefined | string | boolean>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<any>();
  const [images, setImages] = useState<Array<string>>([]);
  const [mainType, setMainType] = useState<string>('');
  const [statusMovesBar, setStatusMovesBar] = useState<string>('collapsible-hide');

  const { tooglePokemon, cacheMyPokedex } = usePokedex();

  const { id: pokemonId } = useParams<any>();

  useEffect(() => {
    if (!pokemonId) return;
    getPokemonData();
  }, [pokemonId]);

  const getPokemonData = async () => {
    setLoading(true);
    try {
      const data: any = await getPokemonById(pokemonId);
      setPokemon(data);
      buildImages(data);
      setMainType(data?.types[0]?.type?.name);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  function buildImages(pokemonData: any) {
    let imagesData: any[] = [
      pokemonData?.sprites?.front_default,
      pokemonData?.sprites?.back_default,
      pokemonData?.sprites?.front_shiny,
      pokemonData?.sprites?.back_shiny,
    ];
    setImages(imagesData);
  }

  function getPercentStat(statValue: number, base: number) {
    let a = Math.ceil((statValue / base) * 100);
    return `${a}%`;
  }

  if (loading) {
    return (
      <div className={cx('container')}>
        <div className={cx('pokemon-datails')}>
          <div className={cx('loader')}>
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cx('container')}>
        <div className={cx('pokemon-datails')}>
          <h3 style={{ textAlign: 'center' }}>
            Upps, <strong>{error}</strong>
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className={cx('container')}>
      <div className={cx('pokemon-datails')}>
        <h1 style={{ textTransform: 'capitalize', textAlign: 'center' }}>{pokemon?.name}</h1>
        {pokemon && (
          <i
            onClick={(e) => {
              e.stopPropagation();
              tooglePokemon(pokemon);
            }}
            style={{ cursor: 'pointer' }}
            className={cx('fas fa-save', 'btn-toogle-pokedex', cacheMyPokedex[pokemon.name] ? 'saved-pokemon' : '')}
          ></i>
        )}
        <div className={cx('images-resume')}>
          <div className={cx('images')}>
            <SliderImagesPokemon images={images} />
          </div>
          <div className={cx('resume')}>
            <div className={cx('types')} style={{ marginBottom: '1rem' }}>
              {pokemon?.types?.map((type: any, index: number) => {
                return (
                  <div key={index} className={cx('type-label', type?.type?.name)}>
                    {type?.type?.name}
                  </div>
                );
              })}
            </div>
            {pokemon?.stats?.map((stat: any, index: number) => {
              return (
                <div key={index} className={cx('stats')}>
                  <div className={cx('stats-name')}>{stat?.stat?.name}</div>
                  <div className={cx('stats-bar')}>
                    <div className={cx('backdrop')}></div>
                    <div className={cx('bar', mainType)} style={{ width: getPercentStat(stat?.base_stat, 150) }}>
                      {stat?.base_stat}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <section>
          <div style={{ fontSize: '1.5rem', marginBottom: 8, marginTop: '2rem' }}>Profile</div>
          <div style={{ height: '1px', width: '30rem', maxWidth: '90%' }} className={cx(mainType)} />
          <ul className={cx('profile')}>
            <li>
              <span style={{ textTransform: 'capitalize' }}>height: </span> {pokemon?.height / 10} m
            </li>
            <li>
              <span style={{ textTransform: 'capitalize' }}>weight: </span> {pokemon?.weight / 10} Kg
            </li>
            <li>
              <span style={{ textTransform: 'capitalize' }}>abilities:</span>
              <div>
                {pokemon?.abilities?.map((ab: any) => {
                  return (
                    <span style={{ textTransform: 'capitalize' }} key={ab?.ability?.name}>
                      {ab?.ability?.name},{' '}
                    </span>
                  );
                })}
              </div>
            </li>
          </ul>
        </section>

        <section>
          <div style={{ fontSize: '1.5rem', marginBottom: 8, marginTop: '2rem' }}>Moves</div>
          <div style={{ height: '1px', width: '30rem', maxWidth: '90%' }} className={cx(mainType)}></div>
          <div className={cx('types', statusMovesBar)} style={{ marginBottom: '1rem' }}>
            {pokemon?.moves?.map((move: any, index: number) => {
              return (
                <div key={index} className={cx('type-label')} style={{ margin: '.5rem' }}>
                  {move?.move?.name}
                </div>
              );
            })}
            {statusMovesBar === 'collapsible-hide' && (
              <div
                className={cx('btn-toogle-moves')}
                onClick={() => {
                  setStatusMovesBar('collapsible-show');
                }}
              >
                <button>Show more</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
export default PokemonDetails;
