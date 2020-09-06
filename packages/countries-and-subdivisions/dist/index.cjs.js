'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var acq = require('@acq/acq');
var enumTabularTypes = require('@analys/enum-tabular-types');

const CountryTable = {
  head: ['id', 'iso2Code', 'name', 'region', 'adminregion', 'incomeLevel', 'lendingType', 'capitalCity', 'longitude', 'latitude'],
  rows: [['ABW', 'AW', 'Aruba', 'LCN', null, 'HIC', 'LNX', 'Oranjestad', -70.0167, 12.5167], ['AFG', 'AF', 'Afghanistan', 'SAS', 'SAS', 'LIC', 'IDX', 'Kabul', 69.1761, 34.5228], ['AGO', 'AO', 'Angola', 'SSF', 'SSA', 'LMC', 'IBD', 'Luanda', 13.242, -8.81155], ['ALB', 'AL', 'Albania', 'ECS', 'ECA', 'UMC', 'IBD', 'Tirane', 19.8172, 41.3317], ['AND', 'AD', 'Andorra', 'ECS', null, 'HIC', 'LNX', 'Andorra la Vella', 1.5218, 42.5075], ['ARE', 'AE', 'United Arab Emirates', 'MEA', null, 'HIC', 'LNX', 'Abu Dhabi', 54.3705, 24.4764], ['ARG', 'AR', 'Argentina', 'LCN', 'LAC', 'UMC', 'IBD', 'Buenos Aires', -58.4173, -34.6118], ['ARM', 'AM', 'Armenia', 'ECS', 'ECA', 'UMC', 'IBD', 'Yerevan', 44.509, 40.1596], ['ASM', 'AS', 'American Samoa', 'EAS', 'EAP', 'UMC', 'LNX', 'Pago Pago', -170.691, -14.2846], ['ATG', 'AG', 'Antigua and Barbuda', 'LCN', null, 'HIC', 'IBD', 'Saint John\'s', -61.8456, 17.1175], ['AUS', 'AU', 'Australia', 'EAS', null, 'HIC', 'LNX', 'Canberra', 149.129, -35.282], ['AUT', 'AT', 'Austria', 'ECS', null, 'HIC', 'LNX', 'Vienna', 16.3798, 48.2201], ['AZE', 'AZ', 'Azerbaijan', 'ECS', 'ECA', 'UMC', 'IBD', 'Baku', 49.8932, 40.3834], ['BDI', 'BI', 'Burundi', 'SSF', 'SSA', 'LIC', 'IDX', 'Bujumbura', 29.3639, -3.3784], ['BEL', 'BE', 'Belgium', 'ECS', null, 'HIC', 'LNX', 'Brussels', 4.36761, 50.8371], ['BEN', 'BJ', 'Benin', 'SSF', 'SSA', 'LMC', 'IDX', 'Porto-Novo', 2.6323, 6.4779], ['BFA', 'BF', 'Burkina Faso', 'SSF', 'SSA', 'LIC', 'IDX', 'Ouagadougou', -1.53395, 12.3605], ['BGD', 'BD', 'Bangladesh', 'SAS', 'SAS', 'LMC', 'IDX', 'Dhaka', 90.4113, 23.7055], ['BGR', 'BG', 'Bulgaria', 'ECS', 'ECA', 'UMC', 'IBD', 'Sofia', 23.3238, 42.7105], ['BHR', 'BH', 'Bahrain', 'MEA', null, 'HIC', 'LNX', 'Manama', 50.5354, 26.1921], ['BHS', 'BS', 'Bahamas, The', 'LCN', null, 'HIC', 'LNX', 'Nassau', -77.339, 25.0661], ['BIH', 'BA', 'Bosnia and Herzegovina', 'ECS', 'ECA', 'UMC', 'IBD', 'Sarajevo', 18.4214, 43.8607], ['BLR', 'BY', 'Belarus', 'ECS', 'ECA', 'UMC', 'IBD', 'Minsk', 27.5766, 53.9678], ['BLZ', 'BZ', 'Belize', 'LCN', 'LAC', 'UMC', 'IBD', 'Belmopan', -88.7713, 17.2534], ['BMU', 'BM', 'Bermuda', 'NAC', null, 'HIC', 'LNX', 'Hamilton', -64.706, 32.3293], ['BOL', 'BO', 'Bolivia', 'LCN', 'LAC', 'LMC', 'IBD', 'La Paz', -66.1936, -13.9908], ['BRA', 'BR', 'Brazil', 'LCN', 'LAC', 'UMC', 'IBD', 'Brasilia', -47.9292, -15.7801], ['BRB', 'BB', 'Barbados', 'LCN', null, 'HIC', 'LNX', 'Bridgetown', -59.6105, 13.0935], ['BRN', 'BN', 'Brunei Darussalam', 'EAS', null, 'HIC', 'LNX', 'Bandar Seri Begawan', 114.946, 4.94199], ['BTN', 'BT', 'Bhutan', 'SAS', 'SAS', 'LMC', 'IDX', 'Thimphu', 89.6177, 27.5768], ['BWA', 'BW', 'Botswana', 'SSF', 'SSA', 'UMC', 'IBD', 'Gaborone', 25.9201, -24.6544], ['CAF', 'CF', 'Central African Rep.', 'SSF', 'SSA', 'LIC', 'IDX', 'Bangui', 21.6407, 5.63056], ['CAN', 'CA', 'Canada', 'NAC', null, 'HIC', 'LNX', 'Ottawa', -75.6919, 45.4215], ['CHE', 'CH', 'Switzerland', 'ECS', null, 'HIC', 'LNX', 'Bern', 7.44821, 46.948], ['CHI', 'JG', 'Channel Islands', 'ECS', null, 'HIC', 'LNX', '', '', ''], ['CHL', 'CL', 'Chile', 'LCN', null, 'HIC', 'IBD', 'Santiago', -70.6475, -33.475], ['CHN', 'CN', 'China', 'EAS', 'EAP', 'UMC', 'IBD', 'Beijing', 116.286, 40.0495], ['CIV', 'CI', 'Cote d\'Ivoire', 'SSF', 'SSA', 'LMC', 'IDX', 'Yamoussoukro', -4.0305, 5.332], ['CMR', 'CM', 'Cameroon', 'SSF', 'SSA', 'LMC', 'IDB', 'Yaounde', 11.5174, 3.8721], ['COD', 'CD', 'Congo, DR', 'SSF', 'SSA', 'LIC', 'IDX', 'Kinshasa', 15.3222, -4.325], ['COG', 'CG', 'Congo, Rep.', 'SSF', 'SSA', 'LMC', 'IDB', 'Brazzaville', 15.2662, -4.2767], ['COL', 'CO', 'Colombia', 'LCN', 'LAC', 'UMC', 'IBD', 'Bogota', -74.082, 4.60987], ['COM', 'KM', 'Comoros', 'SSF', 'SSA', 'LMC', 'IDX', 'Moroni', 43.2418, -11.6986], ['CPV', 'CV', 'Cabo Verde', 'SSF', 'SSA', 'LMC', 'IDB', 'Praia', -23.5087, 14.9218], ['CRI', 'CR', 'Costa Rica', 'LCN', 'LAC', 'UMC', 'IBD', 'San Jose', -84.0089, 9.63701], ['CUB', 'CU', 'Cuba', 'LCN', 'LAC', 'UMC', 'LNX', 'Havana', -82.3667, 23.1333], ['CUW', 'CW', 'Curacao', 'LCN', null, 'HIC', 'LNX', 'Willemstad', '', ''], ['CYM', 'KY', 'Cayman Islands', 'LCN', null, 'HIC', 'LNX', 'George Town', -81.3857, 19.3022], ['CYP', 'CY', 'Cyprus', 'ECS', null, 'HIC', 'LNX', 'Nicosia', 33.3736, 35.1676], ['CZE', 'CZ', 'Czech Rep.', 'ECS', null, 'HIC', 'LNX', 'Prague', 14.4205, 50.0878], ['DEU', 'DE', 'Germany', 'ECS', null, 'HIC', 'LNX', 'Berlin', 13.4115, 52.5235], ['DJI', 'DJ', 'Djibouti', 'MEA', 'MNA', 'LMC', 'IDX', 'Djibouti', 43.1425, 11.5806], ['DMA', 'DM', 'Dominica', 'LCN', 'LAC', 'UMC', 'IDB', 'Roseau', -61.39, 15.2976], ['DNK', 'DK', 'Denmark', 'ECS', null, 'HIC', 'LNX', 'Copenhagen', 12.5681, 55.6763], ['DOM', 'DO', 'Dominican Rep.', 'LCN', 'LAC', 'UMC', 'IBD', 'Santo Domingo', -69.8908, 18.479], ['DZA', 'DZ', 'Algeria', 'MEA', 'MNA', 'LMC', 'IBD', 'Algiers', 3.05097, 36.7397], ['ECU', 'EC', 'Ecuador', 'LCN', 'LAC', 'UMC', 'IBD', 'Quito', -78.5243, -0.229498], ['EGY', 'EG', 'Egypt, Arab Rep.', 'MEA', 'MNA', 'LMC', 'IBD', 'Cairo', 31.2461, 30.0982], ['ERI', 'ER', 'Eritrea', 'SSF', 'SSA', 'LIC', 'IDX', 'Asmara', 38.9183, 15.3315], ['ESP', 'ES', 'Spain', 'ECS', null, 'HIC', 'LNX', 'Madrid', -3.70327, 40.4167], ['EST', 'EE', 'Estonia', 'ECS', null, 'HIC', 'LNX', 'Tallinn', 24.7586, 59.4392], ['ETH', 'ET', 'Ethiopia', 'SSF', 'SSA', 'LIC', 'IDX', 'Addis Ababa', 38.7468, 9.02274], ['FIN', 'FI', 'Finland', 'ECS', null, 'HIC', 'LNX', 'Helsinki', 24.9525, 60.1608], ['FJI', 'FJ', 'Fiji', 'EAS', 'EAP', 'UMC', 'IDB', 'Suva', 178.399, -18.1149], ['FRA', 'FR', 'France', 'ECS', null, 'HIC', 'LNX', 'Paris', 2.35097, 48.8566], ['FRO', 'FO', 'Faroe Islands', 'ECS', null, 'HIC', 'LNX', 'Torshavn', -6.91181, 61.8926], ['FSM', 'FM', 'Micronesia, Fed. Sts.', 'EAS', 'EAP', 'LMC', 'IDX', 'Palikir', 158.185, 6.91771], ['GAB', 'GA', 'Gabon', 'SSF', 'SSA', 'UMC', 'IBD', 'Libreville', 9.45162, 0.38832], ['GBR', 'GB', 'United Kingdom', 'ECS', null, 'HIC', 'LNX', 'London', -0.126236, 51.5002], ['GEO', 'GE', 'Georgia', 'ECS', 'ECA', 'UMC', 'IBD', 'Tbilisi', 44.793, 41.71], ['GHA', 'GH', 'Ghana', 'SSF', 'SSA', 'LMC', 'IDX', 'Accra', -0.20795, 5.57045], ['GIB', 'GI', 'Gibraltar', 'ECS', null, 'HIC', 'LNX', '', '', ''], ['GIN', 'GN', 'Guinea', 'SSF', 'SSA', 'LIC', 'IDX', 'Conakry', -13.7, 9.51667], ['GMB', 'GM', 'Gambia, The', 'SSF', 'SSA', 'LIC', 'IDX', 'Banjul', -16.5885, 13.4495], ['GNB', 'GW', 'Guinea-Bissau', 'SSF', 'SSA', 'LIC', 'IDX', 'Bissau', -15.1804, 11.8037], ['GNQ', 'GQ', 'Equatorial Guinea', 'SSF', 'SSA', 'UMC', 'IBD', 'Malabo', 8.7741, 3.7523], ['GRC', 'GR', 'Greece', 'ECS', null, 'HIC', 'LNX', 'Athens', 23.7166, 37.9792], ['GRD', 'GD', 'Grenada', 'LCN', 'LAC', 'UMC', 'IDB', 'Saint George\'s', -61.7449, 12.0653], ['GRL', 'GL', 'Greenland', 'ECS', null, 'HIC', 'LNX', 'Nuuk', -51.7214, 64.1836], ['GTM', 'GT', 'Guatemala', 'LCN', 'LAC', 'UMC', 'IBD', 'Guatemala City', -90.5328, 14.6248], ['GUM', 'GU', 'Guam', 'EAS', null, 'HIC', 'LNX', 'Agana', 144.794, 13.4443], ['GUY', 'GY', 'Guyana', 'LCN', 'LAC', 'UMC', 'IDX', 'Georgetown', -58.1548, 6.80461], ['HKG', 'HK', 'Hong Kong SAR, China', 'EAS', null, 'HIC', 'LNX', '', 114.109, 22.3964], ['HND', 'HN', 'Honduras', 'LCN', 'LAC', 'LMC', 'IDX', 'Tegucigalpa', -87.4667, 15.1333], ['HRV', 'HR', 'Croatia', 'ECS', null, 'HIC', 'IBD', 'Zagreb', 15.9614, 45.8069], ['HTI', 'HT', 'Haiti', 'LCN', 'LAC', 'LIC', 'IDX', 'Port-au-Prince', -72.3288, 18.5392], ['HUN', 'HU', 'Hungary', 'ECS', null, 'HIC', 'LNX', 'Budapest', 19.0408, 47.4984], ['IDN', 'ID', 'Indonesia', 'EAS', 'EAP', 'UMC', 'IBD', 'Jakarta', 106.83, -6.19752], ['IMN', 'IM', 'Isle of Man', 'ECS', null, 'HIC', 'LNX', 'Douglas', -4.47928, 54.1509], ['IND', 'IN', 'India', 'SAS', 'SAS', 'LMC', 'IBD', 'New Delhi', 77.225, 28.6353], ['IRL', 'IE', 'Ireland', 'ECS', null, 'HIC', 'LNX', 'Dublin', -6.26749, 53.3441], ['IRN', 'IR', 'Iran', 'MEA', 'MNA', 'UMC', 'IBD', 'Tehran', 51.4447, 35.6878], ['IRQ', 'IQ', 'Iraq', 'MEA', 'MNA', 'UMC', 'IBD', 'Baghdad', 44.394, 33.3302], ['ISL', 'IS', 'Iceland', 'ECS', null, 'HIC', 'LNX', 'Reykjavik', -21.8952, 64.1353], ['ISR', 'IL', 'Israel', 'MEA', null, 'HIC', 'LNX', '', 35.2035, 31.7717], ['ITA', 'IT', 'Italy', 'ECS', null, 'HIC', 'LNX', 'Rome', 12.4823, 41.8955], ['JAM', 'JM', 'Jamaica', 'LCN', 'LAC', 'UMC', 'IBD', 'Kingston', -76.792, 17.9927], ['JOR', 'JO', 'Jordan', 'MEA', 'MNA', 'UMC', 'IBD', 'Amman', 35.9263, 31.9497], ['JPN', 'JP', 'Japan', 'EAS', null, 'HIC', 'LNX', 'Tokyo', 139.77, 35.67], ['KAZ', 'KZ', 'Kazakhstan', 'ECS', 'ECA', 'UMC', 'IBD', 'Astana', 71.4382, 51.1879], ['KEN', 'KE', 'Kenya', 'SSF', 'SSA', 'LMC', 'IDB', 'Nairobi', 36.8126, -1.27975], ['KGZ', 'KG', 'Kyrgyz Rep.', 'ECS', 'ECA', 'LMC', 'IDX', 'Bishkek', 74.6057, 42.8851], ['KHM', 'KH', 'Cambodia', 'EAS', 'EAP', 'LMC', 'IDX', 'Phnom Penh', 104.874, 11.5556], ['KIR', 'KI', 'Kiribati', 'EAS', 'EAP', 'LMC', 'IDX', 'Tarawa', 172.979, 1.32905], ['KNA', 'KN', 'St. Kitts and Nevis', 'LCN', null, 'HIC', 'IBD', 'Basseterre', -62.7309, 17.3], ['KOR', 'KR', 'Korea, Rep.', 'EAS', null, 'HIC', 'LNX', 'Seoul', 126.957, 37.5323], ['KWT', 'KW', 'Kuwait', 'MEA', null, 'HIC', 'LNX', 'Kuwait City', 47.9824, 29.3721], ['LAO', 'LA', 'Lao PDR', 'EAS', 'EAP', 'LMC', 'IDX', 'Vientiane', 102.177, 18.5826], ['LBN', 'LB', 'Lebanon', 'MEA', 'MNA', 'UMC', 'IBD', 'Beirut', 35.5134, 33.8872], ['LBR', 'LR', 'Liberia', 'SSF', 'SSA', 'LIC', 'IDX', 'Monrovia', -10.7957, 6.30039], ['LBY', 'LY', 'Libya', 'MEA', 'MNA', 'UMC', 'IBD', 'Tripoli', 13.1072, 32.8578], ['LCA', 'LC', 'St. Lucia', 'LCN', 'LAC', 'UMC', 'IDB', 'Castries', -60.9832, 14], ['LIE', 'LI', 'Liechtenstein', 'ECS', null, 'HIC', 'LNX', 'Vaduz', 9.52148, 47.1411], ['LKA', 'LK', 'Sri Lanka', 'SAS', 'SAS', 'LMC', 'IBD', 'Colombo', 79.8528, 6.92148], ['LSO', 'LS', 'Lesotho', 'SSF', 'SSA', 'LMC', 'IDX', 'Maseru', 27.7167, -29.5208], ['LTU', 'LT', 'Lithuania', 'ECS', null, 'HIC', 'LNX', 'Vilnius', 25.2799, 54.6896], ['LUX', 'LU', 'Luxembourg', 'ECS', null, 'HIC', 'LNX', 'Luxembourg', 6.1296, 49.61], ['LVA', 'LV', 'Latvia', 'ECS', null, 'HIC', 'LNX', 'Riga', 24.1048, 56.9465], ['MAC', 'MO', 'Macao SAR, China', 'EAS', null, 'HIC', 'LNX', '', 113.55, 22.1667], ['MAF', 'MF', 'St. Martin (French part)', 'LCN', null, 'HIC', 'LNX', 'Marigot', '', ''], ['MAR', 'MA', 'Morocco', 'MEA', 'MNA', 'LMC', 'IBD', 'Rabat', -6.8704, 33.9905], ['MCO', 'MC', 'Monaco', 'ECS', null, 'HIC', 'LNX', 'Monaco', 7.41891, 43.7325], ['MDA', 'MD', 'Moldova', 'ECS', 'ECA', 'LMC', 'IBD', 'Chisinau', 28.8497, 47.0167], ['MDG', 'MG', 'Madagascar', 'SSF', 'SSA', 'LIC', 'IDX', 'Antananarivo', 45.7167, -20.4667], ['MDV', 'MV', 'Maldives', 'SAS', 'SAS', 'UMC', 'IDX', 'Male', 73.5109, 4.1742], ['MEX', 'MX', 'Mexico', 'LCN', 'LAC', 'UMC', 'IBD', 'Mexico City', -99.1276, 19.427], ['MHL', 'MH', 'Marshall Islands', 'EAS', 'EAP', 'UMC', 'IDX', 'Majuro', 171.135, 7.11046], ['MKD', 'MK', 'North Macedonia', 'ECS', 'ECA', 'UMC', 'IBD', 'Skopje', 21.4361, 42.0024], ['MLI', 'ML', 'Mali', 'SSF', 'SSA', 'LIC', 'IDX', 'Bamako', -7.50034, 13.5667], ['MLT', 'MT', 'Malta', 'MEA', null, 'HIC', 'LNX', 'Valletta', 14.5189, 35.9042], ['MMR', 'MM', 'Myanmar', 'EAS', 'EAP', 'LMC', 'IDX', 'Naypyidaw', 95.9562, 21.914], ['MNE', 'ME', 'Montenegro', 'ECS', 'ECA', 'UMC', 'IBD', 'Podgorica', 19.2595, 42.4602], ['MNG', 'MN', 'Mongolia', 'EAS', 'EAP', 'LMC', 'IBD', 'Ulaanbaatar', 106.937, 47.9129], ['MNP', 'MP', 'Northern Mariana Islands', 'EAS', null, 'HIC', 'LNX', 'Saipan', 145.765, 15.1935], ['MOZ', 'MZ', 'Mozambique', 'SSF', 'SSA', 'LIC', 'IDX', 'Maputo', 32.5713, -25.9664], ['MRT', 'MR', 'Mauritania', 'SSF', 'SSA', 'LMC', 'IDX', 'Nouakchott', -15.9824, 18.2367], ['MUS', 'MU', 'Mauritius', 'SSF', null, 'HIC', 'IBD', 'Port Louis', 57.4977, -20.1605], ['MWI', 'MW', 'Malawi', 'SSF', 'SSA', 'LIC', 'IDX', 'Lilongwe', 33.7703, -13.9899], ['MYS', 'MY', 'Malaysia', 'EAS', 'EAP', 'UMC', 'IBD', 'Kuala Lumpur', 101.684, 3.12433], ['NAM', 'NA', 'Namibia', 'SSF', 'SSA', 'UMC', 'IBD', 'Windhoek', 17.0931, -22.5648], ['NCL', 'NC', 'New Caledonia', 'EAS', null, 'HIC', 'LNX', 'Noum\'ea', 166.464, -22.2677], ['NER', 'NE', 'Niger', 'SSF', 'SSA', 'LIC', 'IDX', 'Niamey', 2.1073, 13.514], ['NGA', 'NG', 'Nigeria', 'SSF', 'SSA', 'LMC', 'IDB', 'Abuja', 7.48906, 9.05804], ['NIC', 'NI', 'Nicaragua', 'LCN', 'LAC', 'LMC', 'IDX', 'Managua', -86.2734, 12.1475], ['NLD', 'NL', 'Netherlands', 'ECS', null, 'HIC', 'LNX', 'Amsterdam', 4.89095, 52.3738], ['NOR', 'NO', 'Norway', 'ECS', null, 'HIC', 'LNX', 'Oslo', 10.7387, 59.9138], ['NPL', 'NP', 'Nepal', 'SAS', 'SAS', 'LMC', 'IDX', 'Kathmandu', 85.3157, 27.6939], ['NRU', 'NR', 'Nauru', 'EAS', null, 'HIC', 'IBD', 'Yaren District', 166.920867, -0.5477], ['NZL', 'NZ', 'New Zealand', 'EAS', null, 'HIC', 'LNX', 'Wellington', 174.776, -41.2865], ['OMN', 'OM', 'Oman', 'MEA', null, 'HIC', 'LNX', 'Muscat', 58.5874, 23.6105], ['PAK', 'PK', 'Pakistan', 'SAS', 'SAS', 'LMC', 'IDB', 'Islamabad', 72.8, 30.5167], ['PAN', 'PA', 'Panama', 'LCN', null, 'HIC', 'IBD', 'Panama City', -79.5188, 8.99427], ['PER', 'PE', 'Peru', 'LCN', 'LAC', 'UMC', 'IBD', 'Lima', -77.0465, -12.0931], ['PHL', 'PH', 'Philippines', 'EAS', 'EAP', 'LMC', 'IBD', 'Manila', 121.035, 14.5515], ['PLW', 'PW', 'Palau', 'EAS', null, 'HIC', 'IBD', 'Koror', 134.479, 7.34194], ['PNG', 'PG', 'Papua New Guinea', 'EAS', 'EAP', 'LMC', 'IDB', 'Port Moresby', 147.194, -9.47357], ['POL', 'PL', 'Poland', 'ECS', null, 'HIC', 'IBD', 'Warsaw', 21.02, 52.26], ['PRI', 'PR', 'Puerto Rico', 'LCN', null, 'HIC', 'LNX', 'San Juan', -66, 18.23], ['PRK', 'KP', 'Korea, DPR', 'EAS', 'EAP', 'LIC', 'LNX', 'Pyongyang', 125.754, 39.0319], ['PRT', 'PT', 'Portugal', 'ECS', null, 'HIC', 'LNX', 'Lisbon', -9.13552, 38.7072], ['PRY', 'PY', 'Paraguay', 'LCN', 'LAC', 'UMC', 'IBD', 'Asuncion', -57.6362, -25.3005], ['PSE', 'PS', 'West Bank and Gaza', 'MEA', 'MNA', 'LMC', 'LNX', '', '', ''], ['PYF', 'PF', 'French Polynesia', 'EAS', null, 'HIC', 'LNX', 'Papeete', -149.57, -17.535], ['QAT', 'QA', 'Qatar', 'MEA', null, 'HIC', 'LNX', 'Doha', 51.5082, 25.2948], ['ROU', 'RO', 'Romania', 'ECS', null, 'HIC', 'IBD', 'Bucharest', 26.0979, 44.4479], ['RUS', 'RU', 'Russian Federation', 'ECS', 'ECA', 'UMC', 'IBD', 'Moscow', 37.6176, 55.7558], ['RWA', 'RW', 'Rwanda', 'SSF', 'SSA', 'LIC', 'IDX', 'Kigali', 30.0587, -1.95325], ['SAU', 'SA', 'Saudi Arabia', 'MEA', null, 'HIC', 'LNX', 'Riyadh', 46.6977, 24.6748], ['SDN', 'SD', 'Sudan', 'SSF', 'SSA', 'LIC', 'IDX', 'Khartoum', 32.5363, 15.5932], ['SEN', 'SN', 'Senegal', 'SSF', 'SSA', 'LMC', 'IDX', 'Dakar', -17.4734, 14.7247], ['SGP', 'SG', 'Singapore', 'EAS', null, 'HIC', 'LNX', 'Singapore', 103.85, 1.28941], ['SLB', 'SB', 'Solomon Islands', 'EAS', 'EAP', 'LMC', 'IDX', 'Honiara', 159.949, -9.42676], ['SLE', 'SL', 'Sierra Leone', 'SSF', 'SSA', 'LIC', 'IDX', 'Freetown', -13.2134, 8.4821], ['SLV', 'SV', 'El Salvador', 'LCN', 'LAC', 'LMC', 'IBD', 'San Salvador', -89.2073, 13.7034], ['SMR', 'SM', 'San Marino', 'ECS', null, 'HIC', 'LNX', 'San Marino', 12.4486, 43.9322], ['SOM', 'SO', 'Somalia', 'SSF', 'SSA', 'LIC', 'IDX', 'Mogadishu', 45.3254, 2.07515], ['SRB', 'RS', 'Serbia', 'ECS', 'ECA', 'UMC', 'IBD', 'Belgrade', 20.4656, 44.8024], ['SSD', 'SS', 'South Sudan', 'SSF', 'SSA', 'LIC', 'IDX', 'Juba', 31.6, 4.85], ['STP', 'ST', 'Sao Tome and Principe', 'SSF', 'SSA', 'LMC', 'IDX', 'Sao Tome', 6.6071, 0.20618], ['SUR', 'SR', 'Suriname', 'LCN', 'LAC', 'UMC', 'IBD', 'Paramaribo', -55.1679, 5.8232], ['SVK', 'SK', 'Slovak Rep.', 'ECS', null, 'HIC', 'LNX', 'Bratislava', 17.1073, 48.1484], ['SVN', 'SI', 'Slovenia', 'ECS', null, 'HIC', 'LNX', 'Ljubljana', 14.5044, 46.0546], ['SWE', 'SE', 'Sweden', 'ECS', null, 'HIC', 'LNX', 'Stockholm', 18.0645, 59.3327], ['SWZ', 'SZ', 'Eswatini', 'SSF', 'SSA', 'LMC', 'IBD', 'Mbabane', 31.4659, -26.5225], ['SXM', 'SX', 'Sint Maarten (Dutch part)', 'LCN', null, 'HIC', 'LNX', 'Philipsburg', '', ''], ['SYC', 'SC', 'Seychelles', 'SSF', null, 'HIC', 'IBD', 'Victoria', 55.4466, -4.6309], ['SYR', 'SY', 'Syrian Arab Rep.', 'MEA', 'MNA', 'LIC', 'IDX', 'Damascus', 36.3119, 33.5146], ['TCA', 'TC', 'Turks and Caicos Islands', 'LCN', null, 'HIC', 'LNX', 'Grand Turk', -71.141389, 21.4602778], ['TCD', 'TD', 'Chad', 'SSF', 'SSA', 'LIC', 'IDX', 'N\'Djamena', 15.0445, 12.1048], ['TGO', 'TG', 'Togo', 'SSF', 'SSA', 'LIC', 'IDX', 'Lome', 1.2255, 6.1228], ['THA', 'TH', 'Thailand', 'EAS', 'EAP', 'UMC', 'IBD', 'Bangkok', 100.521, 13.7308], ['TJK', 'TJ', 'Tajikistan', 'ECS', 'ECA', 'LIC', 'IDX', 'Dushanbe', 68.7864, 38.5878], ['TKM', 'TM', 'Turkmenistan', 'ECS', 'ECA', 'UMC', 'IBD', 'Ashgabat', 58.3794, 37.9509], ['TLS', 'TL', 'Timor-Leste', 'EAS', 'EAP', 'LMC', 'IDB', 'Dili', 125.567, -8.56667], ['TON', 'TO', 'Tonga', 'EAS', 'EAP', 'UMC', 'IDX', 'Nuku\'alofa', -175.216, -21.136], ['TTO', 'TT', 'Trinidad and Tobago', 'LCN', null, 'HIC', 'IBD', 'Port-of-Spain', -61.4789, 10.6596], ['TUN', 'TN', 'Tunisia', 'MEA', 'MNA', 'LMC', 'IBD', 'Tunis', 10.21, 36.7899], ['TUR', 'TR', 'Turkey', 'ECS', 'ECA', 'UMC', 'IBD', 'Ankara', 32.3606, 39.7153], ['TUV', 'TV', 'Tuvalu', 'EAS', 'EAP', 'UMC', 'IDX', 'Funafuti', 179.089567, -8.6314877], ['TWN', 'TW', 'Taiwan, China', 'EAS', null, 'HIC', 'LNX', '', '', ''], ['TZA', 'TZ', 'Tanzania', 'SSF', 'SSA', 'LMC', 'IDX', 'Dodoma', 35.7382, -6.17486], ['UGA', 'UG', 'Uganda', 'SSF', 'SSA', 'LIC', 'IDX', 'Kampala', 32.5729, 0.314269], ['UKR', 'UA', 'Ukraine', 'ECS', 'ECA', 'LMC', 'IBD', 'Kiev', 30.5038, 50.4536], ['URY', 'UY', 'Uruguay', 'LCN', null, 'HIC', 'IBD', 'Montevideo', -56.0675, -34.8941], ['USA', 'US', 'United States', 'NAC', null, 'HIC', 'LNX', 'Washington D.C.', -77.032, 38.8895], ['UZB', 'UZ', 'Uzbekistan', 'ECS', 'ECA', 'LMC', 'IDB', 'Tashkent', 69.269, 41.3052], ['VCT', 'VC', 'St. Vincent and the Grenadines', 'LCN', 'LAC', 'UMC', 'IDB', 'Kingstown', -61.2653, 13.2035], ['VEN', 'VE', 'Venezuela, RB', 'LCN', 'LAC', 'UMC', 'IBD', 'Caracas', -69.8371, 9.08165], ['VGB', 'VG', 'British Virgin Islands', 'LCN', null, 'HIC', 'LNX', 'Road Town', -64.623056, 18.431389], ['VIR', 'VI', 'Virgin Islands (U.S.)', 'LCN', null, 'HIC', 'LNX', 'Charlotte Amalie', -64.8963, 18.3358], ['VNM', 'VN', 'Vietnam', 'EAS', 'EAP', 'LMC', 'IBD', 'Hanoi', 105.825, 21.0069], ['VUT', 'VU', 'Vanuatu', 'EAS', 'EAP', 'LMC', 'IDX', 'Port-Vila', 168.321, -17.7404], ['WSM', 'WS', 'Samoa', 'EAS', 'EAP', 'UMC', 'IDX', 'Apia', -171.752, -13.8314], ['XKX', 'XK', 'Kosovo', 'ECS', 'ECA', 'UMC', 'IDX', 'Pristina', 20.926, 42.565], ['YEM', 'YE', 'Yemen, Rep.', 'MEA', 'MNA', 'LIC', 'IDX', 'Sana\'a', 44.2075, 15.352], ['ZAF', 'ZA', 'South Africa', 'SSF', 'SSA', 'UMC', 'IBD', 'Pretoria', 28.1871, -25.746], ['ZMB', 'ZM', 'Zambia', 'SSF', 'SSA', 'LMC', 'IDX', 'Lusaka', 28.2937, -15.3982], ['ZWE', 'ZW', 'Zimbabwe', 'SSF', 'SSA', 'LMC', 'IDB', 'Harare', 31.0672, -17.8312]]
};

