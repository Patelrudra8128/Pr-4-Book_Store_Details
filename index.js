const express = require('express');
const path = require('path');
const port = 5000;

const app = express();

const db =  require('./config/mongoose');
const tbl =  require('./models/admintbl')

app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    tbl.find({}).then((data)=>{
        return res.render('form',{
            img: '/abstractColor.jpg',
            img2 : '/artwork.png',
            img3: '/doodle.png',
            img4: '/dynamicToDo_Bootstrap_jquery.png',
            data
        });
    }).catch((err)=>{
        console.log(err);
        return false;
    })
    
})

app.get('/deleteData',(req,res)=>{
    let id = req.query.id
    tbl.findByIdAndDelete(id).then((success)=>{
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.post('/insertData',(req,res)=>{
    const {name,price,pages,author} = req.body;
    tbl.create({
        name : name,
        price : price,
        pages : pages,
        author : author
    }).then((success)=>{
        console.log("Record Inserted Successfully");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/editData',(req,res)=>{
    let editid = req.query.id;
    tbl.findById(editid).then((data)=>{
        return res.render('edit',{
            img: '/abstractColor.jpg',
            img2 : '/artwork.png',
            img3: '/doodle.png',
            img4: '/dynamicToDo_Bootstrap_jquery.png',
            single : data
        });
    }).catch((err)=>{
        console.log(err);
        return false;
    })  
})

app.post('/updateData',(req,res)=>{
    let id = req.body.upid;
    const {name,price,pages,author} = req.body;
    tbl.findByIdAndUpdate((id),{
        name : name,
        price : price,
        pages : pages,
        author : author
    }).then((success)=>{
        console.log("Record Updated Successfully");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not ready");
        return false;
    }
    console.log("Server is ready");
})