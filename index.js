const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbOper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

// MongoClient.connect(url,(err,client)=>{
//     assert.strictEqual(err,null);

//     console.log('Connected to server successfully');
//     const db = client.db(dbname);
    // const collection =  db.collection('dishes');

    // collection.insertOne({"name":"Shivam","Description":"Hello there, I'm Shivam Patel!"},(err, result)=>{

    //     assert.strictEqual(err,null);
    //     console.log('After insert:\n');
    //     console.log(result.ops);

    //     collection.find({}).toArray((err,docs)=>{
    //         assert.strictEqual(err,null);
    //         console.log('Found:\n');
    //         console.log(docs);

    //         db.dropCollection('dishes', (err,result)=>{
    //             assert.strictEqual(err,null);
    //             client.close();
    //         })
    //     });
    // });

    // Using Callbacks
//     dbOper.insertDocument(db, {name: "Vasundhara", description: 'Good '},'dishes', (result)=>{
//         console.log('Insert Document:\n',result.ops);

//         dbOper.findDocuments(db,'dishes',(docs)=>{
//             console.log("Found documents:\n",docs);
//             dbOper.updateDocument(db,({name: 'Vasundhara'}), {description: 'Updated Good'}, 'dishes', (result)=>{
//                 console.log('Updated Document:\n', result.result);

//                 dbOper.findDocuments(db,'dishes',(docs)=>{
//                     console.log("Found documents:\n",docs);

//                     db.dropCollection('dishes',(result)=>{
//                         console.log('Dropped Collection: ',result);

//                         client.close();
//                     });
//                 });
//             });
//         });
//     });
// });

// Using promises to reduce callback complexity
MongoClient.connect(url).then((client)=>{
    console.log('Connected to server successfully');
    const db = client.db(dbname);
 
    dbOper.insertDocument(db, {name: "Vasundhara", description: 'Good '},'dishes') 
    .then((result)=>{
        console.log('Insert Document:\n',result.ops);

        return dbOper.findDocuments(db,'dishes');
    })
        .then((docs)=>{
            console.log("Found documents:\n",docs);
            return dbOper.updateDocument(db,({name: 'Vasundhara'}), {description: 'Updated Good'}, 'dishes')
        })
             .then((result)=>{
                console.log('Updated Document:\n', result.result);

                return dbOper.findDocuments(db,'dishes');
             })
                .then((docs)=>{
                    console.log("Found documents:\n",docs);

                    return db.dropCollection('dishes');
                })
                    .then((result)=>{
                        console.log('Dropped Collection: ',result);

                        return client.close();
                    })
                    .catch((err)=> console.log(err));
})
.catch((err) => console.log(err));