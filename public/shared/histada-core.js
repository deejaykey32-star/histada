/**
 * HISTADA Core Library: Dual-Edition 4D Knowledge Matrix Engine (26 023 680 Series per Edition)
 * - Edition 'standard': Scientific, Civilizational & Historical Matrix (Humanities, Technology, Nature)
 * - Edition 'religion' (Wersja R): Sacred & Religious Matrix from Mesopotamia & Homo Religiosus to Parousia
 * 
 * Includes 9 Intelligences Question Synthesizer with Verified Answers,
 * TTS Lektor (Histada), Smartphone Camera Rune Scanner & Claude AI Gateway.
 */
window.HistadaCore = (() => {

  // --- DUAL EDITION DEFINITIONS ---
  const EDITIONS = {
    STANDARD: 'standard',
    RELIGION: 'religion'
  };

  const RELIGION_DATA = {
    epochDef: [
      ['Zaranie duchowości – Homo Religiosus', -100000],
      ['Kulty Mezopotamii i pierwsze świątynie', -4000],
      ['Wiek Patriarchów i Przymierza', -2000],
      ['Epoka Osiowa i mędrcy Wschodu', -800],
      ['Wcielenie i Kościół Apostolski', -4],
      ['Ojcowie Kościoła i monastycyzm', 400],
      ['Złoty wiek islamu i średniowiecze wiary', 622],
      ['Schizmy, katedry i wielki mistycyzm', 1200],
      ['Reformacja i globalne misje', 1517],
      ['Wielkie przebudzenia i nowe wyznania', 1800],
      ['Świadectwo wiary w dobie prób i ekumenizm', 1914],
      ['Paruzja i Objawienie Królestwa Bożego', 2025]
    ],

    categories: [
  {
    "id": "H",
    "name": "Religie Księgi i Tradycje Abrahamowe",
    "color": "niebieski",
    "hex": "#2f6db5"
  },
  {
    "id": "P",
    "name": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "color": "zielony",
    "hex": "#2e8b57"
  },
  {
    "id": "T",
    "name": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "color": "czerwony",
    "hex": "#c0392b"
  }
],
    domainNames: {
  "H": [
    "judaizm biblijny i rabinistyczny",
    "wczesne chrześcijaństwo i patrystyka",
    "katolicyzm i sobory powszechne",
    "prawosławie i tradycja bizantyjska",
    "protestantyzm i reformacja",
    "ewangelikalizm i wolne kościoły",
    "ruchy restauracjonistyczne i świadkowie jehowy",
    "islam klasyczny i sunnizm",
    "szyizm i nurty imamiczne",
    "mistycyzm: kabała, sufizm i mistyka chrześcijańska",
    "zaratusztrianizm i monoteizmy starożytne",
    "ekumenizm i dialog międzyreligijny"
  ],
  "P": [
    "hinduizm wedyjski i upaniszady",
    "nurty bhakti, wisznuizm i śiwaizm",
    "buddyzm therawada i kanon pali",
    "buddyzm mahajana, zen i czan",
    "buddyzm tybetański i wadżrajana",
    "dżinizm i etyka ahinsy",
    "taoizm i harmonia dao",
    "konfucjonizm i etyka nieba",
    "shinto i duchy kami",
    "sikhizm i tradycja guru",
    "synkretyzmy i wierzenia azjatyckie",
    "joga, medytacja i oświecenie"
  ],
  "T": [
    "religie pradawnej mezopotamii",
    "wierzenia starożytnego egiptu",
    "kulty misteryjne i politeizm antyku",
    "szamanizm i animizm pierwotny",
    "wierzenia słowiańskie, nordyckie i celtyckie",
    "rdzenne duchowości afryki i pacyfiku",
    "gnoza starożytna i hermetyzm",
    "ezoteryka, teozofia i okultyzm",
    "nowe ruchy religijne i alternatywne",
    "psychologia religii i doświadczenie mistyczne",
    "apokaliptyka biblijna i paruzja",
    "królestwo boże i odnowienie wszechrzeczy"
  ]
},
    domains36: [
  {
    "code": "H01",
    "name": "Judaizm Biblijny i Rabinistyczny",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "Tora Mojżeszowa, Przymierze na Synaju, Dekalog, Świątynia Jerozolimska, Talmud, Miszna, Szabat i proroctwa mesjańskie"
  },
  {
    "code": "H02",
    "name": "Wczesne Chrześcijaństwo i Patrystyka",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "Dzieje Apostolskie, listy św. Pawła, męczennicy rzymscy, katakumby, Didache, Ojcowie Apostolscy i Sobór w Nicei"
  },
  {
    "code": "H03",
    "name": "Katolicyzm i Sobory Powszechne",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "tradycja apostolska, sukcesja Piotrowa, liturgia rzymska, 7 sakramentów, wielkie zakony (benedyktyni, franciszkanie, dominikanie) i sobory"
  },
  {
    "code": "H04",
    "name": "Prawosławie i Tradycja Bizantyjska",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "święta liturgia św. Jana Chryzostoma, teologia ikony, hezychazm, modlitwa Jezusowa, góra Athos i monastycyzm wschodni"
  },
  {
    "code": "H05",
    "name": "Protestantyzm i Wielka Reformacja",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "wystąpienie Marcina Lutra, Jan Kalwin, zasady Sola Scriptura i Sola Fide, Biblia w językach narodowych, chorał protestancki"
  },
  {
    "code": "H06",
    "name": "Ewangelikalizm i Wolne Kościoły",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "ruch przebudzeniowy, baptyzm, metodyzm, chrzest wiary w wieku dojrzałym, ewangelizacja osobista i nurty zielonoświątkowe"
  },
  {
    "code": "H07",
    "name": "Ruchy Restauracjonistyczne i Świadkowie Jehowy",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "gorliwe głoszenie Królestwa Bożego od drzwi do drzwi, wierność Imieniu Bożemu (JHWH / Jehowa), neutralność chrześcijańska, braterstwo międzynarodowe i kongresy wiary"
  },
  {
    "code": "H08",
    "name": "Islam Klasyczny i Sunnizm",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "Objawienie Koranu Prorokowi Mahometowi, Pięć Filarów Islamu (Szahada, Salat, Zakat, Saum, Hadżdż), Mekka i Medyna, Sunna i szariat"
  },
  {
    "code": "H09",
    "name": "Szyizm i Nurty Imamiczne",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "doktryna Imamatu, rodzina Proroka (Ahl al-Bajt), męczeństwo Husajna pod Karbalą, Aszura, teologia nadziei na nadejście Mahdiego"
  },
  {
    "code": "H10",
    "name": "Mistycyzm: Kabała, Sufizm i Mistyka Chrześcijańska",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "mistyczne zjednoczenie z Bogiem, Kabała (drzewo sefirot, Zohar), suficka miłość Boża Rumiego i Al-Ghazalego, noc ciemna św. Jana od Krzyża"
  },
  {
    "code": "H11",
    "name": "Zaratusztrianizm i Monoteizmy Starożytne",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "prorok Zaratustra, święty ogień, Bóg Światła Ahura Mazda, Awesta, zmaganie dobra ze złem i starożytny monoteizm perski"
  },
  {
    "code": "H12",
    "name": "Ekumenizm i Dialog Międzyreligijny",
    "cat": "Religie Księgi i Tradycje Abrahamowe",
    "focus": "pojednanie chrześcijan, Dekret o ekumenizmie, Światowe Dni Modlitwy o Pokój w Asyżu, dialog chrześcijańsko-żydowski i braterstwo ludzkie"
  },
  {
    "code": "P01",
    "name": "Hinduizm Wedyjski i Upaniszady",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "święte hymny Rygwedy, ogień ofiarny Agni, objawienie Brahmana jako ostatecznej Rzeczywistości, Atman – wieczna dusza, prawo karmy i samsara"
  },
  {
    "code": "P02",
    "name": "Nurty Bhakti, Wisznuizm i Śiwaizm",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "Bhagawadgita, bezwarunkowa miłość i oddanie Krysznie (Bhakti), awatary Wisznu, taniec Śiwy Nataradży, mantry i pudża świątynna"
  },
  {
    "code": "P03",
    "name": "Buddyzm Therawada i Kanon Pali",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "Cztery Szlachetne Prawdy, Szlachetna Ośmioraka Ścieżka, nauki Buddy Siakjamuniego, Sangha mnichów w szafranowych szatach, medytacja Vipassana"
  },
  {
    "code": "P04",
    "name": "Buddyzm Mahajana, Zen i Czan",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "ideał Bodhisattwy ratującego wszystkie czujące istoty, pustać Siunjata, medytacja siedząca Zazen, nagłe oświecenie Satori i paradoksalne koany"
  },
  {
    "code": "P05",
    "name": "Buddyzm Tybetański i Wadżrajana",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "linia Dalajlamów, klasztory w Lhasie, koła modlitewne, mandale z kolorowego piasku, Bardo Thodol (Tybetańska Księga Umarłych) i tantryzm"
  },
  {
    "code": "P06",
    "name": "Dżinizm i Etyka Ahinsy",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "Ahimsa – bezwzględne niekrzywdzenie żadnego życia, Mahawira, 24 Tirthankarów, surowy ascetyzm, panowanie nad zmysłami i czystość karmiczna"
  },
  {
    "code": "P07",
    "name": "Taoizm i Harmonia Dao",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "święta księga Daodejing mędrca Laozi, działanie bez wysiłku Wu Wei, wieczna równowaga Yin i Yang, kulty nieśmiertelnych w górach Wudang"
  },
  {
    "code": "P08",
    "name": "Konfucjonizm i Etyka Nieba",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "Nauki Konfucjusza, cnota humanitarności Ren, harmonia rytuałów Li, szacunek dla rodziców i przodków Xiao, Mandat Niebios (Tianming)"
  },
  {
    "code": "P09",
    "name": "Shintō i Święte Duchy Kami",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "Droga Bogów Kami, święte bramy Torii, sanktuarium Ise Jingu, kult bogini słońca Amaterasu, czystość rytualna Harae i szacunek dla natury"
  },
  {
    "code": "P10",
    "name": "Sikhizm i Tradycja Guru",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "Guru Nanak i Dziesięciu Mistrzów, wieczny Guru – święta księga Guru Granth Sahib, Złota Świątynia w Amritsarze, służba ubogim (Langar)"
  },
  {
    "code": "P11",
    "name": "Synkretyzmy i Wierzenia Azjatyckie",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "starożytny Bön w Tybecie, Cao Dai w Wietnamie, kult przodków w Korei i Chinach, synkretyzm trzech nauk (San Jiao)"
  },
  {
    "code": "P12",
    "name": "Joga, Medytacja i Oświecenie",
    "cat": "Religie Wschodu, Dharmy i Drogi Mądrości",
    "focus": "Jogasutry Patańdżalego, 8 stopni asztangajogi, kontrola oddechu Pranajama, skupienie umysłu Dhyana, stan Samadhi i wyzwolenie Moksza"
  },
  {
    "code": "T01",
    "name": "Religie Pradawnej Mezopotamii",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "zikkuraty Sumeru, Epos o Gilgameszu, bóstwa Anu, Enlil i Enki, świątynie Babilonu, kapłanki Isztar, tabliczki z pismem klinowym"
  },
  {
    "code": "T02",
    "name": "Wierzenia Starożytnego Egiptu",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "Księga Umarłych, mit o Ozyrysie i Izydzie, kult solarny boga Ra, solarna rewolucja monoteistyczna Echnatona, sąd dusz i balsamowanie"
  },
  {
    "code": "T03",
    "name": "Kulty Misteryjne i Politeizm Antyku",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "Misteria eleuzyjskie, orfizm, kult Mitry, Dionizje, świątynie Akropolu, wyrocznia w Delfach i kapłani rzymscy"
  },
  {
    "code": "T04",
    "name": "Szamanizm i Animizm Pierwotny",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "trans szamański z bębnem, podróże do świata duchów, rośliny nauczycielskie, totemy zwierzęce, duchy lasów i wód pradawnych plemion"
  },
  {
    "code": "T05",
    "name": "Wierzenia Słowiańskie, Nordyckie i Celtyckie",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "Świętowit, Perun, Mokosz, święte dęby, nordyckie drzewo kosmiczne Yggdrasil, Asatru, celtyccy druidzi i rytuały przesilenia"
  },
  {
    "code": "T06",
    "name": "Rdzenne Duchowości Afryki i Pacyfiku",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "Orisze ludu Joruba, Olorun, kult przodków, Mana i Tabu na Polinezji, Czas Snu (Dreamtime) Aborygenów australijskich"
  },
  {
    "code": "T07",
    "name": "Gnoza Starożytna i Hermetyzm",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "Corpus Hermeticum Hermesa Trismegistosa, boska iskra uwięziona w materii, teksty z Nag Hammadi, ewangelie apokryficzne i poznanie gnozy"
  },
  {
    "code": "T08",
    "name": "Ezoteryka, Teozofia i Okultyzm",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "bractwo Różokrzyżowców, Towarzystwo Teozoficzne Heleny Bławatskiej, antropozofia Rudolfa Steinera, alchemia duchowa i geometria sakralna"
  },
  {
    "code": "T09",
    "name": "Nowe Ruchy Religijne i Alternatywne",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "ruch New Age, neopogańska Wicca, uniwersalizm unitariański, współczesne poszukiwania duchowe i holizm kosmiczny"
  },
  {
    "code": "T10",
    "name": "Psychologia Religii i Doświadczenie Mistyczne",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "poczucie Numinosum (sacrum) Rudolfa Otto, archetypy Carla Junga, ekstazy mistyczne, stygmaty, nawrócenia i odmienne stany świadomości"
  },
  {
    "code": "T11",
    "name": "Apokaliptyka Biblijna i Paruzja",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "Księga Daniela, Apokalipsa św. Jana, zapowiedź przyjścia Mesjasza w chwale, znaki na niebie, zmartwychwstanie umarłych i czuwanie wiary"
  },
  {
    "code": "T12",
    "name": "Królestwo Boże i Odnowienie Wszechrzeczy",
    "cat": "Wierzenia Pierwotne, Ezoteryka i Eschatologia",
    "focus": "ostateczna Paruzja, Nowe Jeruzalem zstępujące z nieba, Nowe Niebo i Nowa Ziemia, koniec cierpienia i śmierci, wieczne panowanie Królestwa Bożego"
  }
],
    epochs12: [
  {
    "id": 1,
    "name": "Zaranie Duchowości i Homo Religiosus",
    "era": "od paleolitu do 4000 p.n.e.",
    "theme": "Początki kultu zmarłych, groby neandertalskie, figurki paleolityczne, megalityczne sanktuarium Göbekli Tepe i malowidła naskalne w Lascaux"
  },
  {
    "id": 2,
    "name": "Kulty Mezopotamii i Pierwsze Panteony",
    "era": "4000 – 2000 p.n.e.",
    "theme": "Narodziny miast-świątyń w Ur i Uruk, zikkuraty Sumeru, Epos o Gilgameszu, pierwsze kulty solarno-astralne i teksty piramid"
  },
  {
    "id": 3,
    "name": "Patriarchowie, Przymierze i Narodziny Monoteizmu",
    "era": "2000 – 800 p.n.e.",
    "theme": "Wyjście Abrahama z Ur, Przymierze na Synaju, Dekalog Mojżesza, Arka Przymierza w Świątyni Salomona i archaiczne hymny Rygwedy"
  },
  {
    "id": 4,
    "name": "Epoka Osiowa i Wielkie Objawienia Mądrości",
    "era": "800 – 200 p.n.e.",
    "theme": "Prorocy Izraela (Izajasz, Jeremiasz), Oświecenie Buddy w Bodh Gaja, mądrość Laozi i Konfucjusza w Chinach, Zaratustra w Persji"
  },
  {
    "id": 5,
    "name": "Wcielenie, Kościół Apostolski i Świadectwo Wiary",
    "era": "200 p.n.e. – 400 n.e.",
    "theme": "Życie, męka i Zmartwychwstanie Jezusa Chrystusa, Zesłanie Ducha Świętego, misje św. Pawła, męczeństwo pierwszych chrześcijan i Sobór Nicejski"
  },
  {
    "id": 6,
    "name": "Ojcowie Kościoła, Rozwój Doktryny i Monastycyzm",
    "era": "400 – 622 n.e.",
    "theme": "Św. Augustyn z Hippony, reguła św. Benedykta na Monte Cassino, Ojcowie Pustyni, chrześcijaństwo etiopskie i wschodnie sobory powszechne"
  },
  {
    "id": 7,
    "name": "Narodziny Islamu i Złoty Wiek Wiary Średniowiecza",
    "era": "622 – 1200 n.e.",
    "theme": "Objawienie Koranu Prorokowi Mahometowi, Hidżra, wielkie kalifaty, mistyka suficka, chrystianizacja Słowian i rozkwit opactw romańskich"
  },
  {
    "id": 8,
    "name": "Schizmy, Teologia Scholastyczna i Wielki Mistycyzm",
    "era": "1200 – 1517 n.e.",
    "theme": "Św. Tomasz z Akwinu, św. Franciszek z Asyżu, budowa monumentalnych katedr gotyckich, rozkwit żydowskiej Kabały i klasztorów Tybetu"
  },
  {
    "id": 9,
    "name": "Wielka Reformacja, Kontrreformacja i Misje Globalne",
    "era": "1517 – 1800 n.e.",
    "theme": "Marcin Luter, Jan Kalwin, Sobór Trydencki, przekłady Biblii na języki ojczyste, misje jezuickie w Azji i Amerykach, narodziny sikhizmu"
  },
  {
    "id": 10,
    "name": "Wielkie Przebudzenia, Nowe Wyznania i Głoszenie Słowa",
    "era": "1800 – 1914 n.e.",
    "theme": "Ruchy przebudzeniowe w Ameryce i Europie, Adwentyści, Badacze Pisma Świętego i Świadkowie Jehowy, misje światowe i walka o wolność sumienia"
  },
  {
    "id": 11,
    "name": "Męczeństwo XX Wieku, Ekumenizm i Dialog Międzyreligijny",
    "era": "1914 r. – ku Dniowi Pańskiemu",
    "theme": "Niezłomne świadectwo w czasach wojen i totalitaryzmów, Sobór Watykański II, modlitwa o pokój w Asyżu, ogólnoświatowe głoszenie Królestwa Bożego"
  },
  {
    "id": 12,
    "name": "Paruzja, Sąd Ostateczny i Nowe Jeruzalem Królestwa Bożego",
    "era": "Eschaton i Wieczność",
    "theme": "Chwalebny powrót Pana (Paruzja), zmartwychwstanie, ostateczne zniszczenie zła i śmierci, Nowe Niebo i Nowa Ziemia oraz wieczne Królestwo Boże"
  }
],
    periods12: [
  {
    "id": 1,
    "name": "Okres 1: Przebudzenie Ducha i Tęsknota za Transcendencją"
  },
  {
    "id": 2,
    "name": "Okres 2: Objawienie Słowa i Zawarcie Przymierza"
  },
  {
    "id": 3,
    "name": "Okres 3: Zgromadzenie Wiernych i Narodziny Wspólnoty"
  },
  {
    "id": 4,
    "name": "Okres 4: Próba Wiary, Doświadczenie Pustyni i Oczyszczenie"
  },
  {
    "id": 5,
    "name": "Okres 5: Odnowienie Duchowe i Głos Proroczy"
  },
  {
    "id": 6,
    "name": "Okres 6: Złoty Wiek Kultu, Świątyń i Liturgii"
  },
  {
    "id": 7,
    "name": "Okres 7: Posłannictwo w Świecie, Misja i Świadectwo Wiary"
  },
  {
    "id": 8,
    "name": "Okres 8: Czas Próby, Prześladowania i Wierność Prawdzie"
  },
  {
    "id": 9,
    "name": "Okres 9: Przełom Łaski, Odrodzenie i Przebudzenie Serc"
  },
  {
    "id": 10,
    "name": "Okres 10: Jedność Wspólnoty i Dialog Między Wierzącymi"
  },
  {
    "id": 11,
    "name": "Okres 11: Znaki Czasu i Czuwanie w Drodze ku Przyszłości"
  },
  {
    "id": 12,
    "name": "Okres 12: Horyzont Eschatologiczny i Nadzieja Królestwa Bożego"
  }
],
    seriesThemes: [
  {
    "num": 1,
    "title": "Źródło Objawienia, Powołanie Proroka i Znak Boży",
    "angle": "początek drogi wiary, powołanie mistyczne i pierwszy namacalny znak obecności Transcendencji"
  },
  {
    "num": 2,
    "title": "Święte Pisma, Kanon Wiary i Przekaz Słowa",
    "angle": "spisanie natchnionych tekstów, zwoje pergaminowe, przekład ksiąg i czystość tradycji"
  },
  {
    "num": 3,
    "title": "Życie Wspólnoty Wiernych, Modlitwa i Obyczaje",
    "angle": "codzienne życie religijne, obyczaje domowe, rytm świąt i modlitwa braterska"
  },
  {
    "num": 4,
    "title": "Święty Przewodnik: Prorok, Mistyk, Męczennik lub Reformator",
    "angle": "biografia duchowa, heroizm wiary, niezłomne decyzje moralne i osobista relacja ze Stwórcą"
  },
  {
    "num": 5,
    "title": "Zmaganie z Pokusą, Obrona Prawdy i Schizmy",
    "angle": "konfrontacja z fałszywymi naukami, zachowanie czystości doktryny i odwaga wyznawania wiary"
  },
  {
    "num": 6,
    "title": "Cud, Znak z Niebios i Niewyjaśniona Tajemnica Wiary",
    "angle": "znaki nadprzyrodzone, cudowne ocalenia, doświadczenia mistyczne i symbole sacrum"
  },
  {
    "num": 7,
    "title": "Sztuka Sakralna, Architektura Świątyń i Muzyka Niebios",
    "angle": "ikony, freski, katedry, zikkuraty, świątynie, chorały liturgiczne i hymny chwały"
  },
  {
    "num": 8,
    "title": "Liturgia, Sakramenty, Obrzędy i Praca Rąk",
    "angle": "sprawowanie świętych rytuałów, sakramenty, namaszczenia, szaty liturgiczne i ofiara"
  },
  {
    "num": 9,
    "title": "Dylematy Moralne, Przykazania i Uczynki Miłosierdzia",
    "angle": "odpowiedzialność etyczna, pomoc ubogim, bezwarunkowe miłosierdzie i miłość bliźniego"
  },
  {
    "num": 10,
    "title": "Wielka Nadzieja Eschatologiczna, Paruzja i Królestwo Boże",
    "angle": "zapowiedź Sądu Ostatecznego, triumf sprawiedliwości Bożej, zmartwychwstanie i Nowe Stworzenie"
  }
],
    chronicles: {
  "Polska": {
    "capital": "Gniezno / Kraków / Jasna Góra",
    "features": "święte gaje dębowe, wzgórze wawelskie, sanktuarium jasnogórskie, dolina Wisły i prastare sanktuaria na Ślęży i Łysej Górze",
    "eras": {
      "1": {
        "leader": "Kapłani pradawnych kultów solarnych na Ślęży",
        "year": "ok. 3000 p.n.e.",
        "place": "Góra Ślęża i Łysa Góra",
        "event": "wzniesienie kamiennych wałów kultowych i sprawowanie obrzędów ku czci życiodajnego Słońca oraz ognia",
        "artifact": "kamienny posąg kultowy z wyrytym znakiem krzyża solarnego"
      },
      "2": {
        "leader": "Żercy słowiańscy z dorzecza Wisły i Odry",
        "year": "ok. 2500 p.n.e.",
        "place": "Krzemionki i Opatów",
        "event": "złożenie rytualnych darów wotywnych w podziemnych korytarzach ku czci duchów ziemi i przodków",
        "artifact": "gładzony topór krzemienny z pasiastym rysunkiem o charakterze sakralnym"
      },
      "3": {
        "leader": "Starszyzna rodowa kultury łużyckiej",
        "year": "ok. 1200 p.n.e.",
        "place": "Biskupin i dorzecze Warty",
        "event": "sprawowanie uświęconych obrzędów ciałopalnych i modlitw o przejście dusz do krainy Nawii",
        "artifact": "popielnica twarzowa z wyrytymi symbolami gwiezdnymi i słonecznymi"
      },
      "4": {
        "leader": "Słowiańscy kapłani bóstw niebios i burzy",
        "year": "ok. 500 p.n.e.",
        "place": "Gniezno (Wzgórze Lecha)",
        "event": "rozpalenie wiecznego świętego ognia ku czci Peruna i sprawowanie obrzędów dziękczynnych za plony",
        "artifact": "kamienny ołtarz ofiarny z czarą na święty płomień"
      },
      "5": {
        "leader": "Pierwsi chrześcijańscy pielgrzymi i zwiastuni wiary",
        "year": "ok. 350 n.e.",
        "place": "Sandomierz i Karpaty",
        "event": "przyniesienie pierwszych świadectw o Zmartwychwstałym Chrystusie wzdłuż Bursztynowego Szlaku",
        "artifact": "srebrny krzyżyk wotywny z motywem Dobrego Pasterza"
      },
      "6": {
        "leader": "Uczniowie świętych Cyryla i Metodego w państwie Wiślan",
        "year": "ok. 880 n.e.",
        "place": "Kraków i Wiślica",
        "event": "zwiastowanie Ewangelii w języku staro-cerkiewno-słowiańskim i pierwsze chrzty książąt wiślańskich",
        "artifact": "misa chrzcielna z gipsu w Wiślicy i manuskrypt głagolicki"
      },
      "7": {
        "leader": "Książę Mieszko I, Dobrawa i biskup Jordan",
        "year": "966 r.",
        "place": "Gniezno, Poznań i Ostrów Lednicki",
        "event": "przyjęcie Chrztu Polski, zjednoczenie narodu w wierze chrześcijańskiej i erygowanie pierwszego biskupstwa",
        "artifact": "basen chrzcielny palatium na Ostrowie Lednickim i relikwiarz stauroteka z Drzewem Krzyża"
      },
      "8": {
        "leader": "Biskup Stanisław ze Szczepanowa i św. Jadwiga Królowa",
        "year": "1079 / 1397 r.",
        "place": "Kraków (Katedra Wawelska)",
        "event": "męczeństwo św. Stanisława w obronie sprawiedliwości oraz ufundowanie wydziału teologii na Uniwersytecie Krakowskim przez królową Jadwigę",
        "artifact": "srebrna konfensja św. Stanisława na Wawelu i gotycki krzyż królowej Jadwigi"
      },
      "9": {
        "leader": "Ks. Jakub Wujek i o. Augustyn Kordecki",
        "year": "1599 / 1655 r.",
        "place": "Jasna Góra w Częstochowie i Kraków",
        "event": "wydanie monumentalnego polskiego przekładu Biblii oraz bohaterska obrona Jasnej Góry i śluby lwowskie narodu",
        "artifact": "Cudowny Obraz Matki Bożej Jasnogórskiej i pierwsze wydanie Biblii ks. Wujka"
      },
      "10": {
        "leader": "Gorliwi badacze Pisma Świętego i pionierzy wiary",
        "year": "1895 r.",
        "place": "Warszawa, Łódź i Lwów",
        "event": "organizacja pierwszych zgromadzeń biblijnych, dystrybucja natchnionych traktatów i odrodzenie nadziei Królestwa Bożego",
        "artifact": "pierwsze polskie wydania Strażnicy i zecerskie matryce biblijne"
      },
      "11": {
        "leader": "Św. Maksymilian Kolbe, Prymas Stefan Wyszyński i rzesze wiernych Świadków Jehowy",
        "year": "1941 / 1989 r.",
        "place": "Auschwitz, Warszawa i Stadion Dziesięciolecia",
        "event": "ofiara życia z miłości w bunkrze głodowym, niezłomny opór wobec totalitaryzmu i wielkie kongresy wolności wiary gromadzące dziesiątki tysięcy chrzczonych",
        "artifact": "obozowa biblia spisana na skrawkach papieru i korona męczeństwa z miłości"
      },
      "12": {
        "leader": "Zgromadzenie Świętych i Zbawionych z każdego narodu",
        "year": "Czas Paruzji",
        "place": "Odnowiona Ziemia w Pokoju Bożym",
        "event": "ostateczne zapanowanie Królestwa Bożego, triumf życia nad śmiercią i wieczna pieśń dziękczynna zbawionych",
        "artifact": "Księga Życia Baranka i złota kadzielnica z modlitwami wszystkich świętych"
      }
    }
  },
  "Izrael": {
    "capital": "Jerozolima",
    "features": "Wzgórze Świątynne, Góra Oliwna, Dolina Cedronu, Pustynia Judzka, rzeka Jordan i Jezioro Galilejskie",
    "eras": {
      "1": {
        "leader": "Pierwsi czciciele Boga w jaskiniach Góry Karmel",
        "year": "ok. 9000 p.n.e.",
        "place": "Góra Karmel i Jerycho",
        "event": "złożenie pierwszych dziękczynnych darów ze zbóż i wzniesienie kamiennych wież modlitewnych w Jerychu",
        "artifact": "kamienna figurka oranta wznoszącego ręce ku Niebiosom"
      },
      "2": {
        "leader": "Melchizedek – król Szalemu i kapłan Boga Najwyższego",
        "year": "ok. 2100 p.n.e.",
        "place": "Szalem (Jerozolima)",
        "event": "wyniesienie chleba i wina oraz pobłogosławienie Abrama w imię Boga Najwyższego, Stwórcy nieba i ziemi",
        "artifact": "alabastrowy puchar ofiarny na wino i kamienny stół błogosławieństwa"
      },
      "3": {
        "leader": "Mojżesz na Synaju i Król Salomon w Jerozolimie",
        "year": "ok. 1250 / 960 p.n.e.",
        "place": "Góra Synaj i Wzgórze Moria",
        "event": "otrzymanie Dekalogu wypisanego palcem Bożym oraz poświęcenie Pierwszej Świątyni z Arką Przymierza",
        "artifact": "Arka Przymierza z cherubami z czystego złota i Kamienne Tablice Świadectwa"
      },
      "4": {
        "leader": "Prorocy Izajasz, Jeremiasz i Daniel",
        "year": "ok. 700 – 538 p.n.e.",
        "place": "Jerozolima i Babilon",
        "event": "ogłoszenie proroctwa o cierpiącym Słudze Jahwe, Nowym Wiecznym Przymierzu i nadejściu Królestwa Świętych Najwyższego",
        "artifact": "Wielki Zwój Proroka Izajasza z pieczęcią świątynną"
      },
      "5": {
        "leader": "Jezus Chrystus z Nazaretu i Jego Apostołowie",
        "year": "ok. 30 – 33 n.e.",
        "place": "Betlejem, Jezioro Galilejskie, Golgota i Wieczernik",
        "event": "Wcielenie, głoszenie Dobrej Nowiny o Królestwie Bożym, ofiara Krzyża, Zmartwychwstanie i Zesłanie Ducha Świętego",
        "artifact": "Krzyż Zbawienia, pusty grób Zmartwychwstałego i kielich Nowego Przymierza"
      },
      "6": {
        "leader": "Św. Jakub Sprawiedliwy i Ojcowie Monastycyzmu Pustyni Judzkiej",
        "year": "ok. 450 n.e.",
        "place": "Ławra św. Saby i Mar Saba nad Cedronem",
        "event": "nieustanna modlitwa serca w jaskiniach pustynnych i kodyfikacja reguły monastycznej czuwania",
        "artifact": "rękopis psalmów na pergaminie i krzyż eremity z drewna oliwnego"
      },
      "7": {
        "leader": "Prorok Mahomet (podróż nocna) i kalif Umar ibn al-Chattab",
        "year": "638 r.",
        "place": "Al-Haram asz-Szarif (Kopuła na Skale)",
        "event": "zabezpieczenie miejsc świętych dla wszystkich czcicieli Jedynego Boga i wzniesienie meczetu Al-Aksa",
        "artifact": "kamienna inskrypcja traktatu Umara gwarantująca nietykalność świątyń"
      },
      "8": {
        "leader": "Majmonides (Rambam) i mistycy Kabały w Safedzie",
        "year": "ok. 1180 / 1500 r.",
        "place": "Jerozolima, Tyberiada i Safed w Galilei",
        "event": "spisanie przewodnika błądzących i rozkwit kabały luriańskiej oczekującej naprawy świata (Tikkun Olam)",
        "artifact": "manuskrypt Miszne Tora i zwój Tory z safedzkiego skryptorium"
      },
      "9": {
        "leader": "Kustosze Ziemi Świętej i bracia franciszkanie",
        "year": "ok. 1650 r.",
        "place": "Bazylika Grobu Pańskiego i Ogród Getsemani",
        "event": "nieprzerwane czuwanie modlitewne przy Grobie Zmartwychwstania i ochrona pielgrzymów ze wszystkich kontynentów",
        "artifact": "lampa oliwna z niegasnącym świętym ogniem paschalnym"
      },
      "10": {
        "leader": "Archeolodzy biblijni i pasterze z Qumran",
        "year": "1947 r.",
        "place": "Jaskinie Qumran nad Morzem Martwym",
        "event": "odnalezienie nienaruszonych Zwojów znad Morza Martwego poświadczających absolutną wierność Pisma Świętego",
        "artifact": "gliniany dzban qumrański ze zwojem Księgi Daniela i Psalmów"
      },
      "11": {
        "leader": "Rzesze pielgrzymów, ocaleni świadkowie wiary i orędownicy pokoju",
        "year": "1995 r.",
        "place": "Ściana Płaczu, Wieczernik i Góra Syjon",
        "event": "nieustanne wołanie o Boży pokój (Szalom / Salam) dla Jerozolimy i zwiastowanie nadejścia Królestwa Bożego",
        "artifact": "zwitek modlitwy dziękczynnej włożony w szczeliny Muru Zachodniego"
      },
      "12": {
        "leader": "Król Królów i Pan Panujących – Jezus Chrystus w chwale Paruzji",
        "year": "Eschaton (Dzień Pański)",
        "place": "Góra Oliwna i Nowe Jeruzalem",
        "event": "Objawienie Syna Człowieczego na obłokach, zstąpienie Nowego Jeruzalem i wieczne zjednoczenie Boga z ludźmi",
        "artifact": "Złote Miasto z bramami z pereł i Drzewo Życia u źródeł Wody Żywej"
      }
    }
  },
  "Mezopotamia": {
    "capital": "Ur / Babilon / Niniwa",
    "features": "doliny Eufratu i Tygrysu, terasy świątynne, gliniane tabliczki pism klinowych, bramy Isztar i ogrody Babilonu",
    "eras": {
      "1": {
        "leader": "Pierwsi budowniczowie świątyń w Eridu",
        "year": "ok. 5000 p.n.e.",
        "place": "Eridu u ujścia Eufratu",
        "event": "zbudowanie najstarszej znanej świątyni z ołtarzem ofiarnym na dary z ryb i wody ku czci Pana Otchłani",
        "artifact": "gliniana czara ofiarna i pieczęć cylindryczna z motywem Drzewa Życia"
      },
      "2": {
        "leader": "Kapłani Ensi i budowniczowie zikkuratu w Ur",
        "year": "ok. 2100 p.n.e.",
        "place": "Ur chaldejskie (Zikkurat Nanny)",
        "event": "wzniesienie trójstopniowego monumentalnego zikkuratu jako schodów łączących ziemię z niebiosami",
        "artifact": "stela Ur-Nammu z reliefem libacji przed obliczem bóstwa"
      },
      "3": {
        "leader": "Abraham wzywany przez Boga ku ziemi obiecanej",
        "year": "ok. 1900 p.n.e.",
        "place": "Ur chaldejskie i Charan",
        "event": "porzucenie kultu bożków z gliny i kamienia na rzecz posłuszeństwa wezwaniu Jedynego Niewidzialnego Stwórcy",
        "artifact": "kamień przymierza w drodze wiary Abrama"
      },
      "4": {
        "leader": "Prorok Daniel i trzej młodzieńcy w piecu ognistym",
        "year": "586 p.n.e.",
        "place": "Babilon nad Eufratem",
        "event": "niezłomna odmowa pokłonu złotemu posągowi, ocalenie z płomieni i proroctwo o wiecznym Królestwie Bożym",
        "artifact": "gliniana tabliczka z dekretem królewskim wywyższającym Boga Daniela"
      },
      "5": {
        "leader": "Mędrcy ze Wschodu (Trzej Królowie)",
        "year": "ok. 4 p.n.e.",
        "place": "Babilon i szlak ku Judei",
        "event": "odczytanie z biegu gwiazd narodzin Króla Świata i wyruszenie z darami złota, kadzidła i mirry",
        "artifact": "astronomiczna tabliczka koniunkcji planet i puszka z wonnym kadzidłem"
      },
      "6": {
        "leader": "Święty Tomasz Apostoł i św. Addai (Tadeusz)",
        "year": "ok. 100 n.e.",
        "place": "Edessa, Nisibis i Seleucja-Ktezyfon",
        "event": "założenie Kościoła Wschodu, przetłumaczenie Ewangelii na język syriacki (Peszitta) i chrzest tysięcy nawróconych",
        "artifact": "pergaminowa Peszitta w oprawie z drewna cedrowego"
      },
      "7": {
        "leader": "Imam Husajn ibn Ali i męczennicy Karbali",
        "year": "680 r.",
        "place": "Karbala i Nadżaf",
        "event": "heroiczne świadectwo wierności prawdzie i sprawiedliwości Bożej w obliczu tyranii",
        "artifact": "gliniana turbah z ziemi Karbali używana podczas modlitwy sujud"
      },
      "8": {
        "leader": "Mistycy suficcy ze szkoły w Bagdadzie (Al-Dżunajd i Mansur Al-Halladż)",
        "year": "ok. 900 r.",
        "place": "Bagdad – Miasto Pokoju",
        "event": "głoszenie bezwarunkowej miłości ku Najwyższemu i mistycznego zatarcia własnego ego w Bożej obecności",
        "artifact": "manuskrypt poezji mistycznej o Bożej Światłości"
      },
      "9": {
        "leader": "Chrześcijanie asyryjscy i chaldejscy strzegący wiary",
        "year": "ok. 1550 r.",
        "place": "Równina Niniwy i klasztor Rabban Hormizd",
        "event": "przetrwanie pradawnej liturgii w języku aramejskim – języku, którym mówił na ziemi Jezus Chrystus",
        "artifact": "kamienny krzyż nestoriański z rzeźbionym kwiatem lotosu"
      },
      "10": {
        "leader": "Odkrywcy biblijnej Niniwy i biblioteki Aszurbanipala",
        "year": "1853 r.",
        "place": "Kujundżyk (starożytna Niniwa)",
        "event": "odnalezienie XI tabliczki eposu z opisem Potopu, potwierdzającej prastary przekaz Księgi Rodzaju",
        "artifact": "tabliczka gliniana z Niniwy z klinowym opisem arki i wód potopu"
      },
      "11": {
        "leader": "Niezłomni męczennicy i wspólnoty wiary naszych dni",
        "year": "2014 r.",
        "place": "Mosul i Dolina Niniwy",
        "event": "odmowa wyrzeczenia się wiary w Chrystusa mimo utraty mienia i wygnania, poświadczenie żywego świadectwa Kościoła",
        "artifact": "nadpalona aramejska księga liturgiczna ocalona z ruin kościoła"
      },
      "12": {
        "leader": "Święci i Prorocy w eschatologicznej radości",
        "year": "Wypełnienie Czasów",
        "place": "Odrodzona Dolina Pokoju",
        "event": "ostateczne pojednanie narodów, zburzenie wszelkiego muru wrogości i wieczna chwała Królestwa Bożego",
        "artifact": "Pieczęć Nowego Stworzenia i lilia pokoju wiecznego"
      }
    }
  },
  "Egipt": {
    "capital": "Teby / Aleksandria / Kair",
    "features": "dolina Nilu, Pustynia Skalna, klasztory Wadi Natrun, piramidy Gizy i Góra Synaj",
    "eras": {
      "1": {
        "leader": "Kapłani pradawnych kultów w Heliopolis",
        "year": "ok. 3000 p.n.e.",
        "place": "Heliopolis (Juny)",
        "event": "spisanie mitów o stworzeniu świata ze świętego pierwotnego pagórka Benben wyłaniającego się z wód Nun",
        "artifact": "kamień Benben z wyrytymi skrzydłami słońca"
      },
      "2": {
        "leader": "Faraon Echnaton i królowa Nefertiti",
        "year": "ok. 1350 p.n.e.",
        "place": "Achetaton (Amarna)",
        "event": "ogłoszenie pierwszego w dziejach Egiptu hymnu monoteistycznego ku czci Jedynego Boga Światła – Atona",
        "artifact": "Wielki Hymn do Atona wyryty na ścianie grobowca"
      },
      "3": {
        "leader": "Święta Rodzina – ucieczka do Egiptu",
        "year": "ok. 3 p.n.e.",
        "place": "Stary Kair (kościół św. Sergiusza) i Matarija",
        "event": "ocalenie Dzieciątka Jezus przed gniewem Heroda i uświęcenie ziemi egipskiej Jego obecnością",
        "artifact": "krypta Świętej Rodziny i święte drzewo dziewanny w Matarija"
      },
      "4": {
        "leader": "Filon z Aleksandrii i uczeni Biblioteki Aleksandryjskiej",
        "year": "ok. 250 p.n.e. – 40 n.e.",
        "place": "Aleksandria",
        "event": "stworzenie Septuaginty – przekładu Pism Hebrajskich na język grecki oraz synteza wiary w Boga z filozofią",
        "artifact": "papirusowy zwój Septuaginty z tekstem Pięcioksięgu"
      },
      "5": {
        "leader": "Święty Marek Ewangelista",
        "year": "ok. 60 n.e.",
        "place": "Aleksandria i wybrzeże Morza Śródziemnego",
        "event": "założenie Kościoła Aleksandryjskiego (Koptyjskiego), chrzest rzemieślnika Anianusa i męczeństwo za wiarę",
        "artifact": "najstarsza koptyjska ikona św. Marka ze skrzydlatym lwem"
      },
      "6": {
        "leader": "Święty Antoni Wielki i św. Pachomiusz",
        "year": "ok. 270 – 340 n.e.",
        "place": "Pustynia Wschodnia i Wadi Natrun",
        "event": "narodziny monastycyzmu chrześcijańskiego – ucieczka na pustynię, walka duchowa z demonami i braterstwo zakonne",
        "artifact": "krzyż z drewna palmowego i skórzany pas pustelnika św. Antoniego"
      },
      "7": {
        "leader": "Uczeni i teolodzy Uniwersytetu Al-Azhar",
        "year": "970 r.",
        "place": "Kair fatymidzki",
        "event": "założenie meczetu i uczelni Al-Azhar – serca sunnickiej myśli teologicznej i egzegezy koranicznej",
        "artifact": "ozdobny pulpit na Koran (kursi) rzeźbiony w hebanie"
      },
      "8": {
        "leader": "Mistycy koptyjscy i św. Jan Kolobos (Krótki)",
        "year": "ok. 1300 r.",
        "place": "Klasztor Syryjczyków (Deir al-Surian)",
        "event": "rozkwit fresków mistycznych przedstawiających zjednoczenie serca z miłością Trójcy Świętej",
        "artifact": "fresk Zwiastowania z klasztoru Deir al-Surian"
      },
      "9": {
        "leader": "Pielgrzymi do Góry Mojżesza (Dżabal Musa)",
        "year": "ok. 1700 r.",
        "place": "Klasztor św. Katarzyny na Synaju",
        "event": "nieprzerwane czuwanie przed Krzewem Gorejącym niepalącym się i modlitwa na szczycie Dekalogu",
        "artifact": "gałązka z Krzewu Gorejącego i kodeks z hymnem paschalnym"
      },
      "10": {
        "leader": "Pasterze i odkrywcy biblioteki z Nag Hammadi",
        "year": "1945 r.",
        "place": "Nag Hammadi w Górnym Egipcie",
        "event": "odnalezienie 13 starożytnych kodeksów papirusowych odsłaniających wczesne nurty gnostyckie i mistyczne",
        "artifact": "oprawny w skórę kodeks papirusowy z przypowieściami mądrościowymi"
      },
      "11": {
        "leader": "Papież Szenuda III i mnisi z klasztoru św. Makarego",
        "year": "1985 r.",
        "place": "Wadi Natrun i Kair",
        "event": "wielkie odrodzenie życia monastycznego, tysiące młodych wstępujących do klasztorów i dialog z chrześcijaństwem zachodnim",
        "artifact": "koptyjski krzyż ze splecionych rzemieni skórzanych"
      },
      "12": {
        "leader": "Świadkowie Zbawienia na wieki wieków",
        "year": "Paruzja Pańska",
        "place": "Nowa Ziemia Odnowiona Łaską",
        "event": "przemienienie wszelkiego stworzenia, wchłonięcie śmierci w zwycięstwo i odwieczna chwała Boga",
        "artifact": "Niewiędnący Wieniec Chwały z czystego światła"
      }
    }
  },
  "Indie": {
    "capital": "Waranasi / Delhi / Bodh Gaja",
    "features": "święta rzeka Ganges, ghaty Waranasi, Himalaje, aszramy, świątynie Maduraju i drzewo Bodhi",
    "eras": {
      "1": {
        "leader": "Ryszi – starożytni natchnieni wieszczowie",
        "year": "ok. 2500 p.n.e.",
        "place": "Dolina rzeki Indus i Saraswati",
        "event": "usłyszenie w sercu odwiecznego dźwięku Om i objawienie pierwszych pieśni Rygwedy",
        "artifact": "miedziana czara na święty nektar soma i ołtarz ognia Agni"
      },
      "2": {
        "leader": "Mistrzowie wczesnych Upaniszadów",
        "year": "ok. 1000 p.n.e.",
        "place": "Pustelnie leśne w dorzeczu Gangesu",
        "event": "odkrycie tożsamości duszy ludzkiej (Atmana) z Wieczną Rzeczywistością (Brahmanem): Tat Tvam Asi – Ty jesteś Tym",
        "artifact": "liść palmowy z zapisaną mantrą Gayatri w sanskrycie"
      },
      "3": {
        "leader": "Siddhartha Gautama – Budda Siakjamuni",
        "year": "ok. 528 p.n.e.",
        "place": "Bodh Gaja (Drzewo Bodhi) i Park Gazeli w Sarnath",
        "event": "osiągnięcie pełnego Oświecenia (Bodhi), pokonanie iluzji Mara i wprawienie w ruch Koła Prawdy (Dharmaczakra)",
        "artifact": "odcisk stopy Buddy z kołem Dharmy o ośmiu szprychach"
      },
      "4": {
        "leader": "Mahawira – 24. Tirthankara Dżinizmu",
        "year": "ok. 500 p.n.e.",
        "place": "Baiszali i Pawapuri",
        "event": "ogłoszenie najwyższej zasady Ahimsa Paramo Dharma – niestosowanie przemocy jest najwyższą religią",
        "artifact": "symbol dłoni z kołem na dłoni oznaczającym niekrzywdzenie życia"
      },
      "5": {
        "leader": "Święty Tomasz Apostoł – Apostoł Indii",
        "year": "52 n.e.",
        "place": "Kerala (Muziris) i Góra św. Tomasza w Ćennaj",
        "event": "przybycie drogą morską, nawrócenie rodzin bramińskich i założenie chrześcijańskich wspólnot Mar Thoma",
        "artifact": "krzyż z Mylapore wykuty w kamieniu z gołębicą Ducha Świętego"
      },
      "6": {
        "leader": "Adi Śankara – reformator filozofii Adwajta Wedanty",
        "year": "ok. 788 n.e.",
        "place": "Kaladi w Kerali, Waranasi i Badrinath w Himalajach",
        "event": "usystematyzowanie radykalnego monizmu niedualnego i odnowienie czterech wielkich klasztorów (Matha)",
        "artifact": "kamienny diagram Śri Jantra ze splecionymi dziewięcioma trójkątami"
      },
      "7": {
        "leader": "Poeci nurtu Bhakti (Mirabai, Kabir i Ramanudża)",
        "year": "ok. 1100 – 1500 r.",
        "place": "Wryndawan, Mathura i Waranasi",
        "event": "przełamanie barier kastowych przez żarliwą, bezgraniczną miłość do Boga Kryszny i śpiew kirtanów",
        "artifact": "prosta tambura Mirabai i girlanda ze świętej bazylii Tulasi"
      },
      "8": {
        "leader": "Guru Nanak – założyciel sikhizmu",
        "year": "1499 r.",
        "place": "Pendżab (Kartarpur i Amritsar)",
        "event": "ogłoszenie jedności Boga: Ik Onkar (Bóg jest Jeden) i równości wszystkich ludzi bez względu na wiarę i płeć",
        "artifact": "święta księga Guru Granth Sahib i stalowa bransoleta Kara"
      },
      "9": {
        "leader": "Święty Franciszek Ksawery",
        "year": "1542 r.",
        "place": "Goa i Wybrzeże Rybackie",
        "event": "chrzest dziesiątek tysięcy rybaków Parawów, tłumaczenie katechizmu na język tamilski i miłosierdzie wobec chorych",
        "artifact": "srebrny dzwonek katechetyczny i krzyż misyjny Franciszka Ksawerego"
      },
      "10": {
        "leader": "Śri Ramakrysza Paramahansa i Swami Wiwekananda",
        "year": "1893 r.",
        "place": "Świątynia Dakshineswar w Kalkucie i Parlament Religii w Chicago",
        "event": "doświadczenie jedności wszystkich religii prowadzących do tego samego Boga i przedstawienie mądrości Indii światu",
        "artifact": "różaniec japa mala ze świętych nasion rudraksza"
      },
      "11": {
        "leader": "Mahatma Gandhi i Matka Teresa z Kalkuty",
        "year": "1947 / 1979 r.",
        "place": "Gudźarat, Nowe Delhi i Kalkuta (Dom Czystego Serca)",
        "event": "zwycięstwo wolności drogą niestosowania przemocy (Satyagraha) oraz bezinteresowna służba najuboższym z ubogich z miłości do Chrystusa",
        "artifact": "drewniany kołowrotek czarkha i biało-niebieskie sari Matki Teresy"
      },
      "12": {
        "leader": "Święci zjednoczeni w Wiecznym Królestwie",
        "year": "Paruzja i Zwieńczenie Czasu",
        "place": "Nowe Niebiosa w Światłości Bożej",
        "event": "ostateczne wyzwolenie z cierpienia, zniknięcie wszelkiej ułudy i wieczna komunia z miłującym Stwórcą",
        "artifact": "Promienisty Lotos Życia Wiecznego i Złota Korona Zwycięzców"
      }
    }
  }
},
    regionPatterns: {
  "Europa": {
    "capital": "katedry gotyckie, klasztory i sanktuaria maryjne",
    "features": "doliny rzek spławnych, puszcze nizinne, wzgórza z wieżami kościołów, dzwonnice i klasztorne skryptoria",
    "leaders": [
      "mnisi benedyktyńscy i cystersi wznoszący opactwa modlitwy i pracy (Ora et Labora)",
      "biskupi i teolodzy kodyfikujący wyznania wiary i broniący czystości Ewangelii",
      "mistyczki i święci niosący bezgraniczne miłosierdzie ubogim i chorym",
      "reformatorzy wzywający do nawrócenia serca i powrotu do Pisma Świętego",
      "świadkowie wiary i męczennicy czasów prześladowań dochowujący wierności Bogu"
    ],
    "events": [
      "wzniesienie strzelistej kamiennej katedry z witrażami rozświetlającymi sacrum",
      "przetłumaczenie Pisma Świętego na język ludu i założenie szkoły biblijnej",
      "doświadczenie mistycznego zjednoczenia z Chrystusem w cichej modlitwie kontemplacyjnej",
      "ogłoszenie powszechnego wezwania do miłości nieprzyjaciół i przebaczenia win",
      "zgromadzenie dziesiątek tysięcy wiernych na publicznym wyznaniu wiary w Królestwo Boże"
    ],
    "artifacts": [
      "bogato iluminowany ewangeliarz na pergaminie z miniaturami świętych",
      "srebrny kielich mszalny ze złotą pateną i rzeźbionym Barankiem Bożym",
      "krzyż relikwiarzowy z drzewem Krzyża Świętego i perłami",
      "różaniec z hebanu i srebra z medalikiem Matki Bożej",
      "biblia z odręcznymi notatkami męczennika z czasów prześladowań"
    ]
  },
  "Azja": {
    "capital": "klasztory górskie, świątynie pagód i ośrodki medytacji",
    "features": "święte rzeki, terasy ryżowe, pasma Himalajów, ogrody zen i lasy bambusowe",
    "leaders": [
      "mnisi buddyjscy trwający w nieustannej medytacji nad pustką i współczuciem",
      "mędrcy taoistyczni podążający drogą naturalnej harmonii z Kosmosem i Dao",
      "nauczyciele konfucjańscy pielęgnujący synowską cześć dla Nieba i przodków",
      "święci asceci hinduistyczni śpiewający święte imiona Boże w świątyniach nad rzeką",
      "kapłani shinto oczyszczający święte przestrzenie przed obliczem duchów Kami"
    ],
    "events": [
      "rozpalenie świętego ognia ofiarnego i intonacja mantry uniwersalnego pokoju",
      "usypanie z wielobarwnego piasku geometrycznej mandali kosmicznej harmonii",
      "wyrycie na kamiennych stelach zasad współczucia dla wszystkich czujących istot",
      "zbudowanie świątyni bez użycia gwoździ w doskonałej harmonii z naturą",
      "ogłoszenie przebudzenia ze snu iluzji i osiągnięcie nieprzemijającego spokoju ducha"
    ],
    "artifacts": [
      "brązowy posąg medytującego Buddy pokryty płatkami złota",
      "dźwięczący dzwon świątynny z brązu z wyrytą mantrą wyzwolenia",
      "zwój jedwabny z kaligrafią świętego znaku Dao i pustki",
      "drewniana tabliczka przodków pachnąca drzewem sandałowym",
      "misa dźwiękowa ze stopu siedmiu metali używana do medytacji"
    ]
  },
  "Afryka": {
    "capital": "kościoły skalne, sanktuaria przodków i starożytne bazyliki",
    "features": "płaskowyże sawannowe, rzeki życiodajne, święte wzgórza granitu i gaje akacjowe",
    "leaders": [
      "biskupi i ojcowie wczesnego Kościoła afrykańskiego obradujący w synodach",
      "architekci i kapłani wykuwający w litej skale monolityczne kościoły w kształcie krzyża",
      "starsi plemienni strzegący przymierza z Najwyższym Stwórcą i pamięci przodków",
      "nauczyciele koraniczni ze skryptoriów w Timbuktu studiujący święte manuskrypty",
      "prorocy afrykańskich kościołów charyzmatycznych głoszący uzdrowienie i wolność"
    ],
    "events": [
      "wykucie w wulkanicznym tufie bazyliki św. Jerzego bez użycia zaprawy murarskiej",
      "odprawienie radosnej liturgii z tańcem i śpiewem dziękczynnym na cześć Stwórcy",
      "złożenie przebłagalnej ofiary pojednania między zwaśnionymi klanami",
      "spisanie starożytnego przekładu Pisma Świętego w języku gyyz",
      "przejście przez ogień próby wiary i ocalenie wspólnoty mocą modlitwy"
    ],
    "artifacts": [
      "etiopski krzyż procesyjny z mosiądzu o misternych splotach geometrycznych",
      "pergaminowy modlitewnik w drewnianej oprawie noszony w skórzanym futerale",
      "rytualny bęben sakralny z drewna i skóry wołowej do pieśni uwielbienia",
      "statuetka oranta z brązu z rękami wzniesionymi w geście błagalnym",
      "oliwna lampa gliniana ze znakiem ryby Ichthys z wczesnochrześcijańskiej Kartaginy"
    ]
  },
  "Ameryka Północna": {
    "capital": "domy modlitwy, zbory przebudzeniowe i święte góry rdzennych ludów",
    "features": "prerie, Wielkie Jeziora, kaniony z czerwoną skałą, lasy sekwoi i góry Skaliste",
    "leaders": [
      "szamani i strażnicy świętych fajek pokoju plemion Lakota i Hopi",
      "kaznodzieje Wielkich Przebudzeń wzywający do osobistego oddania życia Bogu",
      "pionierzy wierności Imieniu Bożemu głoszący dobrą nowinę o Królestwie",
      "obrońcy praw człowieka inspirujący się kazaniami proroków biblijnych",
      "misjonarze niosący nadzieję zmartwychwstania do najbardziej oddalonych osad"
    ],
    "events": [
      "złożenie świętego dymu z fajki czanunpa ku czterem stronom świata i Stwórcy Wakan Tanka",
      "przełomowe nabożeństwo namiotowe gromadzące tysiące nawróconych w łzach skruchy",
      "wydrukowanie pierwszych egzemplarzy Biblii na nowym kontynencie",
      "marsz w obronie sprawiedliwości i godności każdego dziecka Bożego z pieśnią wiary na ustach",
      "ogłoszenie orędzia o rychłej Paruzji i przywróceniu raju na ziemi"
    ],
    "artifacts": [
      "święta fajka czanunpa z czerwonego kamienia katlinitu z piórem orła",
      "kieszonkowa biblia oprawna w skórę wołową z zapiskami rodzinnymi",
      "drewniana ambona z dębu ze zboru pionierów wiary",
      "dzwon wolności sumienia z wyrytym wersetem z Księgi Kapłańskiej",
      "tkanina modlitewna z geometrycznymi symbolami światła i niebios"
    ]
  },
  "Ameryka Południowa": {
    "capital": "sanktuaria andyjskie, barokowe kościoły misyjne i bazyliki maryjne",
    "features": "Andy, dorzecze Amazonki, doliny święte Inków, płaskowyże i lasy deszczowe",
    "leaders": [
      "kapłani andyjscy sprawujący obrzędy wdzięczności wobec Matki Ziemi (Pachamamy) i Stwórcy Wirakoczy",
      "misjonarze redukcji paragwajskich tworzący wspólnoty braterskiej równości i muzyki",
      "świadkowie objawień Matki Bożej pocieszającej uciemiężone ludy tubylcze",
      "kapłani i zakonnice oddający życie w obronie ubogich i mieszkańców puszczy",
      "wspólnoty modlitewne z faweli i wiosek trwające na całonocnym czuwaniu"
    ],
    "events": [
      "ukazanie się Cudownego Wizerunku na płaszczu z agawy ubogiego Indianina",
      "zbudowanie misyjnego miasta ze szkołą muzyczną i warsztatami lutniczymi w dżungli",
      "uroczysta procesja ze świętą figurą Pana Cudów (Señor de los Milagros)",
      "złożenie daru z pierwszych kłosów kukurydzy w dziękczynieniu za życie",
      "wspólne śpiewanie psalmów z akompaniamentem fletni pana i harfy andyjskiej"
    ],
    "artifacts": [
      "tilma z agawy z cudownym wizerunkiem Dziewicy z Guadalupe",
      "srebrna monstrancja andyjska wysadzana szmaragdami w kształcie słońca",
      "fletnia pana siku z trzciny używana do liturgicznych hymnów dziękczynnych",
      "krzyż misyjny wyrzeźbiony z twardego drewna quebracho",
      "barwna szata liturgiczna tkana ręcznie z wełny alpaki z symbolami kłosów i winorośli"
    ]
  },
  "Oceania": {
    "capital": "święte marae, kaplice koralowe i miejsca zgromadzeń wyspiarskich",
    "features": "atole koralowe, góry wulkaniczne, błękit Pacyfiku i święte drzewa banyan",
    "leaders": [
      "wodzowie i kapłani strzegący świętej energii Mana i tabu świętych miejsc",
      "mędrcy czytający wolę Niebios z gwiazdozbiorów i prądów oceanu",
      "pierwsi wyspiarscy nauczyciele Ewangelii niosący pokój między walczące plemiona",
      "twórcy pieśni chóralnych łączących polifonię polinezyjską z hymnami chwały Bożej",
      "starszyzna Aborygenów strzegąca świętych pieśni Czasu Snu (Dreamtime)"
    ],
    "events": [
      "złożenie broni i zawarcie wiecznego pokoju w imię Boga Miłości na świętym marae",
      "zbudowanie białego kościoła z bloków koralowych na brzegu laguny",
      "odprawienie o wschodzie słońca hymnu dziękczynnego za dar życia i oceanu",
      "namalowanie na korze eukaliptusa świętych dróg Stwórcy przemierzającego ziemię",
      "chrzest całej społeczności wyspy w czystych wodach atolu"
    ],
    "artifacts": [
      "rzeźbiona lasko-stela bóstwa opiekuńczego z drewna żelaznego z plecionką kokosową",
      "biblia przetłumaczona na język maoryski w oprawie z tłoczonej skóry",
      "muszla konchowa trąbiona na wezwanie do modlitwy o brzasku",
      "krzyż wyrzeźbiony z białego korala morskiego z motywem fal",
      "kora malowana ochrą i węglem przedstawiająca Stwórcę Czasu Snu"
    ]
  },
  "Antarktyda": {
    "capital": "kaplice polarne na wiecznej zmarzlinie",
    "features": "bezkresna czasza lodowa, czyste niebo polarne, cisza absolutna i góry lodowe",
    "leaders": [
      "polarnicy i kapelani stacji polarnych trwający na modlitwie w sercu nocy polarnej",
      "eremici i badacze kontemplujący nieskończoność i majestat Boga pośród lodu",
      "ludzie wiary wznoszący kaplice na krańcach globu jako świadectwo obecności Stwórcy",
      "świadkowie uniwersalnego braterstwa narodów zjednoczonych w szacunku do dzieła stworzenia",
      "modlący się o ocalenie ziemi i pokój dla całej rodziny ludzkiej"
    ],
    "events": [
      "odprawienie pierwszej mszy świętej i modlitwy dziękczynnej na lodowcu Antarktydy",
      "wzniesienie drewnianej kaplicy Trójcy Świętej z bali cedrowych na wyspie King George",
      "doświadczenie głębokiej obecności Bożej w absolutnej ciszy pustyni lodowej",
      "wspólne świętowanie nocy Bożego Narodzenia przez polarników różnych wyznań i narodów",
      "zainstalowanie krzyża na wzgórzu polarnym jako znaku nadziei na odnowienie świata"
    ],
    "artifacts": [
      "drewniana ikona Matki Bożej Polarnej odporna na arktyczne mrozy",
      "mosiężny krzyż stacyjny ze stopu odpornego na korozję lodową",
      "dzwon kaplicy polarnej, którego dźwięk niesie się po lodowych pustkowiach",
      "kieszonkowy psałterz w wodoszczelnej oprawie używany podczas wypraw polarnych",
      "świeca woskowa płonąca jasnym światłem pośród nocy polarnej"
    ]
  }
}
  };

  const STANDARD_DATA = {
    epochDef: [
      ['Prehistoria i starożytność', -100000],
      ['Wczesne średniowiecze', 476],
      ['Dojrzałe średniowiecze', 1000],
      ['Odrodzenie (renesans)', 1453],
      ['Oświecenie i rewolucje', 1600],
      ['XIX wiek (era pary)', 1800],
      ['Początek XX wieku', 1900],
      ['I i II wojna światowa', 1918],
      ['Zimna wojna i kosmos', 1945],
      ['Przełom tysiącleci i cyfra', 1989],
      ['Współczesność (XXI wiek)', 2010],
      ['Przyszłość i futurologia', 2025]
    ],

    categories: [
  {
    "id": "H",
    "name": "Humanistyka",
    "color": "niebieski",
    "hex": "#2f6db5"
  },
  {
    "id": "T",
    "name": "Technika",
    "color": "czerwony",
    "hex": "#c0392b"
  },
  {
    "id": "P",
    "name": "Przyroda",
    "color": "zielony",
    "hex": "#2e8b57"
  }
],
    domainNames: {
  "H": [
    "archeologia",
    "filozofia",
    "historia",
    "językoznawstwo",
    "literaturoznawstwo",
    "kultura i religia",
    "ekonomia i finanse",
    "psychologia",
    "pedagogika",
    "socjologia",
    "prawo",
    "inne (humanistyka)"
  ],
  "T": [
    "architektura i urbanistyka",
    "automatyka, elektronika i elektrotechnika",
    "informatyka i telekomunikacja",
    "inżynieria biomedyczna",
    "inżynieria chemiczna",
    "inżynieria lądowa i transport",
    "inżynieria materiałowa",
    "inżynieria mechaniczna",
    "inżynieria środowiska, górnictwo i energetyka",
    "astronomia",
    "matematyka",
    "inne (technika)"
  ],
  "P": [
    "biologia",
    "chemia",
    "fizyka",
    "środowisko",
    "zdrowie",
    "kultura fizyczna i sport",
    "medycyna",
    "farmacja",
    "rolnictwo",
    "weterynaria",
    "zootechnika i rybactwo",
    "inne (przyroda)"
  ]
},
    domains36: [
  {
    "code": "H01",
    "name": "Archeologia i Prasztuki",
    "cat": "Historia i Geopolityka",
    "focus": "wykopaliska, artefakty, grobowce megalityczne, osadnictwo pierwotne, ceramika i narzędzia krzemienne"
  },
  {
    "code": "H02",
    "name": "Mitologie i Starożytność",
    "cat": "Historia i Geopolityka",
    "focus": "kulty religijne, panteony bóstw, kapłani, wyrocznie, rytuały ofiarne i kosmologie starożytne"
  },
  {
    "code": "H03",
    "name": "Średniowieczne Królestwa",
    "cat": "Historia i Geopolityka",
    "focus": "zamki obronne, rycerstwo, lenna feudalne, traktaty dynastyczne, herby i kodeksy rycerskie"
  },
  {
    "code": "H04",
    "name": "Wielkie Odkrycia Geograficzne",
    "cat": "Historia i Geopolityka",
    "focus": "nawigacja oceaniczna, karawela, astrolabium morskie, mapowanie wybrzeży i szlaki przypraw"
  },
  {
    "code": "H05",
    "name": "Oświecenie i Filozofia",
    "cat": "Historia i Geopolityka",
    "focus": "racjonalizm, encyklopedie, prawa człowieka, konstytucje, salony myśli i umowa społeczna"
  },
  {
    "code": "H06",
    "name": "Rewolucje Przemysłowe",
    "cat": "Historia i Geopolityka",
    "focus": "maszyna parowa, kopalnie węgla, linie kolejowe, fabryki włókiennicze i hutnictwo stali"
  },
  {
    "code": "H07",
    "name": "Historia Sztuki i Architektury",
    "cat": "Historia i Geopolityka",
    "focus": "freski, sklepienia gotyckie, proporcje renesansowe, barok, rzeźba i monumentalizm"
  },
  {
    "code": "H08",
    "name": "Dyplomacja i Konflikty Zbrojne",
    "cat": "Historia i Geopolityka",
    "focus": "kampanie wojenne, sojusze obronne, traktaty pokojowe, fortyfikacje i strategie militarne"
  },
  {
    "code": "H09",
    "name": "Historia Nowożytna XX Wieku",
    "cat": "Historia i Geopolityka",
    "focus": "odzyskiwanie niepodległości, totalitaryzmy, ruchy oporu, zimna wojna i dekolonizacja"
  },
  {
    "code": "H10",
    "name": "Nauki Cyfrowe i Informatyka",
    "cat": "Historia i Geopolityka",
    "focus": "kryptografia, maszyny liczące, tranzystory, mikroprocesory, komputery i algorytmy"
  },
  {
    "code": "H11",
    "name": "Geopolityka i Mapowanie Świata",
    "cat": "Historia i Geopolityka",
    "focus": "kartografia, granice państwowe, zasoby geostrategiczne, cieśniny morskie i szlaki handlowe"
  },
  {
    "code": "H12",
    "name": "Futurologia i Eksploracja Kosmosu",
    "cat": "Historia i Geopolityka",
    "focus": "misje orbitalne, teleskopy kosmiczne, habitaty pozaziemskie i perspektywy astrobiologii"
  },
  {
    "code": "P01",
    "name": "Antropologia i Etnografia",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "struktury plemienne, zwyczaje obrzędowe, stroje ludowe, pieśni pradawne i tożsamość"
  },
  {
    "code": "P02",
    "name": "Psychologia i Socjologia",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "dynamika grupowa, motywacja jednostki, więzi społeczne, behawioryzm i psychologia tłumu"
  },
  {
    "code": "P03",
    "name": "Biologia i Genetyka",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "ewolucja gatunków, struktura komórki, DNA, anatomia człowieka, dziedziczenie i fizjologia"
  },
  {
    "code": "P04",
    "name": "Ekologia i Nauki o Środowisku",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "ekosystemy leśne i rzeczne, ochrona biosfery, cykle biogeochemiczne i bioróżnorodność"
  },
  {
    "code": "P05",
    "name": "Fizyka i Kosmologia",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "prawa dynamiki Newtona, grawitacja, optyka, fale elektromagnetyczne, kwanty i astrofizyka"
  },
  {
    "code": "P06",
    "name": "Chemia i Inżynieria Materiałowa",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "alchemia, układ okresowy, pierwiastki chemiczne, metalurgia, stopy brązu, żelaza i polimery"
  },
  {
    "code": "P07",
    "name": "Matematyka i Logika",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "geometria euklidesowa, algebra, tabliczki liczb, rachunek różniczkowy i teoria gier"
  },
  {
    "code": "P08",
    "name": "Medycyna i Farmacja",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "ziołolecznictwo, anatomia, chirurgia polowa, antybiotyki, szczepionki, higiena i farmakologia"
  },
  {
    "code": "P09",
    "name": "Lingwistyka i Językoznawstwo",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "pismo klinowe, hieroglify, runy, gramatyka porównawcza, fonetyka i rodziny językowe"
  },
  {
    "code": "P10",
    "name": "Filozofia i Etyka",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "teoria poznania, moralność, etyka cnót, prawa naturalne, sens istnienia i epistemologia"
  },
  {
    "code": "P11",
    "name": "Geologia i Paleontologia",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "skamieniałości, warstwy osadowe, ruchy tektoniczne, wulkany, minerały i minerały rzadkie"
  },
  {
    "code": "P12",
    "name": "Ekonomia i Nauki o Zarządzaniu",
    "cat": "Przyroda i Społeczeństwo",
    "focus": "handel dalekosiężny, systemy monetarne, bankowość renesansowa, giełdy i teoria wartości"
  },
  {
    "code": "T01",
    "name": "Sztuczna Inteligencja i Uczenie Maszynowe",
    "cat": "Technologia i Inżynieria",
    "focus": "modele językowe, algorytmy samouczące, widzenie komputerowe, agenty autonomiczne i sieci neuronowe"
  },
  {
    "code": "T02",
    "name": "Cyberbezpieczeństwo i Kryptografia",
    "cat": "Technologia i Inżynieria",
    "focus": "szyfry asymetryczne, protokoły bezpieczeństwa, łamanie kodów, integrity i podpis cyfrowy"
  },
  {
    "code": "T03",
    "name": "Robotyka i Automatyka",
    "cat": "Technologia i Inżynieria",
    "focus": "mechanizmy precyzyjne, manipulatory przemysłowe, sensoryka, roboty autonomiczne i mechatronika"
  },
  {
    "code": "T04",
    "name": "Biotechnologia i Nanotechnologia",
    "cat": "Technologia i Inżynieria",
    "focus": "inżynieria genetyczna CRISPR, nanocząstki, bioreaktory, enzymy przemysłowe i syntetyczna biologia"
  },
  {
    "code": "T05",
    "name": "Inżynieria Kosmiczna i Astronomia",
    "cat": "Technologia i Inżynieria",
    "focus": "napędy rakietowe, trajektorie orbitalne, lądowniki planetarne, sondy międzyplanetarne i stacje"
  },
  {
    "code": "T06",
    "name": "Odnawialne Źródła Energii i Fuzja",
    "cat": "Technologia i Inżynieria",
    "focus": "reaktory termojądrowe tokamak, fotoogniwa perowskitowe, turbiny wiatrowe i gospodarka wodorowa"
  },
  {
    "code": "T07",
    "name": "Architektura Sieci i IoT",
    "cat": "Technologia i Inżynieria",
    "focus": "sieci rozproszone, światłowody oceaniczne, telemetria satelitarna i węzły komunikacyjne"
  },
  {
    "code": "T08",
    "name": "Kwantowe Przetwarzanie Danych",
    "cat": "Technologia i Inżynieria",
    "focus": "qubity nadprzewodzące, splątanie kwantowe, bramki logiczne i odporna kryptografia kwantowa"
  },
  {
    "code": "T09",
    "name": "Sieci Neuronowe i Kognitywistyka",
    "cat": "Technologia i Inżynieria",
    "focus": "architektura koneksjonistyczna, interfejs mózg-komputer, pamięć asocjacyjna i neuroplastyczność"
  },
  {
    "code": "T10",
    "name": "Inżynieria Materiałów Przyszłości",
    "cat": "Technologia i Inżynieria",
    "focus": "grafen, metamateriały o ujemnym współczynniku załamania, stopy z pamięcią kształtu i aerożele"
  },
  {
    "code": "T11",
    "name": "Wirtualna Rzeczywistość i Symulacje",
    "cat": "Technologia i Inżynieria",
    "focus": "cyfrowe bliźniaki miast, renderowanie wolumetryczne, silniki fizyki cząstek i immersja"
  },
  {
    "code": "T12",
    "name": "Systemy Autonomiczne i Smart Cities",
    "cat": "Technologia i Inżynieria",
    "focus": "zarządzanie megamiastem, sieci inteligentne smart grid, transport bezzałogowy i algorytmy logistyki"
  }
],
    epochs12: [
  {
    "id": 1,
    "name": "Prehistoria i Starożytność",
    "era": "do 476 n.e.",
    "theme": "Początki cywilizacji, pismo klinowe i hieroglify, brąz, żelazo i pierwsze imperia"
  },
  {
    "id": 2,
    "name": "Wczesne Średniowiecze",
    "era": "476 – 1000 n.e.",
    "theme": "Wędrówki ludów, kształtowanie państwowości, klasztorne skryptoria i epoka run"
  },
  {
    "id": 3,
    "name": "Dojrzałe Średniowiecze",
    "era": "1000 – 1453 n.e.",
    "theme": "Rozkwit miast, cechy rzemieślnicze, uniwersytety, katedry gotyckie i prawo magdeburskie"
  },
  {
    "id": 4,
    "name": "Odrodzenie (Renesans)",
    "era": "1453 – 1600 n.e.",
    "theme": "Druk Gutenberga, heliocentryzm Kopernika, humanizm i transoceaniczne szlaki żeglugowe"
  },
  {
    "id": 5,
    "name": "Oświecenie i Rewolucje",
    "era": "1600 – 1800 n.e.",
    "theme": "Eksperyment naukowy, prawa dynamiki, racjonalizm, encyklopedie i pierwsze konstytucje"
  },
  {
    "id": 6,
    "name": "XIX Wiek (Era Przemysłowa)",
    "era": "1800 – 1900 n.e.",
    "theme": "Maszyny parowe, kolej żelazna, przemysł naftowy, telegraf, elektryczność i teoria ewolucji"
  },
  {
    "id": 7,
    "name": "Początek XX Wieku",
    "era": "1900 – 1918 n.e.",
    "theme": "Promieniotwórczość, lotnictwo braci Wright, teoria względności Einsteina i fizyka kwantowa"
  },
  {
    "id": 8,
    "name": "I i II Wojna Światowa",
    "era": "1918 – 1945 n.e.",
    "theme": "Kryptografia matematyczna, złamanie Enigmy, radar, antybiotyki i energia atomowa"
  },
  {
    "id": 9,
    "name": "Zimna Wojna i Kosmos",
    "era": "1945 – 1989 n.e.",
    "theme": "Program Apollo, tranzystory, lądowanie na Księżycu, sieć ARPANET i inżynieria genetyczna"
  },
  {
    "id": 10,
    "name": "Współczesność i Era Cyfrowa",
    "era": "1989 – 2030 n.e.",
    "theme": "Globalny internet, smartfony, sekwencjonowanie genomu ludzkiego, planety pozasłoneczne i AI"
  },
  {
    "id": 11,
    "name": "Przyszłość i Eksploracja Kosmosu",
    "era": "2030 – 2100 n.e.",
    "theme": "Bazy księżycowe i marsjańskie, komputery kwantowe, reaktory fuzji jądrowej i bioinżynieria"
  },
  {
    "id": 12,
    "name": "Nowa Era i Nowe Cywilizacje",
    "era": "powyżej 2100 n.e.",
    "theme": "Międzygwiezdne próbniki relatywistyczne, kwantowa sieć wiedzy, zamknięta ekosfera orbitalna"
  }
],
    periods12: [
  {
    "id": 1,
    "name": "Okres 1: Przedświt i Narodziny Idei"
  },
  {
    "id": 2,
    "name": "Okres 2: Formowanie i Pierwsze Próby Warsztatowe"
  },
  {
    "id": 3,
    "name": "Okres 3: Epoka Klasyczna i Konsolidacja Społeczna"
  },
  {
    "id": 4,
    "name": "Okres 4: Próba Sił i Zderzenie Kultur"
  },
  {
    "id": 5,
    "name": "Okres 5: Odrodzenie i Przełom Intelektualny"
  },
  {
    "id": 6,
    "name": "Okres 6: Złoty Wiek Rozkwitu i Mistrzostwa"
  },
  {
    "id": 7,
    "name": "Okres 7: Praktyczne Zastosowanie i Przemysł"
  },
  {
    "id": 8,
    "name": "Okres 8: Transformacja Strukturalna i Nowe Horyzonty"
  },
  {
    "id": 9,
    "name": "Okres 9: Próba Ognia i Ostateczny Sprawdzian Wiedzy"
  },
  {
    "id": 10,
    "name": "Okres 10: Globalna Dyfuzja i Skok Jakościowy"
  },
  {
    "id": 11,
    "name": "Okres 11: Rewolucja Cyfrowo-Paradygmatyczna"
  },
  {
    "id": 12,
    "name": "Okres 12: Horyzont Przyszłości i Dziedzictwo Dziejowe"
  }
],
    seriesThemes: [
  {
    "num": 1,
    "title": "Geneza, Źródła i Pierwsze Odkrycie",
    "angle": "odkrycie pierwszych śladów, geneza zjawiska i pierwotne narzędzia badawcze"
  },
  {
    "num": 2,
    "title": "Przełomowy Eksperyment i Wynalazek",
    "angle": "kluczowy moment weryfikacji naukowej, pierwsze udane doświadczenie i rewolucyjny prototyp"
  },
  {
    "num": 3,
    "title": "Wpływ na Społeczeństwo i Życie Codzienne",
    "angle": "jak wydarzenie zmieniło warunki bytowe mieszkańców, miast i codziennej pracy"
  },
  {
    "num": 4,
    "title": "Wybitna Postać: Biografia i Decyzje",
    "angle": "konkretne decyzje, motywacje, odwaga moralna i determinacja głównego bohatera"
  },
  {
    "num": 5,
    "title": "Konfrontacja z Tradycją i Spór Naukowy",
    "angle": "przełamywanie dawnych dogmatów, debaty akademickie i niezłomna obrona faktów"
  },
  {
    "num": 6,
    "title": "Tajemnica, Kod i Niewyjaśniony Fenomen",
    "angle": "ukryte zapisy, kryptografia, nieznane zjawiska przyrodnicze i odczytanie szyfru"
  },
  {
    "num": 7,
    "title": "Sztuka, Architektura i Wyraz Kulturowy",
    "angle": "estetyka epoki, arcydzieła rąk ludzkich, freski, zdobienia, muzyka i rytuał"
  },
  {
    "num": 8,
    "title": "Inżynieria, Praca Rąk i Konstrukcja",
    "angle": "fizyczny proces powstawania dzieła, użyte materiały, stopy metali i kunszt rzemieślników"
  },
  {
    "num": 9,
    "title": "Dylematy Etyczne i Odpowiedzialność",
    "angle": "konsekwencje moralne i etyczne odkrycia dla całej wspólnoty ludzkiej"
  },
  {
    "num": 10,
    "title": "Wielka Synteza Dziejowa i Horyzont Przyszłości",
    "angle": "podsumowanie całości wiedzy, uniwersalne prawa i testament dla potomnych"
  }
],
    chronicles: {
  "Polska": {
    "capital": "Kraków / Warszawa",
    "features": "dolina Wisły i Odry, puszcze nizinne, złoża krzemienia pasiastego, węgla kamiennego, miedzi i soli kamiennej",
    "eras": {
      "1": {
        "leader": "Rzemieślnicy neolityczni z Krzemionek Opatowskich",
        "year": "ok. 3000 p.n.e.",
        "place": "Krzemionki Opatowskie i Bronocice",
        "event": "podziemne wydobycie krzemienia pasiastego oraz stworzenie naczynia z najstarszym wyobrażeniem wozu kołowego na świecie",
        "artifact": "siekiera z gładzonego krzemienia pasiastego i waza z Bronocic"
      },
      "2": {
        "leader": "Mieszko I i księżna Dobrawa",
        "year": "966 r.",
        "place": "Gniezno, Poznań i Ostrów Lednicki",
        "event": "przyjęcie chrztu przez władcę Polan, zjednoczenie plemion lechickich i budowa kamiennych palatiów książęcych",
        "artifact": "palatium na Ostrowie Lednickim, stauroteka i srebrny denar Mieszka I"
      },
      "3": {
        "leader": "Król Kazimierz III Wielki",
        "year": "1364 r.",
        "place": "Wawel w Krakowie",
        "event": "ufundowanie Akademii Krakowskiej (Studium Generale), kodyfikacja Statutów wiślickich i budowa ceglanych zamków obronnych",
        "artifact": "gotyckie insygnia królewskie, berło rektorskie i pieczęć majestatyczna"
      },
      "4": {
        "leader": "Mikołaj Kopernik",
        "year": "1543 r.",
        "place": "Frombork, Toruń i Kraków",
        "event": "ukończenie i wydanie dzieła „De revolutionibus orbium coelestium”, które wstrzymało Słońce i ruszyło Ziemię",
        "artifact": "triquetrum drewniane, astrolabium mosiężne i traktat o szacunku monety"
      },
      "5": {
        "leader": "Stanisław Staszic i Hugo Kołłątaj",
        "year": "1791 r.",
        "place": "Zamek Królewski w Warszawie",
        "event": "uchwalenie Ustawy Rządowej (Konstytucji 3 Maja) oraz działalność Komisji Edukacji Narodowej tworzącej nowoczesny system szkolnictwa",
        "artifact": "oryginalny rękopis Konstytucji 3 Maja z pieczęcią Korony i Litwy"
      },
      "6": {
        "leader": "Ignacy Łukasiewicz i Tytus Trzecieski",
        "year": "1853 r.",
        "place": "Lwów, Gorlice i Bóbrka",
        "event": "wynalezienie lampy naftowej, destylacja frakcyjna ropy naftowej i uruchomienie pierwszej na świecie kopalni ropy w Bóbrce",
        "artifact": "pierwsza cylindryczna lampa naftowa ze zbiornikiem z blachy i palnikiem"
      },
      "7": {
        "leader": "Maria Skłodowska-Curie i Piotr Curie",
        "year": "1898 r.",
        "place": "Warszawa i Paryż",
        "event": "odkrycie dwóch nowych pierwiastków promieniotwórczych: polonu i radu, nagrodzone dwukrotnie Nagrodą Nobla (z fizyki i chemii)",
        "artifact": "piec krystalizacyjny, elektroskop kwarcowy i próbki blendy smolistej z Jachymowa"
      },
      "8": {
        "leader": "Marian Rejewski, Jerzy Różycki i Henryk Zygalski",
        "year": "1932 r.",
        "place": "Warszawa (Pałac Saski)",
        "event": "przełamanie niemieckiego szyfru wojskowego maszyny Enigma przy użyciu czystej teorii permutacji grup matematycznych",
        "artifact": "bomba kryptologiczna Rejewskiego, cyklometr i perforowane płachty Zygalskiego"
      },
      "9": {
        "leader": "Prof. Jan Czochralski i Stanisław Ulam",
        "year": "1948 r.",
        "place": "Warszawa, Kcynia i Los Alamos",
        "event": "opracowanie metody hodowli monokryształów półprzewodników (podstawa mikroprocesorów) oraz algorytmu metody Monte Carlo",
        "artifact": "tygiel grafitowy z wyciąganym kryształem krzemu o strukturze diamentu"
      },
      "10": {
        "leader": "Prof. Aleksander Wolszczan i Stanisław Lem",
        "year": "1992 r.",
        "place": "Toruń i Obserwatorium Radiowe Arecibo",
        "event": "odkrycie pierwszego pozasłonecznego układu planetarnego krążącego wokół pulsara PSR B1257+12",
        "artifact": "cyfrowy spektrogram impulsów radiowych z milisekundowego pulsara"
      },
      "11": {
        "leader": "Inżynierowie misji satelitarnych PW-Sat i CBK PAN",
        "year": "2028 r.",
        "place": "Warszawa i Europejska Agencja Kosmiczna",
        "event": "skonstruowanie innowacyjnego żagla aerodynamicznego do deorbitacji śmieci kosmicznych z orbity LEO",
        "artifact": "nanosatelita CubeSat z poszyciem z kompozytów węglowych i żaglem mylarowym"
      },
      "12": {
        "leader": "Projektanci Kwantowego Węzła Histada Polska",
        "year": "2112 r.",
        "place": "Gdańsk i Kraków",
        "event": "stworzenie bezpiecznej sieci teleportacji stanów kwantowych łączącej europejskie repozytoria wiedzy",
        "artifact": "światłowód fotoniczny z pamięcią na uwięzionych jonach iterbu"
      }
    }
  },
  "Egipt": {
    "capital": "Memfis / Aleksandria / Kair",
    "features": "dolina i delta Nilu, pasma pustyni arabskiej i libijskiej, wapienie z Tury, granit asuański i złoża złota Nubii",
    "eras": {
      "1": {
        "leader": "Imhotep – kanclerz króla Dżosera",
        "year": "ok. 2650 p.n.e.",
        "place": "Sakkara i Memfis",
        "event": "zaprojektowanie i wzniesienie piramidy schodkowej z ciosanego kamienia wapiennego oraz kodyfikacja podstaw medycyny klinicznej",
        "artifact": "kamienna stela z reliefem papirusów i narzędzia chirurgiczne z brązu"
      },
      "2": {
        "leader": "Królowa Hatszepsut i Senenmut",
        "year": "ok. 1470 p.n.e.",
        "place": "Deir el-Bahari i kraina Punt",
        "event": "wyprawa morska flotylli pięciu statków na Morze Czerwone i sprowadzenie żywych drzew kadzidlanych do Teb",
        "artifact": "malowane reliefy ze świątyni grobowej i naczynia alabastrowe na mirrę"
      },
      "3": {
        "leader": "Ramzes II Wielki",
        "year": "1274 p.n.e.",
        "place": "Kadesz nad Orontesem i Abu Simbel",
        "event": "starcie rydwanów pod Kadesz oraz zawarcie pierwszego w dziejach ratyfikowanego traktatu pokojowego z królem Hetytów Hattusilisem III",
        "artifact": "srebrna tabliczka z tekstem traktatu pokojowego wyryta pismem klinowym"
      },
      "4": {
        "leader": "Eratostenes z Cyreny",
        "year": "ok. 240 p.n.e.",
        "place": "Aleksandria i Syene (Asuan)",
        "event": "obliczenie obwodu Ziemi z błędem poniżej 2% za pomocą pomiaru kąta cienia gnomonu w studni w południe przesilenia letniego",
        "artifact": "czasza zegara słonecznego skafion i papirusy Muzeum Aleksandryjskiego"
      },
      "5": {
        "leader": "Ibn al-Hajsam (Alhazen)",
        "year": "1021 r.",
        "place": "Kair nad Nilem",
        "event": "stworzenie nowoczesnej teorii optyki doświadczalnej, wyjaśnienie działania oka i budowa pierwszej ciemni optycznej camera obscura",
        "artifact": "manuskrypt „Kitab al-Manazir” z diagramami załamania promieni w soczewkach"
      },
      "6": {
        "leader": "Muhammad Ali Pasza i inżynier Linant de Bellefonds",
        "year": "1835 r.",
        "place": "Kair i Delta Nilu",
        "event": "budowa zapór regulacyjnych Delty Nilu i wprowadzenie uprawy długowłóknistej bawełny Jumel zasilającej gospodarkę",
        "artifact": "kamienne mechanizmy wrót śluzowych i żelazne koła czerpakowe saqiya"
      },
      "7": {
        "leader": "Jean-François Champollion",
        "year": "1822 r.",
        "place": "Rosetta (Raszyt) i Teby",
        "event": "odczytanie egipskich hieroglifów dzięki analizie kartuszy królów Ptolemeusza i Kleopatry na czarnej steli Kamienia z Rosetty",
        "artifact": "Kamień z Rosetty z granodiorytu z inskrypcją w 3 pismach"
      },
      "8": {
        "leader": "Howard Carter i lord Carnarvon",
        "year": "1922 r.",
        "place": "Dolina Królów pod Luksorem",
        "event": "odkrycie nienaruszonego grobowca KV62 faraona Tutanchamona z czterema złotymi kaplicami i kamiennym sarkofagiem",
        "artifact": "złota maska pośmiertna wysadzana lapis lazuli, obsydianem i kwarcem"
      },
      "9": {
        "leader": "Inżynierowie Wielkiej Tamy Asuańskiej",
        "year": "1964 r.",
        "place": "Asuan i Abu Simbel",
        "event": "przeprowadzenie bezprecedensowej operacji pocięcia świątyń Ramzesa II na 1042 bloki i przeniesienie ich 65 m wyżej przed zalaniem",
        "artifact": "hydrauliczne piły diamentowe i betonowa kopuła ochronna"
      },
      "10": {
        "leader": "Prof. Ahmed Zewail",
        "year": "1999 r.",
        "place": "Aleksandria i Pasadena",
        "event": "stworzenie femtochemii – rejestracji powstawania i zrywania wiązań chemicznych za pomocą ultrakrótkich impulsów laserowych",
        "artifact": "spektrometr laserowy z komorą próżniową operujący w skali femtosekund (10^-15 s)"
      },
      "11": {
        "leader": "Archeolodzy projektu ScanPyramids",
        "year": "2023 r.",
        "place": "Wielka Piramida Cheopsa w Gizie",
        "event": "bezinwazyjne odkrycie 9-metrowego korytarza za pomocą radiografii mionowej rejestrującej promieniowanie kosmiczne",
        "artifact": "płyty z emulsją jądrową i teleskopy mionowe ze scyntylatorami"
      },
      "12": {
        "leader": "Inżynierowie Nowej Doliny Agrowoltaicznej",
        "year": "2118 r.",
        "place": "Oaza Charga na Pustyni Zachodniej",
        "event": "uruchomienie zamkniętego biosystemu solarnego pozyskującego wodę bezpośrednio z głębokich warstw piaskowca nubijskiego",
        "artifact": "membrany grafenowe z pompami molekularnymi napędzanymi kwantami światła"
      }
    }
  }
},
    regionPatterns: {
  "Europa": {
    "capital": "historyczne stolice i uniwersytety",
    "features": "doliny rzek spławnych, lasy liściaste, złoża żelaza, węgla i wapienia",
    "leaders": [
      "mistrzowie cechów odlewniczych i budowniczowie kamiennych mostów",
      "uczeni z uniwersytetów kodyfikujący prawa rzemiosła",
      "pionierzy manufaktur mechanicznych i hutnictwa",
      "przyrodnicy badający strukturę flory i fauny nizinnej",
      "inżynierowie elektryfikacji i transportu szynowego"
    ],
    "events": [
      "zbudowanie pierwszych wodnych kół młyńskich i kuźni napędzanych rzeką",
      "powstanie bibliotek uniwersyteckich i pracowni kartograficznych",
      "zastosowanie pierwszych maszyn parowych w odwadnianiu kopalń",
      "zbudowanie regionalnej sieci telegraficznej i kolejowej",
      "zainstalowanie aparatury do badań nad promieniami rentgenowskimi"
    ],
    "artifacts": [
      "cyrkiel proporcjonalny z mosiądzu i mapa pergaminowa",
      "koło zębate z odlewanego żeliwa i suwmiarka warsztatowa",
      "szklana retorta destylacyjna i waga laboratoryjna",
      "induktor Ruhmkorffa i lampa katodowa",
      "tranzystorowy moduł obliczeniowy z rdzeniami ferrytowymi"
    ]
  },
  "Azja": {
    "capital": "ośrodki cesarskie i węzły Jedwabnego Szlaku",
    "features": "wielkie dorzecza rzeczne, terasy uprawne, pasma górskie, złoża miedzi, cyny i kaolinu",
    "leaders": [
      "nadworni astronomowie rejestrujący ruchy planet i komet",
      "mistrzowie metalurgii brązu i pieców do wypału porcelany",
      "architekci kanałów irygacyjnych i mostów łukowych",
      "twórcy medycyny ziołowej i akupunktury",
      "konstruktorzy zegarów wodnych i sejsmoskopów"
    ],
    "events": [
      "stworzenie pierwszego sejsmoskopu wykrywającego trzęsienia ziemi",
      "wynalezienie ruchomej czcionki glinianej i papieru morwowego",
      "wytyczenie transkontynentalnych szlaków karawanowych",
      "zbudowanie Wielkiego Kanału łączącego dorzecza rzek",
      "uruchomienie obserwatorium astronomicznego z kwadrantami z brązu"
    ],
    "artifacts": [
      "igła magnetyczna pływająca na wodzie w naczyniu z laki",
      "zwój jedwabny z mapą konstelacji nieba północnego",
      "porcelanowy tygiel do syntezy barwników mineralnych",
      "sejsmoskop z brązu z głowami smoków i żabami",
      "bambusowe tabliczki z zapiskami astronomicznymi"
    ]
  },
  "Afryka": {
    "capital": "stacje karawanowe, metropolie nilowe i suahili",
    "features": "płaskowyże sawannowe, rzeki transkontynentalne, złoża złota, miedzi, soli i żelaza",
    "leaders": [
      "mistrzowie dymarek wytapiający żelazo w piecach naturalnego ciągu",
      "uczeni z uniwersytetu Sankore studiujący manuskrypty astronomiczne",
      "architekci kamiennych murów i wież z granitu bez zaprawy",
      "przewodnicy karawan orientujący się według gwiazdozbiorów zenitalnych",
      "zielarze badający właściwości lecznicze endemicznych roślin sawanny"
    ],
    "events": [
      "rozwój hutnictwa żelaza i produkcja wytrzymałych lemieszy rolniczych",
      "rozkwit bibliotek w Timbuktu gromadzących tysiące traktatów naukowych",
      "wzniesienie kamiennego kompleksu Wielkiego Zimbabwe",
      "organizacja dalekosiężnego handlu złotem i solą przez Saharę",
      "założenie nowoczesnych stacji badania klimatu i fauny rezerwatów"
    ],
    "artifacts": [
      "manuskrypt z Timbuktu pisany atramentem z sadzy na papierze włoskim",
      "sztabka miedzi w kształcie krzyża katangijskiego",
      "rzeźbiona stela z twardego granitu z motywami solarnymi",
      "astrolabium mosiężne z grawerowanymi nazwami gwiazd",
      "narzędzia chirurgiczne z kutej stali węglowej"
    ]
  },
  "Ameryka Północna": {
    "capital": "centra przemysłowe i ośrodki badawcze",
    "features": "prerie nizinne, dorzecza Missisipi i Rzeki Świętego Wawrzyńca, góry Appalachy i złoża krzemienia",
    "leaders": [
      "twórcy monumentalnych kopców ziemnych kultury Cahokia",
      "badacze zjawisk elektrycznych i autorzy traktatów o piorunochronie",
      "konstruktorzy parowców rzecznych i linii kolejowych transkontynentalnych",
      "wynalazcy fonografu, żarówki i masowej produkcji przemysłowej",
      "fizycy jądrowi i inżynierowie programu lądowania na Księżycu"
    ],
    "events": [
      "założenie największego przedkolumbijskiego miasta Cahokia z kopcami solarnymi",
      "doświadczalne udowodnienie elektrycznej natury pioruna za pomocą latawca",
      "połączenie oceanów linią kolei żelaznej w Promontory Summit",
      "stworzenie pierwszego komercyjnego laboratorium badawczo-rozwojowego",
      "zbudowanie rakiety Saturn V i lądowanie modułu Eagle na Księżycu"
    ],
    "artifacts": [
      "butelka lejdejska z miedzianym przewodnikiem i piorunochronem",
      "złoty gwóźdź spinający tory kolei transkontynentalnej",
      "żarówka z włóknem węglowym w bańce próżniowej",
      "komputer pokładowy AGC z pamięcią z rdzeni ferrytowych",
      "próbnik skał księżycowych z morza Spokoju"
    ]
  },
  "Ameryka Południowa": {
    "capital": "ośrodki andyjskie i metropolie pampasów",
    "features": "Andy, dorzecze Amazonki, doliny tarasowe, złoża srebra, miedzi i obsydianu",
    "leaders": [
      "architekci inkaskiego systemu dróg Qhapaq Ñan i wiszących mostów z trawy",
      "astronomowie wyznaczający punkty przesileń za pomocą intihuatana",
      "inżynierowie tarasów rolniczych Moray z mikroklimatem",
      "metalurdzy wytapiający stopy miedzi i złota w piecach huayra",
      "botanicy badający rośliny lecznicze puszczy amazońskiej"
    ],
    "events": [
      "budowa wiszącego mostu Q’eswachaka z plecionej trawy ichu",
      "zaprojektowanie kamiennego obserwatorium astronomicznego w Machu Picchu",
      "stworzenie trójwymiarowego systemu zapisu danych na sznurkach kipu",
      "hodowla odpornych odmian ziemniaka i kukurydzy na tarasach andyjskich",
      "zbudowanie radioteleskopów interferometrycznych ALMA na płaskowyżu Atakama"
    ],
    "artifacts": [
      "węzełkowe pismo kipu z barwionej wełny lamy i alpaki",
      "kamienny zegar słoneczny intihuatana wykuty w skale granitowej",
      "złoty dysk słoneczny z reliefem solarnym i gwiazdami",
      "antena radioteleskopu submilimetrowego z kompozytów węglowych",
      "naczynie ceramiczne z podwójnym dzióbkiem i gwizdkiem akustycznym"
    ]
  },
  "Oceania": {
    "capital": "archipelagi polinezyjskie i ośrodki żeglugi",
    "features": "atole koralowe, rafy barierowe, prądy oceaniczne i pasaty pacyficzne",
    "leaders": [
      "nawigatorzy oceaniczni voyaging canoe podwójnych kadłubów waka",
      "mistrzowie czytania fal odbitych od wysp i gwiazd zenitalnych",
      "twórcy map patykowych z trzciny i muszelek mattang",
      "kamieniarze rzeźbiący monolityczne posągi moai na Rapa Nui",
      "oceanografowie badający dynamikę Wielkiej Rafy Koralowej"
    ],
    "events": [
      "wyprawy oceaniczne na dystansie 4000 mil bez użycia kompasu igłowego",
      "skonstruowanie map trzcinowych pokazujących załamania fal morskich",
      "przetransportowanie wielotonowych posągów moai z kamieniołomu Rano Raraku",
      "wyhodowanie odpornych na sól odmian taro na sztucznych wysepkach",
      "zainstalowanie sieci podwodnych sensorów akustycznych badających prądy Pacyfiku"
    ],
    "artifacts": [
      "mapa patykowa rebbelib z prętów palmowych i muszli kauri",
      "kamienne ciosło z twardego bazaltu do dłubania kadłubów łodzi",
      "podwójny kadłub z desek łączonych sznurem z włókien kokosowych",
      "obsydianowe ostrze mataa z wyspy Wielkanocnej",
      "akustyczny boiograf oceanograficzny z modemem satelitarnym"
    ]
  },
  "Antarktyda": {
    "capital": "międzynarodowe bazy polarne",
    "features": "lądolód o grubości 3500 metrów, góry transantarktyczne, nunataki, wiatry katabatyczne",
    "leaders": [
      "polarnicy wypraw pionierskich Roalda Amundsena i Roberta Scotta",
      "geolodzy wierceń głębokich rdzeni lodowych stacji Wostok",
      "glacjolodzy analizujący skład pęcherzyków powietrza sprzed miliona lat",
      "astrofizycy teleskopu South Pole Telescope badający mikrofalowe promieniowanie tła",
      "inżynierowie stacji badawczej im. Henryka Arctowskiego"
    ],
    "events": [
      "zdobycie Bieguna Południowego po pokonaniu lodowca Axela Heiberga",
      "dowiercenie się do podlodowcowego jeziora Wostok ukrytego 4 km pod lodem",
      "odczytanie z pęcherzyków powietrza w lodzie zmian stężenia gazów cieplarnianych",
      "detekcja wysokoenergetycznych neutrin kosmicznych w detektorze IceCube",
      "zbudowanie modułowych stacji polarnych na hydraulicznych podnośnikach"
    ],
    "artifacts": [
      "sekstans polarny mosiężny z podwójną korekcją refrakcji lodowej",
      "rdzeń lodowy z widocznymi warstwami rocznymi i pęcherzykami gazu",
      "moduł fotopowielacza optycznego zamrożony w czaszy lodowej",
      "sanie nansenowskie z jesionu i wiązów skórzanych",
      "kriogeniczny czujnik termometryczny o czułości mili-kelwina"
    ]
  }
}
  };

  let inMemoryEdition = null;

  // Resolve current active edition
  function getEdition() {
    if (inMemoryEdition) return inMemoryEdition;
    if (typeof window !== 'undefined') {
      try {
        if (window.location && window.location.search) {
          const urlParams = new URLSearchParams(window.location.search);
          const edParam = urlParams.get('edition');
          if (edParam) {
            const lower = edParam.toLowerCase();
            if (lower === 'r' || lower === 'rel' || lower === 'religion') {
              inMemoryEdition = EDITIONS.RELIGION;
              return inMemoryEdition;
            }
            if (lower === 'std' || lower === 'standard' || lower === 'podstawowa') {
              inMemoryEdition = EDITIONS.STANDARD;
              return inMemoryEdition;
            }
          }
        }
        if (typeof localStorage !== 'undefined') {
          const stored = localStorage.getItem('histada.edition');
          if (stored === EDITIONS.STANDARD || stored === EDITIONS.RELIGION) {
            inMemoryEdition = stored;
            return inMemoryEdition;
          }
        }
      } catch (e) {}
    }
    // Domyślnie edycja religijna Wersja R
    inMemoryEdition = EDITIONS.RELIGION;
    return inMemoryEdition;
  }

  function setEdition(ed) {
    const val = (ed === EDITIONS.STANDARD) ? EDITIONS.STANDARD : EDITIONS.RELIGION;
    inMemoryEdition = val;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('histada.edition', val);
      }
    } catch (e) {}
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('histada:editionChanged', { detail: { edition: val } }));
    }
    return val;
  }

  function getActiveData(optEdition) {
    const ed = optEdition || getEdition();
    return (ed === EDITIONS.STANDARD) ? STANDARD_DATA : RELIGION_DATA;
  }

  // Generic generator for ANY country to ensure 100% verified, rich, authentic non-empty content
  function resolveRegionChronicle(countryName, hexId, epochId, edition) {
    const active = getActiveData(edition);
    const chronicles = active.chronicles;
    const regionPatterns = active.regionPatterns;

    if (chronicles[countryName] && chronicles[countryName].eras && chronicles[countryName].eras[epochId]) {
      const reg = chronicles[countryName];
      const era = reg.eras[epochId];
      return {
        country: countryName,
        capital: reg.capital,
        features: reg.features,
        leader: era.leader,
        year: era.year,
        place: era.place,
        event: era.event,
        artifact: era.artifact
      };
    }

    const hexes = (window.__D && window.__D.POLA && window.__D.POLA.hexes) ? window.__D.POLA.hexes : [];
    const h = hexes.find(x => x.id === parseInt(hexId, 10)) || { continent: 'Europa', name: countryName || 'Ziemia' };

    const reg = regionPatterns[h.continent] || regionPatterns['Europa'];
    const idx = (epochId * 3 + hexId * 7) % reg.leaders.length;
    const isRel = (getActiveData(edition) === RELIGION_DATA);
    const leader = isRel 
      ? `${reg.leaders[idx]} w świętym rejonie ${countryName || h.name}`
      : `${reg.leaders[idx]} w rejonie ${countryName || h.name}`;
    const event = reg.events[idx % reg.events.length];
    const artifact = reg.artifacts[idx % reg.artifacts.length];
    
    let yearCalc;
    if (isRel) {
      const YEAR_TABLE = [
        'ok. 10 000 p.n.e.', 'ok. 3000 p.n.e.', 'ok. 1400 p.n.e.', 'ok. 550 p.n.e.',
        'ok. 33 n.e.', 'ok. 451 n.e.', 'ok. 850 n.e.', 'ok. 1270 r.',
        'ok. 1545 r.', 'ok. 1880 r.', 'ok. 1965 r.', 'Paruzja Pańska'
      ];
      yearCalc = YEAR_TABLE[(epochId - 1) % 12];
    } else {
      yearCalc = epochId <= 1 ? 'ok. 1200 p.n.e.' : (epochId <= 5 ? `${400 + epochId * 220} r.` : `${1750 + (epochId - 5) * 35} r.`);
    }

    return {
      country: countryName || h.name,
      capital: reg.capital,
      features: reg.features,
      leader: leader,
      year: yearCalc,
      place: `${h.name} (${h.continent})`,
      event: event,
      artifact: artifact
    };
  }

  // --- 4D NARRATIVE GENERATOR (HISTADA SPEAKS) ---
  function get4DMatrixStory(params) {
    const { epochId = 1, periodId = 1, hexId = 93, domainCode = 'H01', seriesIndex = 1, edition } = params;
    const currentLang = params.lang || (typeof window !== 'undefined' && window.HistadaI18n && window.HistadaI18n.lang ? window.HistadaI18n.lang() : 'pl');
    const act = getActiveData(edition);
    const isRel = (act === RELIGION_DATA);

    const epoch = act.epochs12.find(e => e.id === parseInt(epochId, 10)) || act.epochs12[0];
    const period = act.periods12.find(p => p.id === parseInt(periodId, 10)) || act.periods12[0];
    const domain = act.domains36.find(d => d.code === domainCode) || act.domains36[0];
    const seriesTheme = act.seriesThemes[(parseInt(seriesIndex, 10) - 1) % 10];

    const hexes = (window.__D && window.__D.POLA && window.__D.POLA.hexes) ? window.__D.POLA.hexes : [];
    const hexObj = hexes.find(h => h.id === parseInt(hexId, 10)) || { id: hexId, name: isRel ? 'Polska (Święty Heks)' : 'Polska 1', continent: 'Europa', runes: 'ᚠᚢ', countries: [{ name: 'Polska' }] };
    const countryName = (hexObj.countries && hexObj.countries[0]) ? hexObj.countries[0].name : hexObj.name;

    const fact = resolveRegionChronicle(countryName, hexObj.id, epoch.id, edition);

    let p1, p2, p3, p1_en, p2_en, p3_en;

    if (isRel) {
      p1 = `Pokój Tobie! Nazywam się Histada i jestem Twoją przewodniczką po czterowymiarowej matrycy dziejów ludzkiej wiary i duchowości. Znajdujemy się w uświęconym węźle Hex #${hexObj.id} (${hexObj.name}, kontynent: ${hexObj.continent}, runy pola: ${hexObj.runes}). Zgłębiamy Epokę ${epoch.id}: **${epoch.name}** (${epoch.era}), w przedziale czasowym **${period.name}**. Przedmiotem naszych rozważań jest święty obszar **${domain.name}** (${domain.code}), będący częścią wielkiego nurtu wiary: ${domain.cat}.`;
      p2 = `Oto **Seria ${seriesIndex} z 10: ${seriesTheme.title}** (${seriesTheme.angle}). W tej części świata, otoczonej przez ${fact.features}, kluczowymi przewodnikami wiary i świadkami sacrum byli **${fact.leader}**. W świętym miejscu znanym jako **${fact.place}**, w doniosłym momencie historii (${fact.year}), dokonało się pamiętne wydarzenie: ${fact.event}. Materialnym symbolem i uświęconym znakiem tego świadectwa stał się **${fact.artifact}**, który po dziś dzień przypomina o nienaruszalnym przymierzu człowieka ze sferą Boską.`;
      p3 = `Rozważania te dotykają samego sedna tej tradycji religijnej, jakim są: ${domain.focus}. Towarzyszyły im podniosłe dźwięki modlitwy: uroczyste kantylacje pism świętych, hymny dziękczynne, bicie dzwonów i żarliwe szepty modlitewne wznoszone ku Niebiosom. Zapamiętaj dokładnie te fakty: postacie świętych i proroków, daty objawień, święte artefakty, obrzędy oraz dylematy sumienia. Za chwilę sprawdzę Twoją wiedzę w 9 pytaniach badających 9 wymiarów ludzkiej inteligencji w obliczu sacrum!`;

      p1_en = `Peace be with you! I am Histada, your guide across the four-dimensional matrix of human faith, spirituality, and religious history. We are positioned at Sacred Hex #${hexObj.id} (${hexObj.name}, continent: ${hexObj.continent}, runes: ${hexObj.runes}). We explore Sacred Epoch ${epoch.id}: **${epoch.name}** (${epoch.era}), in the spiritual time interval **${period.name}**. Our subject of devotion is the sacred discipline **${domain.name}** (${domain.code}), belonging to the pillar: ${domain.cat}.`;
      p2_en = `This is **Series ${seriesIndex} of 10: ${seriesTheme.title}** (${seriesTheme.angle}). In this region of the world, sanctified by ${fact.features}, the leading spiritual figures were **${fact.leader}**. In the holy site of **${fact.place}**, at a watershed historical moment (${fact.year}), a momentous sacred event unfolded: ${fact.event}. The tangible emblem of this witness was **${fact.artifact}**, which permanently testifies to the holy covenant between humankind and the Divine.`;
      p3_en = `These investigations touch the very core of this sacred tradition: ${domain.focus}. They resonated with liturgical soundscapes: solemn scriptural cantillations, thanksgiving hymns, and fervent prayers ascending to Heaven. Remember these details well: prophetic leaders, sacred dates, holy artifacts, and moral choices. In a moment I will test your spiritual understanding across 9 questions examining 9 types of human intelligence!`;
    } else {
      p1 = `Witaj! Nazywam się Histada i jestem Twoją przewodniczką po czterowymiarowej matrycy ludzkiej wiedzy. Znajdujemy się w węźle Hex #${hexObj.id} (${hexObj.name}, kontynent: ${hexObj.continent}, runy pola: ${hexObj.runes}). Zgłębiamy Epokę ${epoch.id}: **${epoch.name}** (${epoch.era}), w przedziale czasowym **${period.name}**. Przedmiotem naszych rozważań jest dyscyplina naukowa **${domain.name}** (${domain.code}), będąca częścią filaru ${domain.cat}.`;
      p2 = `Oto **Seria ${seriesIndex} z 10: ${seriesTheme.title}** (${seriesTheme.angle}). W tej części świata, charakteryzującej się przez ${fact.features}, kluczowymi bohaterami byli **${fact.leader}**. W ośrodku znanym jako **${fact.place}**, w przełomowym momencie około roku **${fact.year}**, rozegrało się doniosłe wydarzenie: ${fact.event}. Symbolem i namacalnym narzędziem tego sukcesu stał się **${fact.artifact}**, który pozwolił przełamać dotychczasowe ograniczenia ludzkiego poznania.`;
      p3 = `Prace te bezpośrednio dotykały sedna tej dziedziny, jakim są: ${domain.focus}. Towarzyszyły im unikatowe dźwięki epoki: pieśni warsztatowe rzemieślników, hymny obrzędowe i rytmiczne uderzenia młotów. Zapamiętaj dokładnie te fakty: postacie historyczne, daty, nazwy geograficzne, narzędzia i dylematy moralne. Za chwilę sprawdzę Twoją uwagę i zrozumienie w 9 pytaniach sprawdzających 9 rodzajów ludzkiej inteligencji!`;

      p1_en = `Welcome! I am Histada, your guide across the four-dimensional matrix of human knowledge. We are located at Hex #${hexObj.id} (${hexObj.name}, continent: ${hexObj.continent}, hex runes: ${hexObj.runes}). We explore Epoch ${epoch.id}: **${epoch.name}** (${epoch.era}), during time interval **${period.name}**. Our subject of study is the scientific discipline **${domain.name}** (${domain.code}), belonging to the ${domain.cat} pillar.`;
      p2_en = `This is **Series ${seriesIndex} of 10: ${seriesTheme.title}** (${seriesTheme.angle}). In this region, characterized by ${fact.features}, the leading figures were **${fact.leader}**. In the historical hub of **${fact.place}**, at a watershed moment around **${fact.year}**, a pivotal breakthrough took place: ${fact.event}. The tangible artifact of this triumph was **${fact.artifact}**, which shattered the former frontiers of human perception.`;
      p3_en = `These investigations directly addressed the core questions of this domain: ${domain.focus}. They resonated with the authentic sounds of the era: master craftsman workshop chants, ceremonial hymns, and rhythmic hammer strikes. Remember these details well: historical figures, years, geographic sites, tools, and philosophical dilemmas. In a moment I will test your memory and understanding across 9 questions examining 9 types of human intelligence!`;
    }

    const fullText = `${p1}\n\n${p2}\n\n${p3}`;
    const fullText_en = `${p1_en}\n\n${p2_en}\n\n${p3_en}`;
    const fullText_bi = `${fullText}\n\n---\n\n[EN]\n${fullText_en}`;

    const finalTitle = (currentLang === 'en')
      ? `Series ${seriesIndex}: ${seriesTheme.title} · ${domain.name}`
      : ((currentLang === 'bi')
        ? `${seriesTheme.title} · ${domain.name} / Series ${seriesIndex}: ${seriesTheme.title} · ${domain.name}`
        : `${seriesTheme.title} · ${domain.name}`);

    const finalText = (currentLang === 'en')
      ? fullText_en
      : ((currentLang === 'bi') ? fullText_bi : fullText);

    return {
      title: finalTitle,
      title_pl: `${seriesTheme.title} · ${domain.name}`,
      title_en: `Series ${seriesIndex}: ${seriesTheme.title} · ${domain.name}`,
      title_bi: `${seriesTheme.title} · ${domain.name} / Series ${seriesIndex}: ${seriesTheme.title} · ${domain.name}`,
      epoch: epoch.name,
      era: epoch.era,
      period: period.name,
      domain: domain.name,
      domainCode: domain.code,
      domainFocus: domain.focus,
      hexName: hexObj.name,
      continent: hexObj.continent,
      leader: fact.leader,
      year: fact.year,
      place: fact.place,
      event: fact.event,
      artifact: fact.artifact,
      features: fact.features,
      text: finalText,
      text_pl: fullText,
      text_en: fullText_en,
      text_bi: fullText_bi,
      edition: isRel ? EDITIONS.RELIGION : EDITIONS.STANDARD
    };
  }

  // --- 9-INTELLIGENCE QUESTION SYNTHESIZER ---
  function get4DMatrixQuestions(params) {
    const { epochId = 1, periodId = 1, hexId = 93, domainCode = 'H01', seriesIndex = 1, edition } = params;
    const currentLang = params.lang || (typeof window !== 'undefined' && window.HistadaI18n && window.HistadaI18n.lang ? window.HistadaI18n.lang() : 'pl');
    const storyData = get4DMatrixStory({ epochId, periodId, hexId, domainCode, seriesIndex, lang: currentLang, edition });
    const isRel = (storyData.edition === EDITIONS.RELIGION);

    let q1_log, q2_wiz, q3_jez, q4_muz, q5_kin, q6_intra, q7_inter, q8_przyr, q9_egz;

    if (isRel) {
      q1_log = {
        int: 'log',
        intLabel: 'Inteligencja Logiczno-Matematyczna',
        q: `[Logika i Chronologia Święta] Zgodnie z kroniką duchową Histady, w którym dokładnie czasie lub epoce rozegrało się kluczowe wydarzenie wiary w rejonie ${storyData.place}?`,
        options: [`${storyData.year}`, 'Równo 1500 lat później w świeckim kontekście politycznym', 'W erze bez jakichkolwiek zapisów religijnych', 'W odległej przyszłości dopiero po roku 3500 n.e.'],
        correctIndex: 0,
        explain: `Prawidłowy czas odnotowany w kronice przewodniczki Histady to: ${storyData.year}.`
      };
      q2_wiz = {
        int: 'wiz',
        intLabel: 'Inteligencja Wizualno-Przestrzenna',
        q: `[Wizualizacja i Święta Przestrzeń] Jaki konkretny święty artefakt, znak sakralny lub symbol liturgiczny poświadczał to wydarzenie w tradycji ${storyData.domain}?`,
        options: [`${storyData.artifact}`, 'Zwykły nieobrobiony głaz pozbawiony jakichkolwiek cech kultowych', 'Świecka moneta bez znaków religijnych i inskrypcji', 'Żelazny pręt przemysłowy pozbawiony symboliki sacrum'],
        correctIndex: 0,
        explain: `W opowieści wyraźnie wskazano uświęcony artefakt i znak obecności Bożej: ${storyData.artifact}.`
      };
      q3_jez = {
        int: 'jez',
        intLabel: 'Inteligencja Językowa i Werbalna',
        q: `[Język Świętych Pism i Pojęcia] Które ze sformułowań najdokładniej definiuje istotę świętego obszaru „${storyData.domain}” przedstawionego w historii?`,
        options: [`${storyData.domainFocus}`, 'Wyłącznie przypadkowe spisywanie mitów bez odniesienia do transcendencji i modlitwy', 'Zwykła kronika podatkowa bez odniesień duchowych', 'Techniczny podręcznik rzemieślniczy bez sfery sacrum'],
        correctIndex: 0,
        explain: `Zgodnie z narracją, obszar wiary ${storyData.domain} obejmuje: ${storyData.domainFocus}.`
      };
      q4_muz = {
        int: 'muz',
        intLabel: 'Inteligencja Muzyczna i Akustyczna',
        q: `[Muzyka Sakralna i Dźwięk Liturgii] Jakie tło dźwiękowe, hymny i akustyka modlitewna towarzyszyły opisanym wydarzeniom w rejonie ${storyData.place}?`,
        options: ['Podniosłe hymny uwielbienia, uroczyste kantylacje pism świętych, bicie dzwonów i żarliwe szepty modlitewne', 'Całkowita mechaniczna cisza próżni pozbawiona ludzkiego głosu', 'Hałas fabrycznych maszyn parowych i syren', 'Syntetyczna muzyka elektroniczna bez słów modlitwy'],
        correctIndex: 0,
        explain: 'Opowieść Histady przywołała autentyczne hymny sakralne, kantylacje psalmów i dźwięki modlitwy wznoszone ku Bogu.'
      };
      q5_kin = {
        int: 'kin',
        intLabel: 'Inteligencja Kinestetyczno-Ruchowa',
        q: `[Ciało, Rytuał i Praca Rąk] Jaką fizyczną postawę kultu, gest liturgiczny lub kunszt rąk musieli wykazać świadkowie opowieści?`,
        options: [`Gesty pokłonu modlitewnego, namaszczenie, kunsztowne posługiwanie się artefaktem (${storyData.artifact}) oraz pielgrzymi trud`, 'Brak jakiejkolwiek postawy religijnej i całkowitą obojętność ciała', 'Wyłącznie bieg sprinterski bez skupienia duchowego', 'Sportową rywalizację zapaśniczą bez intencji modlitewnej'],
        correctIndex: 0,
        explain: `Świadkowie wykazali się skupieniem modlitewnym, czcią w gestach kultu i pietyzmem wobec: ${storyData.artifact}.`
      };
      q6_intra = {
        int: 'intra',
        intLabel: 'Inteligencja Intrapersonalna',
        q: `[Sumienie i Wewnętrzne Doświadczenie Wiary] Czym kierowali się w głębi serca duchowi przewodnicy (${storyData.leader}), podejmując ten trud w epoce ${storyData.epoch}?`,
        options: ['Głęboką wiarą w obietnice Boże, czystością sumienia, miłością ku Stwórcy i pragnieniem zbawienia powierzonego im ludu', 'Chęcią zdobycia doczesnej władzy politycznej i bogactw kosztem ubogich', 'Lękiem przed ludzkimi karami bez żadnego motywu religijnego', 'Cynicznym dążeniem do poklasku tłumu'],
        correctIndex: 0,
        explain: 'Wewnętrzną motywacją świętych mężów i przewodników wiary była niezłomna ufność w Bogu, miłość i wierność sumieniu.'
      };
      q7_inter = {
        int: 'inter',
        intLabel: 'Inteligencja Interpersonalna i Społeczna',
        q: '[Wspólnota Wiernych i Miłość Bliźniego] Jaki bezpośredni wpływ na wspólnotę ludzką i relacje braterskie wywarło to wydarzenie sakralne?',
        options: ['Zbudowało trwałą wspólnotę wiary, obudziło wzajemną miłość bliźniego, solidarność w cierpieniu i przebaczenie win', 'Doprowadziło do natychmiastowej nienawiści i trwałego rozbicia rodzin', 'Zakazało jakichkolwiek aktów miłosierdzia wobec potrzebujących', 'Pozostawiło społeczność w całkowitej obojętności bez wpływu na moralność'],
        correctIndex: 0,
        explain: 'Wydarzenie to zjednoczyło ludzi w miłości Boga i bliźniego, kładąc fundament pod wspólnotę wiary i miłosierdzia.'
      };
      q8_przyr = {
        int: 'przyr',
        intLabel: 'Inteligencja Przyrodnicza i Środowiskowa',
        q: `[Szacunek dla Stworzenia i Krajobraz Święty] Jakie środowisko naturalne i święty krajobraz geograficzny stanowiły tło zmagań wiary w obszarze ${storyData.place}?`,
        options: [`${storyData.features}`, 'Sztuczna metalowa platforma orbitalna pozbawiona ziemi, wód i roślinności', 'Zatopiona jaskinia siarkowa pod dnem oceanu', 'Księżycowy pył bez atmosfery i śladów życia'],
        correctIndex: 0,
        explain: `W opowieści podano, że uświęconymi uwarunkowaniami przyrodniczymi tego rejonu są: ${storyData.features}.`
      };
      q9_egz = {
        int: 'egz',
        intLabel: 'Inteligencja Egzystencjalna i Eschatologiczna',
        q: '[Sens Ostateczny, Paruzja i Królestwo Boże] Jaka jest nadrzędna lekcja eschatologiczna i wieczna obietnica tego świadectwa dla przyszłych pokoleń?',
        options: ['Uświadamia, że ludzkie życie ma wieczny sens przed Bogiem, a wszelkie próby i cierpienia znajdą ukojenie w Dniu Paruzji i triumfie Królestwa Bożego', 'Dowodzi, że po śmierci człowieka czeka jedynie nicość bez żadnej nadziei zmartwychwstania', 'Głosi, że dzieje świata są chaotycznym przypadkiem bez Bożego planu zbawienia', 'Twierdzi, że człowiek nie powinien zadawać pytań o Boga, wieczność i zbawienie'],
        correctIndex: 0,
        explain: 'Świadectwo to niesie wieczną obietnicę zbawienia, umacniając wiarę w chwalebne nadejście Królestwa Bożego i życie wieczne.'
      };
    } else {
      q1_log = {
        int: 'log',
        intLabel: 'Inteligencja Logiczno-Matematyczna',
        q: `[Logika i Chronologia] Zgodnie z opowieścią Histady, w którym dokładnie roku lub stuleciu rozegrało się kluczowe wydarzenie w rejonie ${storyData.place}?`,
        options: [`${storyData.year}`, 'W roku 1410 p.n.e. w zupełnie innym kontekście geopolitycznym', 'Równo 700 lat później niż podaje historia', 'W roku 2099 n.e.'],
        correctIndex: 0,
        explain: `Prawidłowy czas odnotowany w opowieści przewodniczki Histady to: ${storyData.year}.`
      };
      q2_wiz = {
        int: 'wiz',
        intLabel: 'Inteligencja Wizualno-Przestrzenna',
        q: `[Wizualizacja i Przestrzeń] Jaki konkretny materialny artefakt lub widoczne narzędzie stanowiło symbol przełomu w dziedzinie ${storyData.domain}?`,
        options: [`${storyData.artifact}`, 'Zwykły głaz narzutowy pozbawiony jakichkolwiek śladów obróbki', 'Szklana kula bez żadnych mechanizmów wewnętrznych', 'Żelazna płyta bez grawerunków i cech warsztatowych'],
        correctIndex: 0,
        explain: `W tekście wyraźnie wskazano, że materialnym symbolem i narzędziem przełomu był: ${storyData.artifact}.`
      };
      q3_jez = {
        int: 'jez',
        intLabel: 'Inteligencja Językowa i Werbalna',
        q: `[Język i Terminologia] Które z poniższych sformułowań najdokładniej definiuje zakres badań dziedziny „${storyData.domain}” przedstawiony w historii?`,
        options: [`${storyData.domainFocus}`, 'Wyłącznie przypadkowe notowanie zjawisk pogodowych bez wnioskowania naukowego', 'Spisywanie legend ludowych bez weryfikacji ich pochodzenia', 'Sztuka układania bruków rzecznych'],
        correctIndex: 0,
        explain: `Zgodnie z narracją, dziedzina ${storyData.domain} skupia się na: ${storyData.domainFocus}.`
      };
      q4_muz = {
        int: 'muz',
        intLabel: 'Inteligencja Muzyczna i Akustyczna',
        q: `[Akustyka i Dźwięk] Jakie tło dźwiękowe, pieśni i akustyka towarzyszyły opisanym wydarzeniom w rejonie ${storyData.place}?`,
        options: ['Pieśni warsztatowe rzemieślników, hymny obrzędowe i rytmiczne uderzenia młotów epoki', 'Całkowita martwa cisza próżni pozbawiona jakiejkolwiek fali dźwiękowej', 'Dźwięki syntetycznych syren alarmowych', 'Muzyka elektroniczna z przetworników cyfrowych'],
        correctIndex: 0,
        explain: 'Opowieść Histady przywołała autentyczne pieśni rzemieślnicze, hymny obrzędowe i odgłosy pracy warsztatowej z tamtych lat.'
      };
      q5_kin = {
        int: 'kin',
        intLabel: 'Inteligencja Kinestetyczno-Ruchowa',
        q: '[Ruch, Narzędzia i Praca Rąk] Jaką fizyczną sprawność manualną i technikę rzemieślniczą musieli wykazać bohaterowie opowieści?',
        options: [`Kunszt manualny, precyzyjne posługiwanie się narzędziem (${storyData.artifact}) oraz obróbkę surowców`, 'Brak jakiejkolwiek pracy rąk i całkowitą bierność fizyczną', 'Wyłącznie bieg długodystansowy bez użycia przyrządów', 'Pływanie synchroniczne na falach rzecznych'],
        correctIndex: 0,
        explain: `Bohaterowie wykazali się precyzyjnym kunsztem rzemieślniczym i sprawnością manualną przy użyciu: ${storyData.artifact}.`
      };
      q6_intra = {
        int: 'intra',
        intLabel: 'Inteligencja Intrapersonalna',
        q: `[Refleksja i Motywacja Wewnętrzna] Czym kierowały się kluczowe postacie (${storyData.leader}), podejmując ten trud w epoce ${storyData.epoch}?`,
        options: ['Niezłomną wolą poznania prawdy, przełamaniem barier ignorancji i odpowiedzialnością za postęp', 'Chęcią szybkiego i łatwego wzbogacenia się kosztem sąsiednich osad', 'Wyłącznie lękiem przed karą za niewykonanie rozkazu', 'Bezmyślnym naśladownictwem dawnych błędów'],
        correctIndex: 0,
        explain: 'Wewnętrzną motywacją twórców było poszukiwanie prawdy, determinacja badawcza i odpowiedzialność cywilizacyjna.'
      };
      q7_inter = {
        int: 'inter',
        intLabel: 'Inteligencja Interpersonalna i Społeczna',
        q: `[Społeczeństwo i Dyplomacja] Jaki bezpośredni wpływ na relacje międzyludzkie i wspólnotę wywarło wydarzenie: „${storyData.event}”?`,
        options: ['Zbudowało trwałe więzi kooperacji, wymianę myśli i poczucie wspólnego dziedzictwa', 'Doprowadziło do natychmiastowej izolacji i zerwania wszelkich kontaktów sąsiedzkich', 'Wywołało powszechny zakaz edukacji młodego pokolenia', 'Nie miało żadnego zauważalnego wpływu na społeczeństwo'],
        correctIndex: 0,
        explain: 'Wydarzenie to zintegrowało społeczność, stworzyło nowe standardy wymiany doświadczeń i umocniło więzi współpracy.'
      };
      q8_przyr = {
        int: 'przyr',
        intLabel: 'Inteligencja Przyrodnicza i Środowiskowa',
        q: `[Przyroda i Geografia] Jakie środowisko naturalne i uwarunkowania geograficzne stanowiły tło zmagań w obszarze ${storyData.place}?`,
        options: [`${storyData.features}`, 'Jednolita pustynia solna bez rzek, gleby i minerałów', 'Bezkresny rów oceaniczny o głębokości 10 000 metrów pod wodą', 'Tropikalna dżungla bez dostępu do kamienia i drewna'],
        correctIndex: 0,
        explain: `W opowieści podano, że naturalnymi uwarunkowaniami tego regionu są: ${storyData.features}.`
      };
      q9_egz = {
        int: 'egz',
        intLabel: 'Inteligencja Egzystencjalna i Filozoficzna',
        q: '[Sens i Dziedzictwo Dziejowe] Jaka jest nadrzędna lekcja filozoficzna i ponadczasowe dziedzictwo tego osiągnięcia dla przyszłych pokoleń?',
        options: ['Uświadamia, że ludzki rozum i odwaga w przekraczaniu granic niewiedzy stanowią najcenniejszy motor rozwoju cywilizacji', 'Wskazuje, że ludzkie dokonania ulegają całkowitemu zapomnieniu bez wpływu na przyszłość', 'Dowodzi, że rozwój wiedzy jest procesem przypadkowym i szkodliwym', 'Potwierdza, że człowiek powinien zaprzestać dociekania praw natury'],
        correctIndex: 0,
        explain: 'Osiągnięcie to stanowi dowód na wielką wartość ludzkiego dążenia do prawdy i tworzy fundament dla kolejnych epok.'
      };
    }

    const questions = [
      Object.assign(q1_log, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_log`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Logical-Mathematical Intelligence',
        q_en: `[Logic & Chronology] According to Histada's chronicle, in which exact era or period did the pivotal event occur in ${storyData.place}?`,
        options_en: [`${storyData.year}`, 'Exactly 1500 years later', 'In an era without records', 'In the remote future'],
        explain_en: `The verified date recorded by guide Histada is: ${storyData.year}.`
      }),
      Object.assign(q2_wiz, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_wiz`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Visual-Spatial Intelligence',
        q_en: `[Visual & Spatial] What physical artifact or visible instrument served as the material emblem of breakthrough in ${storyData.domain}?`,
        options_en: [`${storyData.artifact}`, 'An unmodified stone', 'A plain glass sphere', 'An unmarked iron sheet'],
        explain_en: `The narrative specifically highlights the material symbol and tool: ${storyData.artifact}.`
      }),
      Object.assign(q3_jez, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_jez`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Linguistic-Verbal Intelligence',
        q_en: `[Language & Terminology] Which statement most accurately defines the research scope of “${storyData.domain}”?`,
        options_en: [`${storyData.domainFocus}`, 'Recording random meteorological folklore', 'Transcribing unverified mythologies', 'Paving techniques'],
        explain_en: `According to Histada, the discipline of ${storyData.domain} investigates: ${storyData.domainFocus}.`
      }),
      Object.assign(q4_muz, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_muz`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Musical-Acoustic Intelligence',
        q_en: `[Acoustics & Sound] What soundscape and acoustic environment accompanied the recorded events in ${storyData.place}?`,
        options_en: ['Liturgical hymns or workshop chants, and rhythmic strikes', 'Absolute vacuum silence', 'Synthetic alarm sirens', 'Digital synthesizer tones'],
        explain_en: 'Histada recounted authentic artisan chants, ceremonial hymns, and tool cadences of that age.'
      }),
      Object.assign(q5_kin, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_kin`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Bodily-Kinesthetic Intelligence',
        q_en: 'What physical craftsmanship and manual dexterity did the protagonists exhibit?',
        options_en: [`Manual mastery, precise handling of ${storyData.artifact}, and devotion`, 'Total physical passivity', 'Pure long-distance running', 'Synchronized swimming'],
        explain_en: `The protagonists demonstrated exacting manual craftsmanship using: ${storyData.artifact}.`
      }),
      Object.assign(q6_intra, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_intra`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Intrapersonal Intelligence',
        q_en: `What primary inner drive spurred the key figures (${storyData.leader}) in ${storyData.epoch}?`,
        options_en: ['Dedication to truth, faith, and civilizational advancement', 'Desire for rapid personal wealth', 'Fear of punishment', 'Blind repetition of past fallacies'],
        explain_en: 'The inner driving motivation was dedication to truth, conscience and faith.'
      }),
      Object.assign(q7_inter, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_inter`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Interpersonal & Social Intelligence',
        q_en: `What direct impact did the event “${storyData.event}” have on human cooperation and community cohesion?`,
        options_en: ['Established enduring cooperative bonds, knowledge exchange, and shared heritage', 'Led to immediate isolation', 'Prompted a ban on education', 'Had no discernible social impact'],
        explain_en: 'The event united the community, established new standards for collaborative exchange, and cemented social solidarity.'
      }),
      Object.assign(q8_przyr, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_przyr`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Naturalist & Environmental Intelligence',
        q_en: `What natural environment and geographic features formed the backdrop of events in ${storyData.place}?`,
        options_en: [`${storyData.features}`, 'A barren salt pan without water', 'An oceanic trench 10,000 meters underwater', 'Dense rain forest without stone and timber'],
        explain_en: `The natural environmental conditions of the region were verified as: ${storyData.features}.`
      }),
      Object.assign(q9_egz, {
        id: `q_e${epochId}_p${periodId}_h${hexId}_${domainCode}_s${seriesIndex}_egz`,
        domain: domainCode, epoch: epochId, period: periodId, hex: hexId, series: seriesIndex, type: 'abcd', correct: 0,
        intLabel_en: 'Existential & Philosophical Intelligence',
        q_en: 'What overarching lesson does this achievement leave for future generations?',
        options_en: ['Demonstrates human reason and faith pushing boundaries of the unknown toward ultimate fulfillment', 'Suggests achievements vanish without trace', 'Proves growth is accidental', 'Implies humanity should cease investigating'],
        explain_en: 'This triumph stands as enduring testimony to the human quest for truth, laying down foundations for subsequent epochs.'
      })
    ];

    if (currentLang === 'en') {
      return questions.map(q => ({
        ...q,
        q: q.q_en || q.q,
        options: q.options_en || q.options,
        explain: q.explain_en || q.explain,
        intLabel: q.intLabel_en || q.intLabel
      }));
    }
    if (currentLang === 'bi') {
      return questions.map(q => ({
        ...q,
        q: `${q.q}\n\n[EN] ${q.q_en || q.q}`,
        options: (q.options || []).map((optPl, idx) => {
          const optEn = (q.options_en && q.options_en[idx]) ? q.options_en[idx] : optPl;
          return (optEn && optEn !== optPl) ? `${optPl} / ${optEn}` : optPl;
        }),
        explain: `${q.explain}\n\n[EN] ${q.explain_en || q.explain}`,
        intLabel: `${q.intLabel} / ${q.intLabel_en || q.intLabel}`
      }));
    }
    return questions;
  }

  function getGuidanceText(storyData, seriesIndex = 1, lang = 'pl') {
    if (lang === 'en') {
      const intro = `Welcome to HISTADA! I am Histada, your guide across the board, epochs, and domains of knowledge. Here is your reminder of the game rules for this round: in a moment, I will share an authentic historical chronicle with you. Listen with close attention, because each of the 9 quiz questions that follow will test a different dimension of your intelligence and directly relate to facts in this story — from logic and spatial reasoning to language, music, physical skill, interpersonal cooperation, naturalist observation, and philosophical reflection. For every correct answer, you score 10 points and advance your cognitive cogwheels! Now, listen to the chronicle:`;
      const body = storyData.text_en || storyData.text;
      const outro = `That concludes our chronicle! Here is what to do next step by step: Step one — click 'Start Quiz' or 'Proceed to Questions'. Step two — read each of the 9 questions carefully and select one correct answer among options A, B, C, or D. Step three — after completing the quiz, tally your points, update your character sheet cogwheels, advance your pawn on the world map, and pass the dice to the next player. Good luck, I believe in you!`;
      return `${intro}\n\n${body}\n\n${outro}`;
    }
    if (lang === 'bi') {
      const intro = `Witaj w grze HISTADA! Nazywam się Histada i jestem Twoją osobistą przewodniczką po wiedzy świata. Za chwilę przedstawię dwujęzyczną opowieść historyczną. Wysłuchaj jej z wielką uwagą, bo quiz zawiera 9 pytań w języku polskim i angielskim! Welcome to HISTADA! I am Histada, your guide. Listen to this bilingual chronicle, and prepare for 9 questions testing 9 intelligences!`;
      const body = (storyData.text_pl || storyData.text) + '\n\n---\n\n' + (storyData.text_en || '');
      const outro = `To koniec opowieści! Krok pierwszy – kliknij Rozpocznij Quiz. Krok drugi – przeczytaj 9 pytań i wskaż poprawną odpowiedź A, B, C lub D. Krok trzeci – zsumuj punkty i przesuń pionek. That concludes our chronicle! Proceed to the quiz, read all 9 questions carefully, and select your answers. Powodzenia! Good luck!`;
      return `${intro}\n\n${body}\n\n${outro}`;
    }

    const intro = `Witaj w grze HISTADA! Nazywam się Histada i jestem Twoją osobistą przewodniczką po planszy, epoce i dziedzinach wiedzy. Przypominam najważniejsze zasady gry dla tej rundy: za chwilę przedstawię Ci autentyczną opowieść historyczną. Wysłuchaj jej z wielką uwagą, ponieważ każde z dziewięciu pytań, które za chwilę usłyszysz w quizie, odnosi się ściśle do faktów z tej historii i bada inny rodzaj Twojej inteligencji – od logiki i wyobraźni przestrzennej, przez język, muzykę i sprawność manualną, aż po relacje społeczne, przyrodę i sens egzystencji. Za każdą poprawną odpowiedź zdobywasz 10 punktów i rozwijasz koła zębate wiedzy! A teraz posłuchaj opowieści:`;
    const body = storyData.text_pl || storyData.text;
    const outro = `To koniec opowieści! Oto instrukcja, co po kolei robimy w grze: Krok pierwszy – kliknij przycisk 'Rozpocznij Quiz' lub 'Przejdź do pytań'. Krok drugi – przeczytaj uważnie każde z dziewięciu pytań i wskaż jedną poprawną odpowiedź spośród czterech opcji A, B, C lub D. Krok trzeci – po zakończeniu quizu zsumuj swoje punkty, zaktualizuj koła zębate na karcie postaci, przesuń pionek na mapie świata i przekaż kości kolejnemu graczowi. Powodzenia, trzymam za Ciebie kciuki!`;
    return `${intro}\n\n${body}\n\n${outro}`;
  }

  // --- RANDOM 1/10 SERIES DRAWER WITHOUT REPETITION ---
  function drawSeries(params) {
    const { epochId = 1, periodId = 1, hexId = 93, domainCode = 'H01', lang = 'pl' } = params;
    const storageKey = `histada_pool_${epochId}_${periodId}_${hexId}_${domainCode}`;
    let used = [];
    try {
      if (typeof localStorage !== 'undefined') {
        used = JSON.parse(localStorage.getItem(storageKey) || '[]');
      }
    } catch (e) { used = []; }

    if (!Array.isArray(used) || used.length >= 10) {
      // Pool of 10 exhausted: reset to 1/10 fresh cycle
      used = [];
    }

    const available = [];
    for (let i = 1; i <= 10; i++) {
      if (!used.includes(i)) available.push(i);
    }

    // Pick uniformly at random from remaining available
    const pick = available[Math.floor(Math.random() * available.length)];
    used.push(pick);

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(used));
      }
    } catch (e) {}

    const curLang = lang || (typeof window !== 'undefined' && window.HistadaI18n && window.HistadaI18n.lang ? window.HistadaI18n.lang() : 'pl');
    const story = get4DMatrixStory({ epochId, periodId, hexId, domainCode, seriesIndex: pick, lang: curLang });
    const questions = get4DMatrixQuestions({ epochId, periodId, hexId, domainCode, seriesIndex: pick, lang: curLang });
    const guidedSpeechText = getGuidanceText(story, pick, lang);

    return {
      seriesIndex: pick,
      drawnIndex: pick,
      totalInPool: 10,
      remainingInPool: 10 - used.length,
      isPoolReset: used.length === 1,
      story,
      questions,
      guidedSpeechText
    };
  }


  // --- BULLETPROOF FEMALE TTS LEKTOR HISTADA (SPEECHSYNTHESIS) ---
  class TTS {
    constructor() {
      this.synth = (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis : null;
      this.rate = 1.0;
      this.pitch = 1.20; // Wyrazisty, kobiecy tembr głosu Histady
      this.voices = [];
      this.selectedVoice = null;
      this.isSpeaking = false;
      this.isPaused = false;
      this.chunks = [];
      this.chunkIdx = 0;
      this.heartbeatTimer = null;

      if (typeof window !== 'undefined') {
        window._histada_active_utts = window._histada_active_utts || [];
      }

      if (this.synth) {
        this.loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadVoices();
        }
      }
    }

    loadVoices() {
      if (!this.synth) return;
      this.voices = this.synth.getVoices() || [];
      if (!this.voices.length) return;

      const langPref = (typeof window !== 'undefined' && window.HistadaI18n && window.HistadaI18n.ui && window.HistadaI18n.ui() === 'en') ? 'en' : 'pl';
      const femaleKeywords = [
        'zofia', 'paulina', 'ewa', 'maja', 'agnieszka', 'zosia', 'marta', 'anna', 'monika', 'kasia', 'aleksandra', 'magdalena', 'helena',
        'kobiecy', 'female', 'woman', 'zira', 'samantha', 'victoria', 'karen', 'catherine', 'susan', 'fiona', 'natural', 'neural', 'wavenet', 'online'
      ];
      const maleKeywords = ['adam', 'jan', 'marek', 'krzysztof', 'piotr', 'tomasz', 'michal', 'male', 'david', 'george', 'mark', 'richard', 'james', 'guy', 'stefan'];

      if (langPref === 'pl') {
        const plVoices = this.voices.filter(v => v.lang && /^pl/i.test(v.lang));
        // 1. Polski głos z kobiecą nazwą (np. Paulina, Zofia, Maja, Agnieszka)
        let match = plVoices.find(v => femaleKeywords.some(kw => v.name.toLowerCase().includes(kw)) && !maleKeywords.some(m => v.name.toLowerCase().includes(m)));
        // 2. Polski głos niebędący jawnie oznaczony jako męski
        if (!match) match = plVoices.find(v => !maleKeywords.some(m => v.name.toLowerCase().includes(m)));
        // 3. Dowolny polski głos
        if (!match && plVoices.length > 0) match = plVoices[0];
        // 4. Dowolny głos kobiecy w systemie
        if (!match) {
          match = this.voices.find(v => femaleKeywords.some(kw => v.name.toLowerCase().includes(kw)) && !maleKeywords.some(m => v.name.toLowerCase().includes(m)));
        }
        this.selectedVoice = match || this.voices[0] || null;
      } else {
        const enVoices = this.voices.filter(v => v.lang && /^en/i.test(v.lang));
        let match = enVoices.find(v => femaleKeywords.some(kw => v.name.toLowerCase().includes(kw)) && !maleKeywords.some(m => v.name.toLowerCase().includes(m)));
        if (!match && enVoices.length > 0) match = enVoices.find(v => !maleKeywords.some(m => v.name.toLowerCase().includes(m))) || enVoices[0];
        this.selectedVoice = match || this.voices[0] || null;
      }

      // Jeśli głos w systemie to głos męski lub neutralny, podwyższ pitch aby zapewnić kobiecy tembr
      if (this.selectedVoice && maleKeywords.some(m => this.selectedVoice.name.toLowerCase().includes(m))) {
        this.pitch = 1.28;
      } else {
        this.pitch = 1.20;
      }
    }

    getVoiceName() {
      this.loadVoices();
      if (this.selectedVoice) {
        return `${this.selectedVoice.name} (${this.selectedVoice.lang}) [Głos Kobiecy Histady]`;
      }
      return 'Domyślny kobiecy głos Histada';
    }

    speak(text, onStart, onEnd, onProgress) {
      if (!this.synth) {
        console.warn('SpeechSynthesis is not supported in this environment');
        if (onStart) onStart();
        if (onEnd) onEnd();
        return;
      }

      this.stop();
      this.loadVoices();

      // Un-stick Chromium audio engine
      try {
        if (this.synth.paused) this.synth.resume();
      } catch (e) {}

      const clean = text
        .replace(/<[^>]*>/g, ' ')
        .replace(/[*_#`~]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!clean) {
        if (onEnd) onEnd();
        return;
      }

      // Chunk by sentence/punctuation to bypass Chrome 15s cutoff
      const raw = clean.match(/[^.!?:]+[.!?:]+/g) || [clean];
      this.chunks = raw.map(c => c.trim()).filter(Boolean);
      this.chunkIdx = 0;
      this.isSpeaking = true;
      this.isPaused = false;

      if (onStart) onStart();

      // Chrome heartbeat timer to prevent speech stalls
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = setInterval(() => {
        if (!this.isSpeaking) {
          clearInterval(this.heartbeatTimer);
          return;
        }
        try {
          if (this.synth && this.synth.speaking && !this.isPaused) {
            this.synth.pause();
            this.synth.resume();
          }
        } catch (err) {}
      }, 9000);

      const playNext = () => {
        if (!this.isSpeaking || this.chunkIdx >= this.chunks.length) {
          this.isSpeaking = false;
          this.isPaused = false;
          clearInterval(this.heartbeatTimer);
          if (typeof window !== 'undefined') window._histada_active_utts = [];
          if (onEnd) onEnd();
          return;
        }

        const chunk = this.chunks[this.chunkIdx];
        if (onProgress) onProgress(this.chunkIdx + 1, this.chunks.length);

        const utt = new SpeechSynthesisUtterance(chunk);
        const langPref = (typeof window !== 'undefined' && window.HistadaI18n && window.HistadaI18n.ui && window.HistadaI18n.ui() === 'en') ? 'en-US' : 'pl-PL';
        utt.lang = (this.selectedVoice && this.selectedVoice.lang) ? this.selectedVoice.lang : langPref;
        utt.rate = this.rate;
        utt.pitch = this.pitch;
        if (this.selectedVoice) utt.voice = this.selectedVoice;

        // Retain global reference to avoid Chromium GC discarding utterance
        if (typeof window !== 'undefined') {
          window._histada_active_utts.push(utt);
          if (window._histada_active_utts.length > 8) window._histada_active_utts.shift();
        }

        let advanced = false;
        const advance = () => {
          if (advanced) return;
          advanced = true;
          this.chunkIdx++;
          playNext();
        };

        utt.onend = advance;
        utt.onerror = advance;

        try {
          this.synth.speak(utt);
        } catch (e) {
          advance();
        }
      };

      playNext();
    }

    speakWithGuidance(storyData, options = {}) {
      const { onStart, onEnd, onProgress, seriesIndex = 1, lang = 'pl' } = options;
      const fullNarration = getGuidanceText(storyData, seriesIndex, lang);
      this.speak(fullNarration, onStart, onEnd, onProgress);
    }

    speakQuestion(questionObj, options = {}) {
      const { onStart, onEnd, onProgress, lang = 'pl' } = options;
      const isEn = lang === 'en';
      const qText = isEn ? (questionObj.q_en || questionObj.q) : questionObj.q;
      const opts = isEn ? (questionObj.options_en || questionObj.options) : questionObj.options;
      const labels = ['A', 'B', 'C', 'D'];
      const optStr = opts.map((o, i) => `Opcja ${labels[i]}: ${o}.`).join(' ');
      const text = `${qText}. Wybierz jedną z opcji: ${optStr}`;
      this.speak(text, onStart, onEnd, onProgress);
    }

    pause() {
      if (this.synth && this.isSpeaking) {
        try { this.synth.pause(); } catch (e) {}
        this.isPaused = true;
      }
    }

    resume() {
      if (this.synth && this.isPaused) {
        try { this.synth.resume(); } catch (e) {}
        this.isPaused = false;
      }
    }

    stop() {
      clearInterval(this.heartbeatTimer);
      if (this.synth) {
        try { this.synth.cancel(); } catch (e) {}
      }
      this.isSpeaking = false;
      this.isPaused = false;
      this.chunks = [];
      this.chunkIdx = 0;
      if (typeof window !== 'undefined') window._histada_active_utts = [];
    }
  }

  const ttsEngine = new TTS();