const CountryIsos = {
  Aruba: 'ABW',
  Afghanistan: 'AFG',
  Angola: 'AGO',
  Albania: 'ALB',
  Andorra: 'AND',
  United_Arab_Emirates: 'ARE',
  Argentina: 'ARG',
  Armenia: 'ARM',
  American_Samoa: 'ASM',
  Antigua_and_Barbuda: 'ATG',
  Australia: 'AUS',
  Austria: 'AUT',
  Azerbaijan: 'AZE',
  Burundi: 'BDI',
  Belgium: 'BEL',
  Benin: 'BEN',
  Burkina_Faso: 'BFA',
  Bangladesh: 'BGD',
  Bulgaria: 'BGR',
  Bahrain: 'BHR',
  Bahamas_The: 'BHS',
  Bosnia_and_Herzegovina: 'BIH',
  Belarus: 'BLR',
  Belize: 'BLZ',
  Bermuda: 'BMU',
  Bolivia: 'BOL',
  Brazil: 'BRA',
  Barbados: 'BRB',
  Brunei_Darussalam: 'BRN',
  Bhutan: 'BTN',
  Botswana: 'BWA',
  Central_African_Rep: 'CAF',
  Canada: 'CAN',
  Switzerland: 'CHE',
  Channel_Islands: 'CHI',
  Chile: 'CHL',
  China: 'CHN',
  Cote_d_Ivoire: 'CIV',
  Cameroon: 'CMR',
  Congo_DR: 'COD',
  Congo_Rep: 'COG',
  Colombia: 'COL',
  Comoros: 'COM',
  Cabo_Verde: 'CPV',
  Costa_Rica: 'CRI',
  Cuba: 'CUB',
  Curacao: 'CUW',
  Cayman_Islands: 'CYM',
  Cyprus: 'CYP',
  Czech_Rep: 'CZE',
  Germany: 'DEU',
  Djibouti: 'DJI',
  Dominica: 'DMA',
  Denmark: 'DNK',
  Dominican_Rep: 'DOM',
  Algeria: 'DZA',
  Ecuador: 'ECU',
  Egypt_Arab_Rep: 'EGY',
  Eritrea: 'ERI',
  Spain: 'ESP',
  Estonia: 'EST',
  Ethiopia: 'ETH',
  Finland: 'FIN',
  Fiji: 'FJI',
  France: 'FRA',
  Faroe_Islands: 'FRO',
  Micronesia_Fed_Sts: 'FSM',
  Gabon: 'GAB',
  United_Kingdom: 'GBR',
  Georgia: 'GEO',
  Ghana: 'GHA',
  Gibraltar: 'GIB',
  Guinea: 'GIN',
  Gambia_The: 'GMB',
  Guinea_Bissau: 'GNB',
  Equatorial_Guinea: 'GNQ',
  Greece: 'GRC',
  Grenada: 'GRD',
  Greenland: 'GRL',
  Guatemala: 'GTM',
  Guam: 'GUM',
  Guyana: 'GUY',
  Hong_Kong_SAR_China: 'HKG',
  Honduras: 'HND',
  Croatia: 'HRV',
  Haiti: 'HTI',
  Hungary: 'HUN',
  Indonesia: 'IDN',
  Isle_of_Man: 'IMN',
  India: 'IND',
  Ireland: 'IRL',
  Iran: 'IRN',
  Iraq: 'IRQ',
  Iceland: 'ISL',
  Israel: 'ISR',
  Italy: 'ITA',
  Jamaica: 'JAM',
  Jordan: 'JOR',
  Japan: 'JPN',
  Kazakhstan: 'KAZ',
  Kenya: 'KEN',
  Kyrgyz_Rep: 'KGZ',
  Cambodia: 'KHM',
  Kiribati: 'KIR',
  St_Kitts_and_Nevis: 'KNA',
  Korea_Rep: 'KOR',
  Kuwait: 'KWT',
  Lao_PDR: 'LAO',
  Lebanon: 'LBN',
  Liberia: 'LBR',
  Libya: 'LBY',
  St_Lucia: 'LCA',
  Liechtenstein: 'LIE',
  Sri_Lanka: 'LKA',
  Lesotho: 'LSO',
  Lithuania: 'LTU',
  Luxembourg: 'LUX',
  Latvia: 'LVA',
  Macao_SAR_China: 'MAC',
  St_Martin_French_part: 'MAF',
  Morocco: 'MAR',
  Monaco: 'MCO',
  Moldova: 'MDA',
  Madagascar: 'MDG',
  Maldives: 'MDV',
  Mexico: 'MEX',
  Marshall_Islands: 'MHL',
  North_Macedonia: 'MKD',
  Mali: 'MLI',
  Malta: 'MLT',
  Myanmar: 'MMR',
  Montenegro: 'MNE',
  Mongolia: 'MNG',
  Northern_Mariana_Islands: 'MNP',
  Mozambique: 'MOZ',
  Mauritania: 'MRT',
  Mauritius: 'MUS',
  Malawi: 'MWI',
  Malaysia: 'MYS',
  Namibia: 'NAM',
  New_Caledonia: 'NCL',
  Niger: 'NER',
  Nigeria: 'NGA',
  Nicaragua: 'NIC',
  Netherlands: 'NLD',
  Norway: 'NOR',
  Nepal: 'NPL',
  Nauru: 'NRU',
  New_Zealand: 'NZL',
  Oman: 'OMN',
  Pakistan: 'PAK',
  Panama: 'PAN',
  Peru: 'PER',
  Philippines: 'PHL',
  Palau: 'PLW',
  Papua_New_Guinea: 'PNG',
  Poland: 'POL',
  Puerto_Rico: 'PRI',
  Korea_DPR: 'PRK',
  Portugal: 'PRT',
  Paraguay: 'PRY',
  West_Bank_and_Gaza: 'PSE',
  French_Polynesia: 'PYF',
  Qatar: 'QAT',
  Romania: 'ROU',
  Russian_Federation: 'RUS',
  Rwanda: 'RWA',
  Saudi_Arabia: 'SAU',
  Sudan: 'SDN',
  Senegal: 'SEN',
  Singapore: 'SGP',
  Solomon_Islands: 'SLB',
  Sierra_Leone: 'SLE',
  El_Salvador: 'SLV',
  San_Marino: 'SMR',
  Somalia: 'SOM',
  Serbia: 'SRB',
  South_Sudan: 'SSD',
  Sao_Tome_and_Principe: 'STP',
  Suriname: 'SUR',
  Slovak_Rep: 'SVK',
  Slovenia: 'SVN',
  Sweden: 'SWE',
  Eswatini: 'SWZ',
  Sint_Maarten_Dutch_part: 'SXM',
  Seychelles: 'SYC',
  Syrian_Arab_Rep: 'SYR',
  Turks_and_Caicos_Islands: 'TCA',
  Chad: 'TCD',
  Togo: 'TGO',
  Thailand: 'THA',
  Tajikistan: 'TJK',
  Turkmenistan: 'TKM',
  Timor_Leste: 'TLS',
  Tonga: 'TON',
  Trinidad_and_Tobago: 'TTO',
  Tunisia: 'TUN',
  Turkey: 'TUR',
  Tuvalu: 'TUV',
  Taiwan_China: 'TWN',
  Tanzania: 'TZA',
  Uganda: 'UGA',
  Ukraine: 'UKR',
  Uruguay: 'URY',
  United_States: 'USA',
  Uzbekistan: 'UZB',
  St_Vincent_and_the_Grenadines: 'VCT',
  Venezuela_RB: 'VEN',
  British_Virgin_Islands: 'VGB',
  Virgin_Islands_U_S: 'VIR',
  Vietnam: 'VNM',
  Vanuatu: 'VUT',
  Samoa: 'WSM',
  Kosovo: 'XKX',
  Yemen_Rep: 'YEM',
  South_Africa: 'ZAF',
  Zambia: 'ZMB',
  Zimbabwe: 'ZWE'
};

