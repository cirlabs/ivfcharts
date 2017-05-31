move: data.json
	cp data.json ../app/scripts/

data.json: births.csv
	csvjson births.csv > data.json

births.csv: births.xlsx
	in2csv births.xlsx > births.csv

clean:
	rm data.json births.csv 
