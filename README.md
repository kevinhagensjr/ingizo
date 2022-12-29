# Ingizo
## Feature category encoder for machine learning applications

### Introduciton
Machine learning algorithms require inputs to be in numerical form to execute proper calculations. The process of converting categorial data into numerical form for processing is called feature encoding. Ingizo is a basic javascript library that performs these tasks.

### Installation

#### NPM installation

```
npm install -y ingizo
```

### Usage

#### Normalize

Normalize a column of data between the interval 0-1 using min max normalization

`Ingizo.normalize(col : array, min : float (optional) , max : float (optional) )`

```
let data = [1,2,3,4,5];

const ingizo = new Ingizo();
ingizo.normalize(data);

output: [ 0, 0.25, 0.5, 0.75, 1 ]  
```

#### Standardize

standardize a column of data, setting mean 0, and shifting data points based on variance

`Ingizo.standardize(col : array)`

```
let data = [1,2,3,4,5];

const ingizo = new Ingizo();
ingizo.standardize(data);

output: [-1.414213562373095,-0.7071067811865475,0,0.7071067811865475,1.414213562373095]
```

#### Label Encode

Perform label encoding on a column of ordinal or nominal data

`Ingizo.label(col : array, categories : array (optional))`

```
let data = ['hs','bachelors','masters','phd'];

const ingizo = new Ingizo();
ingizo.label(data);

output: [ 1, 2, 3, 4 ]
```

#### One-Hot Encode

Perform one-hot encoding on a column of nominal data

`Ingizo.label(col : array, categories : array (optional))`

```
let data = ['hs','bachelors','masters','phd'];

const ingizo = new Ingizo();
ingizo.oneHot(data);

output: [ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1 ] ]
```

#### Target Encode

Perform target encoding on a column of data based on the mean of corresponding output

```
const edu = ['hs','hs','bachelors','bachelors','masters','masters','phd','phd'];
const salary = ['60','75','80','95','120','150','200','175'];

const ingizo = new Ingizo();
ingizo.target(edu,salary)

output: [ 67.5,  67.5, 87.5, 87.5, 135, 135, 187.5, 187.5]
```

#### CSV encoding

Convert a CSV file of raw data into json object of columns for encoding

Example data: Robototic joints and corresponding position vectors

```
q1,q2,q3,q4,q5,q6,x,y,z
-1.51E+00,-7.63E-01,1.85E+00,-8.17E-01,9.12E-01,2.32E+00,-9.47E-02,1.50E-01,3.01E-01
-2.84E+00,5.20E-01,1.58E+00,-1.27E+00,-1.39E+00,6.17E-01,1.42E-01,-1.00E-01,2.25E-01
-1.23E+00,6.95E-01,1.22E+00,-1.13E+00,3.43E-02,6.27E+00,-8.33E-02,2.23E-01,2.06E-01
-1.99E+00,1.06E+00,1.74E+00,-1.76E+00,-1.24E+00,4.76E+00,1.35E-01,-3.14E-02,3.70E-01
1.05E+00,8.36E-01,1.34E+00,-1.89E+00,4.84E-01,4.38E+00,-5.60E-02,-2.29E-01,2.60E-01
7.62E-01,-7.17E-01,1.86E+00,1.25E+00,4.77E-01,6.11E+00,-1.68E-01,-7.12E-02,2.45E-01
-9.43E-02,-1.01E+00,1.35E+00,2.37E+00,-6.35E-01,4.87E+00,4.22E-03,-6.16E-02,1.20E-01
-1.38E+00,1.39E+00,1.34E+00,-2.53E+00,6.26E-01,3.61E+00,-9.54E-02,2.35E-01,3.55E-01
2.75E+00,-3.58E-01,1.65E+00,-1.48E+00,-1.28E+00,3.17E+00,-2.42E-03,-1.50E-01,2.09E-01
```

```
const ingizo = new Ingizo();
let data = await ingizo.csv('./test.csv');

output: 
{
  q1: [
    '-1.51E+00', '-2.84E+00',
    '-1.23E+00', '-1.99E+00',
    '1.05E+00',  '7.62E-01',
    '-9.43E-02', '-1.38E+00',
    '2.75E+00'
  ],
  q2: [
    '-7.63E-01', '5.20E-01',
    '6.95E-01',  '1.06E+00',
    '8.36E-01',  '-7.17E-01',
    '-1.01E+00', '1.39E+00',
    '-3.58E-01'
  ],
  q3: [
    '1.85E+00', '1.58E+00',
    '1.22E+00', '1.74E+00',
    '1.34E+00', '1.86E+00',
    '1.35E+00', '1.34E+00',
    '1.65E+00'
  ] ,
  .....
}
```