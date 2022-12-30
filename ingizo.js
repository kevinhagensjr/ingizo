const fs = require('fs');
const { parse } = require('csv'); 

class Ingizo{

    async csv(path){
        return new Promise( (resolve,reject) => {
            if(!path){return false;}

            let i = 0;
            let data = {};

            fs.createReadStream(path)
            .pipe(parse({delimiter:","}))
            .on("data", (row)=>{
                if(i == 0) //transform headers into keys
                    for(let col of row) data[col] = [];
                else{
                    const cols = Object.keys(data);
                    for(let x=0; x<row.length;x++)
                        data[cols[x]].push(row[x]); //add data to specific key
                }
                i++;
            })
            .on("end", function () {
                resolve(data);
            })
            .on("error", function (error) {
                reject(error);
            });   
        });
    }

    //perform min-max normaliztion algorithm f(x) ∈ [0,1]
    normalize(col,min=false,max=false){

        col = col.map((x) => parseFloat(x));

        min = min ? min : Math.min(...col);
        max = max ? max : Math.max(...col);

        return col.map((e) => (e - min) / (max-min) );
    }

    //standardize the input by seting the mean = 0, and normalizing around it
    standardize(col){

        //calculate the mean
        const mean = col.reduce((a,c) => parseFloat(a) + parseFloat(c) ) / col.length;

        //calculate standard deviation
        const sd = Math.sqrt(col.map((e,i) => Math.pow((e - mean),2)).reduce((a,c) => a+c) / col.length);

        return col.map((e,i) => (e - mean)/sd);
    }

    label(col,categories=null){

        //get all unique category varaibles from col, ordinal by default
        categories = categories ? categories : Array.from(new Set(col));

        //variable is mapped to index of categorie list
        return col.map((x,i) => categories.indexOf(x) + 1); 
    }

    oneHot(col,categories=null){

        //get all unique category varaibles from col
        categories = categories ? categories :  Array.from(new Set(col));
        
        //expand column space with binary values
        let matrix = [];
        for(let r=0; r<categories.length;r++){
            matrix[r] = new Array(categories.length);
            for(let c=0; c<col.length;c++){
                matrix[r][c] = (categories[r] == col[c]) ? 1 : 0;
            }
        }

        return matrix;
    }

    target(col,targets){
        let means = {};
        let occur = [];

        //sum all the individual categories relative to outputs
        for(let i=0; i<targets.length;i++){
            if(!means[col[i]]){
                means[col[i]] = parseFloat(targets[i]);
                occur[col[i]] = 1
            }else{
                means[col[i]] += parseFloat(targets[i]);
                occur[col[i]]++;
            } 
        }

        //calcuate the mean for each category
        for(let cat in means){
            means[cat] = means[cat] / occur[cat];
        }
        
        //set each row to the proper mean
        return col.map((e,i) => means[e]);
    }
}

module.exports = new Ingizo();