import express from "express";
import path, {dirname, join} from "path";
import { fileURLToPath } from "url";
import indexRoutes from './routes/index.js';



//import multer from "multer";

/*const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
}); */

//const upload = multer({storage: storage});
const app = express();
const PORT = 3000;


const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views/js')));
app.set('view engine', 'ejs');
app.use('/', indexRoutes);


app.use(express.static(join(__dirname, 'public')));

app.use(express.static(join(__dirname, 'routes')));

app.listen(PORT, (error)=>{
    if (!error) {
        console.log("Server corriendo en puerto " + PORT);
    } else {
        console.log("Error: " + error);
    }
});

//export { upload }