// Piezas del portafolio por sección; w y h son las medidas de la imagen grande (img/port/<id>.webp, o "src" si se indica)
// "parejas": personajes que tienen su boceto disponible, mostrados juntos (boceto y color)
const GALERIA = {
 "stella": [
  {
   "id": "model-sheet-stella",
   "titulo": "Model sheet de Stella",
   "w": 3840,
   "h": 2160
  },
  {
   "id": "stella-marcador",
   "titulo": "Stella · marcador sobre papel",
   "w": 1200,
   "h": 1600
  },
  {
   "id": "comic-interacciones",
   "titulo": "Página de cómic: Stella y Carter",
   "w": 2160,
   "h": 3840
  },
  {
   "id": "escenario-ciudad",
   "titulo": "Escenario: la ciudad",
   "w": 1347,
   "h": 758
  },
  {
   "id": "escenario-depa",
   "titulo": "Escenario: el departamento",
   "w": 1422,
   "h": 400
  },
  {
   "id": "vineta",
   "titulo": "Viñeta: “Is it an apartment tower for little people?”",
   "w": 1600,
   "h": 900
  }
 ],
 "personajes": [
  {
   "id": "bombon",
   "titulo": "Bombón · tres estilos",
   "w": 3840,
   "h": 2160
  },
  {
   "id": "ponis",
   "titulo": "Poni · tres estilos",
   "w": 3840,
   "h": 2160
  },
  {
   "id": "luchadora",
   "titulo": "Luchadora",
   "w": 2160,
   "h": 3840
  },
  {
   "id": "retrato",
   "titulo": "Retrato",
   "w": 900,
   "h": 1200
  },
  {
   "id": "cupcake",
   "titulo": "Cupcake",
   "w": 1500,
   "h": 2000
  },
  {
   "id": "hotdog",
   "titulo": "Hot dog",
   "w": 1500,
   "h": 2000
  }
 ],
 "sheets": [
  {
   "id": "turnaround-mich",
   "titulo": "Mich · turnaround y paleta",
   "w": 7016,
   "h": 4961
  },
  {
   "id": "turnaround-melanie",
   "titulo": "Melanie · turnaround y expresiones",
   "w": 3840,
   "h": 2160
  },
  {
   "id": "turnaround-senor",
   "titulo": "El señor · turnaround y expresiones",
   "w": 3840,
   "h": 2160
  }
 ],
 "ilustraciones": [
  {
   "id": "halloween",
   "titulo": "Halloween",
   "w": 2000,
   "h": 1500
  },
  {
   "id": "lobo",
   "titulo": "La oficina",
   "w": 2000,
   "h": 1500
  },
  {
   "id": "metro",
   "titulo": "El metro",
   "w": 3840,
   "h": 2160
  }
 ],
 "bocetos": [
  {
   "id": "boceto-01",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1641
  },
  {
   "id": "boceto-05",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1467
  },
  {
   "id": "boceto-06",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1727
  },
  {
   "id": "boceto-07",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1294
  },
  {
   "id": "boceto-08",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1621
  },
  {
   "id": "boceto-09",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1641
  },
  {
   "id": "boceto-10",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1519
  },
  {
   "id": "boceto-13",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1397
  },
  {
   "id": "boceto-17",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1664
  },
  {
   "id": "boceto-19",
   "titulo": "Boceto",
   "w": 914,
   "h": 1823
  },
  {
   "id": "boceto-20",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1620
  },
  {
   "id": "boceto-22",
   "titulo": "Boceto",
   "w": 1000,
   "h": 1595
  }
 ],
 "parejas": [
  {
   "titulo": "Zanahoria",
   "boceto": {
    "id": "boceto-14",
    "titulo": "Zanahoria · boceto",
    "w": 1000,
    "h": 1425
   },
   "color": {
    "id": "zanahoria",
    "titulo": "Zanahoria · color",
    "w": 900,
    "h": 1200
   }
  },
  {
   "titulo": "Chico rata",
   "boceto": {
    "id": "boceto-16",
    "titulo": "Chico rata · boceto",
    "w": 1000,
    "h": 1380
   },
   "color": {
    "id": "chico-rata",
    "titulo": "Chico rata · color",
    "w": 1500,
    "h": 2000
   }
  },
  {
   "titulo": "Pacguco",
   "boceto": {
    "id": "boceto-15",
    "titulo": "Pacguco · boceto",
    "w": 1000,
    "h": 1559
   },
   "color": {
    "id": "pacguco",
    "titulo": "Pacguco · color",
    "w": 900,
    "h": 1200
   }
  },
  {
   "titulo": "Vaquero",
   "boceto": {
    "id": "boceto-11",
    "titulo": "Vaquero · boceto",
    "w": 1000,
    "h": 1322
   },
   "color": {
    "id": "vaquero",
    "titulo": "Vaquero · color",
    "w": 900,
    "h": 1200
   }
  },
  {
   "titulo": "El caballero",
   "boceto": {
    "id": "boceto-21",
    "titulo": "El caballero · boceto",
    "w": 1000,
    "h": 1571
   },
   "color": {
    "id": "caballero",
    "titulo": "El caballero · color",
    "w": 1500,
    "h": 2000
   }
  },
  {
   "titulo": "Espíritu del árbol",
   "boceto": {
    "id": "boceto-12",
    "titulo": "Espíritu del árbol · boceto",
    "w": 1000,
    "h": 1297
   },
   "color": {
    "id": "arbol",
    "titulo": "Espíritu del árbol · color",
    "w": 3234,
    "h": 1991
   }
  },
  {
   "titulo": "Zoey",
   "boceto": {
    "id": "boceto-18",
    "titulo": "Zoey · boceto",
    "w": 1000,
    "h": 1603
   },
   "color": {
    "id": "zoey",
    "titulo": "Zoey · color",
    "w": 5124,
    "h": 4112
   }
  }
 ]
};
