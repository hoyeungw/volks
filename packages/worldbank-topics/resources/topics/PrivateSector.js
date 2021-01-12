export const PrivateSector = {
  head: ['id', 'name', 'topics'], 
  rows: [
    ['BG.GSR.NFSV.GD.ZS'   , 'Trade in services (% of GDP)'                                                                                                   , ['Econ', 'Private', 'Trade']     ], 
    ['BM.GSR.INSF.ZS'      , 'Insurance and financial services (% of service imports, BoP)'                                                                   , ['Econ', 'Private', 'Trade']     ], 
    ['BX.GSR.INSF.ZS'      , 'Insurance and financial services (% of service exports, BoP)'                                                                   , ['Econ', 'Private', 'Trade']     ], 
    ['FS.AST.PRVT.GD.ZS'   , 'Domestic credit to private sector (% of GDP)'                                                                                   , ['Fin', 'Private']               ], 
    ['IC.BUS.DFRN.XQ'      , 'Ease of doing business score (0 = lowest performance to 100 = best performance)'                                                , ['Private']                      ], 
    ['IC.BUS.DISC.XQ'      , 'Business extent of disclosure index (0=less disclosure to 10=more disclosure)'                                                  , ['Private']                      ], 
    ['IC.BUS.EASE.XQ'      , 'Ease of doing business index (1=most business-friendly regulations)'                                                            , ['Climate', 'Private']           ], 
    ['IC.BUS.NDNS.ZS'      , 'New business density (new registrations per 1,000 people ages 15-64)'                                                           , ['Private']                      ], 
    ['IC.BUS.NREG'         , 'New businesses registered (number)'                                                                                             , ['Private']                      ], 
    ['IC.CRD.INFO.XQ'      , 'Depth of credit information index (0=low to 8=high)'                                                                            , ['Fin', 'Private']               ], 
    ['IC.CRD.PRVT.ZS'      , 'Private credit bureau coverage (% of adults)'                                                                                   , ['Fin', 'Private']               ], 
    ['IC.CRD.PUBL.ZS'      , 'Public credit registry coverage (% of adults)'                                                                                  , ['Fin', 'Private', 'Public']     ], 
    ['IC.CUS.DURS.EX'      , 'Average time to clear exports through customs (days)'                                                                           , ['Private', 'Trade']             ], 
    ['IC.ELC.DURS'         , 'Time to obtain an electrical connection (days)'                                                                                 , ['Energy', 'Private']            ], 
    ['IC.ELC.OUTG'         , 'Power outages in firms in a typical month (number)'                                                                             , ['Private']                      ], 
    ['IC.ELC.TIME'         , 'Time required to get electricity (days)'                                                                                        , ['Energy', 'Private']            ], 
    ['IC.ELEC.COST.PC.ZS'  , 'Cost to get electricity connection (% of income per capita)'                                                                    , ['Private']                      ], 
    ['IC.ELEC.PROC'        , 'Procedures required to get electricity (number)'                                                                                , ['Private']                      ], 
    ['IC.ELEC.TIME'        , 'Time required to get electricity (days)'                                                                                        , ['Private']                      ], 
    ['IC.ELEC.XQ'          , 'Getting electricity (rank)'                                                                                                     , ['Private']                      ], 
    ['IC.EXP.COST.CD'      , 'Cost to export (US$ per container)'                                                                                             , ['Private', 'Trade']             ], 
    ['IC.EXP.CSBC.CD'      , 'Cost to export, border compliance (US$)'                                                                                        , ['Private', 'Trade']             ], 
    ['IC.EXP.CSDC.CD'      , 'Cost to export, documentary compliance (US$)'                                                                                   , ['Private', 'Trade']             ], 
    ['IC.EXP.DOCS'         , 'Documents to export (number)'                                                                                                   , ['Private', 'Trade']             ], 
    ['IC.EXP.DURS'         , 'Time to export (days)'                                                                                                          , ['Private', 'Trade']             ], 
    ['IC.EXP.TMBC'         , 'Time to export, border compliance (hours)'                                                                                      , ['Private', 'Trade']             ], 
    ['IC.EXP.TMDC'         , 'Time to export, documentary compliance (hours)'                                                                                 , ['Private', 'Trade']             ], 
    ['IC.FRM.BKWC.ZS'      , 'Firms using banks to finance working capital (% of firms) '                                                                     , ['Private']                      ], 
    ['IC.FRM.BNKS.ZS'      , 'Firms using banks to finance investment (% of firms)'                                                                           , ['Energy', 'Private']            ], 
    ['IC.FRM.BRIB.ZS'      , 'Bribery incidence (% of firms experiencing at least one bribe payment request)'                                                 , ['Private']                      ], 
    ['IC.FRM.CMPU.ZS'      , 'Firms competing against unregistered firms (% of firms)'                                                                        , ['Private']                      ], 
    ['IC.FRM.CORR.ZS'      , 'Informal payments to public officials (% of firms)'                                                                             , ['Private']                      ], 
    ['IC.FRM.CRIM.ZS'      , 'Losses due to theft and vandalism (% of annual sales of affected firms)'                                                        , ['Private']                      ], 
    ['IC.FRM.DURS'         , 'Time required to obtain an operating license (days)'                                                                            , ['Private']                      ], 
    ['IC.FRM.FEMM.ZS'      , 'Firms with female top manager (% of firms)'                                                                                     , ['Private', 'Gender']            ], 
    ['IC.FRM.FEMO.ZS'      , 'Firms with female participation in ownership (% of firms)'                                                                      , ['Private', 'Gender']            ], 
    ['IC.FRM.FREG.ZS'      , 'Firms formally registered when operations started (% of firms)'                                                                 , ['Private']                      ], 
    ['IC.FRM.INFM.ZS'      , 'Firms that do not report all sales for tax purposes (% of firms)'                                                               , ['Private']                      ], 
    ['IC.FRM.ISOC.ZS'      , 'Internationally-recognized quality certification (% of firms)'                                                                  , ['Private']                      ], 
    ['IC.FRM.OUTG.ZS'      , 'Value lost due to electrical outages (% of sales for affected firms)'                                                           , ['Energy', 'Private']            ], 
    ['IC.FRM.TIME'         , 'Time required to deal with construction permits (days)'                                                                         , ['Private']                      ], 
    ['IC.FRM.TRNG.ZS'      , 'Firms offering formal training (% of firms)'                                                                                    , ['Private']                      ], 
    ['IC.GOV.DURS.ZS'      , 'Time spent dealing with the requirements of government regulations (% of senior management time)'                               , ['Private']                      ], 
    ['IC.IMP.COST.CD'      , 'Cost to import (US$ per container)'                                                                                             , ['Private', 'Trade']             ], 
    ['IC.IMP.CSBC.CD'      , 'Cost to import, border compliance (US$)'                                                                                        , ['Private', 'Trade']             ], 
    ['IC.IMP.CSDC.CD'      , 'Cost to import, documentary compliance (US$)'                                                                                   , ['Private', 'Trade']             ], 
    ['IC.IMP.DOCS'         , 'Documents to import (number)'                                                                                                   , ['Private', 'Trade']             ], 
    ['IC.IMP.DURS'         , 'Time to import (days)'                                                                                                          , ['Private', 'Trade']             ], 
    ['IC.IMP.TMBC'         , 'Time to import, border compliance (hours)'                                                                                      , ['Private', 'Trade']             ], 
    ['IC.IMP.TMDC'         , 'Time to import, documentary compliance (hours)'                                                                                 , ['Private', 'Trade']             ], 
    ['IC.ISV.DURS'         , 'Time to resolve insolvency (years)'                                                                                             , ['Private']                      ], 
    ['IC.LGL.CRED.XQ'      , 'Strength of legal rights index (0=weak to 12=strong)'                                                                           , ['Fin', 'Private', 'Public']     ], 
    ['IC.LGL.DURS'         , 'Time required to enforce a contract (days)'                                                                                     , ['Private']                      ], 
    ['IC.PRP.DURS'         , 'Time required to register property (days)'                                                                                      , ['Private']                      ], 
    ['IC.PRP.PROC'         , 'Procedures to register property (number)'                                                                                       , ['Private']                      ], 
    ['IC.REG.COST.PC.FE.ZS', 'Cost of business start-up procedures, female (% of GNI per capita)'                                                             , ['Private']                      ], 
    ['IC.REG.COST.PC.MA.ZS', 'Cost of business start-up procedures, male (% of GNI per capita)'                                                               , ['Private']                      ], 
    ['IC.REG.COST.PC.ZS'   , 'Cost of business start-up procedures (% of GNI per capita)'                                                                     , ['Private']                      ], 
    ['IC.REG.DURS'         , 'Time required to start a business (days)'                                                                                       , ['Private']                      ], 
    ['IC.REG.DURS.FE'      , 'Time required to start a business, female (days)'                                                                               , ['Private']                      ], 
    ['IC.REG.DURS.MA'      , 'Time required to start a business, male (days)'                                                                                 , ['Private']                      ], 
    ['IC.REG.PROC'         , 'Start-up procedures to register a business (number)'                                                                            , ['Private']                      ], 
    ['IC.REG.PROC.FE'      , 'Start-up procedures to register a business, female (number)'                                                                    , ['Private']                      ], 
    ['IC.REG.PROC.MA'      , 'Start-up procedures to register a business, male (number)'                                                                      , ['Private']                      ], 
    ['IC.TAX.DURS'         , 'Time to prepare and pay taxes (hours)'                                                                                          , ['Private', 'Public']            ], 
    ['IC.TAX.GIFT.ZS'      , 'Firms expected to give gifts in meetings with tax officials (% of firms)'                                                       , ['Private']                      ], 
    ['IC.TAX.LABR.CP.ZS'   , 'Labor tax and contributions (% of commercial profits)'                                                                          , ['Private']                      ], 
    ['IC.TAX.METG'         , 'Average number of visits or required meetings with tax officials (for affected firms)'                                          , ['Private']                      ], 
    ['IC.TAX.OTHR.CP.ZS'   , 'Other taxes payable by businesses (% of commercial profits)'                                                                    , ['Private']                      ], 
    ['IC.TAX.PAYM'         , 'Tax payments (number)'                                                                                                          , ['Private', 'Public']            ], 
    ['IC.TAX.PRFT.CP.ZS'   , 'Profit tax (% of commercial profits)'                                                                                           , ['Private']                      ], 
    ['IC.TAX.TOTL.CP.ZS'   , 'Total tax and contribution rate (% of profit)'                                                                                  , ['Private', 'Public']            ], 
    ['IC.WEF.LLCD.FE'      , 'Number of female directors'                                                                                                     , ['Private']                      ], 
    ['IC.WEF.LLCD.FE.ZS'   , 'Share of female directors (% of total directors)'                                                                               , ['Private']                      ], 
    ['IC.WEF.LLCD.MA'      , 'Number of male directors'                                                                                                       , ['Private']                      ], 
    ['IC.WEF.LLCD.MA.ZS'   , 'Share of male directors (% of total directors)'                                                                                 , ['Private']                      ], 
    ['IC.WEF.LLCO.FE'      , 'Number of female business owners'                                                                                               , ['Private']                      ], 
    ['IC.WEF.LLCO.FE.ZS'   , 'Share of female business owners (% of total business owners)'                                                                   , ['Private']                      ], 
    ['IC.WEF.LLCO.MA'      , 'Number of male business owners'                                                                                                 , ['Private']                      ], 
    ['IC.WEF.LLCO.MA.ZS'   , 'Share of male business owners  (% of total business owners)'                                                                    , ['Private']                      ], 
    ['IC.WEF.SOLO.FE'      , 'Number of female sole proprietors'                                                                                              , ['Private']                      ], 
    ['IC.WEF.SOLO.FE.ZS'   , 'Share of female sole proprietors  (% of sole proprietors)'                                                                      , ['Private']                      ], 
    ['IC.WEF.SOLO.MA'      , 'Number of male sole proprietors'                                                                                                , ['Private']                      ], 
    ['IC.WEF.SOLO.MA.ZS'   , 'Share of male sole proprietors  (% of sole proprietors)'                                                                        , ['Private']                      ], 
    ['IC.WRH.DURS'         , 'Time required to build a warehouse (days)'                                                                                      , ['Private']                      ], 
    ['IC.WRH.PROC'         , 'Procedures to build a warehouse (number)'                                                                                       , ['Private']                      ], 
    ['IE.PPI.ENGY.CD'      , 'Investment in energy with private participation (current US$)'                                                                  , ['Energy', 'Infras', 'Private']  ], 
    ['IE.PPI.TELE.CD'      , 'Investment in telecoms with private participation (current US$)'                                                                , ['Infras', 'Private']            ], 
    ['IE.PPI.TRAN.CD'      , 'Investment in transport with private participation (current US$)'                                                               , ['Infras', 'Private']            ], 
    ['IE.PPI.WATR.CD'      , 'Investment in water and sanitation with private participation (current US$)'                                                    , ['Infras', 'Private']            ], 
    ['IQ.WEF.CUST.XQ'      , 'Burden of customs procedure, WEF (1=extremely inefficient to 7=extremely efficient)'                                            , ['Private']                      ], 
    ['LP.EXP.DURS.MD'      , 'Lead time to export, median case (days)'                                                                                        , ['Trade', 'Private']             ], 
    ['LP.IMP.DURS.MD'      , 'Lead time to import, median case (days)'                                                                                        , ['Private', 'Trade']             ], 
    ['LP.LPI.CUST.XQ'      , 'Logistics performance index: Efficiency of customs clearance process (1=low to 5=high)'                                         , ['Private', 'Trade']             ], 
    ['LP.LPI.INFR.XQ'      , 'Logistics performance index: Quality of trade and transport-related infrastructure (1=low to 5=high)'                           , ['Private', 'Trade']             ], 
    ['LP.LPI.ITRN.XQ'      , 'Logistics performance index: Ease of arranging competitively priced shipments (1=low to 5=high)'                                , ['Private', 'Trade']             ], 
    ['LP.LPI.LOGS.XQ'      , 'Logistics performance index: Competence and quality of logistics services (1=low to 5=high)'                                    , ['Private', 'Trade']             ], 
    ['LP.LPI.OVRL.XQ'      , 'Logistics performance index: Overall (1=low to 5=high)'                                                                         , ['Private', 'Trade']             ], 
    ['LP.LPI.TIME.XQ'      , 'Logistics performance index: Frequency with which shipments reach consignee within scheduled or expected time (1=low to 5=high)', ['Private', 'Trade']             ], 
    ['LP.LPI.TRAC.XQ'      , 'Logistics performance index: Ability to track and trace consignments (1=low to 5=high)'                                         , ['Private', 'Trade']             ], 
    ['ST.INT.ARVL'         , 'International tourism, number of arrivals'                                                                                      , ['Private', 'Trade']             ], 
    ['ST.INT.DPRT'         , 'International tourism, number of departures'                                                                                    , ['Private', 'Trade']             ], 
    ['ST.INT.RCPT.CD'      , 'International tourism, receipts (current US$)'                                                                                  , ['Private', 'Trade']             ], 
    ['ST.INT.RCPT.XP.ZS'   , 'International tourism, receipts (% of total exports)'                                                                           , ['Private', 'Trade']             ], 
    ['ST.INT.TRNR.CD'      , 'International tourism, receipts for passenger transport items (current US$)'                                                    , ['Private', 'Trade']             ], 
    ['ST.INT.TRNX.CD'      , 'International tourism, expenditures for passenger transport items (current US$)'                                                , ['Private', 'Trade']             ], 
    ['ST.INT.TVLR.CD'      , 'International tourism, receipts for travel items (current US$)'                                                                 , ['Private', 'Trade']             ], 
    ['ST.INT.TVLX.CD'      , 'International tourism, expenditures for travel items (current US$)'                                                             , ['Private', 'Trade']             ], 
    ['ST.INT.XPND.CD'      , 'International tourism, expenditures (current US$)'                                                                              , ['Private', 'Trade']             ], 
    ['ST.INT.XPND.MP.ZS'   , 'International tourism, expenditures (% of total imports)'                                                                       , ['Private', 'Trade']             ], 
    ['TG.VAL.TOTL.GD.ZS'   , 'Merchandise trade (% of GDP)'                                                                                                   , ['Private', 'Trade']             ], 
    ['TM.QTY.MRCH.XD.WD'   , 'Import volume index (2000 = 100)'                                                                                               , ['Private', 'Trade']             ], 
    ['TM.TAX.MANF.BC.ZS'   , 'Binding coverage, manufactured products (%)'                                                                                    , ['Private', 'Trade']             ], 
    ['TM.TAX.MANF.BR.ZS'   , 'Bound rate, simple mean, manufactured products (%)'                                                                             , ['Private', 'Trade']             ], 
    ['TM.TAX.MANF.IP.ZS'   , 'Share of tariff lines with international peaks, manufactured products (%)'                                                      , ['Private', 'Trade']             ], 
    ['TM.TAX.MANF.SM.AR.ZS', 'Tariff rate, applied, simple mean, manufactured products (%)'                                                                   , ['Private', 'Trade']             ], 
    ['TM.TAX.MANF.SM.FN.ZS', 'Tariff rate, most favored nation, simple mean, manufactured products (%)'                                                       , ['Private', 'Trade']             ], 
    ['TM.TAX.MANF.SR.ZS'   , 'Share of tariff lines with specific rates, manufactured products (%)'                                                           , ['Private', 'Trade']             ], 
    ['TM.TAX.MANF.WM.AR.ZS', 'Tariff rate, applied, weighted mean, manufactured products (%)'                                                                 , ['Private', 'Trade']             ], 
    ['TM.TAX.MANF.WM.FN.ZS', 'Tariff rate, most favored nation, weighted mean, manufactured products (%)'                                                     , ['Private', 'Trade']             ], 
    ['TM.TAX.MRCH.BC.ZS'   , 'Binding coverage, all products (%)'                                                                                             , ['Private', 'Trade']             ], 
    ['TM.TAX.MRCH.BR.ZS'   , 'Bound rate, simple mean, all products (%)'                                                                                      , ['Private', 'Trade']             ], 
    ['TM.TAX.MRCH.IP.ZS'   , 'Share of tariff lines with international peaks, all products (%)'                                                               , ['Private', 'Trade']             ], 
    ['TM.TAX.MRCH.SM.AR.ZS', 'Tariff rate, applied, simple mean, all products (%)'                                                                            , ['Private', 'Trade']             ], 
    ['TM.TAX.MRCH.SM.FN.ZS', 'Tariff rate, most favored nation, simple mean, all products (%)'                                                                , ['Private', 'Trade']             ], 
    ['TM.TAX.MRCH.SR.ZS'   , 'Share of tariff lines with specific rates, all products (%)'                                                                    , ['Private', 'Trade']             ], 
    ['TM.TAX.MRCH.WM.AR.ZS', 'Tariff rate, applied, weighted mean, all products (%)'                                                                          , ['Private', 'Trade']             ], 
    ['TM.TAX.MRCH.WM.FN.ZS', 'Tariff rate, most favored nation, weighted mean, all products (%)'                                                              , ['Private', 'Trade']             ], 
    ['TM.TAX.TCOM.BC.ZS'   , 'Binding coverage, primary products (%)'                                                                                         , ['Private', 'Trade']             ], 
    ['TM.TAX.TCOM.BR.ZS'   , 'Bound rate, simple mean, primary products (%)'                                                                                  , ['Private', 'Trade']             ], 
    ['TM.TAX.TCOM.IP.ZS'   , 'Share of tariff lines with international peaks, primary products (%)'                                                           , ['Private', 'Trade']             ], 
    ['TM.TAX.TCOM.SM.AR.ZS', 'Tariff rate, applied, simple mean, primary products (%)'                                                                        , ['Private', 'Trade']             ], 
    ['TM.TAX.TCOM.SM.FN.ZS', 'Tariff rate, most favored nation, simple mean, primary products (%)'                                                            , ['Private', 'Trade']             ], 
    ['TM.TAX.TCOM.SR.ZS'   , 'Share of tariff lines with specific rates, primary products (%)'                                                                , ['Private', 'Trade']             ], 
    ['TM.TAX.TCOM.WM.AR.ZS', 'Tariff rate, applied, weighted mean, primary products (%)'                                                                      , ['Private', 'Trade']             ], 
    ['TM.TAX.TCOM.WM.FN.ZS', 'Tariff rate, most favored nation, weighted mean, primary products (%)'                                                          , ['Private', 'Trade']             ], 
    ['TM.VAL.AGRI.ZS.UN'   , 'Agricultural raw materials imports (% of merchandise imports)'                                                                  , ['AgriRural', 'Private', 'Trade']], 
    ['TM.VAL.FOOD.ZS.UN'   , 'Food imports (% of merchandise imports)'                                                                                        , ['Private', 'Trade']             ], 
    ['TM.VAL.FUEL.ZS.UN'   , 'Fuel imports (% of merchandise imports)'                                                                                        , ['Energy', 'Private', 'Trade']   ], 
    ['TM.VAL.ICTG.ZS.UN'   , 'ICT goods imports (% total goods imports)'                                                                                      , ['Infras', 'Private', 'Trade']   ], 
    ['TM.VAL.INSF.ZS.WT'   , 'Insurance and financial services (% of commercial service imports)'                                                             , ['Private', 'Trade']             ], 
    ['TM.VAL.MANF.ZS.UN'   , 'Manufactures imports (% of merchandise imports)'                                                                                , ['Private', 'Trade']             ], 
    ['TM.VAL.MMTL.ZS.UN'   , 'Ores and metals imports (% of merchandise imports)'                                                                             , ['Energy', 'Private', 'Trade']   ], 
    ['TM.VAL.MRCH.AL.ZS'   , 'Merchandise imports from economies in the Arab World (% of total merchandise imports)'                                          , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.CD.WT'   , 'Merchandise imports (current US$)'                                                                                              , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.HI.ZS'   , 'Merchandise imports from high-income economies (% of total merchandise imports)'                                                , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.OR.ZS'   , 'Merchandise imports from low- and middle-income economies outside region (% of total merchandise imports)'                      , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.R1.ZS'   , 'Merchandise imports from low- and middle-income economies in East Asia & Pacific (% of total merchandise imports)'              , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.R2.ZS'   , 'Merchandise imports from low- and middle-income economies in Europe & Central Asia (% of total merchandise imports)'            , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.R3.ZS'   , 'Merchandise imports from low- and middle-income economies in Latin America & the Caribbean (% of total merchandise imports)'    , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.R4.ZS'   , 'Merchandise imports from low- and middle-income economies in Middle East & North Africa (% of total merchandise imports)'       , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.R5.ZS'   , 'Merchandise imports from low- and middle-income economies in South Asia (% of total merchandise imports)'                       , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.R6.ZS'   , 'Merchandise imports from low- and middle-income economies in Sub-Saharan Africa (% of total merchandise imports)'               , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.RS.ZS'   , 'Merchandise imports by the reporting economy, residual (% of total merchandise imports)'                                        , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.WL.CD'   , 'Merchandise imports by the reporting economy (current US$)'                                                                     , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.WR.ZS'   , 'Merchandise imports from low- and middle-income economies within region (% of total merchandise imports)'                       , ['Private', 'Trade']             ], 
    ['TM.VAL.MRCH.XD.WD'   , 'Import value index (2000 = 100)'                                                                                                , ['Private', 'Trade']             ], 
    ['TM.VAL.OTHR.ZS.WT'   , 'Computer, communications and other services (% of commercial service imports)'                                                  , ['Private', 'Trade']             ], 
    ['TM.VAL.SERV.CD.WT'   , 'Commercial service imports (current US$)'                                                                                       , ['Private', 'Trade']             ], 
    ['TM.VAL.TRAN.ZS.WT'   , 'Transport services (% of commercial service imports)'                                                                           , ['Private', 'Trade']             ], 
    ['TM.VAL.TRVL.ZS.WT'   , 'Travel services (% of commercial service imports)'                                                                              , ['Private', 'Trade']             ], 
    ['TT.PRI.MRCH.XD.WD'   , 'Net barter terms of trade index (2000 = 100)'                                                                                   , ['Private', 'Trade']             ], 
    ['TX.QTY.MRCH.XD.WD'   , 'Export volume index (2000 = 100)'                                                                                               , ['Private', 'Trade']             ], 
    ['TX.VAL.AGRI.ZS.UN'   , 'Agricultural raw materials exports (% of merchandise exports)'                                                                  , ['AgriRural', 'Private', 'Trade']], 
    ['TX.VAL.FOOD.ZS.UN'   , 'Food exports (% of merchandise exports)'                                                                                        , ['Private', 'Trade']             ], 
    ['TX.VAL.FUEL.ZS.UN'   , 'Fuel exports (% of merchandise exports)'                                                                                        , ['Energy', 'Private', 'Trade']   ], 
    ['TX.VAL.ICTG.ZS.UN'   , 'ICT goods exports (% of total goods exports)'                                                                                   , ['Infras', 'Private', 'Trade']   ], 
    ['TX.VAL.INSF.ZS.WT'   , 'Insurance and financial services (% of commercial service exports)'                                                             , ['Private', 'Trade']             ], 
    ['TX.VAL.MANF.ZS.UN'   , 'Manufactures exports (% of merchandise exports)'                                                                                , ['Private', 'Trade']             ], 
    ['TX.VAL.MMTL.ZS.UN'   , 'Ores and metals exports (% of merchandise exports)'                                                                             , ['Energy', 'Private', 'Trade']   ], 
    ['TX.VAL.MRCH.AL.ZS'   , 'Merchandise exports to economies in the Arab World (% of total merchandise exports)'                                            , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.CD.WT'   , 'Merchandise exports (current US$)'                                                                                              , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.HI.ZS'   , 'Merchandise exports to high-income economies (% of total merchandise exports)'                                                  , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.OR.ZS'   , 'Merchandise exports to low- and middle-income economies outside region (% of total merchandise exports)'                        , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.R1.ZS'   , 'Merchandise exports to low- and middle-income economies in East Asia & Pacific (% of total merchandise exports)'                , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.R2.ZS'   , 'Merchandise exports to low- and middle-income economies in Europe & Central Asia (% of total merchandise exports)'              , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.R3.ZS'   , 'Merchandise exports to low- and middle-income economies in Latin America & the Caribbean (% of total merchandise exports)'      , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.R4.ZS'   , 'Merchandise exports to low- and middle-income economies in Middle East & North Africa (% of total merchandise exports)'         , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.R5.ZS'   , 'Merchandise exports to low- and middle-income economies in South Asia (% of total merchandise exports)'                         , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.R6.ZS'   , 'Merchandise exports to low- and middle-income economies in Sub-Saharan Africa (% of total merchandise exports)'                 , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.RS.ZS'   , 'Merchandise exports by the reporting economy, residual (% of total merchandise exports)'                                        , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.WL.CD'   , 'Merchandise exports by the reporting economy (current US$)'                                                                     , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.WR.ZS'   , 'Merchandise exports to low- and middle-income economies within region (% of total merchandise exports)'                         , ['Private', 'Trade']             ], 
    ['TX.VAL.MRCH.XD.WD'   , 'Export value index (2000 = 100)'                                                                                                , ['Private', 'Trade']             ], 
    ['TX.VAL.OTHR.ZS.WT'   , 'Computer, communications and other services (% of commercial service exports)'                                                  , ['Private', 'Trade']             ], 
    ['TX.VAL.SERV.CD.WT'   , 'Commercial service exports (current US$)'                                                                                       , ['Private', 'Trade']             ], 
    ['TX.VAL.TECH.CD'      , 'High-technology exports (current US$)'                                                                                          , ['Private', 'Stem', 'Trade']     ], 
    ['TX.VAL.TECH.MF.ZS'   , 'High-technology exports (% of manufactured exports)'                                                                            , ['Private', 'Stem', 'Trade']     ], 
    ['TX.VAL.TRAN.ZS.WT'   , 'Transport services (% of commercial service exports)'                                                                           , ['Private', 'Trade']             ], 
    ['TX.VAL.TRVL.ZS.WT'   , 'Travel services (% of commercial service exports)'                                                                              , ['Private', 'Trade']             ], 
  ], 
}