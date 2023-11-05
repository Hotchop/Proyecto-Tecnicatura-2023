/**Interfaz Usuario */
export interface user{
    usuario: string,
    constraseña: string,
    avatar: string,
    partidas: partida[],
    id?: number
}

/**Interfaz Partidas */
export interface partida{
    fecha: Date,
    personaje: personaje,
    puntaje: number,
    id?: number
}

/**Interfaz Personaje */
export interface personaje{
    charName: string;
    //Para completar con estadisticas para el juego
}

/**Interfaz de Objetos Chart de Chartopia API */
export interface chart{
    chart_name: string,
    chart_url: string,
    results: [ string ]
  }

/**Interfaz Enemigo */
export interface enemy{
    name: string,
    chartID: 76281,
    hp: number,
    dmg: number
}
