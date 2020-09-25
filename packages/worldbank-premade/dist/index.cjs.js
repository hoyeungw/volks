'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const IndicatorsCollection = {
  MajorEconomy: {
    'NY.GDP.MKTP.CD': 'GDP (current US$)',
    // ['Econ']
    'NV.AGR.TOTL.CD': 'Agriculture, forestry, and fishing, value added (current US$)',
    // ['AgriRural', 'Econ']
    'NV.IND.TOTL.CD': 'Industry (including construction), value added (current US$)',
    // ['Econ']
    'NV.SRV.TETC.CD': 'Services, etc., value added (current US$)',
    // ['Econ']
    'NE.CON.PETC.CD': 'Household final consumption expenditure, etc. (current US$)',
    // ['Econ']
    'NY.GNS.ICTR.CD': 'Gross savings (current US$)',
    // ['Econ']
    'NE.EXP.GNFS.CD': 'Exports of goods and services (current US$)',
    // ['Econ', 'Trade']
    'NE.IMP.GNFS.CD': 'Imports of goods and services (current US$)',
    // ['Econ', 'Trade']
    'FI.RES.TOTL.CD': 'Total reserves (includes gold, current US$)' // ['Econ', 'Fin', 'Debt']

  },
  DecomposeGDP: {
    'BX.KLT.DINV.WD.GD.ZS': 'Foreign direct investment, net inflows (% of GDP)',
    // ['Econ', 'Fin', 'Climate']
    'IE.ICT.TOTL.GD.ZS': 'Information and communication technology expenditure (% of GDP)',
    // ['Infras']
    'GB.XPD.RSDV.GD.ZS': 'Research and development expenditure (% of GDP)',
    // ['Stem']
    'MS.MIL.XPND.GD.ZS': 'Military expenditure (% of GDP)',
    // ['Public']
    'SH.XPD.CHEX.GD.ZS': 'Current health expenditure (% of GDP)',
    // ['Health']
    'SH.XPD.GHED.GD.ZS': 'Domestic general government health expenditure (% of GDP)',
    // ['Health']
    'SE.XPD.TOTL.GD.ZS': 'Government expenditure on education, total (% of GDP)' // ['Edu']
    // 'SH.XPD.TOTL.ZS': 'Health expenditure, total (% of GDP)', // ['Health']

  },
  TechAndMil: {
    'IE.ICT.TOTL.GD.ZS': 'Information and communication technology expenditure (% of GDP)',
    // ['Infras']
    'GB.XPD.RSDV.GD.ZS': 'Research and development expenditure (% of GDP)',
    // ['Stem']
    'IP.JRN.ARTC.SC': 'Scientific and technical journal articles',
    // ['Stem']
    'MS.MIL.XPND.GD.ZS': 'Military expenditure (% of GDP)',
    // ['Public']
    'MS.MIL.XPND.CN': 'Military expenditure (current LCU)',
    // ['Public']
    'MS.MIL.TOTL.P1': 'Armed forces personnel, total',
    // ['Public']
    'MS.MIL.TOTL.TF.ZS': 'Armed forces personnel (% of total labor force)',
    // ['Public']
    'MS.MIL.MPRT.KD': 'Arms imports (SIPRI trend indicator values)',
    // ['Public', 'Trade']
    'MS.MIL.XPRT.KD': 'Arms exports (SIPRI trend indicator values)' // ['Public', 'Trade']

  },
  Education: {
    'SE.XPD.TOTL.GD.ZS': 'Government expenditure on education, total (% of GDP)',
    // ['Edu']
    'SE.XPD.TCHR.XC.ZS': 'Teachers\' salaries (% of current education expenditure)',
    // ['Edu']
    'SE.PRE.TCHR': 'Teachers in pre-primary education, both sexes (number)',
    // ['Edu']
    'UIS.T.1': 'Teachers in primary education, both sexes (number)',
    // ['Edu']
    'UIS.T.2': 'Teachers in lower secondary education, both sexes (number)',
    // ['Edu']
    'UIS.T.3': 'Teachers in upper secondary education, both sexes (number)',
    // ['Edu']
    'UIS.T.23.GPV': 'Teachers in secondary general education, both sexes (number)',
    // ['Edu']
    'SE.TER.TCHR': 'Teachers in tertiary education programmes, both sexes (number)',
    // ['Edu']
    'SE.PRM.ENRR': 'School enrollment, primary (% gross)',
    // ['Edu']
    'SE.SEC.ENRR': 'School enrollment, secondary (% gross)',
    // ['Edu']
    'SE.TER.ENRR': 'School enrollment, tertiary (% gross)',
    // ['Edu']
    'SE.XPD.PRIM.ZS': 'Expenditure on primary education (% of government expenditure on education)',
    // ['Edu']
    'SE.XPD.SECO.ZS': 'Expenditure on secondary education (% of government expenditure on education)',
    // ['Edu']
    'SE.XPD.TERT.ZS': 'Expenditure on tertiary education (% of government expenditure on education)',
    // ['Edu']
    'SL.UEM.BASC.ZS': 'Unemployment with basic education (% of total labor force with basic education)',
    // ['Labor']
    'SL.UEM.INTM.ZS': 'Unemployment with intermediate education (% of total labor force with intermediate education)',
    // ['Labor']
    'SL.UEM.ADVN.ZS': 'Unemployment with advanced education (% of total labor force with advanced education)' // ['Labor']

  },
  SocialDevelopment: {
    'SI.POV.GINI': 'Gini index (World Bank estimate)',
    // ['Poverty']
    'SE.SEC.PROG.ZS': 'Progression to secondary school (%)',
    // ['Edu'],
    'SH.XPD.CHEX.GD.ZS': 'Current health expenditure (% of GDP)',
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
    'SL.SRV.EMPL.ZS': 'Employment in services (% of total employment) (modeled ILO estimate)',
    // ['Labor']
    'SL.TLF.PRIM.ZS': 'Labor force with primary education (% of total)',
    // ['Edu', 'Labor']
    'SL.TLF.SECO.ZS': 'Labor force with secondary education (% of total)',
    // ['Edu', 'Labor']
    'SL.TLF.TERT.ZS': 'Labor force with tertiary education (% of total)' // ['Edu', 'Labor']

  },
  Energy: {
    'EG.ELC.LOSS.ZS': 'Electric power transmission and distribution losses (% of output)',
    // ['Energy', 'Infras']
    'EG.USE.COMM.FO.ZS': 'Fossil fuel energy consumption (% of total)',
    // ['Energy']
    'EG.ELC.NUCL.ZS': 'Electricity production from nuclear sources (% of total)',
    // ['Energy', 'Climate', 'Infras']
    'EG.USE.ELEC.KH.PC': 'Electric power consumption (kWh per capita)',
    'EG.USE.PCAP.KG.OE': 'Energy use (kg of oil equivalent per capita)',
    'EN.ATM.CO2E.PC': 'CO2 emissions (metric tons per capita)',
    'EN.ATM.CO2E.KT': 'CO2 emissions (kt)',
    // ['Climate', 'Env']
    'EN.ATM.METH.KT.CE': 'Methane emissions (kt of CO2 equivalent)',
    // ['Climate', 'Env']
    'EN.ATM.NOXE.KT.CE': 'Nitrous oxide emissions (thousand metric tons of CO2 equivalent)',
    // ['Climate', 'Env']
    'TM.VAL.FUEL.ZS.UN': 'Fuel imports (% of merchandise imports)',
    // ['Energy', 'Private', 'Trade']
    'TX.VAL.FUEL.ZS.UN': 'Fuel exports (% of merchandise exports)' // ['Energy', 'Private', 'Trade']

  },
  Agriculture: {
    'AG.LND.TOTL.K2': 'Land area (sq. km)',
    // ['AgriRural', 'Env']
    'AG.SRF.TOTL.K2': 'Surface area (sq. km)',
    // ['AgriRural', 'Env']
    'AG.LND.FRST.K2': 'Forest area (sq. km)',
    // ['AgriRural', 'Climate', 'Env']
    'AG.LND.ARBL.K2': 'Arable land (sq. km)',
    // ['AgriRural']
    'AG.LND.AGRI.K2': 'Agricultural land (sq. km)',
    // ['AgriRural', 'Climate']
    'AG.SRF.TOTL.ZS': 'Surface area (% of land area)',
    // ['AgriRural', 'Env']
    'AG.LND.FRST.ZS': 'Forest area (% of land area)',
    // ['AgriRural', 'Climate', 'Env']
    'AG.LND.ARBL.ZS': 'Arable land (% of land area)',
    // ['AgriRural', 'Climate', 'Env']
    'AG.LND.AGRI.ZS': 'Agricultural land (% of land area)',
    // ['AgriRural', 'Climate', 'Env']
    'AG.AGR.TRAC.NO': 'Agricultural machinery, tractors',
    // ['AgriRural'],
    'AG.LND.TRAC.ZS': 'Agricultural machinery, tractors per 100 sq. km of arable land',
    // ['AgriRural']
    'AG.CON.FERT.ZS': 'Fertilizer consumption (kilograms per hectare of arable land)',
    // ['AgriRural']
    'AG.PRD.FOOD.XD': 'Food production index (2004-2006 = 100)',
    // ['AgriRural']
    'EN.AGR.EMPL': 'Economically active population in agriculture (number)',
    // ['AgriRural']
    'ER.PTD.TOTL.ZS': 'Terrestrial and marine protected areas (% of total territorial area)' // ['Climate', 'Env']

  },
  Infrastructure: {
    'IS.VEH.PCAR.P3': 'Passenger cars (per 1,000 people)',
    // ['Urban', 'Infras']
    'IS.VEH.ROAD.K1': 'Vehicles (per km of road)',
    // ['Urban', 'Infras']
    'IS.RRS.TOTL.KM': 'Rail lines (total route-km)',
    // ['Infras']
    'IS.ROD.TOTL.KM': 'Roads, total network (km)',
    // ['Infras']
    'IS.ROD.DNST.K2': 'Road density (km of road per 100 sq. km of land area)',
    // ['Infras']
    'IS.ROD.PSGR.K6': 'Roads, passengers carried (million passenger-km)',
    // ['Infras']
    'IS.ROD.GOOD.MT.K6': 'Roads, goods transported (million ton-km)',
    // ['Infras']
    'IS.RRS.PASG.KM': 'Railways, passengers carried (million passenger-km)',
    // ['Infras']
    'IS.RRS.GOOD.MT.K6': 'Railways, goods transported (million ton-km)',
    // ['Infras']
    'IS.SHP.GOOD.TU': 'Container port traffic (TEU: 20 foot equivalent units)',
    // ['Infras']
    'IS.AIR.PSGR': 'Air transport, passengers carried',
    // ['Infras']
    'IS.AIR.GOOD.MT.K1': 'Air transport, freight (million ton-km)',
    // ['Infras']
    'IT.CEL.SETS': 'Mobile cellular subscriptions',
    // ['Infras']
    'IT.CMP.PCMP.P2': 'Personal computers (per 100 people)',
    // ['Infras']
    'IT.NET.BBND.P2': 'Fixed broadband subscriptions (per 100 people)',
    // ['Infras']
    'IT.TEL.INVS.CN': 'Telecommunications investment (current LCU)',
    // ['Infras']
    'IT.TEL.REVN.CN': 'Telecommunications revenue (current LCU)',
    // ['Infras']
    'IT.TEL.INVS.RV.ZS': 'Telecommunications investment (% of revenue)',
    // ['Infras']
    'IT.TEL.REVN.GD.ZS': 'Telecommunications revenue (% GDP)' // ['Infras']

  },
  Business: {
    'IC.FRM.TRNG.ZS': 'Firms offering formal training (% of firms)',
    // ['Private']
    'IC.REG.COST.PC.ZS': 'Cost of business start-up procedures (% of GNI per capita)' // ['Private']

  },
  Income: {
    'SI.DST.10TH.10': 'Income share held by highest 10%',
    // ['Poverty']
    'SI.DST.05TH.20': 'Income share held by highest 20%',
    // ['Poverty']
    'SI.DST.04TH.20': 'Income share held by fourth 20%',
    // ['Poverty']
    'SI.DST.03RD.20': 'Income share held by third 20%',
    // ['Poverty']
    'SI.DST.02ND.20': 'Income share held by second 20%',
    // ['Poverty']
    'SI.DST.FRST.20': 'Income share held by lowest 20%',
    // ['Poverty', 'Aid']
    'SI.DST.FRST.10': 'Income share held by lowest 10%' // ['Poverty']

  },
  Financial: {
    'FR.INR.LEND': 'Lending interest rate (%)',
    // ['Fin']
    'GFDD.DI.11': 'Insurance company assets to GDP (%)',
    // ['Fin']
    'FS.AST.PRVT.GD.ZS': 'Domestic credit to private sector (% of GDP)',
    // ['Fin', 'Private']
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
    'CM.MKT.LCAP.GD.ZS': 'Market capitalization of listed domestic companies (% of GDP)',
    // ['Fin']
    'GFDD.OI.04': 'Lerner index' // ['Fin']

  }
};

exports.IndicatorsCollection = IndicatorsCollection;
