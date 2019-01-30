import pandas as pd
import json
from pandas.io.json import json_normalize


def load():
    # load csv as DataFrame
    df_trees = pd.read_csv('../..Data/data_2.csv')

    # load json object
    with open('../..Data/world_countries.json') as f:
        d = json.load(f)

    # normalize json to remove all nesting
    df_countries = json_normalize(d['features'])

    # rename column names
    df_countries.rename(columns={'id': 'Country Code', 'properties.name':
                                 'Country Name', 'type': 'type_1',
                                 'geometry.coordinates': 'coordinates',
                                 'geometry.type': 'type'}, inplace=True)

    # merge dataset of countries coordinates and forest data
    result = pd.merge(df_countries, df_trees, on='Country Name', how='left')

    # replace None with null since this is proper js
    result = result.where((pd.notnull(result)), None)

    # make pandas pd into dictionary
    result = result.to_dict(orient='records')

    # list all years
    temp_list = []
    for year in range(1990, 2016):
       jaar = str(year)
       temp_list.append(jaar)

    # nest data into dictionary so data of all years in under one title
    temp_list_2 = []
    for i in range(len(result)):
        temp_list_2 = []
        for year in temp_list:
            temp_list_2.append({"year": year, "value": result[i][year]})
        result[i]['Years'] = temp_list_2
        for year in temp_list:
            del(result[i][year])

    # create json
    with open('../..Data/new_json.json', 'w') as outfile:
        json.dump(result, outfile)


if __name__ == "__main__":
    df = load()
