import { Component } from 'react';
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const url = 'http://localhost:8080/api/v1/personas';
const urlID = 'http://localhost:8080/api/v1/personas/';


class App extends Component {


  state ={
    data:[],
    modalInsertar: false,
    modalEliminar:false,
    form:{
      id: '',
      nombre: '',
      apellido: '',
      telefono: '',
      password: '',
      legajo: '',
      email: '',
      rol: '',
      fechaAlta: '',
      tipoModal: '',
    }
  }

  peticionPost = async () => {
    try {
      await axios.post(url, this.state.form);
      this.modalInsertar();
      this.peticionGet();
      toast.success('Persona agregada exitosamente');
    } catch (error) {
      console.error('ERROR:', error);
      toast.error('ERROR: Verifique los datos ingresados');
    }
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPut = async () => {
    try {
      await axios.put(urlID + this.state.form.id, this.state.form);
      this.modalInsertar();
      this.peticionGet();
      toast.success('Persona actualizada exitosamente');
    } catch (error) {
      console.error('ERROR:', error);
      toast.error('ERROR: Verifique los datos ingresados');
    }
  }

  peticionDelete = async () => {
    try {
      await axios.delete(urlID + this.state.form.id);
      this.setState({ modalEliminar: false });
      this.peticionGet();
      toast.success('Persona eliminada exitosamente');
    } catch (error) {
      console.error('ERROR:', error);
      toast.error('No se pudo realizar la operacion');
    }
  }

  seleccionarPersona=(persona:any)=>{
    this.setState({
      tipoModal: 'actualizar',
      form:{
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      telefono: persona.telefono,
      password: persona.password,
      legajo: persona.legajo,
      email: persona.email,
      rol: persona.rol,
      fechaAlta: persona.fechaAlta,
    }
    })
  }

  asignarTipoModal = (tipo: string) => {
    this.setState({
      form: {
        ...this.state.form,
        tipoModal: tipo,
      },
    });
  };

  modalInsertar = ()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  handleChange = async (e:any)=>{
    e.persist();
    await this.setState({
      form:{
      ...this.state.form,
      [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form)
  }

  componentDidMount() {
    this.peticionGet();
  }
  
  render(){
    const {form}=this.state;

    
    
  return (
    <>
    <ToastContainer 
    autoClose={1500}
    position='top-center'/>
    <header>        
        <div className="header">
                <a id="logo" href="http://127.0.0.1:5500/MAIN%20PAGE/index.html"> 
                    <img src="https://raw.githubusercontent.com/Facustriker/El-buen-sabor---Grupo-Front-eo/main/Assets/logoPNG.png" 
                    id="logoBSArriba" alt="logoBuenSabor"/>
                </a>
            <div id="contenedorPerfilCarrito">   
                <div id="contenedorPerfil">     
                    <img src="https://raw.githubusercontent.com/Facustriker/El-buen-sabor---Grupo-Front-eo/main/Assets/personitaPerfil.png" 
                    id="personitaPerfilImagen"/>         
                    <button id="botonMiPerfil">Mi perfil</button>  
                </div>
            </div>
        </div>
        <div className="lineaBordo"></div> 
    </header>
    <div>
      <br />
      <button className='btn btn-success' onClick={()=>{this.modalInsertar(); this.asignarTipoModal('insertar')}}>Agregar Persona</button>
      <br/><br/>
        <table className='table'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Contraseña</th>
              <th>Legajo</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha de alta</th>
            </tr>
          </thead>
          <tbody>
          {((this.state.data as any) || []).map((persona:any) =>{
              return(
                <tr>
                  <td>{persona.nombre}</td>
                  <td>{persona.apellido}</td>
                  <td>{persona.telefono}</td>
                  <td>{persona.password}</td>
                  <td>{persona.legajo}</td>
                  <td>{persona.email}</td>
                  <td>{persona.rol}</td>
                  <td>{persona.fechaAlta}</td>
                  <td>
                    <button className='btn btn-primary' onClick={()=>{this.seleccionarPersona(persona); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className='btn btn-danger' onClick={()=>{this.seleccionarPersona(persona); this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


    <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
          <button onClick={()=>this.modalInsertar()} style={{float: 'right'}}>x</button>
        </ModalHeader>
        <ModalBody>
          <div id="contenedorBotonesRegistrarseIngresar">
            <div id="fondoBotonesRegistrarseIngresar">
                <button className="botonParteSuperiorFormulario">Registro personas</button>
            </div>
          </div>

          <Form id="contenedorCamposFormulario">

            <div className="columna">
            <FormGroup className="mb-3" controlId="formNombre">
              <label htmlFor="firstname">Nombre</label>
              <input type="text" name='nombre' id='nombre' onChange={this.handleChange} value={form?form.nombre: ''}/>
              <br />
            </FormGroup>
            


            <FormGroup className="mb-3" controlId="formPassword">
              <label htmlFor="firstname">Contraseña</label>
              <input type="text" name='password' id='password' onChange={this.handleChange} value={form?form.password: ''}/>
              <br />
            </FormGroup>


            <FormGroup className="mb-3" controlId="formEmail">
              <label htmlFor="firstname">E-mail</label>
              <input type="text" name='email' id='email' onChange={this.handleChange} value={form?form.email: ''}/>
              <br />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formEmail">
              <label htmlFor="firstname">Legajo</label>
              <input type="text" name='legajo' id='legajo' onChange={this.handleChange} value={form?form.legajo: ''}/>
              <br />
            </FormGroup>


            
            </div>

            <div className="columna">
            <FormGroup className="mb-3" controlId="formApellido">
              <label htmlFor="firstname">Apellido</label>
              <input type="text" name='apellido' id='apellido' onChange={this.handleChange} value={form?form.apellido: ''}/>
              <br />
            </FormGroup>
            

            <FormGroup className="mb-3" controlId="formTelefono">
              <label htmlFor="firstname">Telefono</label>
              <input type="number" name='telefono' id='telefono' onChange={this.handleChange} value={form?form.telefono: ''}/>
              <br />
            </FormGroup>


            

            <FormGroup className="mb-3" controlId="formRol">
              <label htmlFor="firstname">Rol</label>
              <input type="text" name='rol' id='rol' onChange={this.handleChange} value={form?form.rol: ''}/>
              <br />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formFecha">
              <label htmlFor="firstname">Fecha de alta</label>
              <input type="text" name='fechaAlta' id='fechaAlta' onChange={this.handleChange} value={form?form.fechaAlta: ''}/>
              <br />
            </FormGroup>
            </div>

          </Form>
        </ModalBody>

        <ModalFooter id="contenedorBotonRegistrarse">
          {this.state.form.tipoModal=='insertar'?
          <button id="botonRegistrarse" onClick={()=>{this.modalInsertar(); this.peticionPost()}}>
            Registrarse
          </button>: <button id="botonRegistrarse" className='btn btn-primary' onClick={()=>this.peticionPut()}>
            Actualizar
          </button>
          }
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEliminar}>
        <ModalBody>
            Esta seguro que desea eliminar la persona {form && form.nombre} ?
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-danger' onClick={()=>this.peticionDelete()}>Si</button>
            <button className='btn btn-secundary' onClick={()=>this.setState({modalEliminar: false})}>No</button>
        </ModalFooter>
      </Modal>

    </div>
    <footer>       
        <div className="lineaNegraFooter"></div> 
        <div className="lineaBordoFooter"></div> 
        <div className="container"> 
            <div className="parte1">    
                <div id="APPcontainer">  
                    <div id="colTextoApp"> 
                        <a href="https://play.google.com/store/apps/details?id=com.my.cooking.chef.kitchen.craze.fever&hl=es_AR">
                            <button className="button buttonApp">Descarga la App</button> <br/>
                        </a>
                        <h5 className="texto">Descarga la App para tu smartphone</h5>
                    </div>
                    <div id="Apps">
                        <a href="https://play.google.com/store/apps/details?id=com.my.cooking.chef.kitchen.craze.fever&hl=es_AR">
                            <img src="https://raw.githubusercontent.com/Facustriker/El-buen-sabor---Grupo-Front-eo/main/Assets/logoPlay.png" 
                            className="imagePlay"/>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.my.cooking.chef.kitchen.craze.fever&hl=es_AR">
                            <img src="https://raw.githubusercontent.com/Facustriker/El-buen-sabor---Grupo-Front-eo/main/Assets/logoApple.png" 
                            className="imageApple"/>
                        </a>
                    </div>
                </div>
                <div id="logoBSFooter">
                    <img src="https://raw.githubusercontent.com/Facustriker/El-buen-sabor---Grupo-Front-eo/main/Assets/logoBS.png" 
                    style={{ width: '60px', height: '60px' }}/>
                </div>
                <div id="socialContenedor">
                    <h4 className="texto" id="seguinosEn">Seguinos en:</h4>
                    <div id="imagenNombreContenedor">
                        <div id="instagram"> 
                            <a href="https://www.instagram.com/el_buen_sabor/">
                                <img src="https://raw.githubusercontent.com/Facustriker/El-buen-sabor---Grupo-Front-eo/main/Assets/logo%20Insta.png" 
                            className="imageInsta"/>
                            </a>
                            <a href="https://www.instagram.com/el_buen_sabor/">
                                <button className="button buttonUp">Instagram</button>
                            </a>
                        </div>
                        <div id="facebook">
                            <a href="https://www.facebook.com/el_buen_sabor/">
                                <img src="https://raw.githubusercontent.com/Facustriker/El-buen-sabor---Grupo-Front-eo/main/Assets/logo%20Face.png" 
                                className="imageFace"/>
                            </a>
                            <a href="https://www.facebook.com/el_buen_sabor/">
                                <button className="button buttonUp">Facebook</button> <br/>
                            </a>
                        </div> 
                    </div>
                </div>
            </div>     
            <div className="parte2">
                <div id="abajo">
                    <a href="https://github.com/Facustriker/El-buen-sabor---Grupo-Front-eo">
                        <button className="button buttonAb">Sobre nosotros</button> 
                    </a>
                    <a href="https://buenosaires.gob.ar/jefaturadegabinete/atencion-ciudadana-y-gestion-comunal/defensa-al-consumidor">
                        <button className="button buttonAb">Ayuda</button>
                    </a>
                    <a href="https://www.mcdonalds.com.ar/politica-de-privacidad">
                        <button className="button buttonAb">Términos y condiciones</button>
                    </a>
                </div>
            </div>
        </div>
    </footer>
    </>
  );
  }
};

export default App;