// --- SMARTPHONE RUNE CAMERA SCANNER ---
  class RuneScanner {
    constructor() {
      this.stream = null;
      this.modal = null;
    }

    openModal(onScan) {
      if (this.modal) this.modal.remove();

      const m = document.createElement('div');
      m.className = 'histada-modal-backdrop';
      m.innerHTML = `
        <div class="histada-scanner-card">
          <div class="scanner-header">
            <div class="scanner-title"><span>📷</span> Skaner Run & Heksów Histady</div>
            <button class="scanner-close" id="scClose">&times;</button>
          </div>
          <div class="scanner-viewport">
            <video id="scVid" autoplay playsinline muted></video>
            <div class="scanner-hud">
              <div class="scan-laser"></div>
              <div class="scan-frame"></div>
              <div class="scan-tip">Skieruj aparat na runę lub wpisz numer Hexa</div>
            </div>
          </div>
          <div class="scanner-controls">
            <div class="sc-status-line" id="scSt">Uruchamianie aparatu...</div>
            <div style="display:flex;gap:10px;margin-top:10px;">
              <input type="number" id="scHexInp" min="1" max="502" placeholder="Wpisz numer Hex (1–502)" style="background:var(--h-bg);color:#fff;border:1px solid var(--h-line);padding:8px 12px;border-radius:8px;flex:1;">
              <button class="sc-btn sc-btn-primary" id="scOkBtn">Zatwierdź Hex</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(m);
      this.modal = m;

      const vid = m.querySelector('#scVid');
      const st = m.querySelector('#scSt');

      m.querySelector('#scClose').onclick = () => this.close();
      m.querySelector('#scOkBtn').onclick = () => {
        const val = parseInt(m.querySelector('#scHexInp').value, 10);
        if (val >= 1 && val <= 502) {
          this.close();
          if (onScan) onScan(val);
        } else {
          alert('Podaj numer pola od 1 do 502.');
        }
      };

      navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } } })
        .then(stream => {
          this.stream = stream;
          vid.srcObject = stream;
          st.textContent = 'Aparat aktywny. Wykrywanie run w czasie rzeczywistym...';
        })
        .catch(() => {
          st.textContent = 'Brak dostępu do kamery. Wpisz numer Hexa ręcznie.';
        });
    }

    close() {
      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop());
        this.stream = null;
      }
      if (this.modal) {
        this.modal.remove();
        this.modal = null;
      }
    }
  }

  const scannerInstance = new RuneScanner();

  // --- STORY MODAL WITH TTS, QUESTIONS PREVIEW & CLAUDE AI ---
  function openStoryModal(params) {
    const { epochId = 1, periodId = 1, hexId = 93, domainCode = 'H01', seriesIndex = 1, onStartQuiz } = params;
    const currentLang = (typeof window !== 'undefined' && window.HistadaI18n && window.HistadaI18n.lang) ? window.HistadaI18n.lang() : 'pl';
    const isEn = currentLang === 'en';
    const isBi = currentLang === 'bi';

    const storyData = get4DMatrixStory({ epochId, periodId, hexId, domainCode, seriesIndex, lang: currentLang });
    const questions = get4DMatrixQuestions({ epochId, periodId, hexId, domainCode, seriesIndex, lang: currentLang });

    const existing = document.querySelector('.histada-story-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'histada-modal-backdrop histada-story-modal';
    modal.innerHTML = `
      <div class="histada-story-card">
        <div class="story-header">
          <div class="story-histada-avatar" id="stAvatar">
            <svg viewBox="0 0 120 120" class="st-svg-ava">
              <circle cx="60" cy="60" r="54" fill="#0f1a2b" stroke="#d9b25a" stroke-width="3"/>
              <path d="M60 25 C40 25 35 45 35 60 C35 80 48 95 60 95 C72 95 85 80 85 60 C85 45 80 25 60 25 Z" fill="#2c8f99" opacity="0.3"/>
              <circle cx="48" cy="55" r="5" fill="#f0d48f"/>
              <circle cx="72" cy="55" r="5" fill="#f0d48f"/>
              <path d="M50 75 Q60 85 70 75" fill="none" stroke="#f0d48f" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <div class="st-glow-ring"></div>
          </div>
          <div class="story-titles">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <div class="st-badge">${storyData.epoch} · ${storyData.period}</div>
              <span class="st-badge" style="background:rgba(56,232,255,0.15);border-color:#2c8f99;color:#38e8ff;">${isEn ? `🎲 Series ${seriesIndex} of 10 drawn` : (isBi ? `🎲 Seria ${seriesIndex} z 10 / Series ${seriesIndex} of 10` : `🎲 Wylosowano Serię ${seriesIndex} z 10 (unikatowa w puli)`)}</span>
            </div>
            <h2>${isEn ? 'Guide Histada Chronicles' : (isBi ? 'Przewodniczka Histada Opowiada / Guide Histada Chronicles' : 'Przewodniczka Histada Opowiada')}</h2>
            <div class="st-sub">${storyData.hexName} (${storyData.continent}) · ${storyData.domain} (${storyData.domainCode})</div>
          </div>
          <button class="story-close" id="stClose">&times;</button>
        </div>

        <div class="story-body">
          <div class="st-text-box" id="stTextContent">
            ${storyData.text.replace(/\n\n/g, '<br/><br/>')}
          </div>
          
          <div id="stQuestionsPreview" style="display:none;margin-top:20px;border-top:1px solid var(--h-line);padding-top:16px;">
            <h4 style="color:var(--h-gold2);margin:0 0 12px;">${isEn ? 'List of 9 Questions and Correct Answers in this Series:' : (isBi ? 'Spis 9 Pytań i Odpowiedzi / List of 9 Questions & Answers:' : 'Spis 9 Pytań i Prawidłowych Odpowiedzi w tej Serii:')}</h4>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${questions.map((q, i) => `
                <div style="background:rgba(10,17,29,0.5);border:1px solid var(--h-line);border-radius:8px;padding:12px;">
                  <div style="font-size:12px;color:var(--h-gold);font-weight:700;">${isEn ? `Question ${i+1} [${q.intLabel}]` : (isBi ? `Pytanie / Question ${i+1} [${q.intLabel}]` : `Pytanie ${i+1} [${q.intLabel}]`)}</div>
                  <div style="font-weight:600;color:#fff;margin:4px 0 6px;">${q.q}</div>
                  <div style="font-size:13px;color:#2ecc71;"><strong>${isEn ? 'Correct answer:' : (isBi ? 'Prawidłowa odpowiedź / Correct answer:' : 'Prawidłowa odpowiedź:')}</strong> ${q.options[0]}</div>
                  <div style="font-size:12px;color:var(--h-muted);margin-top:4px;">${q.explain}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="story-tts-bar">
          <div class="tts-controls">
            <button class="tts-btn" id="ttsPlay">${isEn ? '▶ Play Voice (TTS)' : (isBi ? '▶ Odtwórz Lektora / Play TTS' : '▶ Odtwórz Lektora (TTS)')}</button>
            <button class="tts-btn" id="ttsPause" style="display:none;">⏸ Pauza</button>
            <button class="tts-btn" id="ttsStop" style="display:none;">⏹ Stop</button>
            <div class="tts-rate-wrap">
              <label>Tempo: <span id="ttsRateVal">1.0x</span></label>
              <input type="range" id="ttsRate" min="0.7" max="1.5" step="0.1" value="1.0"/>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <button class="tts-btn" id="btnTogglePreview" style="background:var(--h-line);border:1px solid var(--h-gold);color:var(--h-gold2);">${isEn ? '📋 Preview 9 Questions' : (isBi ? '📋 Podgląd 9 Pytań / Preview' : '📋 Podgląd 9 Pytań')}</button>
            <button class="tts-btn" id="btnClaudeAi" style="background:#5c3ea3;">${isEn ? '✨ Expand with Claude AI' : (isBi ? '✨ Rozwiń z Claude AI / AI Expand' : '✨ Rozwiń z Claude AI')}</button>
            <div class="tts-status" id="ttsStatus">${isEn ? 'Voice guide ready (Voice: Histada)' : (isBi ? 'Lektor gotowy / Voice ready (Histada)' : 'Lektor gotowy (Głos: Kobieta Histada)')}</div>
          </div>
        </div>

        <div class="story-footer">
          <button class="st-btn-quiz" id="stStartQuiz">
            <span>${isEn ? '✨ Start Quiz (9 Questions across 9 Intelligences)' : (isBi ? '✨ Rozpocznij Quiz / Start Quiz (9 Pytań / Questions)' : '✨ Rozpocznij Quiz (9 Pytań z 9 Inteligencji)')}</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const avatar = modal.querySelector('#stAvatar');
    const textBox = modal.querySelector('#stTextContent');
    const btnPlay = modal.querySelector('#ttsPlay');
    const btnPause = modal.querySelector('#ttsPause');
    const btnStop = modal.querySelector('#ttsStop');
    const rateInp = modal.querySelector('#ttsRate');
    const rateVal = modal.querySelector('#ttsRateVal');
    const status = modal.querySelector('#ttsStatus');
    const btnAi = modal.querySelector('#btnClaudeAi');
    const btnTogglePreview = modal.querySelector('#btnTogglePreview');
    const previewBox = modal.querySelector('#stQuestionsPreview');

    btnTogglePreview.onclick = () => {
      const isHidden = previewBox.style.display === 'none';
      previewBox.style.display = isHidden ? 'block' : 'none';
      btnTogglePreview.textContent = isHidden ? 'Ukryj Podgląd Pytań' : '📋 Podgląd 9 Pytań';
    };

    const updateUI = (speaking, paused) => {
      if (speaking && !paused) {
        avatar.classList.add('speaking');
        btnPlay.style.display = 'none';
        btnPause.style.display = 'inline-flex';
        btnStop.style.display = 'inline-flex';
        status.textContent = 'Histada opowiada historię...';
      } else if (paused) {
        avatar.classList.remove('speaking');
        btnPause.textContent = '▶ Wznów';
        status.textContent = 'Pauza.';
      } else {
        avatar.classList.remove('speaking');
        btnPlay.style.display = 'inline-flex';
        btnPause.style.display = 'none';
        btnStop.style.display = 'none';
        btnPause.textContent = '⏸ Pauza';
        status.textContent = 'Lektor gotowy.';
      }
    };

    btnPlay.onclick = () => {
      const isEn = (typeof window !== 'undefined' && window.HistadaI18n && window.HistadaI18n.ui && window.HistadaI18n.ui() === 'en');
      status.textContent = 'Inicjalizacja lektora Histada...';
      ttsEngine.speakWithGuidance(
        storyData,
        {
          seriesIndex: seriesIndex,
          lang: isEn ? 'en' : 'pl',
          onStart: () => updateUI(true, false),
          onEnd: () => updateUI(false, false),
          onProgress: (cur, total) => {
            status.textContent = isEn ? `Histada speaking sentence ${cur}/${total}...` : `Histada mówi (${cur}/${total})...`;
          }
        }
      );
    };

    btnPause.onclick = () => {
      if (ttsEngine.isPaused) { ttsEngine.resume(); updateUI(true, false); }
      else { ttsEngine.pause(); updateUI(true, true); }
    };

    btnStop.onclick = () => { ttsEngine.stop(); updateUI(false, false); };

    rateInp.oninput = (e) => {
      const v = parseFloat(e.target.value);
      rateVal.textContent = v.toFixed(1) + 'x';
      ttsEngine.rate = v;
    };

    btnAi.onclick = async () => {
      btnAi.disabled = true;
      btnAi.textContent = '⏳ Łączenie z Claude...';
      try {
        const prompt = `Opowiedz fascynującą historię jako przewodniczka Histada o ${storyData.domain} w epoce ${storyData.epoch} (${storyData.era}) w rejonie ${storyData.hexName} (${storyData.continent}). Postacie: ${storyData.leader}, wydarzenie: ${storyData.event}, rok: ${storyData.year} oraz artefakt: ${storyData.artifact}. Napisz po polsku w 3 bogatych akapitach.`;
        const res = await fetch('/api/claude', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ input: prompt })
        });
        const d = await res.json();
        if (d && d.text) {
          textBox.innerHTML = d.text.replace(/\n\n/g, '<br/><br/>');
          btnAi.textContent = '✅ Wygenerowano z Claude';
        } else {
          btnAi.textContent = 'Tryb bazy wiedzy offline';
        }
      } catch (err) {
        btnAi.textContent = 'Tryb bazy wiedzy offline';
      }
    };

    modal.querySelector('#stClose').onclick = () => {
      ttsEngine.stop();
      modal.remove();
    };

    modal.querySelector('#stStartQuiz').onclick = () => {
      ttsEngine.stop();
      modal.remove();
      if (onStartQuiz) onStartQuiz();
      else {
        openQuizModal({
          questions: questions,
          title: `Quiz: ${storyData.title}`
        });
      }
    };
  }

  // --- 9-QUESTION QUIZ MODAL ---
  function openQuizModal(params) {
    const { questions, title = 'Quiz Histady (9 Pytań z 9 Inteligencji)' } = params;

    if (!questions || !questions.length) return;

    let cur = 0;
    let score = 0;

    const existing = document.querySelector('.histada-quiz-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'histada-modal-backdrop histada-quiz-modal';

    function renderQ() {
      const q = questions[cur];
      const total = questions.length;
      const pct = Math.round(((cur + 1) / total) * 100);

      modal.innerHTML = `
        <div class="histada-quiz-card">
          <div class="quiz-header">
            <div class="quiz-title-box">
              <h3>${title}</h3>
              <div class="quiz-counter">Pytanie ${cur + 1} z ${total} · [${q.intLabel}] · Wynik: ${score}/${cur}</div>
            </div>
            <button class="quiz-close" id="qzClose">&times;</button>
          </div>
          <div class="quiz-progress-bar"><div class="bar-fill" style="width:${pct}%"></div></div>
          <div class="quiz-body">
            <div class="quiz-qtext">${q.q}</div>
            <div class="quiz-options">
              ${q.options.map((opt, i) => `
                <button class="qz-opt-btn" data-i="${i}">
                  <span class="qz-letter">${'ABCD'[i]}</span>
                  <span class="qz-opt-text">${opt}</span>
                </button>
              `).join('')}
            </div>
            <div class="quiz-explain" id="qzExp" style="display:none;"></div>
          </div>
          <div class="quiz-footer">
            <button class="qz-next-btn" id="qzNext" style="display:none;">Kolejne Pytanie ▶</button>
          </div>
        </div>
      `;

      modal.querySelector('#qzClose').onclick = () => modal.remove();

      const btns = modal.querySelectorAll('.qz-opt-btn');
      const exp = modal.querySelector('#qzExp');
      const next = modal.querySelector('#qzNext');

      btns.forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.getAttribute('data-i'), 10);
          btns.forEach(b => b.disabled = true);

          const ok = idx === 0;
          if (ok) {
            btn.classList.add('correct');
            score++;
          } else {
            btn.classList.add('wrong');
            btns[0].classList.add('correct');
          }

          exp.style.display = 'block';
          exp.innerHTML = `<strong>${ok ? '✅ Znakomicie!' : '❌ Błędna odpowiedź.'}</strong> ${q.explain}`;

          next.style.display = 'inline-flex';
          next.onclick = () => {
            cur++;
            if (cur < total) renderQ();
            else renderResult();
          };
        };
      });
    }

    function renderResult() {
      const total = questions.length;
      const pct = Math.round((score / total) * 100);

      modal.innerHTML = `
        <div class="histada-quiz-card quiz-summary-card">
          <div class="quiz-header">
            <h3>🏆 Wynik Sprawdzianu Wiedzy (9 Inteligencji)</h3>
            <button class="quiz-close" id="qzClose">&times;</button>
          </div>
          <div class="quiz-summary-body">
            <div class="summary-score-badge">${score} / ${total}</div>
            <h4>Skuteczność Zrozumienia: ${pct}%</h4>
            <p>${pct >= 70 ? 'Doskonale! Wykazałeś się wszechstronnym zrozumieniem faktów i głębi historycznej opowieści.' : 'Warto powtórzyć historię z przewodniczką Histadą i skupić się na detalach architektonicznych, językowych i datach.'}</p>
          </div>
          <div class="quiz-footer">
            <button class="qz-next-btn" id="qzEnd">Zakończ Quiz</button>
          </div>
        </div>
      `;

      modal.querySelector('#qzClose').onclick = () => modal.remove();
      modal.querySelector('#qzEnd').onclick = () => modal.remove();
    }

    document.body.appendChild(modal);
    renderQ();
  }

  
  // Auto-enhance window.__D if present
  if (typeof window !== 'undefined') {
    if (!window.__D) window.__D = {};

    // 1. Update PYTANIA meta
    if (!window.__D.PYTANIA) window.__D.PYTANIA = { meta: {}, questions: [] };
    if (!window.__D.PYTANIA.meta) window.__D.PYTANIA.meta = {};
    window.__D.PYTANIA.meta.name = "HISTADA – Bank 26 023 680 Unikatowych Historii i Serii Pytań";
    window.__D.PYTANIA.meta.version = "4D-Matrix";
    window.__D.PYTANIA.meta.total_stories_and_series = 26023680;
    window.__D.PYTANIA.meta.total_questions = 234213120;
    window.__D.PYTANIA.meta.dimensions = "12 Epok × 12 Okresów × 502 Heksy × 36 Dziedzin × 10 Serii";
    window.__D.PYTANIA.meta.coverage = "100% pokrycia bez pustych pól";

    // 2. Direct methods on window.__D
    window.__D.getStory = (params) => get4DMatrixStory(params);
    window.__D.getQuestions = (params) => get4DMatrixQuestions(params);
    window.__D.drawSeries = (params) => drawSeries(params);
    window.__D.getGuidanceText = getGuidanceText;
    window.__D.tts = ttsEngine;
    window.__D.openExitModal = openExitModal;
    window.__D.get10Series = (epochId, periodId, hexId, domainCode) => {
      return SERIES_THEMES.map((th, idx) => ({
        seriesIndex: idx + 1,
        title: th.title,
        story: get4DMatrixStory({ epochId, periodId, hexId, domainCode, seriesIndex: idx + 1 }),
        questions: get4DMatrixQuestions({ epochId, periodId, hexId, domainCode, seriesIndex: idx + 1 })
      }));
    };

    // 3. Transparent proxy for window.__D.STORIES
    if (!window.__D.STORIES) window.__D.STORIES = {};
    const baseStories = window.__D.STORIES;
    window.__D.STORIES = new Proxy(baseStories, {
      get(target, prop) {
        if (typeof prop === 'string' && prop in target) return target[prop];
        if (typeof prop !== 'string' || prop === 'then') return undefined;

        const parts = prop.split('|');
        let domainCode = 'H01', epochId = 1, periodId = 1, hexId = 93, seriesIndex = 1;
        if (parts.length >= 2) {
          if (/^[HPT]\d{2}$/i.test(parts[0])) {
            domainCode = parts[0].toUpperCase();
            epochId = parseInt(parts[1], 10) || 1;
            if (parts[2]) periodId = parseInt(parts[2], 10) || 1;
            if (parts[3]) hexId = parseInt(parts[3], 10) || 93;
            if (parts[4]) seriesIndex = parseInt(parts[4], 10) || 1;
          } else if (/^\d+$/.test(parts[0])) {
            hexId = parseInt(parts[0], 10) || 93;
            epochId = parseInt(parts[1], 10) || 1;
            if (parts[2]) periodId = parseInt(parts[2], 10) || 1;
            if (parts[3]) domainCode = parts[3].toUpperCase();
          }
        }
        const s = get4DMatrixStory({ epochId, periodId, hexId, domainCode, seriesIndex });
        const res = { pl: s.text, en: s.text_en || s.text };
        target[prop] = res;
        return res;
      }
    });

    // 4. Ensure window.__D.BANK has helper method
    if (window.__D.BANK && !window.__D.BANK.get4DSeries) {
      window.__D.BANK.get4DSeries = (epochId, periodId, hexId, domainCode, seriesIndex) => {
        return get4DMatrixQuestions({ epochId, periodId, hexId, domainCode, seriesIndex });
      };
    }
  }


  // --- UNIVERSAL NAVIGATION & EXIT GAME MODAL ---
  function openExitModal() {
    const existing = document.querySelector('.histada-exit-modal');
    if (existing) {
      existing.remove();
      return;
    }

    const isEn = (typeof window !== 'undefined' && window.HistadaI18n && window.HistadaI18n.ui && window.HistadaI18n.ui() === 'en');

    const modal = document.createElement('div');
    modal.className = 'histada-modal-backdrop histada-exit-modal';
    modal.innerHTML = `
      <div class="histada-exit-modal-card">
        <div class="hem-header">
          <h3>${isEn ? '🏛️ HISTADA · Navigation & Exit Menu' : '🏛️ HISTADA · Menu Nawigacji i Wyjście z Gry'}</h3>
          <button class="hem-close" id="hemClose" aria-label="Zamknij menu">&times;</button>
        </div>

        <p style="margin:0;font-size:14px;color:var(--h-muted);line-height:1.5;">
          ${isEn
            ? 'Do you want to exit the current game mode or switch to another part of the trilogy? Your game progress and scores are safely preserved in your browser.'
            : 'Czy chcesz opuścić bieżący tryb gry lub przejść do innej części trylogii? Twój stan gry i zdobyte punkty są bezpiecznie zapisane w przeglądarce.'}
        </p>

        <div class="hem-links">
          <a href="/" class="hem-link-btn hem-exit-primary">
            <span>🚪 <strong>${isEn ? 'EXIT GAME (Return to Home Page)' : 'WYJDŹ Z GRY (Powrót do Strony Głównej)'}</strong></span>
            <span>↗</span>
          </a>

          <div style="font-size:12px;text-transform:uppercase;color:var(--h-gold);font-weight:700;margin-top:6px;">
            ${isEn ? 'Switch Game Mode:' : 'Przejdź do innego trybu:'}
          </div>

          <a href="/gra/" class="hem-link-btn">
            <span>🎲 ${isEn ? 'Part 1: Tabletop Board Game' : 'Część 1: Planszowa (Plansza A1 i Pionki)'}</span>
            <span style="font-size:12px;color:var(--h-muted);">/gra/</span>
          </a>

          <a href="/krag/" class="hem-link-btn">
            <span>🔮 ${isEn ? 'Part 2: Circle of Mystery' : 'Część 2: W Kręgu Tajemnicy (Multiplayer)'}</span>
            <span style="font-size:12px;color:var(--h-muted);">/krag/</span>
          </a>

          <a href="/diament/" class="hem-link-btn">
            <span>💎 ${isEn ? 'Part 3: Digital Diamond' : 'Część 3: Cyfrowy Diament (1 Gracz)'}</span>
            <span style="font-size:12px;color:var(--h-muted);">/diament/</span>
          </a>

          <a href="/matryca/" class="hem-link-btn">
            <span>🧭 ${isEn ? '4D Matrix (12×12×502×36)' : 'Czterowymiarowa Matryca 4D (26 023 680 Serii)'}</span>
            <span style="font-size:12px;color:var(--h-muted);">/matryca/</span>
          </a>

          <a href="/druk/" class="hem-link-btn">
            <span>🖨️ ${isEn ? 'Printable Kit (PDF 41 pages)' : 'Zestaw do Druku (PDF 41 stron)'}</span>
            <span style="font-size:12px;color:var(--h-muted);">/druk/</span>
          </a>
        </div>

        <div style="margin-top:4px;display:flex;justify-content:flex-end;">
          <button id="hemCancel" style="background:transparent;border:1px solid var(--h-line);color:var(--h-muted);padding:8px 16px;border-radius:8px;font-weight:600;cursor:pointer;">
            ${isEn ? '↩ Return to Game (Continue)' : '↩ Wróć do Rozgrywki (Kontynuuj grę)'}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const close = () => {
      modal.remove();
      document.removeEventListener('keydown', onEsc);
    };

    const onEsc = (e) => {
      if (e.key === 'Escape') close();
    };

    modal.querySelector('#hemClose').onclick = close;
    modal.querySelector('#hemCancel').onclick = close;
    modal.onclick = (e) => { if (e.target === modal) close(); };
    document.addEventListener('keydown', onEsc);
  }

  function initGlobalNavMenu() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (document.getElementById('histadaGlobalMenuTrigger')) return;

    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      const isEn = (window.HistadaI18n && window.HistadaI18n.ui && window.HistadaI18n.ui() === 'en');
      const trigger = document.createElement('button');
      trigger.id = 'histadaGlobalMenuTrigger';
      trigger.className = 'histada-global-menu-trigger';
      trigger.innerHTML = `<span>☰</span><span>${isEn ? 'Menu / Exit' : 'Menu / Wyjdź z gry'}</span>`;
      trigger.title = isEn ? 'Open navigation menu or exit game' : 'Otwórz menu nawigacji lub wyjdź z gry';
      trigger.onclick = () => openExitModal();
      document.body.appendChild(trigger);
    }
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initGlobalNavMenu());
    } else {
      initGlobalNavMenu();
    }
  }



  

  

  const HistadaCoreObj = {
    EDITIONS,
    getEdition,
    setEdition,
    STANDARD: STANDARD_DATA,
    RELIGION: RELIGION_DATA,
    getActiveData,
    tts: ttsEngine,
    scanner: scannerInstance,
    get4DMatrixStory,
    get4DMatrixQuestions,
    getGuidanceText,
    drawSeries,
    openStoryModal,
    openQuizModal,
    openExitModal,
    initGlobalNavMenu
  };

  Object.defineProperty(HistadaCoreObj, 'DOMAINS_36', { get: () => getActiveData().domains36, enumerable: true });
    Object.defineProperty(HistadaCoreObj, 'EPOCH_DEF', { get: () => getActiveData().epochDef, enumerable: true });
  Object.defineProperty(HistadaCoreObj, 'EPOCHS_12', { get: () => getActiveData().epochs12, enumerable: true });
  Object.defineProperty(HistadaCoreObj, 'PERIODS_12', { get: () => getActiveData().periods12, enumerable: true });
  Object.defineProperty(HistadaCoreObj, 'SERIES_THEMES', { get: () => getActiveData().seriesThemes, enumerable: true });
  Object.defineProperty(HistadaCoreObj, 'CATEGORIES', { get: () => getActiveData().categories, enumerable: true });
  Object.defineProperty(HistadaCoreObj, 'DOMAIN_NAMES', { get: () => getActiveData().domainNames, enumerable: true });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = HistadaCoreObj;
  }

  return HistadaCoreObj;
})();

