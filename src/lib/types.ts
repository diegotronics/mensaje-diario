export type WeekData = {
    inicialesSemana: string;
    dias: {
      Lunes: { realizados: string; invertidos: string };
      Martes: { realizados: string; invertidos: string };
      Miercoles: { realizados: string; invertidos: string };
      Jueves: { realizados: string; invertidos: string };
      Viernes: { realizados: string; invertidos: string };
    };
    tiempoReunion: string;
    tiempoTarjetas: string;
    tiempoCodeReview: string;
    tarjetas: string[];
    retrospectiva: string;
  }

export type DayName = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes'