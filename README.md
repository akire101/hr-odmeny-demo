# HR Odmeny – interaktívne demo

Pracovný priestor pre HR a vedúcich, ktorý sprevádza mesačné odmeny od zadania podkladov cez schválenie až po dva samostatné výstupy: **HUMAN a externisti**.

**[Otvoriť testovací dashboard](https://akire101.github.io/hr-odmeny-demo/)** · [Zdrojový kód](work/hr-dashboard-navrh.html)

Demo obsahuje fiktívnu spoločnosť s **350 zamestnancami, 24 externistami a 24 menšími tímami do 20 členov**. Môžete ho skúšať bez registrácie. Každý návštevník má vlastné údaje vo svojom prehliadači.

**Aktualizované 27. 10. 2026.** Finálna revízia lokálnej aj online aplikácie prešla na aplikačnej verzii [`f94370c`](https://github.com/akire101/hr-odmeny-demo/commit/f94370c). Overené boli roly, nová organizačná mapa, ručné zadávanie, schválenia aj oba skutočne stiahnuté exporty.

Následná oprava odstraňuje vedúceho zo zoznamu jeho vlastných podriadených. V ručnom podklade môže vidieť vlastný riadok iba na čítanie; vlastnú odmenu nemôže zadať ani zmeniť importom. Zadáva ju jeho nadriadený. Oprava zachováva existujúce sumy a exportné riadky aj pri načítaní uloženého dema.

Schvaľovanie zobrazuje všetkých príjemcov bez rozbaľovania. Vedúci podkladu je oddelený od svojich podriadených; jeho priamy nadriadený mu môže priamo pri schvaľovaní zadať samostatnú odmenu, ktorá pokračuje na vyššie schválenie.

## Prečo dáva systém zmysel

- **Vždy je jasný ďalší krok.** Panel „Čo ďalej“, upozornenia a mená schvaľovateľov ukazujú, čo chýba a kto má konať.
- **Prioritizované úlohy podľa roly.** „Čo ďalej“ ukazuje aktuálne povinnosti a zvýrazňuje najvyššiu prioritu. Po ich dokončení jasne oznámi, že ďalšia akcia nie je potrebná; sledovanie priebehu zostáva doplnkové. Podrobné súčty a vlastné návrhy sa zobrazia po rozbalení.
- **HR má prehľad o celom mesiaci.** Vidí chýbajúce podklady, priebeh schvaľovania, organizačné väzby aj pripravenosť výstupov na jednom mieste.
- **Vedúci pracuje so svojou štruktúrou.** Prezentované pohľady obmedzujú sumy a grafy na jeho rozsah; podradené vetvy možno zahrnúť voľbou.
- **Menej ručného dohľadávania.** Kto neodovzdal, komu treba pripomenúť podklady a kde odmena čaká, je priamo viditeľné.
- **Rozhodnutia majú stopu.** História zachováva zmeny, vrátenia, schválenia aj zrušené návrhy. Zrušená odmena nevstupuje do súčtov ani exportov.

## Čo si môžete vyskúšať

### Zadávanie a spracovanie odmien

- Ručné zadanie viacerým pracovníkom aj samostatná odmena priamemu podriadenému na všetkých vedúcich úrovniach; zadávať môže aj HR.
- Vedúci otvorí rovno kompaktný zoznam svojich priamych podriadených a vyplní iba odmeňovaných. Prázdne riadky sa neposielajú; HR má vyhľadávanie a výber z celej firmy.
- Odôvodnenie alebo výber kritérií: štyri nezávislé checkboxy **KPI, PROJEKT, Extra, [parameter4]**, ktoré možno kombinovať. Štvrtý názov je pracovný; kritériá samy nevypočítavajú sumu odmeny.
- Kompaktné tímové aj samostatné zadávanie: na počítači je pracovník, suma, dôvod a výber parametrov v jednom riadku. Vyhľadávanie v tímovom podklade pomáha nájsť konkrétneho človeka.
- Nahratie podkladov vedúcim alebo HR v zastúpení, vzorové CSV a kontroly údajov vrátane duplicít či neplatných súm.
- HR koordinuje zber, vyžiada chýbajúce podklady a vykoná svoje schválenia. Vyplnenie za vedúceho je voliteľné zastupovanie; dokončené ručné aj nahraté podklady HR odošle rovno nadriadenému zastúpeného vedúceho, bez opätovného odosielania týmto vedúcim.
- Viacstupňové schválenie: tím → oddelenie → úsek → región → divízia → generálny riaditeľ → HR; konkrétna trasa závisí od autora a hierarchie.
- Stručné schvaľovacie karty ukazujú žiadateľa, príjemcov, sumy a dôvody. Schváliť alebo vrátiť možno priamo; história a ďalší príjemcovia sú dostupní po rozkliknutí. Vrátenie vyžaduje dôvod.
- Vrátenie na opravu, zrušenie vlastného čakajúceho návrhu a výnimočné zastúpenie HR s povinným dôvodom.
- V mimoriadnom potvrdení môže HR rozbaliť príjemcov, sumy a dôvody a potvrdiť žiadosti jednotlivo alebo celý zostávajúci výber. Okno nahratia podkladov ponúka aj ručné vyplnenie pre zvoleného vedúceho.
- Uzavretie obdobia a stiahnutie dvoch CSV: HUMAN a externisti. Uzavretý mesiac je uzamknutý.

### Organizácia a prehľady

- Organizačná mapa s postupným otváraním podriadených, vyhľadávaním konkrétneho človeka, zvýraznením trasy, priblížením a celou obrazovkou.
- V rozšírenej mape sú zamestnanci zoskupení do ohraničených blokov pod svojím vedúcim, najviac v troch stĺpcoch. Každá osoba zostáva samostatne vyhľadateľná a klikateľná.
- Viditeľný návrat „O úroveň vyššie“ a klikateľná cesta k nadriadeným.
- Počty zamestnancov, externistov a tímov sa menia podľa práve otvorenej vetvy, vrátane prechodu k nadriadenému a pridania nového človeka.
- Nad otvoreným vedúcim je karta jeho nadriadeného, dostupná dvojklikom alebo klávesom Enter. Tlačidlo Zavrieť zostáva dostupné aj pri posúvaní dlhých formulárov.
- Úprava hierarchie HR: vytvorenie osoby či vetvy, doplnenie profilu a presúvanie kariet pomocou drag & drop vrátane poradia.
- Nová nezaradená karta sa okamžite zobrazí v paneli „Na zaradenie“. Možno ju presunúť myšou alebo zaradiť výberom cieľa; nezaradené osoby blokujú uzavretie mesiaca.
- Menšie tímy bez stránkovania, stavy odovzdania a čitateľné väzby na nadriadených.
- Stĺpcové, koláčové a trendové grafy s voľbou zahrnutia podradených štruktúr.
- Svetlá a tmavá téma vo farbách Slovanetu, pulzujúce upozornenia, prepnutie animácií a zobrazenie na mobile.
- Päť pripravených období august – december 2026: chýbajúce podklady, rozpracované schválenia, opravy aj ukončené spracovanie.

## Ktorý mesiac si vybrať

Stav je viditeľný priamo vo výbere mesiaca a aktualizuje sa podľa zmien. Východiskové prezentačné situácie sú:

| Obdobie | Východiskový stav | Čo vyskúšať |
|---|---|---|
| August 2026 | Uzavretý, iba na čítanie | Archív a zamknutie podkladov |
| September 2026 | Schválený, pripravený na výstupy | Uzavretie a stiahnutie oboch CSV |
| Október 2026 | Chýbajúce podklady, opravy a čakanie na každom schvaľovacom stupni | Roly, pripomienky, priebeh a rozhodnutia |
| November 2026 | Nový zber, vedúci ešte neodovzdali | Zadávanie a vyžiadanie podkladov |
| December 2026 | Dokončená, uzavretá obnoviteľná ukážka | Celý nový priechod po obnovení decembrového scenára |

## Rýchly postup pre samostatné testovanie

1. Otvorte dashboard a vľavo dole zvoľte rolu a konkrétneho vedúceho. Pozrite si panel **Čo ďalej**.
2. V októbri preskúmajte chýbajúce podklady, čakajúce schválenia, strom a grafy. Prepínajte roly a sledujte zmenu rozsahu.
3. Pre nový úplný priechod otvorte **Ukážka zadanie → výstupy** a zvoľte **Obnoviť iba túto ukážku**. Obnoví sa len december; ostatné tímy majú pripravené schválené podklady.
4. Zadajte tímový podklad ručne alebo nahrajte súbor. Aj okno **Nahrať za vedúceho** ponúka ručné vyplnenie. Ak podklady vyplní HR, po dokončení idú priamo na schválenie nadriadenému zastúpeného vedúceho.
5. Ako vedúci otvorte **Zadať odmenu priamym podriadeným**. Rovno vidíte povolených ľudí; vyplňte iba odmeňovaných a ostatné riadky nechajte prázdne. Skúste kombináciu KPI + Extra. Omylom vytvorený čakajúci návrh zrušte ako jeho autor v **Podrobnosti a moje návrhy**.
6. Podľa mena pri „Čaká“ prepnite na príslušného schvaľovateľa. Na karte žiadosti uvidíte žiadateľa, príjemcov, sumy a dôvody; použite **Schváliť** alebo **Vrátiť**. Vrátenie vyžaduje dôvod opravy.
7. Po dokončení schválení ako HR uzavrite mesiac a stiahnite **HUMAN aj externistov**. Zrušené návrhy sa nezapočítajú. Uzavretý mesiac zostane zamknutý.
8. Na nový pokus obnovte iba decembrovú ukážku. **Obnoviť prezentačné údaje** vráti všetkých päť období a odstráni vaše lokálne úpravy v tomto deme; ostatných testerov neovplyvní.

## Hranice dema

Ide o **funkčný prezentačný prototyp v prehliadači**, nie nasadený mzdový systém. Používajte iba fiktívne údaje; zdrojové kódy a ukážkové údaje sú verejné.

- Prepínače rolí simulujú používateľské pohľady. Nenahrádzajú prihlásenie ani serverové oprávnenia; návštevník si môže zvoliť aj HR.
- Prihlásenie Microsoft Entra ID/M365, spoločná databáza a súbežná práca viacerých používateľov nie sú pripojené.
- Pripomienky vrátane voľby SMS sú simulované. Skutočné e-maily ani SMS sa neposielajú.
- Zmeny sa ukladajú do localStorage daného prehliadača; ostatní testeri ich neuvidia. Vymazanie údajov prehliadača ich odstráni.
- Výstup HUMAN je ukážkový CSV podklad. Kompatibilitu s konkrétnym ostrým importom musí potvrdiť jeho správca.
- Pre produkciu treba doplniť overené prihlásenie, serverové kontroly rolí a schvaľovania, trvalý audit, spoločné úložisko a reálne integrácie.

## Lokálne spustenie

Stačí Python 3; aplikácia nepotrebuje .NET, npm ani inštaláciu balíkov. V priečinku repozitára spustite:

```sh
python -m http.server 5188
```

Otvorte http://localhost:5188/. Ak je port obsadený, zvoľte iný. Online verzia na GitHub Pages server na vašom počítači nepotrebuje.

## Overenie

Adresár `tests` obsahuje 13 samostatných sád kontrol bez externých balíkov. S Node.js ich možno spustiť z koreňa repozitára, napríklad:

```sh
node tests/dashboard-parameters-teams-withdraw.cjs
node tests/dashboard-all-level-awards.cjs
```

Finálna revízia z **27. 10. 2026** prešla lokálne aj na GitHub Pages:

- Všetkých **13 sád kontrol**, sedem rolí v oboch témach a obmedzenie cudzích súm v podriadených pohľadoch.
- **420 zo 420 kariet** v mape: 350 zamestnancov, 24 externistov a 46 organizačných kariet. Všetkých 374 ľudí je prítomných v 24 blokoch; vyhľadanie, trasa a otvorenie detailu fungujú.
- **90 zobrazení vedúcich** v oboch témach a správne počty vo všetkých **46 vetvách**. Overené aj pridanie človeka a natívny presun novej karty myšou.
- Všetkých päť období vo všetkých siedmich rolách, správna aktualizácia stavu po uzavretí a mobilné zobrazenie.
- Priame zadávanie bez výberového medzikroku, kombinácie parametrov, ignorovanie prázdnych riadkov, vrátenie s dôvodom, zrušenie návrhu a jednotlivé potvrdenia HR s auditnou stopou.
- **27 načítavaných súborov** lokálnej a online aplikácie má rovnaký obsah po zjednotení koncov riadkov; všetky boli dostupné cez HTTP 200.

V kontrolnom decembrovom priechode HR zadalo tímový podklad, vedúci navrhol platnú samostatnú odmenu 30 EUR a omylom zadaných 50 EUR zrušil. Po **12 kliknutiach na schválenie**, uzavretí a skutočnom stiahnutí oboch súborov nezávislá kontrola potvrdila:

| Kontrolný výstup | Jedinečné osoby | Suma v kontrolnom scenári |
|---|---:|---:|
| HUMAN | 350 | 118 840,50 EUR |
| Externisti | 24 | 10 200,00 EUR |

Lokálne a online exporty sa zhodovali **po všetkých riadkoch**, bez duplicitných osobných čísel. Platných 30 EUR sa zahrnulo, zrušených 50 EUR nie. Uzavretie zamklo úpravy a iné obdobie zostalo nezmenené. Uvedené sumy patria konkrétnemu kontrolnému scenáru; pri vlastnom zadávaní sa zmenia.

Ostatné tímy v decembrovej ukážke majú pripravené schválené podklady. Overenie preto neznamená nové ručné schválenie každej položky celej firmy. Testovalo sa v **Chromium/Playwright**; Safari a Firefox neboli overené. Tieto kontroly nepotvrdzujú bezpečnosť produkčného nasadenia ani kompatibilitu s ostrým importom HUMAN.

## Značka a obsah repozitára

Logo Slovanet a názov značky patria ich vlastníkovi; použitie v tomto prezentačnom návrhu neznamená oficiálne schválenie produktu. Zdroj loga je uvedený v [atribúcii](work/assets/README.md). Osoby a odmeny v deme sú fiktívne.

Repozitár obsahuje iba statické demo a jeho testy. Pôvodná serverová aplikácia, interné tabuľky, účty, zálohy a lokálne používateľské údaje sa sem nepublikujú.
