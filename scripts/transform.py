import pandas as pd
import csv
import json
from pandas.io.json import json_normalize


def load():
    # load csv as DataFrame
    df_trees = pd.read_csv('data_2.csv')


    # df_trees = pd.read_json('world_countries.json')
    # x = df_trees.drop("type", axis=1)
    #
    # df_2 = (df_trees["features"])
    # print(df_2[1])
    #load json object
    with open('../world_countries.json') as f:
        d = json.load(f)

    #lets put the data into a pandas df
    #clicking on raw_nyc_phil.json under "Input Files"
    #tells us parent node is 'programs'

    df_countries = json_normalize(d['features'])

    df_countries.rename(columns={'id': 'Country Code', 'properties.name': 'Country Name', 'type': 'type_1', 'geometry.coordinates': 'coordinates', 'geometry.type': 'type'}, inplace=True)
    # print(df_countries)
    # print(df_trees)

    # result = df_countries.append(df_trees, sort=False)
    # result = pd.concat([df_countries, df_trees], axis=1,join_axes=[df_countries.index])
    result = pd.merge(df_countries, df_trees, on='Country Name', how='left')
    # with pd.option_context('display.max_columns', None):
    #     print(result)
    # result.set_index("Country Name", inplace=True)



    result.to_json("new_json.json", orient='records')

    # columns = result.columns.tolist()
    # columns.remove('coordinates')
    # columns.remove('type')
    # print(result.coordinates)

    # temp_list = []
    # for year in range(1990,2016):
    #    jaar = str(year)
    #    temp_list.append(jaar)
    # print(temp_list)
    # for datum in temp_list:
    #     columns.remove(datum)
    # print(columns)
    # j = (result.groupby(columns, as_index=False)
    #              .apply(lambda x: x[temp_list].to_dict('r'))
    #
    #              .reset_index()
    #
    #              .rename(columns={0:'years'})
    #
    #              .to_json("new_json.json",orient='records'))

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
