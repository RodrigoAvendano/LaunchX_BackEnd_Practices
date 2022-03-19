let img = document.querySelector("#pokemon-image");

let bas_data = document.querySelector(".img");

let numb = document.querySelector("#number");
let species = document.querySelector("#pokemon-name");

var pokemon = [];

let long, tipo1, tipo2;
let text_num = "";

let types_div = document.querySelector(".types");
let first_type = document.querySelector(".first-type");
let second_type = document.querySelector(".second-type");

let stats = [];
let all_stats = document.querySelector(".stats");
let hp = document.querySelector("#hp");
let atk = document.querySelector("#atk");
let def = document.querySelector("#def");
let sp_atk = document.querySelector("#sp_atk");
let sp_def = document.querySelector("#sp_def");
let spd = document.querySelector("#spd");
let stat_color = "";
let counter, actual_stat;

let movs=[];
let mov_list = document.querySelector(".movs");

let btn = document.querySelector(".btn-search");
let poke_types = [
  "normal",
  "fire",
  "fighting",
  "water",
  "flying",
  "grass",
  "poison",
  "electric",
  "ground",
  "psychic",
  "rock",
  "ice",
  "bug",
  "dragon",
  "ghost",
  "dark",
  "steel",
  "fairy",
];
let tipo = [
  "normal",
  "fuego",
  "lucha",
  "agua",
  "volador",
  "planta",
  "veneno",
  "eléctrico",
  "tierra",
  "psíquico",
  "roca",
  "hielo",
  "bicho",
  "dragón",
  "fantasma",
  "siniestro",
  "acero",
  "hada",
];
let color = [
  "#B9B6A9",
  "#FE421C",
  "#C25745",
  "#2F9AFF",
  "#699FFF",
  "#79CE55",
  "#9C428B",
  "#FFD233",
  "#DDBB54",
  "#FF569E",
  "#978951",
  "#78DEFF",
  "#9EAF19",
  "#7E6CF9",
  "#4A4A9E",
  "#665147",
  "#A9AABB",
  "#FFACFF",
];

function Tipos(type, stype = "") {
  if (stype != "") {
    types_div.style.justifyContent = "space-between";

    poke_types.forEach(function (valor, indice) {
      if (type == valor) {
        first_type.style.display = "flex";
        first_type.textContent = tipo[indice];
        first_type.style.backgroundColor = color[indice];
      }
      if (stype == valor) {
        second_type.style.display = "flex";
        second_type.textContent = tipo[indice];
        second_type.style.backgroundColor = color[indice];
      }
    });
  } else {
    types_div.style.justifyContent = "center";
    poke_types.forEach(function (valor, indice) {
      if (type == valor) {
        second_type.style.display = "none";
        first_type.style.display = "flex";
        first_type.textContent = tipo[indice];
        first_type.style.backgroundColor = color[indice];
      }
    });
  }
}

function poke_stats(stats) {
  counter = 0;
  for (let statistic in stats) {
    counter++;
    actual_stat = stats[statistic].base_stat;

    if (actual_stat < 20) {
      stat_color = "#D44242";
    } else if (actual_stat >= 20 && actual_stat < 50) {
      stat_color = "#E78923";
    } else if (actual_stat >= 50 && actual_stat < 70) {
      stat_color = "#E8B723";
    } else if (actual_stat >= 70 && actual_stat < 90) {
      stat_color = "#E1E723";
    } else if (actual_stat >= 90 && actual_stat < 110) {
      stat_color = "#89E723";
    } else if (actual_stat >= 110) {
      stat_color = "#0A8A21";
    }

    if (counter == 1) {
      hp.textContent = actual_stat;
      hp.style.backgroundColor = stat_color;
    } else if (counter == 2) {
      atk.textContent = actual_stat;
      atk.style.backgroundColor = stat_color;
    } else if (counter == 3) {
      def.textContent = actual_stat;
      def.style.backgroundColor = stat_color;
    } else if (counter == 4) {
      sp_atk.textContent = actual_stat;
      sp_atk.style.backgroundColor = stat_color;
    } else if (counter == 5) {
      sp_def.textContent = actual_stat;
      sp_def.style.backgroundColor = stat_color;
    } else if (counter == 6) {
      spd.textContent = actual_stat;
      spd.style.backgroundColor = stat_color;
    }
  }
  all_stats.style.display = "flex";
}

function Movimientos(new_movs) {
    for(let pkmvs in new_movs){
        const div=document.createElement('div');
        div.textContent=new_movs[pkmvs].move.name;
        div.className='mov';
        mov_list.appendChild(div);
    }
    mov_list.style.display="flex";
}

img.style.display = "none";
bas_data.style.display = "none";
all_stats.style.display = "none";
mov_list.style.display="none";

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let pocket = document.querySelector(".poke-input");
  let monster = pocket.value.toLowerCase();

  let num = "";

  const url = `https://pokeapi.co/api/v2/pokemon/${monster}`;

  fetch(url)
    .then((res) => {
      img.style.display = "block";
      bas_data.style.display = "block";

      if (res.status != "200") {
        img.src = "assets/imgs/missingno.png";
        species.textContent = "MissingNo";
        numb.textContent = "#???";
        first_type.textContent = "? ? ?";
        second_type.style.display = "none";
        first_type.style.display = "flex";
        first_type.style.backgroundColor = "#2b4141";

        hp.style.backgroundColor = "#2b4141";
        hp.textContent = "???";
        atk.style.backgroundColor = "#2b4141";
        atk.textContent = "???";
        def.style.backgroundColor = "#2b4141";
        def.textContent = "???";
        sp_atk.style.backgroundColor = "#2b4141";
        sp_atk.textContent = "???";
        sp_def.style.backgroundColor = "#2b4141";
        sp_def.textContent = "???";
        spd.style.backgroundColor = "#2b4141";
        spd.textContent = "???";
        all_stats.style.display = "flex";
        mov_list.style.display="none";
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        pokemon = data;
        console.log(pokemon);
        num = data.id;
        text_num = num.toString();
        if (text_num.length < 2) {
          text_num = "00" + num;
        } else if (text_num.length < 3) {
          text_num = "0" + num;
        }
        let nom = data.name;
        if (nom.length > 9 && nom.length < 11) {
          species.style.fontSize = "13px";
        } else if (nom.length > 10) {
          species.style.fontSize = "11px";
        }

        let shiny=Math.floor(Math.random()*10);
        if(shiny==5){
          img.src = data.sprites.front_shiny;
        }else{
          img.src = data.sprites.front_default;
        }
        
        species.textContent = data.name;
        numb.textContent = "#" + text_num;
        pocket.value = "";

        long = data.types;

        if (long.length > 1) {
          tipo1 = data.types[0].type.name;
          tipo2 = data.types[1].type.name;
          Tipos(tipo1, tipo2);
        } else {
          tipo1 = data.types[0].type.name;
          Tipos(tipo1);
        }
        stats = data.stats;
        poke_stats(stats);

        movs=data.moves;
        Movimientos(movs);
      }
    });
});