const BASE = 'http://api.worldbank.org/v2';
const getCountries = async function ({
  format = enumTabularTypes.SAMPLES
} = {}) {
  return await acq.Acq.tabular({
    title: 'countries',
    url: `${BASE}/country`,
    params: {
      format: 'json',
      per_page: 512
    },
    prep: ([, samples]) => samples.filter(({
      region: {
        id
      }
    }) => id !== 'NA'),
    from: enumTabularTypes.SAMPLES,
    to: format
  });
};
const getCountriesAndRegions = async function ({
  format = enumTabularTypes.SAMPLES
} = {}) {
  return await acq.Acq.tabular({
    title: 'countries',
    url: `${BASE}/country`,
    params: {
      format: 'json',
      per_page: 512
    },
    prep: ([, samples]) => samples,
    from: enumTabularTypes.SAMPLES,
    to: format
  });
};
const getRegions = async function ({
  format = enumTabularTypes.SAMPLES
} = {}) {
  return await acq.Acq.tabular({
    title: 'regions',
    url: `${BASE}/regions`,
    params: {
      format: 'json',
      per_page: 512
    },
    prep: ([, samples]) => samples,
    from: enumTabularTypes.SAMPLES,
    to: format
  });
};

const LendingTypes = {
  LNX: 'Not classified',
  IDX: 'IDA',
  IBD: 'IBRD',
  IDB: 'Blend'
};

const AdminRegions = {
  SAS: 'South Asia',
  SSA: 'Sub-Saharan Africa (excluding high income)',
  ECA: 'Europe & Central Asia (excluding high income)',
  LAC: 'Latin America & Caribbean (excluding high income)',
  EAP: 'East Asia & Pacific (excluding high income)',
  MNA: 'Middle East & North Africa (excluding high income)'
};

const Regions = {
  LCN: 'Latin America & Caribbean ',
  SAS: 'South Asia',
  SSF: 'Sub-Saharan Africa ',
  ECS: 'Europe & Central Asia',
  MEA: 'Middle East & North Africa',
  EAS: 'East Asia & Pacific',
  NAC: 'North America'
};

const IncomeLevels = {
  HIC: 'High income',
  LIC: 'Low income',
  LMC: 'Lower middle income',
  UMC: 'Upper middle income'
};

exports.AdminRegions = AdminRegions;
exports.CountryIsos = CountryIsos;
exports.CountryTable = CountryTable;
exports.IncomeLevels = IncomeLevels;
exports.LendingTypes = LendingTypes;
exports.Regions = Regions;
exports.getCountries = getCountries;
exports.getCountriesAndRegions = getCountriesAndRegions;
exports.getRegions = getRegions;
