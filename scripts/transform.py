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
    # result.fillna(, inplace=True)
    result = result.where((pd.notnull(result)), None)
    print(result)


    # print(result)
    result = result.to_dict(orient='records') #"new_json.json",
    # result[0]['2016']= {'2017':result[0]['2015'],'2018':result[0]['2015']}
    # print(result)

    # columns = result.columns.tolist()
    # columns.remove('coordinates')
    # columns.remove('type')
    # print(result.coordinates)

    temp_list = []
    for year in range(1990,2016):
       jaar = str(year)
       temp_list.append(jaar)
    # print(temp_list)
    # for i in range(len(result)):
    #     result[i]['Years'] = {"year":'1990', "value":result[i]['1990']},{"year":'1991',"value":result[i]['1991']},{"year":'1992',"value":result[i]['1992']},
    #     {"year":'1993',"value":result[i]['1993']},{"year":'1994',"value":result[i]['1994']},{"year":'1995',"value":result[i]['1995']},{"year":'1996',"value":result[i]['1996']},
    #     {"year":'1997',"value":result[i]['1997']},{"year":'1998',"value":result[i]['1998']},{"year":'1999',"value":result[i]['1999']},{"year":'2000',"value":result[i]['2000']},
    #     {"year":'2001',"value":result[i]['2001']},{"year":'2002',"value":result[i]['2002']},{"year":'2003',"value":result[i]['2003']},{"year":'2004',"value":result[i]['2004']},
    #     {"year":'2005',"value":result[i]['2005']},{"year":'2006',"value":result[i]['2006']},{"year":'2007',"value":result[i]['2007']},{"year":'2008',"value":result[i]['2008']},
    #     {"year":'2009',"value":result[i]['2009']},{"year":'2010',"value":result[i]['2010']},{"year":'2011',"value":result[i]['2011']},{"year":'2012',"value":result[i]['2012']},
    #     {"year":'2013',"value":result[i]['2013']},{"year":'2014',"value":result[i]['2014']},{"year":'2015',"value":result[i]['2015']}
    #     for year in temp_list:
    #         del(result[i][year])
    temp_dict = dict()
    temp_list_2 = []
    # for i in range(len(result)):
    #     for year in temp_list:
    #         temp_list_2 = (result[i][year])
    # print(dict(zip(temp_list, temp_list_2))
        # dict(zip(temp_list, values))
    for i in range(len(result)):
        temp_list_2 = []
        for year in temp_list:
            temp_list_2.append({"year":year, "value":result[i][year]})
        result[i]['Years'] = temp_list_2
        for year in temp_list:
            del(result[i][year])
    print(result)
    # print(result[0])
    # for i in result:
    #     for j in i:
    #
    #         if i[j] == 'NaN':
    #             i[j] == 'null'
    #         print(i[j])

    with open('new_json.json', 'w') as outfile:
        json.dump(result, outfile)



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
