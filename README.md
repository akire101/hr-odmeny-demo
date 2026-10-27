# HR Odmeny – interaktívne demo

Pracovný priestor pre HR a vedúcich, ktorý sprevádza mesačné odmeny od zadania podkladov cez schválenie až po dva samostatné výstupy: **HUMAN a externisti**.

**[Otvoriť testovací dashboard](https://akire101.github.io/hr-odmeny-demo/)** · [Zdrojový kód](work/hr-dashboard-navrh.html)

Demo obsahuje fiktívnu spoločnosť s **350 zamestnancami, 24 externistami a 24 menšími tímami do 20 členov**. Môžete ho skúšať bez registrácie. Každý návštevník má vlastné údaje vo svojom prehliadači.

## Prečo dáva systém zmysel

- **Vždy je jasný ďalší krok.** Panel „Čo ďalej“, upozornenia a mená schvaľovateľov ukazujú, čo chýba a kto má konať.
- **Stručný úvod podľa roly.** Jeden hlavný krok, stručný stav a priamy vstup „Zadať odmenu“. Podrobné súčty a vlastné návrhy sa zobrazia až po rozbalení; organizačné a schvaľovacie prehľady zostávajú v samostatných častiach.
- **HR má prehľad o celom mesiaci.** Vidí chýbajúce podklady, priebeh schvaľovania, organizačné väzby aj pripravenosť výstupov na jednom mieste.
- **Vedúci pracuje so svojou štruktúrou.** Prezentované pohľady obmedzujú sumy a grafy na jeho rozsah; podradené vetvy možno zahrnúť voľbou.
- **Menej ručného dohľadávania.** Kto neodovzdal, komu treba pripomenúť podklady a kde odmena čaká, je priamo viditeľné.
- **Rozhodnutia majú stopu.** História zachováva zmeny, vrátenia, schválenia aj zrušené návrhy. Zrušená odmena nevstupuje do súčtov ani exportov.

## Čo si môžete vyskúšať

### Zadávanie a spracovanie odmien

- Ručné zadanie viacerým pracovníkom aj samostatná odmena priamemu podriadenému na všetkých vedúcich úrovniach; zadávať môže aj HR.
- Odôvodnenie alebo výber kritérií: štyri nezávislé checkboxy **[parameter 1], [parameter 2], [parameter 3], [parameter4]**, ktoré možno kombinovať. Názvy sú zatiaľ pracovné parametre, nie finálne pravidlá výpočtu.
- Nahratie podkladov vedúcim alebo HR v zastúpení, vzorové CSV a kontroly údajov vrátane duplicít či neplatných súm.
- Viacstupňové schválenie: tím → oddelenie → úsek → región → divízia → generálny riaditeľ → HR; konkrétna trasa závisí od autora a hierarchie.
- Vrátenie na opravu, zrušenie vlastného čakajúceho návrhu a výnimočné zastúpenie HR s povinným dôvodom.
- Uzavretie obdobia a stiahnutie dvoch CSV: HUMAN a externisti. Uzavretý mesiac je uzamknutý.

### Organizácia a prehľady

- Organizačná mapa s postupným otváraním podriadených, vyhľadávaním konkrétneho človeka, zvýraznením trasy, priblížením a celou obrazovkou.
- Úprava hierarchie HR: vytvorenie osoby či vetvy, doplnenie profilu a presúvanie kariet pomocou drag & drop vrátane poradia.
- Menšie tímy bez stránkovania, stavy odovzdania a čitateľné väzby na nadriadených.
- Stĺpcové, koláčové a trendové grafy s voľbou zahrnutia podradených štruktúr.
- Svetlá a tmavá téma vo farbách Slovanetu, pulzujúce upozornenia, prepnutie animácií a zobrazenie na mobile.
- Päť pripravených období august – december 2026: chýbajúce podklady, rozpracované schválenia, opravy aj ukončené spracovanie.

## Rýchly postup pre samostatné testovanie

1. Otvorte dashboard a vľavo dole zvoľte rolu a konkrétneho vedúceho. Pozrite si panel **Čo ďalej**.
2. V októbri preskúmajte chýbajúce podklady, čakajúce schválenia, strom a grafy. Prepínajte roly a sledujte zmenu rozsahu.
3. V časti **Ukážka zadanie → výstupy** použite decembrový scenár. Ostatné tímy majú pripravené údaje, aby ste mohli dokončiť celý proces bez zadávania celej firmy.
4. Zadajte ručne odmenu, vyberte viac parametrov a odošlite podklady. Pri položke „Čaká“ uvidíte meno ďalšieho schvaľovateľa; prepnite naň a pokračujte.
5. Skúste samostatnú odmenu priamemu podriadenému. Omylom vytvorený čakajúci návrh zrušte ako jeho autor a overte históriu.
6. Dokončite schválenia až po HR, uzavrite mesiac a stiahnite **oba výstupy**. Grafy a súčty zrušený návrh nezapočítajú.
7. Na nový pokus použite **Obnoviť prezentačné údaje**. Reset vymaže iba lokálne úpravy v tomto prehliadači.

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

Pred publikovaním bolo na pôvodnom deme overených 141 kontrolných scenárov, všetkých sedem rolí v oboch témach, menšie tímy, viac parametrov, zrušenie návrhu a priechod zadanie → schválenia → oba stiahnuté exporty. Decembrový priechod používa pripravené schválené podklady ostatných tímov. Tieto kontroly nepotvrdzujú bezpečnosť produkčného nasadenia.

## Značka a obsah repozitára

Logo Slovanet a názov značky patria ich vlastníkovi; použitie v tomto prezentačnom návrhu neznamená oficiálne schválenie produktu. Zdroj loga je uvedený v [atribúcii](work/assets/README.md). Osoby a odmeny v deme sú fiktívne.

Repozitár obsahuje iba statické demo a jeho testy. Pôvodná serverová aplikácia, interné tabuľky, účty, zálohy a lokálne používateľské údaje sa sem nepublikujú.
