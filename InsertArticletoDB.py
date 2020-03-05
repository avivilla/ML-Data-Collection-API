import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["NewsDB"]
mycol = mydb["articles1"]
# print(mydb.list_collection_names())
f = open('articleset01.txt',"r")
lines = f.read().split('\n')
# close the file after reading the lines.
f.close()
i = 1
for line in lines :
    mydict={"id":i,"article":line}
    i+=1
    x = mycol.insert_one(mydict)
    print(x.inserted_id)