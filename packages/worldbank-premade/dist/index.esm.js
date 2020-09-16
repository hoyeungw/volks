const IndicatorsCollection = {
  MajorEconomy: {
    'NY.GDP.MKTP.CD': 'GDP (current US$)',
    // ['Econ']
    'NY.GNS.ICTR.CD': 'Gross savings (current US$)',
    // ['Econ']
    'NV.AGR.TOTL.CD': 'Agriculture, forestry, and fishing, value added (current US$)',
    // ['AgriRural', 'Econ']
    'NV.IND.TOTL.CD': 'Industry (including construction), value added (current US$)',
    // ['Econ']
    'NE.EXP.GNFS.CD': 'Exports of goods and services (current US$)',
    // ['Econ', 'Trade']
    'NE.IMP.GNFS.CD': 'Imports of goods and services (current US$)',
    // ['Econ', 'Trade']
    'FI.RES.TOTL.CD': 'Total reserves (includes gold, current US$)' // ['Econ', 'Fin', 'Debt']

  },
  SocialDevelopment: {
    'SI.POV.GINI': 'Gini index (World Bank estimate)',
    // ['Poverty']
    'SE.XPD.TOTL.GD.ZS': 'Government expenditure on education, total (% of GDP)',
    // ['Edu']
    'SE.PRM.ENRR': 'School enrollment, primary (% gross)',
    // ['Edu']
    'SE.SEC.ENRR': 'School enrollment, secondary (% gross)',
    // ['Edu']
    'SE.TER.ENRR': 'School enrollment, tertiary (% gross)',
    // ['Edu']
    'SE.SEC.PROG.ZS': 'Progression to secondary school (%)',
    // ['Edu'],
    'SH.XPD.CHEX.GD.ZS': 'Current health expenditure (% of GDP)',
    // ['Health']
    'SH.XPD.TOTL.ZS': 'Health expenditure, total (% of GDP)',
    // ['Health']
    'SH.XPD.PRIV.ZS': 'Health expenditure, private (% of GDP)',
    // ['Health']
    'SH.XPD.PUBL.ZS': 'Health expenditure, public (% of GDP)',
    // ['Health']
    'SP.DYN.LE00.IN': 'Life expectancy at birth, total (years)',
    // ['Health']
    'SN.ITK.DPTH': 'Depth of hunger (kilocalories per person per day)',
    // ['Health']
    'SI.POV.NAHC': 'Poverty headcount ratio at national poverty lines (% of population)',
    // ['Poverty']
    '1.0.HCount.1.90usd': 'Poverty Headcount ($1.90 a day)' // ['Poverty']

  },
  Population: {
    'SP.POP.TOTL': 'Population, total',
    // ['Climate', 'Health']
    'SP.URB.TOTL': 'Urban population',
    // ['Climate', 'Urban']
    'SP.RUR.TOTL': 'Rural population',
    // ['AgriRural']
    'SP.POP.0014.TO.ZS': 'Population ages 0-14 (% of total population)',
    // ['Edu', 'Health']
    'SP.POP.1564.TO.ZS': 'Population ages 15-64 (% of total population)',
    // ['Edu', 'Health']
    'SP.POP.65UP.TO.ZS': 'Population ages 65 and above (% of total population)',
    // ['Health']
    'SL.EMP.1524.SP.ZS': 'Employment to population ratio, ages 15-24, total (%) (modeled ILO estimate)',
    // ['Labor']
    'SL.IND.EMPL.ZS': 'Employment in industry (% of total employment) (modeled ILO estimate)',
    // ['Labor']
    'SL.AGR.EMPL.ZS': 'Employment in agriculture (% of total employment) (modeled ILO estimate)',
    // ['AgriRural', 'Labor']
    'SL.SRV.EMPL.ZS': 'Employment in services (% of total employment) (modeled ILO estimate)' // ['Labor']

  },
  Energy: {
    'EG.USE.ELEC.KH.PC': 'Electric power consumption (kWh per capita)',
    'EG.USE.PCAP.KG.OE': 'Energy use (kg of oil equivalent per capita)',
    'EN.ATM.CO2E.PC': 'CO2 emissions (metric tons per capita)',
    'EN.ATM.CO2E.KT': 'CO2 emissions (kt)',
    // ['Climate', 'Env']
    'EN.ATM.METH.KT.CE': 'Methane emissions (kt of CO2 equivalent)',
    // ['Climate', 'Env']
    'EN.ATM.NOXE.KT.CE': 'Nitrous oxide emissions (thousand metric tons of CO2 equivalent)' // ['Climate', 'Env']

  },
  Agriculture: {
    'EN.AGR.EMPL': 'Economically active population in agriculture (number)',
    // ['AgriRural']
    'AG.LND.AGRI.K2': 'Agricultural land (sq. km)',
    // ['AgriRural', 'Climate']
    'AG.LND.AGRI.ZS': 'Agricultural land (% of land area)',
    // ['AgriRural', 'Climate', 'Env']
    'AG.LND.ARBL.ZS': 'Arable land (% of land area)',
    // ['AgriRural', 'Climate', 'Env']
    'AG.LND.CROP.ZS': 'Permanent cropland (% of land area)',
    // ['AgriRural']
    'AG.LND.FRST.ZS': 'Forest area (% of land area)',
    // ['AgriRural', 'Climate', 'Env']
    'ER.PTD.TOTL.ZS': 'Terrestrial and marine protected areas (% of total territorial area)' // ['Climate', 'Env']

  },
  Infrastructure: {
    'IT.CEL.SETS': 'Mobile cellular subscriptions',
    // ['Infras']
    'IS.RRS.TOTL.KM': 'Rail lines (total route-km)',
    // ['Infras']
    'IS.SHP.GOOD.TU': 'Container port traffic (TEU: 20 foot equivalent units)',
    // ['Infras']
    'IS.ROD.PSGR.K6': 'Roads, passengers carried (million passenger-km)',
    // ['Infras']
    'IS.RRS.PASG.KM': 'Railways, passengers carried (million passenger-km)',
    // ['Infras']
    'IS.ROD.GOOD.MT.K6': 'Roads, goods transported (million ton-km)',
    // ['Infras']
    'IS.RRS.GOOD.MT.K6': 'Railways, goods transported (million ton-km)',
    // ['Infras']
    'IS.VEH.PCAR.P3': 'Passenger cars (per 1,000 people)' // ['Urban', 'Infras']

  },
  Financial: {
    'FR.INR.LEND': 'Lending interest rate (%)',
    // ['Fin']
    'GFDD.DI.11': 'Insurance company assets to GDP (%)',
    // ['Fin']
    'CM.MKT.TRNR': 'Stocks traded, turnover ratio of domestic shares (%)',
    // ['Fin']
    'GFDD.DM.01': 'Stock market capitalization to GDP (%)',
    // ['Fin']
    'GFDD.DM.02': 'Stock market total value traded to GDP (%)',
    // ['Fin']
    'GFDD.EM.01': 'Stock market turnover ratio (%)',
    // ['Fin']
    'GFDD.OM.02': 'Stock market return (%, year-on-year)',
    // ['Fin']
    'GFDD.SM.01': 'Stock price volatility',
    // ['Fin']
    'GFDD.AM.02': 'Market capitalization excluding top 10 companies to total market capitalization (%)',
    // ['Fin']
    'CM.MKT.LCAP.CD': 'Market capitalization of listed domestic companies (current US$)',
    // ['Fin']
    'CM.MKT.LCAP.GD.ZS': 'Market capitalization of listed domestic companies (% of GDP)' // ['Fin']

  }
};

export { IndicatorsCollection };
