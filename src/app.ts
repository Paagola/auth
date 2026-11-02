import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/error.js';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import webRoutes from './modules/web/web.routes.js';

const app = express();

app.set('view engine', 'ejs'); // Las vistas son archivos .ejs
app.set('views', 'src/views'); // Carpeta donde están las vistas

app.use(helmet()); // Añade cabeceras de seguridad.
app.use(cors()); // Permite solicitudes de cualquier origen.
app.use(express.json()); // Analiza el cuerpo de las solicitudes entrantes como JSON.
app.use(express.urlencoded({ extended: false })); // Analiza los datos de formularios HTML.
app.use(morgan('dev')); // Registra las solicitudes HTTP en la consola para depuración.

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes); // API (responde JSON)
app.use('/api/users', usersRoutes);
app.use('/', webRoutes); // Web (responde HTML)

app.use(errorHandler);

export default app;

