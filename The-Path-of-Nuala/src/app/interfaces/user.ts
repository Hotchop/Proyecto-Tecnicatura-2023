export interface user{
    usuario: string | undefined,
    constraseña: string | undefined,
    partidas: partida[] | undefined
}

export interface partida{
    fecha: Date | undefined,
    personaje: personaje | undefined,
    puntaje: number | undefined
}

export interface personaje{
    //Para completar con estadisticas para el juego
}