import {parse} from 'csv-parse';
import {createReadStream} from 'fs';

const csvToJson = (path:string,delimiter:string) => {

    const arrayOfReadedStringsArray : string[][] = [];

    const readData = async () => {
        return new Promise((resolve, reject)  => {
            createReadStream(path)
                .pipe(
                    parse({
                        delimiter
                    })
                )
                .on('error',()=>{
                    reject();
                })
                .on("data", (data:string[])=>{
                    arrayOfReadedStringsArray.push(data);
                })
                .on('end',()=>{
                    resolve(arrayOfReadedStringsArray);
                })
        })
    }


}