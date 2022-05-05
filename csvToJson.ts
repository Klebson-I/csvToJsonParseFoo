import {parse} from 'csv-parse';
import {createReadStream} from 'fs';

// first argument is a path to the csv file
// second is a delimiter used in csv to split data, by default it's "," but there are a lot of exceptions like ";",
// so make sure what it is in your file

const csvToJson = async (path: string, delimiter: string) => {

    const arrayOfReadStringsArray: string[][] = [];

    //funtion that changes data from csv rows to array of strings array

    const readData = async (): Promise<string[][]> => {

        return new Promise((resolve, reject) => {

            createReadStream(path)
                .pipe(
                    parse({

                        delimiter

                    })
                )
                .on('error',()=>{

                    reject();

                })
                .on("data", (data:string[])=> {

                    arrayOfReadStringsArray.push(data);

                })
                .on('end', () => {

                    resolve(arrayOfReadStringsArray);

                })
        })
    }

    const parseRawData = (dataArr: string[][]): Record<any, string>[] => {
        //take a field names from first row
        const fieldNames = [...dataArr][0];
        //remove a field names from arr so only data left
        dataArr.splice(0, 1);
        //type for objects
        type returnObjectType = Record<any, string>;

        return dataArr.map(singleRow => {

            let obj: returnObjectType = {};

            for (let i = 0; i < singleRow.length; i++) {
                obj[`${fieldNames[i]}`] = singleRow[i];
            }

            return obj;

        })

    }

    const rawData = await readData();

    return JSON.stringify(parseRawData(rawData));

}

(async () => {
    console.log(await csvToJson("./training.csv", ";"));
})();
