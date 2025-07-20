import mongoose from 'mongoose';

const HomeSchema = new mongoose.Schema({
  titulo: {type: String, required: true },
  descricao: String
});

// Modelo exportado
const HomeModel = mongoose.model('Home', HomeSchema);

class Model {
  
}

export default HomeModel;
