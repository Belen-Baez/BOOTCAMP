import { Router } from 'express';
import { getTurnos, createTurno, deleteTurno, marcarAtendido } from './turnos.controllers';
import { validarSchema } from '../../middlewares/validarDatos.middleware'
import { CrearTurnoSchema } from './dtos/Turno.schema';

const router = Router();

router.get('/', getTurnos);
router.post('/', validarSchema(CrearTurnoSchema), createTurno);
router.delete('/:id', deleteTurno);
router.patch('/:id', marcarAtendido);

export default router;