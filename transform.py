import pandas as pd
import csv
import json
from pandas.io.json import json_normalize

def load():
    # load csv as DataFrame
    df_trees = pd.read_csv('data_new.csv')


    # df_trees = pd.read_json('world_countries.json')
    # x = df_trees.drop("type", axis=1)
    #
    # df_2 = (df_trees["features"])
    # print(df_2[1])
    #load json object
    with open('world_countries.json') as f:
        d = json.load(f)

    #lets put the data into a pandas df
    #clicking on raw_nyc_phil.json under "Input Files"
    #tells us parent node is 'programs'
    df_countries = json_normalize(d['features'])
    df_countries.rename(columns={'id': 'Country Code', 'properties.name': 'Country Name'}, inplace=True)
    # print(df_countries)
    # print(df_trees)

    # result = df_countries.append(df_trees, sort=False)
    # result = pd.concat([df_countries, df_trees], axis=1,join_axes=[df_countries.index])
    result = pd.merge(df_countries, df_trees, on='Country Name', how='left')
    # with pd.option_context('display.max_rows', None):
    #     print(result)
    result.set_index("Country Name", inplace=True)
    print(result)
    result.to_json("new_json.json", orient='index')


# def parsing(df):
#     # select data from NETHERLANDS
#     df = df.loc[lambda df: df.Country == 'NETHERLANDS', :]
#
#     # select columns of interest
#     df = df[['Year', 'Total']]
#     return(df)


# def converting(df):
#
#     # set country as index
#     df = df.set_index('Year')
#
#     # make json with Country as index
#     df.to_json('country.json', orient='index')


if __name__ == "__main__":
    df = load()
    # parsed_df = parsing(df)
    # converting(parsed_df)
