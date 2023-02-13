import {Router} from "express";
import path from "path";
//import {upload} from "../index.js";
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import { Storage } from "@google-cloud/storage";


import puppeteer from "puppeteer";

let newPage;


let funcion = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto('http://localhost:3000/');
  
    await page.evaluate(() => {
      document.querySelector('image-button').innerHTML = 'Nuevo contenido';
    });
  
    await browser.close();
};

/*(async () => {
    let browser = await puppeteer.launch();


        let page = await browser.newPage();
        await page.goto('http://localhost:3000', {waitUntil: 'load'});


     newPage = await page.evaluate(() => {

        return  document.getElementById("image-button").innerHTML;

        });

     console.log(newPage)

     await page.evaluate(() => {
        
        newPage = "change to something"
     });



  })();;*/

const router = Router();





const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'src/public/uploads')
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        
        //let photoPath =  path.extname(file.originalname) + uuidv4();
       /* async function funcion()  {
            console.log("holaaaa")
            let browser = await puppeteer.launch();
        
        
                let page = await browser.newPage();
                await page.goto('http://localhost:3000', {waitUntil: 'load'});
        
        
             newPage = await page.evaluate(() => {
        
                return  document.getElementById("image-button").innerHTML;
        
                });
        
             console.log(newPage)
        
             await page.evaluate(() => {
                console.log("DEBE");
                document.getElementById("image-button").innerHTML = "change to something"
                console.log("DEBERIA")
             });
        
             await browser.close();
        
          };  
          funcion();;
        console.log("hola");*/

       //newPage = `<input type="text" value="${'http://localhost:3000' + photoPath}" id="myInput"></input> <button onclick="myFunction()">Copy text</button>`
        cb(null, file.originalname);
        
        //cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: archivo debe ser una imagen valida");
    }
});

router.get("/", (req, res)=>{
    res.render('index.ejs');
});

router.post("/", upload.single("images"),(req, res)=> {

    res.render("uploaded.ejs");
});

router.get("/a", (req, res)=>{
    res.render('uploaded.ejs');
})


router.post("/a", upload.single("photo"), (req, res)=> {
    res.render("uploaded.ejs");
});

export default router;